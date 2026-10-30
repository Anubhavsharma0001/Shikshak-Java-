
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

/**
 * Compiles and runs student Java code in a separate JVM process.
 * Includes execution time limits and capped output.
 *
 * IMPORTANT:
 * A separate JVM is NOT a security sandbox.
 * Public deployment requires OS-level isolation.
 */
final class CodeRunner {

    static final int MAX_OUTPUT = 20000;

    private static final Pattern CLASS_NAME =
            Pattern.compile("public\\s+(?:final\\s+)?class\\s+([A-Za-z_]\\w*)");

    record Compiled(Path dir, String cls) {
        void cleanup() {
            deleteQuietly(dir);
        }
    }

    record Exec(boolean ok, boolean timedOut, String output) {}

    private static ProcessBuilder builder(List<String> cmd, Path dir) {
        ProcessBuilder pb = new ProcessBuilder(cmd)
                .directory(dir.toFile())
                .redirectErrorStream(true);

        // Do not pass application secrets to student programs.
        pb.environment().clear();

        String path = System.getenv("PATH");

        if (path != null) {
            pb.environment().put("PATH", path);
        }

        pb.environment().put("LANG", "C.UTF-8");

        return pb;
    }

    // ---------- Java availability ----------

    private static volatile long checkedAt;
    private static volatile boolean javaOk;

    static boolean hasJava() {
        long now = System.currentTimeMillis();

        if (now - checkedAt < 10_000) {
            return javaOk;
        }

        try {
            Process p = new ProcessBuilder("javac", "-version")
                    .redirectErrorStream(true)
                    .start();

            Thread reader = new Thread(() -> {
                try {
                    readCapped(p.getInputStream(), 2000);
                } catch (IOException ignored) {
                }
            });

            reader.setDaemon(true);
            reader.start();

            boolean finished = p.waitFor(10, TimeUnit.SECONDS);

            if (!finished) {
                destroyProcessTree(p);
                p.waitFor();
            }

            javaOk = finished && p.exitValue() == 0;

            reader.join(1000);

        } catch (Exception e) {
            javaOk = false;
        }

        checkedAt = System.currentTimeMillis();

        return javaOk;
    }

    // ---------- Compilation ----------

    static Compiled compile(String code)
            throws IOException, InterruptedException, CompileError {

        Matcher matcher = CLASS_NAME.matcher(code);

        String cls = matcher.find()
                ? matcher.group(1)
                : "Main";

        Path dir = Files.createTempDirectory("shikshak-");

        try {
            Path file = dir.resolve(cls + ".java");

            Files.writeString(
                    file,
                    code,
                    StandardCharsets.UTF_8
            );

            Process process = builder(
                    List.of(
                            "javac",
                            "-encoding",
                            "UTF-8",
                            file.toString()
                    ),
                    dir
            ).start();

            byte[][] output = new byte[1][];

            Thread reader = new Thread(() -> {
                try {
                    output[0] = readCapped(
                            process.getInputStream(),
                            MAX_OUTPUT
                    );
                } catch (IOException e) {
                    output[0] = new byte[0];
                }
            });

            reader.setDaemon(true);
            reader.start();

            // Wait for compilation with a real timeout.
            boolean finished = process.waitFor(
                    15,
                    TimeUnit.SECONDS
            );

            if (!finished) {
                destroyProcessTree(process);
                process.waitFor();
            }

            reader.join(2000);

            byte[] bytes = output[0] == null
                    ? new byte[0]
                    : output[0];

            if (!finished || process.exitValue() != 0) {

                String message = new String(
                        bytes,
                        StandardCharsets.UTF_8
                )
                        .replace(dir.toString() + "/", "")
                        .replace(dir.toString() + "\\", "")
                        .trim();

                throw new CompileError(
                        finished
                                ? message
                                : "Compilation took too long."
                );
            }

            return new Compiled(dir, cls);

        } catch (IOException | InterruptedException | CompileError e) {
            deleteQuietly(dir);
            throw e;
        }
    }

    static final class CompileError extends Exception {

        CompileError(String message) {
            super(message);
        }
    }

    // ---------- Process termination ----------

    private static void destroyProcessTree(Process process) {

        try {
            process.descendants().forEach(
                    ProcessHandle::destroyForcibly
            );
        } catch (Exception ignored) {
        }

        process.destroyForcibly();
    }

    // ---------- Execute one program ----------

