# Shikshak Java ☕

A small web app that teaches Java **step by step before you start DSA**.
50 practice questions, each taught in 4 levels, with a built-in code runner and an automatic answer checker.

## Features
- **4 levels per question:** Basics first → Simple solution → Using methods → Advanced (recursion and smarter ideas).
- **Run button:** edit the code and run it with your own JDK (Node.js backend, no npm packages).
- **Practice with auto-check:** write the solution yourself and it is tested on several inputs (sample + hidden tests). Wrong answers show expected vs your output.
- **Hints, one at a time**, ending with the full solution.
- **Common mistakes** for every topic, with wrong code and the fix.
- **Difficulty** (Easy / Medium / Hard) and **time / space complexity** on Level 4.
- **Roadmap** (topics in learning order), **daily streak** and **badges**.
- Code editor with line numbers, auto brackets and a **Copy code** button; **light / dark theme**.
- **Backup:** download or load your progress as a file. Add your own questions.

## Run it on your computer
1. Install **Node.js** (LTS) and **JDK 17+** (e.g. Temurin from adoptium.net).
2. In this folder run: `npm start`
3. Open http://localhost:3000

## Put it online
- **Lessons only (free, fast):** deploy the `public` folder to Vercel. Run and Practice checks need the backend, so they show a friendly message there.
- **With a working Run button:** deploy the whole folder to a host that runs Docker (e.g. Render). The `Dockerfile` installs Node and the JDK. The server has safety limits (blocked file/network/system code, 5 s time limit, 4 jobs at once, 30 runs per minute per visitor).

## Project layout
| Path | What it is |
|---|---|
| `server.js` | Backend: serves the app, `/api/run`, `/api/check` |
| `public/questions1-5.js` | The 50 lessons (4 levels each) |
| `public/practice.js` | Generated practice tasks and tests |
| `public/meta.js`, `public/mistakes.js` | Difficulty / complexity and common mistakes |
| `public/app.js`, `style.css`, `index.html` | The interface |
| `tools/practice-spec.js` | Source of the practice tests (edit this, then rebuild) |

## Useful commands
- `npm test` – compiles and runs all 200 lesson programs and the practice data.
- `npm run build-practice` – regenerate `public/practice.js` after editing `tools/practice-spec.js`.

## Add a question
Easiest: use **+ Add my own question** in the app. To add a lesson to the project, copy a block from `public/questions5.js`, give it a new `id`, and add its entries to `meta.js` and `tools/practice-spec.js`.
