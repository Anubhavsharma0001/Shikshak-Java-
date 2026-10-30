package shikshak;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Stream;

/** Compiles and runs student Java code in a separate JVM process, with time and memory limits. */
final class CodeRunner {
    static final int MAX_OUTPUT = 20000;
    private static final Pattern CLASS_NAME = Pattern.compile("public\\s+(?:final\\s+)?class\\s+([A-Za-z_]\\w*)");

    record Compiled(Path dir, String cls) {
        void cleanup() { deleteQuietly(dir); }
    }
    record Exec(boolean ok, boolean timedOut, String output) {}

    private static ProcessBuilder builder(List<String> cmd, Path dir) {
        ProcessBuilder pb = new ProcessBuilder(cmd).directory(dir.toFile()).redirectErrorStream(true);
        pb.environment().clear();                      // no secrets are passed to student code
        String path = System.getenv("PATH");
        if (path != null) pb.environment().put("PATH", path);
        pb.environment().put("LANG", "C.UTF-8");
        return pb;
    }

    /** Is a JDK (javac) available? Cached for a few seconds. */
    private static volatile long checkedAt;
    private static volatile boolean javaOk;
    static boolean hasJava() {
        long now = System.currentTimeMillis();
        if (now - checkedAt < 10_000) return javaOk;
        try {
            Process p = new ProcessBuilder("javac", "-version").redirectErrorStream(true).start();
            p.getInputStream().readAllBytes();
            javaOk = p.waitFor(10, TimeUnit.SECONDS) && p.exitValue() == 0;
        } catch (Exception e) {
            javaOk = false;
        }
        checkedAt = now;
        return javaOk;
    }

    /** Returns the compiled program, or throws CompileError with the compiler message. */
    static Compiled compile(String code) throws IOException, InterruptedException, CompileError {
        Matcher m = CLASS_NAME.matcher(code);
        String cls = m.find() ? m.group(1) : "Main";
        Path dir = Files.createTempDirectory("shikshak-");
        Path file = dir.resolve(cls + ".java");
        Files.writeString(file, code, StandardCharsets.UTF_8);
        Process p = builder(List.of("javac", "-encoding", "UTF-8", file.toString()), dir).start();
        byte[] out = readCapped(p.getInputStream(), MAX_OUTPUT);
        boolean finished = p.waitFor(15, TimeUnit.SECONDS);
        if (!finished) p.destroyForcibly();
        if (!finished || p.exitValue() != 0) {
            deleteQuietly(dir);
            String msg = new String(out, StandardCharsets.UTF_8)
                    .replace(dir.toString() + "/", "").replace(dir.toString() + "\\", "").trim();
            throw new CompileError(finished ? msg : "Compilation took too long.");
        }
        return new Compiled(dir, cls);
    }

    static final class CompileError extends Exception {
        CompileError(String m) { super(m); }
    }

    /** Runs one compiled program with the given stdin. */
    static Exec execOne(Compiled c, String input, long limitMs) throws IOException, InterruptedException {
        Process p = builder(List.of("java", "-Xmx128m", "-Xss2m", "-cp", c.dir().toString(), c.cls()), c.dir()).start();
        Thread feeder = new Thread(() -> {
            try (OutputStream os = p.getOutputStream()) {
                os.write(((input == null || input.isEmpty() ? "" : input) + "\n").getBytes(StandardCharsets.UTF_8));
            } catch (IOException ignored) { /* program closed stdin early */ }
        });
        feeder.setDaemon(true);
        feeder.start();
        byte[][] box = new byte[1][];
        Thread reader = new Thread(() -> {
            try { box[0] = readCapped(p.getInputStream(), MAX_OUTPUT); } catch (IOException e) { box[0] = new byte[0]; }
        });
        reader.setDaemon(true);
        reader.start();
        boolean done = p.waitFor(limitMs, TimeUnit.MILLISECONDS);
        if (!done) p.destroyForcibly().waitFor();
        reader.join(1000);
        String out = new String(box[0] == null ? new byte[0] : box[0], StandardCharsets.UTF_8);
        return new Exec(done && p.exitValue() == 0, !done, out);
    }

    /** Compile + run. Result map matches what the web app expects: ok, stage, output. */
    static Map<String, Object> run(String code, String input) throws IOException, InterruptedException {
        Compiled c;
        try { c = compile(code); }
        catch (CompileError e) { return result(false, "compile", e.getMessage()); }
        try {
            Exec r = execOne(c, input, 5000);
            String text = r.output();
            if (r.timedOut()) text += "\n[Stopped: program ran for more than 5 seconds. Infinite loop?]";
            return result(r.ok(), "run", text.isBlank() ? "(program finished with no output)" : text);
        } finally { c.cleanup(); }
    }

    /** Compile once, run every test, compare output. */
    static Map<String, Object> check(String code, List<Map<String, Object>> tests) throws IOException, InterruptedException {
        Compiled c;
        try { c = compile(code); }
        catch (CompileError e) { return result(false, "compile", e.getMessage()); }
        try {
            List<Object> results = new ArrayList<>();
            int passed = 0;
            for (Map<String, Object> t : tests) {
                String in = (String) t.get("input"), expected = (String) t.get("expected");
                Exec r = execOne(c, in, 3000);
                String got = r.timedOut() ? "[Stopped: took longer than 3 seconds]" : r.output();
                boolean pass = !r.timedOut() && r.ok() && normalize(got).equals(normalize(expected));
                if (pass) passed++;
                Map<String, Object> row = new LinkedHashMap<>();
                row.put("pass", pass);
                row.put("input", in);
                row.put("expected", expected);
                row.put("got", got.length() > 2000 ? got.substring(0, 2000) : got);
                results.add(row);
            }
            Map<String, Object> m = new LinkedHashMap<>();
            m.put("ok", true);
            m.put("stage", "check");
            m.put("results", results);
            m.put("passed", passed);
            m.put("total", results.size());
            return m;
        } finally { c.cleanup(); }
    }

    static String normalize(String s) {
        StringBuilder b = new StringBuilder();
        String[] lines = s.replace("\r", "").split("\n", -1);
        for (int i = 0; i < lines.length; i++) {
            if (i > 0) b.append('\n');
            b.append(lines[i].stripTrailing());
        }
        return b.toString().strip();
    }

    static Map<String, Object> result(boolean ok, String stage, String output) {
        Map<String, Object> m = new LinkedHashMap<>();
        m.put("ok", ok);
        m.put("stage", stage);
        m.put("output", output);
        return m;
    }

    /** Reads everything, keeps only the first max bytes (so a noisy program cannot fill memory or block). */
    private static byte[] readCapped(InputStream in, int max) throws IOException {
        java.io.ByteArrayOutputStream keep = new java.io.ByteArrayOutputStream();
        byte[] buf = new byte[4096];
        int n;
        while ((n = in.read(buf)) > 0) {
            int room = max - keep.size();
            if (room > 0) keep.write(buf, 0, Math.min(n, room));
        }
        return keep.toByteArray();
    }

    private static void deleteQuietly(Path dir) {
        try (Stream<Path> w = Files.walk(dir)) {
            w.sorted(Comparator.reverseOrder()).forEach(p -> p.toFile().delete());
        } catch (IOException ignored) { }
    }
}
