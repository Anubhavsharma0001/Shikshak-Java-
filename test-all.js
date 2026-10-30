// Compiles and runs every lesson code sample with its sample input.
// Usage: node test-all.js
const fs = require("fs"), os = require("os"), path = require("path"), vm = require("vm");
const { execFileSync, spawnSync } = require("child_process");

const win = {};
for (let i = 1; i <= 5; i++) {
  const f = path.join(__dirname, "public", `questions${i}.js`);
  if (fs.existsSync(f)) vm.runInNewContext(fs.readFileSync(f, "utf8"), { window: win });
}
const Q = win.QUESTIONS.sort((a, b) => a.id - b.id);
let bad = 0, total = 0;
const ids = new Set();
for (const q of Q) {
  if (ids.has(q.id)) { console.log("DUPLICATE id", q.id); bad++; }
  ids.add(q.id);
  if (q.levels.length !== 4) { console.log(`Q${q.id}: expected 4 levels, got ${q.levels.length}`); bad++; }
  q.levels.forEach((lv, i) => {
    total++;
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "sj-test-"));
    fs.writeFileSync(path.join(dir, "Main.java"), lv.c);
    const c = spawnSync("javac", ["Main.java"], { cwd: dir, encoding: "utf8" });
    if (c.status !== 0) { console.log(`Q${q.id} L${i + 1} COMPILE ERROR\n${c.stderr}`); bad++; }
    else {
      const r = spawnSync("java", ["-Xss2m", "-cp", dir, "Main"], { input: (lv.i || "") + "\n", encoding: "utf8", timeout: 10000 });
      if (r.status !== 0 || !r.stdout.trim()) { console.log(`Q${q.id} L${i + 1} RUN FAIL: ${r.stderr || "(no output)"}`); bad++; }
      else if (process.env.SHOW) console.log(`--- Q${q.id} L${i + 1} ${q.title}\n${r.stdout.trimEnd()}`);
    }
    fs.rmSync(dir, { recursive: true, force: true });
  });
}
// data completeness: every question needs practice, meta and mistakes
const w2 = {};
for (const f of ["practice.js", "meta.js", "mistakes.js"]) vm.runInNewContext(fs.readFileSync(path.join(__dirname, "public", f), "utf8"), { window: w2 });
for (const q of Q) {
  if (!w2.PRACTICE[q.id] || !w2.PRACTICE[q.id].tests.length) { console.log(`Q${q.id}: missing practice tests`); bad++; }
  if (!w2.META[q.id]) { console.log(`Q${q.id}: missing difficulty/complexity`); bad++; }
  if (!w2.MISTAKES[q.topic]) { console.log(`Q${q.id}: no common mistakes for topic ${q.topic}`); bad++; }
}
console.log(`\n${Q.length} questions, ${total} programs tested, ${bad} problem(s).`);
process.exit(bad ? 1 : 0);
