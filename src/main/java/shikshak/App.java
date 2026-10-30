package shikshak;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.regex.Pattern;

/** Shikshak Java backend: serves the web app, runs Java code (/api/run) and checks practice solutions (/api/check). */
public final class App {
    private static final int PORT = Integer.parseInt(System.getenv().getOrDefault("PORT", "3000"));
    private static final Path PUBLIC = Path.of(System.getenv().getOrDefault("PUBLIC_DIR", "public")).toAbsolutePath().normalize();

    // ---------- Safety limits (important when the app is public) ----------
    private static final int MAX_ACTIVE = 4;        // at most 4 jobs running at the same time
    private static final int RATE_LIMIT = 30;       // runs/checks per minute for one visitor
    private static final int MAX_TESTS = 12;        // tests per practice check
    private static final int MAX_BODY = 300_000;
    private static final Pattern BLOCKED = Pattern.compile(
        "\\b(ProcessBuilder|Runtime\\s*\\.\\s*getRuntime|java\\.net|java\\.nio\\.file|java\\.io\\.File|FileWriter|FileReader"
        + "|FileInputStream|FileOutputStream|RandomAccessFile|Files\\s*\\.|URLClassLoader|setSecurityManager"
        + "|java\\.lang\\.reflect|Class\\s*\\.\\s*forName|sun\\.misc|javax\\.script)");

    private static final Map<String, Deque<Long>> HITS = new ConcurrentHashMap<>();
    private static final AtomicInteger ACTIVE = new AtomicInteger();

    private static final Map<String, String> TYPES = Map.of(
        ".html", "text/html; charset=utf-8", ".css", "text/css; charset=utf-8",
        ".js", "application/javascript; charset=utf-8", ".json", "application/json",
        ".svg", "image/svg+xml", ".ico", "image/x-icon");

    public static void main(String[] args) throws Exception {
        HttpServer server = HttpServer.create(new InetSocketAddress(PORT), 0);
        server.createContext("/", App::handle);
        server.setExecutor(Executors.newFixedThreadPool(16));
        server.start();
        System.out.println("\n  Shikshak Java is running!");
        System.out.println("  Open this in your browser:  http://localhost:" + PORT + "\n");
        System.out.println(CodeRunner.hasJava()
            ? "  Java found: code runner is ON\n"
            : "  WARNING: Java (JDK) not found. Lessons will show, but Run will not work.\n");
    }

    private static void handle(HttpExchange ex) throws IOException {
        try {
            String method = ex.getRequestMethod(), path = ex.getRequestURI().getPath();
            if (method.equals("GET") && path.equals("/api/status")) {
                send(ex, 200, Map.of("java", CodeRunner.hasJava(), "ai", Ai.configured()));
            } else if (method.equals("POST") && path.equals("/api/run")) {
                Map<String, Object> data = body(ex);
                if (data == null) return;
                guard(ex, data.get("code"), () -> CodeRunner.run((String) data.get("code"), data.get("input") == null ? "" : String.valueOf(data.get("input"))));
            } else if (method.equals("POST") && path.equals("/api/check")) {
                Map<String, Object> data = body(ex);
                if (data == null) return;
                List<Map<String, Object>> tests = tests(data.get("tests"));
                if (tests.isEmpty()) { send(ex, 400, CodeRunner.result(false, null, "No tests to run.")); return; }
                guard(ex, data.get("code"), () -> CodeRunner.check((String) data.get("code"), tests));
            } else if (method.equals("POST") && path.equals("/api/ai")) {
                Map<String, Object> data = body(ex);
                if (data == null) return;
                String mode = data.get("mode") instanceof String m ? m : "ask";
                String q = data.get("question") instanceof String x ? x : "";
                String code = data.get("code") instanceof String x ? x : "";
                send(ex, 200, Ai.answer(clientIp(ex), mode, q, code));
            } else if (method.equals("GET")) {
                serveFile(ex, path);
            } else {
                ex.sendResponseHeaders(405, -1);
            }
        } catch (Exception e) {
            try { send(ex, 500, CodeRunner.result(false, "setup", "Server error: " + e.getMessage())); } catch (Exception ignored) { }
        } finally {
            ex.close();
        }
    }

    interface Job { Map<String, Object> go() throws Exception; }

