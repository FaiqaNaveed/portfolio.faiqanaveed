/* ============================================================
   3D background — "data horizon" (professional, calm).
   Zero dependencies: hand-rolled 3D math on a 2D canvas.
   Layers:
     1. Soft aurora glows (very slow drift)
     2. Starfield depth dust (slow drift)
     3. Perspective dot-grid floor, gently breathing
   Honors prefers-reduced-motion; pauses on hidden tab.
   ============================================================ */
(function () {
  "use strict";

  var canvas = document.getElementById("scene");
  if (!canvas) return;
  var ctx = canvas.getContext("2d");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var W, H, DPR, CX, CY;
  var FOV = 420;
  var mouse = { x: 0, y: 0, tx: 0, ty: 0 };

  var TEAL = [94, 234, 212];
  var INDIGO = [129, 140, 248];

  function lerpColor(a, b, t) {
    return [
      Math.round(a[0] + (b[0] - a[0]) * t),
      Math.round(a[1] + (b[1] - a[1]) * t),
      Math.round(a[2] + (b[2] - a[2]) * t)
    ];
  }
  function rgba(c, a) { return "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + a + ")"; }

  /* ---------- starfield ---------- */
  var dust = [];
  function buildDust() {
    dust.length = 0;
    var n = Math.min(160, Math.floor((W * H) / 12000));
    for (var i = 0; i < n; i++) {
      dust.push({
        x: (Math.random() - 0.5) * W * 2.2,
        y: (Math.random() - 0.5) * H * 1.6,
        z: Math.random() * 1400 + 150,
        s: Math.random() * 1.3 + 0.4,
        v: Math.random() * 0.08 + 0.015,
        tw: Math.random() * Math.PI * 2
      });
    }
  }

  /* ---------- dot-grid floor ---------- */
  var COLS = 54, ROWS = 26;
  var GRID_W = 2600, GRID_D = 2200;

  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = W * DPR; canvas.height = H * DPR;
    canvas.style.width = W + "px"; canvas.style.height = H + "px";
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    CX = W / 2; CY = H / 2;
    buildDust();
  }

  var T = 0;
  var running = true;

  function frame() {
    if (!running) return;
    T += reduceMotion ? 0 : 1;

    mouse.x += (mouse.tx - mouse.x) * 0.03;
    mouse.y += (mouse.ty - mouse.y) * 0.03;

    /* base wash */
    ctx.clearRect(0, 0, W, H);
    var g = ctx.createRadialGradient(CX, CY * 0.7, 80, CX, CY, Math.max(W, H));
    g.addColorStop(0, "rgba(13, 18, 38, 0.9)");
    g.addColorStop(0.6, "rgba(7, 10, 20, 0.95)");
    g.addColorStop(1, "rgba(4, 6, 12, 1)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    /* layer 1: aurora glows — barely-moving, very dim */
    var a1x = CX + Math.sin(T * 0.0011) * W * 0.18;
    var a2x = CX - Math.cos(T * 0.0009) * W * 0.22;
    var glow1 = ctx.createRadialGradient(a1x, H * 0.22, 0, a1x, H * 0.22, W * 0.5);
    glow1.addColorStop(0, "rgba(129, 140, 248, 0.075)");
    glow1.addColorStop(1, "rgba(129, 140, 248, 0)");
    ctx.fillStyle = glow1;
    ctx.fillRect(0, 0, W, H);
    var glow2 = ctx.createRadialGradient(a2x, H * 0.78, 0, a2x, H * 0.78, W * 0.55);
    glow2.addColorStop(0, "rgba(94, 234, 212, 0.05)");
    glow2.addColorStop(1, "rgba(94, 234, 212, 0)");
    ctx.fillStyle = glow2;
    ctx.fillRect(0, 0, W, H);

    /* layer 2: starfield with slow twinkle */
    for (var i = 0; i < dust.length; i++) {
      var d = dust[i];
      d.z -= d.v;
      if (d.z < 120) d.z = 1500;
      var f = FOV / d.z;
      var x = CX + d.x * f + mouse.x * (320 / d.z);
      var y = CY * 0.85 + d.y * f + mouse.y * (320 / d.z);
      if (x < -10 || x > W + 10 || y < -10 || y > H + 10) continue;
      var tw = 0.6 + Math.sin(T * 0.015 + d.tw) * 0.4;
      var a = Math.min(0.5, (1500 - d.z) / 1500) * 0.5 * tw;
      ctx.fillStyle = rgba(INDIGO, a);
      ctx.fillRect(x, y, d.s * f * 2, d.s * f * 2);
    }

    /* layer 3: perspective dot-grid floor */
    var camY = 330;          /* camera height above floor */
    var horizonY = CY * 1.02;
    for (var r = 0; r < ROWS; r++) {
      var zRow = 160 + (r / (ROWS - 1)) * GRID_D;
      /* gentle breathing wave — slow, small amplitude */
      for (var c = 0; c <= COLS; c++) {
        var gx = (c / COLS - 0.5) * GRID_W;
        var wave =
          Math.sin(gx * 0.0035 + T * 0.008) * 26 +
          Math.cos(zRow * 0.0028 - T * 0.006) * 22;
        var gy = camY + wave;
        var f2 = FOV / zRow;
        var sx = CX + gx * f2 + mouse.x * (260 / zRow);
        var sy = horizonY + gy * f2 + mouse.y * (200 / zRow);
        if (sx < -8 || sx > W + 8 || sy < -8 || sy > H + 8) continue;

        var depth = 1 - r / (ROWS - 1);              /* 1 = nearest row */
        var col = lerpColor(INDIGO, TEAL, depth * 0.8);
        var alpha = 0.05 + depth * 0.38;
        /* soften wave crests with a touch more light */
        alpha += Math.max(0, -wave) * 0.0012;
        var size = Math.max(0.5, 2.1 * f2 * 2.4);
        ctx.fillStyle = rgba(col, alpha);
        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    /* horizon line glow */
    var hg = ctx.createLinearGradient(0, horizonY + 30, 0, horizonY + 120);
    hg.addColorStop(0, "rgba(94, 234, 212, 0.06)");
    hg.addColorStop(1, "rgba(94, 234, 212, 0)");
    ctx.fillStyle = hg;
    ctx.fillRect(0, horizonY + 30, W, 90);

    if (!reduceMotion) requestAnimationFrame(frame);
  }

  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", function (e) {
    mouse.tx = (e.clientX / W - 0.5) * 16;
    mouse.ty = (e.clientY / H - 0.5) * 10;
  }, { passive: true });
  document.addEventListener("visibilitychange", function () {
    running = !document.hidden;
    if (running && !reduceMotion) requestAnimationFrame(frame);
  });

  resize();
  if (reduceMotion) { T = 200; frame(); }
  else requestAnimationFrame(frame);
})();
