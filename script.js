(() => {
  "use strict";

  // ---------- Helpers ----------
  const $ = (id) => document.getElementById(id);
  const rand = (min, max) => Math.random() * (max - min) + min;

  const screens = {
    intro: $("intro"),
    apology: $("apology"),
    itinerary: $("itinerary"),
  };

  function showScreen(name) {
    Object.entries(screens).forEach(([key, el]) => {
      el.classList.toggle("hidden", key !== name);
    });
  }

  // ---------- Floating hearts background ----------
  const heartsCanvas = $("heartsCanvas");
  const ctx = heartsCanvas.getContext("2d");
  const DPR = Math.min(window.devicePixelRatio || 1, 2);
  let W = 0, H = 0;
  const hearts = [];

  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    heartsCanvas.width = W * DPR;
    heartsCanvas.height = H * DPR;
    heartsCanvas.style.width = W + "px";
    heartsCanvas.style.height = H + "px";
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }

  function drawHeart(x, y, size, opacity, color, rot) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, size * 0.3);
    ctx.bezierCurveTo(size * 0.5, -size * 0.3, size * 1.2, size * 0.3, 0, size * 1.1);
    ctx.bezierCurveTo(-size * 1.2, size * 0.3, -size * 0.5, -size * 0.3, 0, size * 0.3);
    ctx.fill();
    ctx.restore();
  }

  function spawnHeart() {
    const colors = ["#ff4d8d", "#ff8fb5", "#d6336c", "#ffb3c9", "#ff5fa2"];
    hearts.push({
      x: rand(0, W),
      y: H + 30,
      size: rand(8, 26),
      speedY: rand(0.6, 1.8),
      sway: rand(10, 40),
      swaySpeed: rand(0.005, 0.02),
      phase: rand(0, Math.PI * 2),
      opacity: rand(0.2, 0.6),
      color: colors[Math.floor(rand(0, colors.length))],
      rot: rand(-0.4, 0.4),
    });
    if (hearts.length > 60) hearts.shift();
  }

  function animateHearts() {
    ctx.clearRect(0, 0, W, H);
    hearts.forEach((h, i) => {
      h.y -= h.speedY;
      h.phase += h.swaySpeed;
      h.x += Math.sin(h.phase) * 0.6;
      h.rot += 0.002;
      drawHeart(h.x, h.y, h.size, h.opacity, h.color, h.rot);
      if (h.y < -40) hearts.splice(i, 1);
    });
    requestAnimationFrame(animateHearts);
  }

  // ---------- Falling flower petals ----------
  const petalsCanvas = $("petalsCanvas");
  const pctx = petalsCanvas.getContext("2d");
  const petals = [];
  const petalEmojis = ["🌸", "🩷", "💖", "🌷", "💗"];

  function resizePetals() {
    petalsCanvas.width = W * DPR;
    petalsCanvas.height = H * DPR;
    petalsCanvas.style.width = W + "px";
    petalsCanvas.style.height = H + "px";
    pctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }

  function spawnPetal() {
    petals.push({
      x: rand(0, W),
      y: rand(-H, 0),
      emoji: petalEmojis[Math.floor(rand(0, petalEmojis.length))],
      size: rand(12, 26),
      speedY: rand(0.4, 1.2),
      drift: rand(0.3, 1),
      rot: rand(0, Math.PI * 2),
      rotSpeed: rand(0.01, 0.04),
      opacity: rand(0.35, 0.8),
    });
    if (petals.length > 28) petals.shift();
  }

  function animatePetals() {
    pctx.clearRect(0, 0, W, H);
    petals.forEach((p, i) => {
      p.y += p.speedY;
      p.x += Math.sin(p.y * 0.02) * p.drift;
      p.rot += p.rotSpeed;
      pctx.save();
      pctx.translate(p.x, p.y);
      pctx.rotate(p.rot);
      pctx.globalAlpha = p.opacity;
      pctx.font = p.size + "px sans-serif";
      pctx.textAlign = "center";
      pctx.fillText(p.emoji, 0, 0);
      pctx.restore();
      if (p.y > H + 30) petals.splice(i, 1);
    });
    requestAnimationFrame(animatePetals);
  }

  // ---------- Celebration confetti (burst of hearts + emojis) ----------
  let burst = [];
  function bigBurst() {
    for (let i = 0; i < 90; i++) {
      hearts.push({
        x: W / 2,
        y: H / 2,
        size: rand(10, 30),
        speedY: rand(2, 6),
        sway: rand(15, 60),
        swaySpeed: rand(0.01, 0.04),
        phase: rand(0, Math.PI * 2),
        opacity: rand(0.6, 1),
        color: ["#ff4d8d", "#ff8fb5", "#d6336c", "#ffb3c9", "#ffffff"][Math.floor(rand(0, 5))],
        rot: rand(-0.6, 0.6),
      });
    }
    burst = Array.from({ length: 40 }, () => ({
      x: rand(0, W),
      y: -20,
      emoji: ["🎉", "💖", "🌸", "🎊", "🩷", "💗"][Math.floor(rand(0, 6))],
      size: rand(20, 38),
      speedY: rand(1.5, 3.5),
      drift: rand(0.3, 1),
      rot: rand(0, Math.PI * 2),
      rotSpeed: rand(0.02, 0.06),
      opacity: 1,
    }));
  }

  function animateBurst() {
    burst.forEach((b, i) => {
      b.y += b.speedY;
      b.x += Math.sin(b.y * 0.02) * b.drift;
      b.rot += b.rotSpeed;
      pctx.save();
      pctx.translate(b.x, b.y);
      pctx.rotate(b.rot);
      pctx.globalAlpha = b.opacity;
      pctx.font = b.size + "px sans-serif";
      pctx.textAlign = "center";
      pctx.fillText(b.emoji, 0, 0);
      pctx.restore();
      if (b.y > H + 40) burst.splice(i, 1);
    });
    if (burst.length) requestAnimationFrame(animateBurst);
  }

  // ---------- "Wrong option" loop on Yes ----------
  const wrongMsg = $("wrongMsg");
  const WRONG_PHRASES = [
    "Wrong option! 🙈 Try again, baccha…",
    "Wrong button, wrong button! 🚨 The correct answer is the pink one 😌",
    "Uh oh… that one makes my heart cry 😢 Wrong option!",
    "Nope! Wrong option 🙅‍♀️ My baccha is definitely NOT angry 🥺",
    "The universe said: wrong option 💫 try again, sweetheart",
  ];
  let yesCount = 0;

  $("angryYes").addEventListener("click", () => {
    yesCount++;
    wrongMsg.textContent = WRONG_PHRASES[yesCount % WRONG_PHRASES.length];
    wrongMsg.classList.remove("hidden");
    wrongMsg.style.animation = "none";
    void wrongMsg.offsetWidth;
    wrongMsg.style.animation = "shake 0.5s ease";
  });

  $("angryNo").addEventListener("click", () => {
    yesCount = 0;
    wrongMsg.classList.add("hidden");
    showScreen("apology");
    setTimeout(typeApology, 400);
  });

  // ---------- Typewriter apology ----------
  const APOLOGY_TEXT =
    "I am so, so sorry for hurting you, mera baccha. 💔\n" +
    "I never ever want to hurt you — and I'm so sorry\n" +
    "i would never make ese jokes mera baccha please forgive me jaan and be my baccha.\n\n" +
    "You mean the whole world to me jaan, and seeing you sad\n" +
    "breaks my heart more than anything.\n\n" +
    "Please forgive me, my love. 🙏💗";

  function typeApology() {
    const el = $("apologyText");
    const btn = $("planBtn");
    el.textContent = "";
    btn.classList.add("hidden");
    let i = 0;
    const cursor = document.createElement("span");
    cursor.className = "cursor";
    el.appendChild(cursor);

    const timer = setInterval(() => {
      if (i < APOLOGY_TEXT.length) {
        cursor.insertAdjacentText("beforebegin", APOLOGY_TEXT[i]);
        i++;
        el.scrollTop = el.scrollHeight;
      } else {
        clearInterval(timer);
        setTimeout(() => {
          cursor.remove();
          btn.classList.remove("hidden");
          btn.classList.add("reveal-btn");
        }, 300);
      }
    }, 30);
  }

  // ---------- Itinerary ----------
  $("planBtn").addEventListener("click", () => {
    showScreen("itinerary");
    bigBurst();
    requestAnimationFrame(animateBurst);
  });

  // ---------- Restart ----------
  $("restartBtn").addEventListener("click", () => {
    wrongMsg.classList.add("hidden");
    wrongMsg.textContent = "";
    $("planBtn").classList.add("hidden");
    showScreen("intro");
  });

  // ---------- Init ----------
  resize();
  resizePetals();
  window.addEventListener("resize", () => {
    resize();
    resizePetals();
  });

  for (let i = 0; i < 30; i++) spawnHeart();
  for (let i = 0; i < 14; i++) spawnPetal();
  requestAnimationFrame(animateHearts);
  requestAnimationFrame(animatePetals);
  setInterval(spawnHeart, 600);
  setInterval(spawnPetal, 1100);
})();
