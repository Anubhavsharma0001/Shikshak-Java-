// Shikshak Java - tiny backend (no npm packages needed).
// Serves the web app, runs Java code (/api/run) and checks practice solutions (/api/check).
const http = require("http");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFile, spawn } = require("child_process");

const PORT = process.env.PORT || 3000;
const PUBLIC = path.join(__dirname, "public");
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

// ---------- Safety limits (important when the app is public) ----------
const MAX_ACTIVE = 4;            // at most 4 jobs running at the same time
const RATE_LIMIT = 30;           // runs/checks per minute for one visitor
const MAX_TESTS = 12;            // tests per practice check
const BLOCKED = /\b(ProcessBuilder|Runtime\s*\.\s*getRuntime|java\.net|java\.nio\.file|java\.io\.File|FileWriter|FileReader|FileInputStream|FileOutputStream|RandomAccessFile|Files\s*\.|URLClassLoader|setSecurityManager|java\.lang\.reflect|Class\s*\.\s*forName|sun\.misc|javax\.script)/;
const hits = new Map();
let active = 0;
const SAFE_ENV = { PATH: process.env.PATH, LANG: "C.UTF-8" };   // no secrets are passed to student code

function tooMany(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < 60000);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) hits.clear();
  return list.length > RATE_LIMIT;
}

function sendJson(res, code, obj) {
  res.writeHead(code, { "Content-Type": "application/json" });
  res.end(JSON.stringify(obj));
}

function hasJava(cb) {
  execFile("javac", ["-version"], (err) => cb(!err));
}

// Compile code into a temp folder. Calls back with { dir, cls, cleanup } or { error }.
function compile(code, cb) {
  const m = code.match(/public\s+(?:final\s+)?class\s+([A-Za-z_]\w*)/);
  const cls = m ? m[1] : "Main";
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "shikshak-"));
  const cleanup = () => fs.rm(dir, { recursive: true, force: true }, () => {});
  const file = path.join(dir, cls + ".java");
  fs.writeFileSync(file, code);
  execFile("javac", ["-encoding", "UTF-8", file], { timeout: 15000, cwd: dir, env: SAFE_ENV }, (cErr, _o, cStderr) => {
    if (cErr) {
      cleanup();
      const msg = (cStderr || String(cErr.message)).split(dir + path.sep).join("");
      return cb({ error: msg.trim() });
    }
    cb({ dir, cls, cleanup });
  });
}

// Run one compiled program with some input. Calls back { ok, timedOut, output }.
function execOne(dir, cls, input, limitMs, cb) {
  const p = spawn("java", ["-Xmx128m", "-Xss2m", "-cp", dir, cls], { cwd: dir, env: SAFE_ENV });
  let out = "";
  let finished = false;
  const MAX = 20000;
  const add = (d) => { if (out.length < MAX) out += d.toString(); };
  p.stdout.on("data", add);
  p.stderr.on("data", add);
  const timer = setTimeout(() => {
    p.kill("SIGKILL");
    finish(false, true);
  }, limitMs);
  function finish(ok, timedOut) {
    if (finished) return;
    finished = true;
    clearTimeout(timer);
    cb({ ok, timedOut: !!timedOut, output: out });
  }
  p.on("close", (c) => finish(c === 0, false));
  p.on("error", (e) => { out += "Could not start Java: " + e.message; finish(false, false); });
  p.stdin.on("error", () => {});
  p.stdin.end(input ? String(input) + "\n" : "\n");
}

// Compile + run one Java program. Returns { ok, stage, output }.
function runJava(code, input, done) {
  compile(code, (c) => {
    if (c.error) return done({ ok: false, stage: "compile", output: c.error });
    execOne(c.dir, c.cls, input, 5000, (r) => {
      c.cleanup();
      let text = r.output;
      if (r.timedOut) text += "\n[Stopped: program ran for more than 5 seconds. Infinite loop?]";
      done({ ok: r.ok, stage: "run", output: text.trim() === "" ? "(program finished with no output)" : text });
    });
  });
}

const normalize = (s) => String(s).replace(/\r/g, "").split("\n").map((l) => l.replace(/\s+$/, "")).join("\n").trim();

