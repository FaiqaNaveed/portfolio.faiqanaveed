/* ============================================================
   UI interactions: role rotator, counters, scroll-reveal, nav.
   ============================================================ */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- typewriter role rotator ---------- */
  var roles = [
    "Sr. SQA Engineer",
    "AI QA Specialist",
    "QA Lead",
    "Automation Engineer",
    "Project Manager"
  ];
  var rotator = document.getElementById("role-rotator");
  if (rotator && !reduceMotion) {
    var ri = 0, ci = roles[0].length, deleting = true;
    setTimeout(function tick() {
      var word = roles[ri];
      if (deleting) {
        ci--;
        if (ci <= 0) { deleting = false; ri = (ri + 1) % roles.length; }
      } else {
        ci++;
        if (ci >= roles[ri].length) {
          deleting = true;
          rotator.textContent = roles[ri];
          setTimeout(tick, 2100);
          return;
        }
      }
      rotator.textContent = (deleting ? word : roles[ri]).slice(0, Math.max(ci, 0));
      setTimeout(tick, deleting ? 38 : 64);
    }, 1800);
  }

  /* ---------- animated counters ---------- */
  var counters = document.querySelectorAll(".hero-stats dt[data-count]");
  function animateCounter(el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    if (reduceMotion) { el.firstChild.nodeValue = target; styleSuffix(el); return; }
    var start = null, dur = 1500;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.firstChild.nodeValue = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(step);
      else styleSuffix(el);
    }
    requestAnimationFrame(step);
  }
  function styleSuffix(el) {
    // reveal the +/% pseudo-suffix once the count lands
    el.style.setProperty("--done", 1);
    el.classList.add("counted");
  }
  // CSS shows suffix when .counted present
  var style = document.createElement("style");
  style.textContent = ".hero-stats dt.counted::after{opacity:1;transition:opacity .4s}";
  document.head.appendChild(style);

  var countersFired = false;
  var heroStats = document.querySelector(".hero-stats");
  if (heroStats) {
    new IntersectionObserver(function (entries, obs) {
      if (entries[0].isIntersecting && !countersFired) {
        countersFired = true;
        counters.forEach(animateCounter);
        obs.disconnect();
      }
    }, { threshold: 0.4 }).observe(heroStats);
  }

  /* ---------- scroll reveal ---------- */
  var revealables = document.querySelectorAll(
    ".timeline-item, .skill-card, .project-card, .terminal, .info-card, .contact-card, .pipe-stage, .verify-card, .endorse, .testi-card"
  );
  revealables.forEach(function (el, i) {
    el.classList.add("reveal");
    el.style.transitionDelay = (i % 6) * 60 + "ms";
  });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  revealables.forEach(function (el) { io.observe(el); });

  /* ---------- mobile nav ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("nav-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    menu.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- tech marquee: clone track for seamless loop ---------- */
  var tracks = document.querySelectorAll(".marquee-track");
  if (tracks.length === 2 && tracks[1].children.length === 0) {
    tracks[1].innerHTML = tracks[0].innerHTML;
  }

  /* ---------- footer year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