    static Exec execOne(
            Compiled compiled,
            String input,
            long limitMs
    ) throws IOException, InterruptedException {

        Process process = builder(
                List.of(
                        "java",
                        "-Xmx128m",
                        "-Xss2m",
                        "-cp",
                        compiled.dir().toString(),
                        compiled.cls()
                ),
                compiled.dir()
        ).start();

        // Send input to the program.
        Thread feeder = new Thread(() -> {

            try (OutputStream os = process.getOutputStream()) {

                String value = input == null || input.isEmpty()
                        ? ""
                        : input;

                os.write(
                        (value + "\n").getBytes(StandardCharsets.UTF_8)
                );

            } catch (IOException ignored) {
                // Program may close stdin early.
            }
        });

        feeder.setDaemon(true);
        feeder.start();

        // Read output without allowing unlimited memory growth.
        byte[][] box = new byte[1][];

        Thread reader = new Thread(() -> {

            try {
                box[0] = readCapped(
                        process.getInputStream(),
                        MAX_OUTPUT
                );
            } catch (IOException e) {
                box[0] = new byte[0];
            }
        });

        reader.setDaemon(true);
        reader.start();

        boolean finished = process.waitFor(
                limitMs,
                TimeUnit.MILLISECONDS
        );

        if (!finished) {
            destroyProcessTree(process);
            process.waitFor();
        }

        reader.join(1000);

        String output = new String(
                box[0] == null ? new byte[0] : box[0],
                StandardCharsets.UTF_8
        );

        return new Exec(
                finished && process.exitValue() == 0,
                !finished,
                output
        );
    }

    // ---------- Run endpoint ----------

    static Map<String, Object> run(
            String code,
            String input
    ) throws IOException, InterruptedException {

        Compiled compiled;

        try {
            compiled = compile(code);
        } catch (CompileError e) {
            return result(
                    false,
                    "compile",
                    e.getMessage()
            );
        }

        try {
            Exec execution = execOne(
                    compiled,
                    input,
                    5000
            );

            String output = execution.output();

            if (execution.timedOut()) {
                output += "\n[Stopped: program ran for more than 5 seconds. Infinite loop?]";
            }

            return result(
                    execution.ok(),
                    "run",
                    output.isBlank()
                            ? "(program finished with no output)"
                            : output
            );

        } finally {
            compiled.cleanup();
        }
    }

    // ---------- Practice checking endpoint ----------

    static Map<String, Object> check(
            String code,
            List<Map<String, Object>> tests
    ) throws IOException, InterruptedException {

        Compiled compiled;

        try {
            compiled = compile(code);
        } catch (CompileError e) {
            return result(
                    false,
                    "compile",
                    e.getMessage()
            );
        }

        try {
            List<Object> results = new ArrayList<>();

            int passed = 0;

            for (Map<String, Object> test : tests) {

                String input = (String) test.get("input");
                String expected = (String) test.get("expected");

                Exec execution = execOne(
                        compiled,
                        input,
                        3000
                );

                String actual = execution.timedOut()
                        ? "[Stopped: took longer than 3 seconds]"
                        : execution.output();

                boolean pass =
                        !execution.timedOut()
                        && execution.ok()
                        && normalize(actual).equals(normalize(expected));

                if (pass) {
                    passed++;
                }

                Map<String, Object> row = new LinkedHashMap<>();

                row.put("pass", pass);
                row.put("input", input);
                row.put("expected", expected);

                row.put(
                        "got",
                        actual.length() > 2000
                                ? actual.substring(0, 2000)
                                : actual
                );

                results.add(row);
            }

            Map<String, Object> response = new LinkedHashMap<>();

            response.put("ok", true);
            response.put("stage", "check");
            response.put("results", results);
            response.put("passed", passed);
            response.put("total", results.size());

            return response;

        } finally {
            compiled.cleanup();
        }
    }

    // ---------- Output comparison ----------

    static String normalize(String value) {

        StringBuilder result = new StringBuilder();

        String[] lines = value
                .replace("\r", "")
                .split("\n", -1);

        for (int i = 0; i < lines.length; i++) {

            if (i > 0) {
                result.append('\n');
            }

            result.append(lines[i].stripTrailing());
        }

        return result.toString().strip();
    }

    // ---------- Standard response ----------

    static Map<String, Object> result(
            boolean ok,
            String stage,
            String output
    ) {

        Map<String, Object> response = new LinkedHashMap<>();

        response.put("ok", ok);
        response.put("stage", stage);
        response.put("output", output);

        return response;
    }

    // ---------- Capped output reader ----------

    private static byte[] readCapped(
            InputStream input,
            int max
    ) throws IOException {

        java.io.ByteArrayOutputStream keep =
                new java.io.ByteArrayOutputStream();

        byte[] buffer = new byte[4096];

        int count;

        while ((count = input.read(buffer)) > 0) {

            int room = max - keep.size();

            if (room > 0) {
                keep.write(
                        buffer,
                        0,
                        Math.min(count, room)
                );
            }
        }

        return keep.toByteArray();
    }

    // ---------- Temporary directory cleanup ----------

    private static void deleteQuietly(Path dir) {

        try (Stream<Path> walk = Files.walk(dir)) {

            walk.sorted(Comparator.reverseOrder())
                    .forEach(path -> path.toFile().delete());

        } catch (IOException ignored) {
        }
    }
}
