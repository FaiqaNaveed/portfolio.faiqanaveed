# Faiqa Naveed Ashraf — Portfolio

Personal portfolio website of **Faiqa Naveed Ashraf**, Sr. Software Quality Assurance Engineer & AI QA Specialist.

🔗 **Live site:** _(add your Vercel URL here after deploying)_
📦 **Repo:** https://github.com/FaiqaNaveed/portfolio.faiqanaveed

> "Quality is not an act, it's a habit."

---

## About

A fast, framework-free portfolio built with plain **HTML, CSS, and JavaScript** — no build step, no dependencies. Features an animated 3D background canvas, a typing role-rotator, animated stat counters, and a fully responsive layout.

### Sections
- **Hero** — intro, rotating role titles, animated stats
- **Tech Stack** — tools I test & automate with (marquee)
- **About** — interactive terminal card
- **Experience** — career timeline (KnowledgeCity, CodeJunkie, Nevron, Codility)
- **Skill Matrix** — testing, AI QA, automation, API/DB, DevOps
- **Process** — 4-stage quality pipeline
- **Projects** — selected work
- **Verified by LinkedIn** — skill assessments & endorsements
- **Testimonials** — words from colleagues
- **Contact** — email & LinkedIn

---

## Tech Stack

- HTML5 (semantic markup)
- CSS3 (custom properties, glassmorphism, responsive grid)
- Vanilla JavaScript (ES6+)
- HTML5 Canvas (3D animated background)
- Google Fonts (Sora, JetBrains Mono)

No frameworks. No build tools. Just open `index.html`.

---

## Project Structure

```
faiqa-portfolio/
├── index.html        # Main page markup
├── css/
│   └── style.css     # All styles
├── js/
│   ├── main.js       # Interactions (nav, counters, role rotator)
│   └── scene.js      # 3D background canvas
├── .gitignore
└── README.md
```

---

## Run Locally

No build needed. Either:

1. Double-click `index.html`, **or**
2. Serve it with any static server:

```powershell
# Python
python -m http.server 5500

# or Node
npx serve
```

Then open http://localhost:5500

---

## Deployment Notes (Git → GitHub → Vercel)

The exact steps used to publish this site.

### 1. Initialize & commit

```powershell
git init
git add .
git commit -m "Initial portfolio upload"
```

### 2. Connect to GitHub

```powershell
git branch -M main
git remote add origin https://github.com/FaiqaNaveed/portfolio.faiqanaveed.git
git remote -v          # verify remote is set
```

### 3. Set your Git identity (once per machine)

```powershell
git config --global user.name "FaiqaNaveed"
git config --global user.email "faiqanaveed000@gmail.com"
```

### 4. Push to GitHub

If the remote already has commits (e.g. a README created on GitHub), pull first:

```powershell
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### 5. Deploy on Vercel

1. Go to https://vercel.com and sign in **with GitHub**.
2. **Add New → Project** → import `portfolio.faiqanaveed`.
3. Framework Preset: **Other** (static site — no build/output settings needed).
4. Click **Deploy**.

Every future `git push` to `main` auto-redeploys the site.

### Updating the site later

```powershell
git add .
git commit -m "Describe your change"
git push
```

---

## Contact

- 📧 official.faiqanaveed@gmail.com
- 💼 https://linkedin.com/in/faiqanaveed

---

© 2026 Faiqa Naveed Ashraf — handcrafted, zero frameworks, 100% tested.