    /** Shared guards: Java installed, rate limit, blocked code, busy server. */
    private static void guard(HttpExchange ex, Object code, Job job) throws Exception {
        if (!(code instanceof String c) || c.isBlank()) {
            send(ex, 400, CodeRunner.result(false, null, "Write some code first.")); return;
        }
        if (!CodeRunner.hasJava()) {
            send(ex, 200, CodeRunner.result(false, "setup",
                "Java (JDK) was not found on this computer.\nInstall JDK 17 or newer, then restart the server.")); return;
        }
        if (tooMany(clientIp(ex))) {
            send(ex, 200, CodeRunner.result(false, "limit", "Too many runs. Please wait a minute and try again.")); return;
        }
        if (BLOCKED.matcher(c).find()) {
            send(ex, 200, CodeRunner.result(false, "limit",
                "This code uses files, network, or system commands. These are blocked on the shared server for safety.\n"
                + "Run the app on your own computer to use them.")); return;
        }
        if (ACTIVE.incrementAndGet() > MAX_ACTIVE) {
            ACTIVE.decrementAndGet();
            send(ex, 200, CodeRunner.result(false, "limit", "The server is busy. Try again in a few seconds.")); return;
        }
        try { send(ex, 200, job.go()); } finally { ACTIVE.decrementAndGet(); }
    }

    @SuppressWarnings("unchecked")
    private static List<Map<String, Object>> tests(Object o) {
        List<Map<String, Object>> out = new ArrayList<>();
        if (!(o instanceof List<?> l)) return out;
        for (Object t : l) {
            if (out.size() >= MAX_TESTS) break;
            if (!(t instanceof Map<?, ?> m) || !(m.get("input") instanceof String) || !(m.get("expected") instanceof String)) return List.of();
            out.add((Map<String, Object>) m);
        }
        return out;
    }

    @SuppressWarnings("unchecked")
    private static Map<String, Object> body(HttpExchange ex) throws IOException {
        byte[] raw = ex.getRequestBody().readNBytes(MAX_BODY + 1);
        try {
            if (raw.length > MAX_BODY) throw new IllegalArgumentException("too big");
            Object o = Json.parse(new String(raw, StandardCharsets.UTF_8));
            if (o instanceof Map<?, ?> m) return (Map<String, Object>) m;
            throw new IllegalArgumentException("not an object");
        } catch (RuntimeException e) {
            send(ex, 400, CodeRunner.result(false, null, "Bad request"));
            return null;
        }
    }

    private static boolean tooMany(String ip) {
        long now = System.currentTimeMillis();
        if (HITS.size() > 5000) HITS.clear();
        Deque<Long> q = HITS.computeIfAbsent(ip, k -> new ArrayDeque<>());
        synchronized (q) {
            while (!q.isEmpty() && now - q.peekFirst() >= 60_000) q.pollFirst();
            q.addLast(now);
            return q.size() > RATE_LIMIT;
        }
    }

    private static String clientIp(HttpExchange ex) {
        String f = ex.getRequestHeaders().getFirst("X-Forwarded-For");
        return f != null && !f.isBlank() ? f.split(",")[0].trim() : ex.getRemoteAddress().getAddress().getHostAddress();
    }

    private static void serveFile(HttpExchange ex, String rel) throws IOException {
        rel = URLDecoder.decode(rel, StandardCharsets.UTF_8);
        if (rel.equals("/")) rel = "/index.html";
        Path file = PUBLIC.resolve(rel.substring(1)).normalize();
        if (!file.startsWith(PUBLIC)) { ex.sendResponseHeaders(403, -1); return; }
        if (!Files.isRegularFile(file)) {
            byte[] nf = "Not found".getBytes(StandardCharsets.UTF_8);
            ex.sendResponseHeaders(404, nf.length);
            ex.getResponseBody().write(nf);
            return;
        }
        String name = file.getFileName().toString();
        String type = TYPES.getOrDefault(name.contains(".") ? name.substring(name.lastIndexOf('.')) : "", "application/octet-stream");
        byte[] buf = Files.readAllBytes(file);
        ex.getResponseHeaders().set("Content-Type", type);
        ex.sendResponseHeaders(200, buf.length);
        ex.getResponseBody().write(buf);
    }

    private static void send(HttpExchange ex, int code, Object obj) throws IOException {
        byte[] buf = Json.write(obj).getBytes(StandardCharsets.UTF_8);
        ex.getResponseHeaders().set("Content-Type", "application/json");
        ex.sendResponseHeaders(code, buf.length);
        ex.getResponseBody().write(buf);
    }
}
