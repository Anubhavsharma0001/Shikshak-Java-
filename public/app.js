
(function () {
  const LEVEL_NAMES = [
    "Level 1 · Basics first",
    "Level 2 · Simple solution",
    "Level 3 · Using methods",
    "Level 4 · Advanced",
  ];
  const TAB_NAMES = ["1 · Basics", "2 · Solution", "3 · Methods", "4 · Advanced"];
  const TOPIC_ORDER = ["Basics", "Numbers", "Patterns", "Arrays", "Searching & Sorting", "Strings", "Recursion"];
  const STARTER = "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // write your solution here\n    }\n}\n";

  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
  };

  let custom = store.get("sj_custom", []);
  let done = store.get("sj_done", {});
  let seen = store.get("sj_seen", {});
  let edits = store.get("sj_edits", {});
  let current = store.get("sj_current", 1);
  let passed = store.get("sj_passed", {});
  let days = store.get("sj_days", []);
  let earned = store.get("sj_badges", {});
  let runs = store.get("sj_runs", 0);
  let level = 0;
  let javaOk = true;
  let aiOk = true;
  let mainEd = null, practEd = null;

  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const rich = (s) =>
    String(s).split("\n").map((p) => "<p>" + esc(p).replace(/`([^`]+)`/g, "<code>$1</code>") + "</p>").join("");
  const isLocal = () => ["localhost", "127.0.0.1"].includes(location.hostname);

  function allQuestions() {
    const base = window.QUESTIONS.slice().sort((a, b) => a.id - b.id);
    return base.concat(custom);
  }
  function byId(id) { return allQuestions().find((q) => q.id === id); }
  const META = window.META || {};
  const PRACTICE = window.PRACTICE || {};
  const MISTAKES = window.MISTAKES || {};

  // ---------- Toast ----------
  let toastTimer = null;
  function toast(msg) {
    const t = $("toast");
    t.textContent = msg;
    t.classList.remove("hidden");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.add("hidden"), 3200);
  }

  // ---------- Theme ----------
  function applyTheme(t) {
    document.documentElement.dataset.theme = t;
    $("themeBtn").textContent = t === "light" ? "🌙" : "☀️";
  }
  applyTheme(store.get("sj_theme", "dark"));
  $("themeBtn").onclick = () => {
    const t = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    store.set("sj_theme", t);
    applyTheme(t);
  };

  // ---------- Streak and badges ----------
  const dayStr = (d) => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  function markActive() {
    const today = dayStr(new Date());
    if (!days.includes(today)) { days.push(today); store.set("sj_days", days); }
    updateChips();
  }
  function streak() {
    const set = new Set(days);
    const d = new Date();
    if (!set.has(dayStr(d))) d.setDate(d.getDate() - 1);
    let n = 0;
    while (set.has(dayStr(d))) { n++; d.setDate(d.getDate() - 1); }
    return n;
  }
  function topicStats() {
    const t = {};
    window.QUESTIONS.forEach((q) => {
      t[q.topic] = t[q.topic] || { total: 0, done: 0 };
      t[q.topic].total++;
      if (done[q.id]) t[q.topic].done++;
    });
    return t;
  }
  const BADGES = [
    { id: "run1", icon: "▶️", name: "First run", desc: "Run your first program", ok: (s) => s.runs >= 1 },
    { id: "pass1", icon: "🎯", name: "First solve", desc: "Pass a practice check", ok: (s) => s.passed >= 1 },
    { id: "pass10", icon: "🧠", name: "10 solved", desc: "Pass 10 practice checks", ok: (s) => s.passed >= 10 },
    { id: "pass25", icon: "💪", name: "25 solved", desc: "Pass 25 practice checks", ok: (s) => s.passed >= 25 },
    { id: "done10", icon: "⭐", name: "10 done", desc: "Finish 10 questions", ok: (s) => s.done >= 10 },
    { id: "done25", icon: "🌟", name: "25 done", desc: "Finish 25 questions", ok: (s) => s.done >= 25 },
    { id: "done50", icon: "🏆", name: "All 50", desc: "Finish every question", ok: (s) => s.done >= window.QUESTIONS.length },
    { id: "topic", icon: "📚", name: "Topic finished", desc: "Finish every question of one topic", ok: (s) => s.topicDone },
    { id: "streak3", icon: "🔥", name: "3-day streak", desc: "Practice 3 days in a row", ok: (s) => s.streak >= 3 },
    { id: "streak7", icon: "🚀", name: "7-day streak", desc: "Practice 7 days in a row", ok: (s) => s.streak >= 7 },
  ];
  function evaluateBadges() {
    const ts = topicStats();
    const s = {
      runs,
      passed: Object.keys(passed).filter((k) => passed[k]).length,
      done: window.QUESTIONS.filter((q) => done[q.id]).length,
      streak: streak(),
      topicDone: Object.values(ts).some((x) => x.total > 0 && x.done === x.total),
    };
    BADGES.forEach((b) => {
      if (!earned[b.id] && b.ok(s)) {
        earned[b.id] = dayStr(new Date());
        store.set("sj_badges", earned);
        toast(b.icon + " Badge unlocked: " + b.name);
      }
    });
    updateChips();
  }
  function updateChips() {
    $("streakChip").textContent = "🔥 " + streak() + "-day streak";
    $("badgeChip").textContent = "🏅 " + Object.keys(earned).length + " / " + BADGES.length + " badges";
  }

  // ---------- Welcome ----------
  function showApp() {
    $("welcome").classList.add("hidden");
    $("app").classList.remove("hidden");
    renderList();
    updateChips();
    openQuestion(byId(current) ? current : 1);
  }
  $("startBtn").onclick = () => { store.set("sj_started", true); showApp(); };
  $("homeBtn").onclick = () => { $("app").classList.add("hidden"); $("welcome").classList.remove("hidden"); };
  $("menuBtn").onclick = () => document.querySelector(".sidebar").classList.toggle("open");

  // ---------- Server status ----------
  async function loadStatus() {
    const el = $("statusLine");
    try {
      const s = await getJson("/api/status", 8000);
      javaOk = !!s.java;
      aiOk = !!s.ai;
      if (javaOk) {
        el.textContent = "✓ Online Java code runner is ready";
        el.className = "status good";
      } else {
        el.textContent = "Java code execution is temporarily unavailable.";
        el.className = "status bad";
      }
    } catch {
      el.textContent = isLocal()
        ? "Backend not reachable. Start it with: ./run.sh (Windows: run.bat)"
        : "Could not connect to the Shikshak Java server. Please refresh and try again.";
      el.className = "status bad";
      javaOk = false;
      aiOk = false;
    }
  }
  loadStatus();
