# Shikshak Java ☕

A small web app that teaches Java **step by step before you start DSA**.
50 practice questions, each taught in 4 levels, with a built-in code runner and an automatic answer checker.

## Features
- **4 levels per question:** Basics first → Simple solution → Using methods → Advanced (recursion and smarter ideas).
- **Run button:** edit the code and run it with your own JDK (Java backend, no libraries needed).
- **Practice with auto-check:** write the solution yourself and it is tested on several inputs (sample + hidden tests). Wrong answers show expected vs your output.
- **Hints, one at a time**, ending with the full solution.
- **Common mistakes** for every topic, with wrong code and the fix.
- **Difficulty** (Easy / Medium / Hard) and **time / space complexity** on Level 4.
- **Roadmap** (topics in learning order), **daily streak** and **badges**.
- Code editor with line numbers, auto brackets and a **Copy code** button; **light / dark theme**.
- **Backup:** download or load your progress as a file. Add your own questions.

## Run it on your computer
1. Install **JDK 17+** (e.g. Temurin from adoptium.net). Nothing else is needed.
2. In this folder run: `./run.sh` (Windows: `run.bat`). It compiles the backend and starts it.
3. Open http://localhost:3000

Optional: `mvn package` also works (see `pom.xml`), then `java -jar target/shikshak-java.jar`.
Settings: environment variables `PORT` (default 3000) and `PUBLIC_DIR` (default `public`).

## AI Tutor (optional)
The sidebar button **AI Tutor** has two tabs: **Ask a question** (basic Java answers) and **Review my code** (a point-by-point list of what is wrong, with line numbers and a corrected version).
It works with a **free** key from Google Gemini or Groq (no credit card needed), or a paid Claude key. Without a key the rest of the site works normally.

**Free key (Gemini, recommended):** open aistudio.google.com, sign in, click *Get API key*, and copy it.
**Free key (Groq):** open console.groq.com, create an account, then *API Keys*.

| Setting (environment variable) | Meaning | Default |
|---|---|---|
| `GEMINI_API_KEY` | Free Google Gemini key | none |
| `GROQ_API_KEY` | Free Groq key | none |
| `ANTHROPIC_API_KEY` | Paid Claude key | none |
| `AI_PROVIDER` | Force `gemini`, `groq` or `anthropic` (otherwise chosen from the key you set) | automatic |
| `AI_MODEL` | Model name. Change it if a provider retires a model | `gemini-2.5-flash` / `llama-3.3-70b-versatile` / `claude-haiku-5-5` |
| `AI_PER_MINUTE` | Questions per visitor per minute | 6 |
| `AI_DAILY_LIMIT` | Total AI questions per day for the whole site | 500 |

Never put a key in GitHub. Run locally: `GEMINI_API_KEY=your-key ./run.sh` (Windows: `set GEMINI_API_KEY=your-key`, then `run.bat`).

## Put it online
- **Lessons only (free, fast):** deploy the `public` folder to Vercel. Run and Practice checks need the backend, so they show a friendly message there.
- **With a working Run button:** deploy the whole folder to a host that runs Docker (e.g. Render). The `Dockerfile` builds the Java backend on a JDK image. The server has safety limits (blocked file/network/system code, 5 s time limit, 4 jobs at once, 30 runs per minute per visitor).

## Project layout
| Path | What it is |
|---|---|
| `src/main/java/shikshak/App.java` | Backend: web server, `/api/status`, `/api/run`, `/api/check`, safety limits |
| `src/main/java/shikshak/CodeRunner.java` | Compiles and runs student code in a separate JVM (time + memory limits) |
| `src/main/java/shikshak/Ai.java` | AI tutor: calls the Claude API, prompts, limits |
| `src/main/java/shikshak/Json.java` | Tiny JSON reader/writer (no libraries) |
| `public/questions1-5.js` | The 50 lessons (4 levels each) |
| `public/practice.js` | Generated practice tasks and tests |
| `public/meta.js`, `public/mistakes.js` | Difficulty / complexity and common mistakes |
| `public/app.js`, `style.css`, `index.html` | The interface |
| `tools/practice-spec.js` | Source of the practice tests (edit this, then rebuild) |

## Useful commands
- `npm test` (optional, needs Node) – compiles and runs all 200 lesson programs and the practice data.
- `npm run build-practice` (optional, needs Node) – regenerate `public/practice.js` after editing `tools/practice-spec.js`.

## Add a question
Easiest: use **+ Add my own question** in the app. To add a lesson to the project, copy a block from `public/questions5.js`, give it a new `id`, and add its entries to `meta.js` and `tools/practice-spec.js`.
