
(function () {
  const LEVEL_NAMES = [
  "BASIC",
  "SIMPLE SOLUTION",
  "BY METHODS",
  "ADVANCED",
];

const TAB_NAMES = ["1 · Stage 1", "2 · Stage 2", "3 · Stage 3", "4 · Stage 4"];
const TOPIC_ORDER = [
  "Basics",
  "Numbers",
  "Patterns",
  "Arrays",
  "Searching & Sorting",
  "Strings",
  "Recursion",
  "Java Fundamentals",
  "Operators, Conditions & Loops",
  "Arrays & Strings",
  "OOP & Advanced Java"
];
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
     t = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    store.set("sj_theme", t);
    applyTheme(t);
  };

  // ---------- Streak and badges ----------
   dayStr = (d) => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  function markActive() {
     today = dayStr(new Date());
    if (!days.includes(today)) { days.push(today); store.set("sj_days", days); }
    updateChips();
  }
  function streak() {
     set = new Set(days);
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
  
  // ---------- Sidebar ----------
  function renderList() {
    const q = $("search").value.trim().toLowerCase();
    const list = $("list");
    list.innerHTML = "";
    let lastTopic = null;
    allQuestions().forEach((qu) => {
      if (q && !(qu.title.toLowerCase().includes(q) || (qu.topic || "").toLowerCase().includes(q))) return;
      if (qu.topic !== lastTopic) {
        lastTopic = qu.topic;
        const t = document.createElement("div");
        t.className = "topic";
        t.textContent = qu.topic;
        list.appendChild(t);
      }
      const m = META[qu.id];
      const b = document.createElement("button");
      b.className = "item" + (qu.id === current ? " active" : "");
      b.innerHTML = '<span class="num">' + (qu.custom ? "★" : qu.id) + '</span><span class="name">' + esc(qu.title) + "</span>" +
        (m ? '<span class="dot ' + m[0] + '" title="' + m[0] + '"></span>' : "") +
        (done[qu.id] ? '<span class="tick">✓</span>' : "");
      b.onclick = () => { openQuestion(qu.id); document.querySelector(".sidebar").classList.remove("open"); };
      list.appendChild(b);
    });
    const total = allQuestions().length;
    const n = allQuestions().filter((x) => done[x.id]).length;
    $("progText").textContent = n + " / " + total + " done";
    $("progBar").style.width = (total ? (n / total) * 100 : 0) + "%";
  }
  $("search").oninput = renderList;

  // ---------- Editor ----------
  function makeEditor(host, value, onChange, onRun) {
    host.innerHTML = "";
    if (window.CodeMirror) {
      const cm = window.CodeMirror(host, {
        value, mode: "text/x-java", lineNumbers: true, matchBrackets: true, autoCloseBrackets: true,
        indentUnit: 4, tabSize: 4, indentWithTabs: false, lineWrapping: false,
        extraKeys: {
          Tab: (c) => (c.somethingSelected() ? c.indentSelection("add") : c.replaceSelection("    ", "end")),
          "Shift-Tab": (c) => c.indentSelection("subtract"),
          "Ctrl-Enter": onRun, "Cmd-Enter": onRun,
        },
      });
      cm.on("change", () => onChange(cm.getValue()));
      setTimeout(() => cm.refresh(), 0);
      return { get: () => cm.getValue(), set: (v) => cm.setValue(v) };
    }
    const ta = document.createElement("textarea");
    ta.className = "code";
    ta.spellcheck = false;
    ta.value = value;
    ta.oninput = () => onChange(ta.value);
    ta.onkeydown = (e) => {
      if (e.key === "Tab") {
        e.preventDefault();
        const s = ta.selectionStart;
        ta.value = ta.value.slice(0, s) + "    " + ta.value.slice(ta.selectionEnd);
        ta.selectionStart = ta.selectionEnd = s + 4;
        onChange(ta.value);
      } else if ((e.ctrlKey || e.metaKey) && e.key === "Enter") onRun();
    };
    host.appendChild(ta);
    return { get: () => ta.value, set: (v) => (ta.value = v) };
  }

  function copyText(text) {
    const ok = () => toast("Code copied");
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(ok, fallback);
    else fallback();
    function fallback() {
      const t = document.createElement("textarea");
      t.value = text;
      document.body.appendChild(t);
      t.select();
      try { document.execCommand("copy"); ok(); } catch { toast("Press Ctrl+C to copy"); }
      t.remove();
    }
  }

  // ---------- Lesson ----------
  function openQuestion(id, lvl) {
    current = id;
    store.set("sj_current", id);
    level = lvl || 0;
    renderList();
    renderLesson();
    $("main").scrollTop = 0;
  }

  function codeKey(q, l) { return q.id + ":" + l; }

  function practiceHtml(q) {
    const p = PRACTICE[q.id];
    if (!p || q.custom) return "";
    const sample = p.tests[0];
    const hidden = p.tests.length - 1;
    return '<details class="panel" id="practiceBox"><summary><span>🎯 Practice: solve it yourself' +
      (passed[q.id] ? '<span class="pill-ok">✓ solved</span>' : "") +
      "</span></summary><div class=\"inner\">" +
      "<p><b>Task:</b> " + esc(p.task) + "</p>" +
      '<div class="fmt"><b>Input</b><pre>' + esc(p.inp) + '</pre></div>' +
      '<div class="fmt"><b>Output</b><pre>' + esc(p.out) + '</pre></div>' +
      '<div class="fmt"><b>Sample</b> (input, then the expected output)<pre>' +
      esc(sample.input === "" ? "(no input)" : sample.input) + "\n---\n" + esc(sample.expected) + "</pre></div>" +
      '<p class="muted small">Your program is checked on ' + p.tests.length + " tests" +
      (hidden > 0 ? " (the sample and " + hidden + " more). " : ". ") +
      "Output must match exactly (extra spaces at the end of a line are ignored).</p>" +
      '<div class="editor-head"><span>Your solution (Main.java)</span><span><button class="btn ghost" id="pResetBtn">Reset</button></span></div>' +
      '<div id="practHost"></div>' +
      '<div class="row"><button class="btn" id="checkBtn">✔ Check my solution</button><button class="btn ghost" id="hintBtn">💡 Show a hint</button></div>' +
      '<div id="hintArea"></div><div id="checkArea" class="results"></div>' +
      "</div></details>";
  }

  function mistakesHtml(q) {
    const list = MISTAKES[q.topic];
    if (!list || q.custom) return "";
    return '<details class="panel"><summary><span>⚠️ Common mistakes in this topic</span></summary><div class="inner">' +
      list.map((m) => '<div class="mistake"><h4>' + esc(m.t) + "</h4><pre>" + esc(m.w) + "</pre><p>" + esc(m.why) + "</p></div>").join("") +
      "</div></details>";
  }

  function renderLesson() {
    const q = byId(current);
    if (!q) return;
    const lv = q.levels[level];
    const key = codeKey(q, level);
    seen[key] = true;
    store.set("sj_seen", seen);
    const code = edits[key] != null ? edits[key] : lv.c;
    const m = META[q.id];

    const tabs = q.levels.map((_, i) =>
      '<button class="tab' + (i === level ? " active" : "") +
      (seen[codeKey(q, i)] && i !== level ? " seen" : "") +
      '" data-i="' + i + '">' + (q.custom ? "Code" : TAB_NAMES[i]) + "</button>"
    ).join("");
    const ids = allQuestions().map((x) => x.id);
    const idx = ids.indexOf(q.id);
    const cx = m && level === q.levels.length - 1 && q.levels.length > 1
      ? '<div class="cx"><span>⏱ Time: <b>' + esc(m[1]) + "</b></span><span>💾 Extra space: <b>" + esc(m[2]) + "</b></span></div>" : "";

    $("lesson").innerHTML =
      '<div class="lesson">' +
      '<div class="crumb">' + esc(q.topic) + (q.custom ? " · yours" : " · Question " + q.id + " of " + window.QUESTIONS.length) +
      (m ? '<span class="badge-pill ' + m[0] + '">' + m[0] + "</span>" : "") + "</div>" +
      "<h2>" + esc(q.title) + "</h2>" +
      '<div class="intro">' + rich(q.intro || "") + "</div>" +
      '<div class="tabs">' + tabs + "</div>" +
      '<div class="explain"><div class="lvl-name">' + (q.custom ? "Your code" : LEVEL_NAMES[level]) + "</div>" + rich(lv.x || "") + "</div>" +
      cx +
      '<div class="editor">' +
      '<div class="editor-head"><span>Main.java (you can edit this and run it)</span><span><button class="btn ghost" id="copyBtn">Copy code</button> <button class="btn ghost" id="resetBtn">Reset code</button></span></div>' +
      '<div id="mainHost"></div>' +
      '<div class="label">Input for the program (what you would type on the keyboard). Leave empty if the code does not read input.</div>' +
      '<textarea class="stdin" id="stdin" rows="2" spellcheck="false"></textarea>' +
      '<div class="row"><button class="btn" id="runBtn">▶ Run</button><button class="btn ghost" id="doneBtn"></button></div>' +
      '<div class="label">Output</div><pre class="output empty" id="out">Press Run to see the output.</pre>' +
      "</div>" + practiceHtml(q) + mistakesHtml(q) +
      '<div class="pager"><button class="btn ghost" id="prevQ"' + (idx <= 0 ? " disabled" : "") + '>← Previous question</button>' +
      '<button class="btn ghost" id="nextQ"' + (idx >= ids.length - 1 ? " disabled" : "") + ">Next question →</button></div>" +
      "</div>";

    mainEd = makeEditor($("mainHost"), code, (v) => { edits[key] = v; store.set("sj_edits", edits); }, run);
    $("stdin").value = lv.i || "";
    updateDone();

    document.querySelectorAll(".tab").forEach((t) => (t.onclick = () => openQuestion(q.id, +t.dataset.i)));
    $("copyBtn").onclick = () => copyText(mainEd.get());
    $("resetBtn").onclick = () => { delete edits[key]; store.set("sj_edits", edits); mainEd.set(lv.c); };
    $("runBtn").onclick = run;
    $("doneBtn").onclick = () => {
      done[q.id] = !done[q.id];
      store.set("sj_done", done);
      if (done[q.id]) markActive();
      updateDone();
      renderList();
      evaluateBadges();
    };
    $("prevQ").onclick = () => openQuestion(ids[idx - 1]);
    $("nextQ").onclick = () => openQuestion(ids[idx + 1]);
    if (PRACTICE[q.id] && !q.custom) setupPractice(q);
  }

  function setupPractice(q) {
    const p = PRACTICE[q.id];
    const pkey = "p" + q.id;
    practEd = makeEditor($("practHost"), edits[pkey] != null ? edits[pkey] : STARTER,
      (v) => { edits[pkey] = v; store.set("sj_edits", edits); }, check);
    $("pResetBtn").onclick = () => { delete edits[pkey]; store.set("sj_edits", edits); practEd.set(STARTER); };
    $("checkBtn").onclick = check;

    const titles = ["Hint 1 · the basic idea", "Hint 2 · the approach", "Hint 3 · put it in a method"];
    const hints = [0, 1, 2].filter((i) => q.levels[i] && q.levels[i].x).map((i) => ({ t: titles[i], x: q.levels[i].x }));
    const solution = q.levels[Math.min(2, q.levels.length - 1)].c;
    let shown = 0;
    $("hintBtn").onclick = () => {
      if (shown < hints.length) {
        const h = hints[shown++];
        $("hintArea").insertAdjacentHTML("beforeend", '<div class="hint"><b>' + esc(h.t) + "</b>" + rich(h.x) + "</div>");
        if (shown === hints.length) $("hintBtn").textContent = "👀 Show full solution";
      } else {
        $("hintArea").insertAdjacentHTML("beforeend", '<div class="hint"><b>Full solution (Level 3 code)</b></div><pre class="output">' + esc(solution) + "</pre>");
        $("hintBtn").disabled = true;
      }
    };
    void p;
  }

  function updateDone() {
    const b = $("doneBtn");
    if (!b) return;
    const d = done[current];
    b.textContent = d ? "✓ Done (click to undo)" : "Mark question as done";
    b.className = "btn " + (d ? "ok" : "ghost");
  }

  
  // ---------- API request helpers ----------
  async function getJson(url, timeoutMs = 8000) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, { signal: controller.signal });
      let data;

      try {
        data = await response.json();
      } catch {
        throw new Error("Server returned an invalid response.");
      }

      if (!response.ok) {
        throw new Error(data.output || `Server error: ${response.status}`);
      }

      return data;
    } catch (error) {
      if (error.name === "AbortError") {
        throw new Error("Server request timed out. Please try again.");
      }
      throw error;
    } finally {
      clearTimeout(timer);
    }
  }

  async function post(url, body, timeoutMs = 20000) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: controller.signal
      });

      let data;

      try {
        data = await response.json();
      } catch {
        throw new Error("Server returned an invalid response.");
      }

      if (!response.ok) {
        throw new Error(data.output || `Server error: ${response.status}`);
      }

      return data;
    } catch (error) {
      if (error.name === "AbortError") {
        throw new Error("Request timed out. Please try again.");
      }
      throw error;
    } finally {
      clearTimeout(timer);
    }
  }

  const offlineMsg = (error) => {
    if (error && error.message) return error.message;

    return isLocal()
      ? "Cannot reach the backend. Start it with: ./run.sh (Windows: run.bat)"
      : "Could not connect to the Shikshak Java server. Please try again.";
  };

  // ---------- Run Java code ----------
  async function run() {
    const out = $("out");
    const btn = $("runBtn");

    if (!out || !btn || btn.disabled || !mainEd) return;

    btn.disabled = true;
    btn.textContent = "Running…";
    out.className = "output empty";
    out.textContent = "Compiling and running…";

    try {
      const j = await post(
        "/api/run",
        { code: mainEd.get(), input: $("stdin").value },
        20000
      );

      out.className = "output" + (j.ok ? "" : " err");
      out.textContent = (j.stage === "compile" ? "Compile error:\n" : "") + (j.output || "");

      if (j.stage === "run") {
        runs++;
        store.set("sj_runs", runs);
        markActive();
        evaluateBadges();
      }
    } catch (error) {
      out.className = "output err";
      out.textContent = offlineMsg(error);
    } finally {
      btn.disabled = false;
      btn.textContent = "▶ Run";
    }
  }

  // ---------- Practice check ----------
  async function check() {
    const q = byId(current);
    const p = q && PRACTICE[q.id];
    const area = $("checkArea");
    const btn = $("checkBtn");

    if (!p || !area || !btn || btn.disabled || !practEd) return;

    btn.disabled = true;
    btn.textContent = "Checking…";
    area.innerHTML = '<p class="muted">Compiling and running ' + p.tests.length + " tests…</p>";

    try {
      const j = await post(
        "/api/check",
        { code: practEd.get(), tests: p.tests },
        60000
      );

      if (j.stage === "check") {
        const all = j.passed === j.total;

        let html = '<div class="verdict ' + (all ? "pass" : "fail") + '">' +
          (all
            ? "✅ All " + j.total + " tests passed. Well done!"
            : "❌ " + j.passed + " of " + j.total + " tests passed") +
          "</div>";

        j.results.forEach((r, i) => {
          html += '<div class="res"><span class="' + (r.pass ? "ok" : "no") + '">' +
            (r.pass ? "✓" : "✗") + "</span><span>Test " + (i + 1) +
            (i === 0 ? " (sample)" : "") + "</span></div>";
        });

        const bad = j.results.find((r) => !r.pass);

        if (bad) {
          html += '<div class="label">First failing test</div><div class="fmt"><b>Input</b><pre>' +
            esc(bad.input === "" ? "(no input)" : bad.input) + "</pre></div>" +
            '<div class="diff"><div><b>Expected</b><pre>' + esc(bad.expected) +
            "</pre></div><div><b>Your output</b><pre>" +
            esc(bad.got === "" ? "(nothing printed)" : bad.got) +
            "</pre></div></div>";
        }

        area.innerHTML = html;
        markActive();

        if (all) {
          if (!passed[q.id]) {
            passed[q.id] = true;
            store.set("sj_passed", passed);
          }

          if (!done[q.id]) {
            done[q.id] = true;
            store.set("sj_done", done);
            updateDone();
          }

          const sum = document.querySelector("#practiceBox summary span");

          if (sum && !sum.querySelector(".pill-ok")) {
            sum.insertAdjacentHTML("beforeend", '<span class="pill-ok">✓ solved</span>');
          }

          renderList();
        }

        evaluateBadges();
      } else {
        area.innerHTML =
          '<div class="verdict fail">' +
          (j.stage === "compile" ? "Compile error" : "Could not check") +
          '</div><pre class="output err">' +
          esc(j.output || "Unknown problem") + "</pre>";
      }
    } catch (error) {
      area.innerHTML = '<pre class="output err">' + esc(offlineMsg(error)) + "</pre>";
    } finally {
      btn.disabled = false;
      btn.textContent = "✔ Check my solution";
    }
  }

  // ---------- Roadmap, badges, backup ----------
  function renderRoadmap() {
    const ts = topicStats();

    $("roadmap").innerHTML = TOPIC_ORDER.filter((t) => ts[t]).map((t, i) => {
      const s = ts[t];
      const pct = Math.round((s.done / s.total) * 100);

      return '<div class="road"><div class="rt"><span><b>' +
        (i + 1) + ". " + esc(t) + "</b></span><span>" +
        s.done + " / " + s.total + " done</span></div>" +
        '<div class="bar"><div style="width:' + pct + '%"></div></div></div>';
    }).join("");

    $("badges").innerHTML = BADGES.map((b) =>
      '<div class="bdg' + (earned[b.id] ? "" : " off") + '"><b>' +
      b.icon + " " + esc(b.name) + "</b>" + esc(b.desc) +
      (earned[b.id] ? "<br><small>Earned " + earned[b.id] + "</small>" : "") +
      "</div>"
    ).join("");
  }

  $("roadBtn").onclick = () => {
    renderRoadmap();
    $("roadDlg").showModal();
  };

  $("roadClose").onclick = () => $("roadDlg").close();

  $("continueBtn").onclick = () => {
    const rank = (q) => {
      const i = TOPIC_ORDER.indexOf(q.topic);
      return i < 0 ? 99 : i;
    };

    const next = window.QUESTIONS
      .slice()
      .sort((a, b) => rank(a) - rank(b) || a.id - b.id)
      .find((q) => !done[q.id]);

    $("roadDlg").close();

    if (next) openQuestion(next.id);
    else toast("🏆 You finished every question!");
  };

  const KEYS = {
    sj_done: () => done,
    sj_seen: () => seen,
    sj_edits: () => edits,
    sj_custom: () => custom,
    sj_passed: () => passed,
    sj_days: () => days,
    sj_badges: () => earned,
    sj_runs: () => runs,
    sj_current: () => current
  };

  $("exportBtn").onclick = () => {
    const data = {};
    Object.keys(KEYS).forEach((k) => (data[k] = KEYS[k]()));

    const a = document.createElement("a");
    a.href = URL.createObjectURL(
      new Blob([JSON.stringify(data, null, 1)], { type: "application/json" })
    );
    a.download = "shikshak-java-progress.json";
    a.click();

    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  };

  $("importBtn").onclick = () => $("importFile").click();

  $("importFile").onchange = (e) => {
    const f = e.target.files[0];
    if (!f) return;

    const r = new FileReader();

    r.onload = () => {
      try {
        const d = JSON.parse(r.result);

        if (!d || typeof d !== "object" || Array.isArray(d)) {
          throw new Error("Invalid file");
        }

        Object.keys(KEYS).forEach((k) => {
          if (k in d) store.set(k, d[k]);
        });

        location.reload();
      } catch {
        toast("That file is not a Shikshak Java progress file");
      }
    };

    r.readAsText(f);
  };

  // ---------- AI tutor ----------
  let aiMode = "ask";

  const inlineMd = (t) =>
    esc(t)
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>");

  function mdToHtml(text) {
    return String(text).split(/```[a-zA-Z]*\n?/).map((part, i) => {
      if (i % 2) {
        return '<pre class="output">' + esc(part.replace(/\n$/, "")) + "</pre>";
      }

      return part.split("\n").map((line) => {
        const t = line.trim();
        if (!t) return "";

        let m = t.match(/^(\d+)[.)]\s+(.*)$/);

        if (m) {
          return '<div class="ai-li"><b>' + m[1] +
            ".</b><span>" + inlineMd(m[2]) + "</span></div>";
        }

        m = t.match(/^[-*•]\s+(.*)$/);

        if (m) {
          return '<div class="ai-li"><b>•</b><span>' +
            inlineMd(m[1]) + "</span></div>";
        }

        return "<p>" + inlineMd(t) + "</p>";
      }).join("");
    }).join("");
  }

  function setAiMode(mode) {
    aiMode = mode;

    document.querySelectorAll(".aitab").forEach((t) =>
      t.classList.toggle("active", t.dataset.mode === mode)
    );

    $("aiAskBox").classList.toggle("hidden", mode !== "ask");
    $("aiReviewBox").classList.toggle("hidden", mode !== "review");
    $("aiGo").textContent = mode === "ask" ? "Ask AI" : "Review my code";
    $("aiOut").classList.add("hidden");
  }

  document.querySelectorAll(".aitab").forEach((t) =>
    (t.onclick = () => setAiMode(t.dataset.mode))
  );

  document.querySelectorAll(".chip-btn").forEach((c) =>
    (c.onclick = () => {
      $("aiQ").value = c.textContent;
      $("aiQ").focus();
    })
  );

  $("aiBtn").onclick = () => {
    const w = $("aiWarn");

    if (!aiOk) {
      w.textContent = isLocal()
        ? "AI is not configured or the backend is unavailable. Check your AI provider settings."
        : "AI is temporarily unavailable. Please try again shortly.";

      w.classList.remove("hidden");
    } else {
      w.classList.add("hidden");
    }

    $("aiDlg").showModal();
  };

  $("aiClose").onclick = () => $("aiDlg").close();

  $("aiUseEditor").onclick = () => {
    const pb = $("practiceBox");
    const ed = pb && pb.open && practEd ? practEd : mainEd;

    if (ed) {
      $("aiCode").value = ed.get();
      toast("Code copied from your editor");
    } else {
      toast("Open a question first");
    }
  };

  $("aiGo").onclick = async () => {
    const out = $("aiOut");
    const btn = $("aiGo");
    const review = aiMode === "review";
    const question = review ? $("aiTask").value : $("aiQ").value;
    const code = review ? $("aiCode").value : "";

    if (review ? !code.trim() : !question.trim()) {
      toast(review ? "Paste your code first" : "Type your question first");
      return;
    }

    btn.disabled = true;
    $("aiBusy").textContent = "Thinking…";
    out.className = "ai-out";
    out.innerHTML = '<p class="muted">Thinking…</p>';

    try {
      const j = await post(
        "/api/ai",
        { mode: aiMode, question, code },
        70000
      );

      if (j.ok) {
        out.className = "ai-out";
        out.innerHTML = mdToHtml(j.output || "");
        markActive();
      } else {
        out.className = "ai-out err";
        out.textContent = j.output || "Something went wrong.";
      }
    } catch (error) {
      out.className = "ai-out err";
      out.textContent = offlineMsg(error);
    } finally {
      btn.disabled = false;
      $("aiBusy").textContent = "";
    }
  };

  // ---------- Add own question ----------
  $("addBtn").onclick = () => {
    $("addForm").reset();
    $("addDlg").showModal();
  };

  $("addForm").addEventListener("submit", (e) => {
    const action = e.submitter && e.submitter.value;
    if (action !== "ok") return;

    const title = $("addTitle").value.trim();
    if (!title) return;

    const id = 1000 + custom.length + 1 + Math.floor(Math.random() * 1e6);

    custom.push({
      id,
      custom: true,
      topic: "My questions",
      title,
      intro: $("addNotes").value.trim() || "Your own question.",
      levels: [{
        x: "Write, edit and run your own solution here.",
        c: $("addCode").value || "public class Main {\n    public static void main(String[] args) {\n        \n    }\n}\n",
        i: ""
      }],
    });

    store.set("sj_custom", custom);
    renderList();
    openQuestion(id);
  });

  updateChips();
})();


