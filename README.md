# Faiqa Naveed Ashraf — Portfolio v2

Premium dark portfolio with a custom zero-dependency 3D particle background
(hand-rolled perspective projection on `<canvas>` — no Three.js, no build step).

## Run locally

Just open `index.html` in any browser — no install, no server needed.

Optionally serve it (nicer for testing):

```powershell
cd D:\Portfolio\faiqa-portfolio
npx serve .        # or: python -m http.server 8080
```

## Stack & practices

- **Vanilla HTML/CSS/JS** — zero frameworks, zero dependencies, instant load
- **3D scene** (`js/scene.js`): torus-knot particle ribbon + starfield + constellation
  lines, real 3D rotation/projection, mouse parallax, depth fog & bloom
- **Accessibility**: skip link, semantic landmarks, `aria-live` role rotator,
  visible focus rings, `prefers-reduced-motion` honored (static composed frame),
  AA contrast on text
- **Performance**: DPR-capped canvas, paused on hidden tab, IntersectionObserver
  reveals, system-font fallbacks, no layout thrash
- **SEO**: meta description + OpenGraph tags

## Structure

```
index.html        — single-page: hero / about / experience / skills / projects / contact
css/style.css     — design system (CSS custom properties), glassmorphism, responsive
js/scene.js       — 3D background engine
js/main.js        — typewriter rotator, counters, scroll-reveal, mobile nav
```

## Deploy

Static — drop the folder on any host (Netlify, Vercel, GitHub Pages, cPanel).
