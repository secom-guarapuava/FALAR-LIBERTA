/* =========================================================
   FALAR TE LIBERTA — interações
   ========================================================= */
(function () {
  "use strict";
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));

  /* ---------- reveal on scroll (stagger) ---------- */
  const revealIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const el = e.target;
        const d = parseInt(el.dataset.revealDelay || "0", 10);
        el.style.transitionDelay = (d * 80) + "ms";
        el.classList.add("is-visible");
        revealIO.unobserve(el);
      }
    });
  }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
  $$(".reveal").forEach((el) => revealIO.observe(el));

  /* ---------- animated counters ---------- */
  function animateCount(el) {
    const target = parseFloat(el.dataset.count);
    const dec = parseInt(el.dataset.decimals || "0", 10);
    const dur = 1600;
    const start = performance.now();
    const fmt = (v) => v.toLocaleString("pt-BR", { minimumFractionDigits: dec, maximumFractionDigits: dec });
    if (reduce) { el.textContent = fmt(target); return; }
    function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(target * eased);
      if (p < 1) requestAnimationFrame(tick); else el.textContent = fmt(target);
    }
    requestAnimationFrame(tick);
  }
  const countIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { animateCount(e.target); countIO.unobserve(e.target); } });
  }, { threshold: 0.6 });
  $$("[data-count]").forEach((el) => countIO.observe(el));

  /* ---------- flow tabs (até / após 72h) ---------- */
  const tabs = $$(".flow-switch__btn");
  const paths = { ate: $("#path-ate"), apos: $("#path-apos") };
  function activatePath(key) {
    tabs.forEach((t) => {
      const on = t.dataset.path === key;
      t.classList.toggle("is-active", on);
      t.setAttribute("aria-selected", on ? "true" : "false");
    });
    Object.entries(paths).forEach(([k, panel]) => {
      const on = k === key;
      panel.hidden = !on;
      panel.classList.toggle("is-active", on);
    });
    const active = paths[key];
    if (active) { active.classList.remove("is-active"); void active.offsetWidth; active.classList.add("is-active"); }
  }
  tabs.forEach((t) => t.addEventListener("click", () => activatePath(t.dataset.path)));

  /* ---------- gestation branch (sim / não) ---------- */
  $$(".branch__btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.branch;
      const group = btn.closest(".flow__step--decision");
      $$(".branch__btn", group).forEach((b) => {
        const on = b === btn;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-expanded", on ? "true" : "false");
      });
      $$("[data-branch-panel]", group).forEach((p) => { p.hidden = p.dataset.branchPanel !== key; });
    });
  });

  /* ---------- topbar shadow on scroll ---------- */
  const topbar = $("#topbar");
  const onScrollBar = () => topbar.style.boxShadow = window.scrollY > 12 ? "0 14px 40px -24px rgba(0,0,0,.8)" : "none";
  onScrollBar();
  window.addEventListener("scroll", onScrollBar, { passive: true });

  /* ---------- quick exit (safety) ---------- */
  function quickExit() {
    try { window.location.replace("https://www.google.com"); }
    catch (e) { window.location.href = "https://www.google.com"; }
  }
  const exitBtn = $("#exitbtn");
  if (exitBtn) exitBtn.addEventListener("click", quickExit);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") quickExit(); });

  if (reduce) return; /* skip ambient motion */

  /* ---------- gentle float on key illustrations ---------- */
  function bob(el, dist, dur, rot) {
    const base = getComputedStyle(el).transform;
    const b = (base && base !== "none") ? base : "";
    el.animate([
      { transform: `${b} translateY(0) rotate(0deg)` },
      { transform: `${b} translateY(${-dist}px) rotate(${rot}deg)` },
      { transform: `${b} translateY(0) rotate(0deg)` }
    ], { duration: dur, iterations: Infinity, easing: "ease-in-out" });
  }
  const scene = $(".hero__scene"); if (scene) bob(scene, 16, 6000, 1.2);
  const mDeco = $(".manifesto__deco"); if (mDeco) bob(mDeco, 12, 5200, -2);
  const cArt = $(".campanha__art img"); if (cArt) bob(cArt, 10, 5600, 1);
  $$(".closing .deco--cl-bird1, .closing .deco--cl-bird2").forEach((b, i) => bob(b, 14, 5000 + i * 700, i ? -2 : 2));

  /* ---------- falling feathers over the hero illustration ---------- */
  const art = $(".hero__art");
  if (art) {
    const mk = () => {
      const s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      s.setAttribute("viewBox", "0 0 40 64"); s.setAttribute("class", "feather");
      s.innerHTML = "<path d='M20 2 C30 16 32 36 22 60 C20 50 18 50 16 60 C8 38 10 16 20 2 Z' fill='#3DB7EA' stroke='#0F0E11' stroke-width='2'/><path d='M20 10 L20 56' stroke='#0F0E11' stroke-width='1.4'/>";
      return s;
    };
    const N = 6;
    for (let i = 0; i < N; i++) {
      const f = mk();
      const size = 12 + Math.random() * 18;
      f.style.width = size + "px";
      art.appendChild(f);
      const x = Math.random() * 100, drift = (Math.random() - 0.5) * 80;
      const dur = 9000 + Math.random() * 8000, delay = -Math.random() * dur;
      const H = () => art.clientHeight + 100;
      f.animate([
        { transform: `translate(${x}%,-50px) rotate(0deg)`, opacity: 0 },
        { opacity: .8, offset: .1 },
        { opacity: .8, offset: .9 },
        { transform: `translate(calc(${x}% + ${drift}px), ${H()}px) rotate(${Math.random() > .5 ? 420 : -420}deg)`, opacity: 0 }
      ], { duration: dur, delay: delay, iterations: Infinity, easing: "linear" });
    }
  }
})();