// Compile once, run every test, compare output.
function checkJava(code, tests, done) {
  compile(code, (c) => {
    if (c.error) return done({ ok: false, stage: "compile", output: c.error });
    const results = [];
    let i = 0;
    const next = () => {
      if (i >= tests.length) {
        c.cleanup();
        return done({ ok: true, stage: "check", results, passed: results.filter((r) => r.pass).length, total: results.length });
      }
      const t = tests[i++];
      execOne(c.dir, c.cls, t.input, 3000, (r) => {
        const got = r.timedOut ? "[Stopped: took longer than 3 seconds]" : r.output;
        results.push({ pass: !r.timedOut && r.ok && normalize(got) === normalize(t.expected), input: t.input, expected: t.expected, got: got.slice(0, 2000) });
        next();
      });
    };
    next();
  });
}

function readBody(req, res, cb) {
  let body = "";
  req.on("data", (d) => {
    body += d;
    if (body.length > 300000) req.destroy();
  });
  req.on("end", () => {
    let data;
    try { data = JSON.parse(body); } catch { return sendJson(res, 400, { ok: false, output: "Bad request" }); }
    cb(data);
  });
}

// Shared guards: Java installed, rate limit, blocked code, busy server.
function guard(req, res, code, go) {
  if (typeof code !== "string" || !code.trim()) {
    return sendJson(res, 400, { ok: false, output: "Write some code first." });
  }
  hasJava((java) => {
    if (!java) {
      return sendJson(res, 200, {
        ok: false,
        stage: "setup",
        output: "Java (JDK) was not found on this computer.\nInstall JDK 17 or newer, then restart the server (npm start).",
      });
    }
    const ip = String(req.headers["x-forwarded-for"] || req.socket.remoteAddress || "").split(",")[0].trim();
    if (tooMany(ip)) {
      return sendJson(res, 200, { ok: false, stage: "limit", output: "Too many runs. Please wait a minute and try again." });
    }
    if (BLOCKED.test(code)) {
      return sendJson(res, 200, { ok: false, stage: "limit", output: "This code uses files, network, or system commands. These are blocked on the shared server for safety.\nRun the app on your own computer (npm start) to use them." });
    }
    if (active >= MAX_ACTIVE) {
      return sendJson(res, 200, { ok: false, stage: "limit", output: "The server is busy. Try again in a few seconds." });
    }
    active++;
    go((r) => { active--; sendJson(res, 200, r); });
  });
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, "http://localhost");

  if (req.method === "GET" && url.pathname === "/api/status") {
    return hasJava((java) => sendJson(res, 200, { java }));
  }

  if (req.method === "POST" && url.pathname === "/api/run") {
    return readBody(req, res, (data) => {
      guard(req, res, data.code, (reply) => runJava(data.code, data.input, reply));
    });
  }

  if (req.method === "POST" && url.pathname === "/api/check") {
    return readBody(req, res, (data) => {
      const tests = Array.isArray(data.tests) ? data.tests.slice(0, MAX_TESTS) : [];
      if (!tests.length || tests.some((t) => typeof t.input !== "string" || typeof t.expected !== "string")) {
        return sendJson(res, 400, { ok: false, output: "No tests to run." });
      }
      guard(req, res, data.code, (reply) => checkJava(data.code, tests, reply));
    });
  }

  if (req.method === "GET") {
    let rel = decodeURIComponent(url.pathname);
    if (rel === "/") rel = "/index.html";
    const file = path.normalize(path.join(PUBLIC, rel));
    if (!file.startsWith(PUBLIC)) { res.writeHead(403); return res.end("Forbidden"); }
    return fs.readFile(file, (err, buf) => {
      if (err) { res.writeHead(404); return res.end("Not found"); }
      res.writeHead(200, { "Content-Type": TYPES[path.extname(file)] || "application/octet-stream" });
      res.end(buf);
    });
  }

  res.writeHead(405);
  res.end();
});

server.listen(PORT, () => {
  console.log("\n  Shikshak Java is running!");
  console.log("  Open this in your browser:  http://localhost:" + PORT + "\n");
  hasJava((ok) => console.log(ok ? "  Java found: code runner is ON\n" : "  WARNING: Java (JDK) not found. Lessons will show, but Run will not work.\n"));
});
