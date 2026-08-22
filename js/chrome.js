window.BA = window.BA || {};
window.BA.games = window.BA.games || {};
window.BA.root = document.body.dataset.root || ".";

window.BA.el = function (tag, cls, text) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null) n.textContent = text;
  return n;
};

window.BA.header = function () {
  const r = window.BA.root;
  return `
  <header class="site-header">
    <div class="wrap header-inner">
      <a class="brand" href="${r}/index.html"><img class="brand-wordmark" src="${r}/img/logo.svg?v=3" alt="SolitaireFelt" width="208" height="42" /></a>
      <button class="nav-toggle" type="button" aria-label="Open menu">Menu</button>
      <nav class="primary">
        <a href="${r}/games/klondike-solitaire/index.html" data-nav="klondike">Solitaire</a>
        <a href="${r}/games/spider-solitaire/index.html" data-nav="spider">Spider</a>
        <a href="${r}/games/freecell/index.html" data-nav="freecell">FreeCell</a>
        <a href="${r}/games/pyramid-solitaire/index.html" data-nav="pyramid">Pyramid</a>
        <a href="${r}/games/tripeaks-solitaire/index.html" data-nav="tripeaks">TriPeaks</a>
        <a href="${r}/games/mahjong-solitaire/index.html" data-nav="mahjong">Mahjong</a>
        <a href="${r}/games/sudoku-easy/index.html" data-nav="sudoku">Sudoku</a>
        <a href="${r}/index.html" data-nav="all">All games</a>
      </nav>
      <form class="search" action="${r}/index.html" method="get">
        <input name="q" type="search" placeholder="Search games" aria-label="Search games" autocomplete="off" />
      </form>
    </div>
  </header>`;
};

window.BA.footer = function () {
  const r = window.BA.root;
  const tagline = (window.BA.SITE && window.BA.SITE.tagline) || "Free solitaire, mahjong & daily puzzles on the green felt.";
  return `
  <footer class="site-footer">
    <div class="wrap footer-grid">
      <div>
        <strong class="brand-text">Solitaire<span class="brand-accent">Felt</span></strong>
        <p>${tagline}</p>
      </div>
      <div>
        <strong>Play</strong><br>
        <a href="${r}/games/klondike-solitaire/index.html">Klondike</a><br>
        <a href="${r}/games/spider-solitaire/index.html">Spider</a><br>
        <a href="${r}/games/mahjong-solitaire/index.html">Mahjong</a><br>
        <a href="${r}/games/sudoku-easy/index.html">Sudoku</a>
      </div>
      <div>
        <strong>Collections</strong><br>
        <a href="${r}/categories/solitaire.html">Solitaire</a><br>
        <a href="${r}/categories/words.html">Word games</a><br>
        <a href="${r}/categories/board.html">Board games</a><br>
        <a href="${r}/categories/puzzles.html">Puzzles</a>
      </div>
      <div>
        <strong>Site</strong><br>
        <a href="${r}/about.html">About</a><br>
        <a href="${r}/contact.html">Contact</a><br>
        <a href="${r}/privacy.html">Privacy</a><br>
        <a href="${r}/terms.html">Terms</a>
      </div>
    </div>
  </footer>`;
};

window.BA.mountChrome = function () {
  const h = document.getElementById("site-header");
  const f = document.getElementById("site-footer");
  if (h) h.outerHTML = window.BA.header();
  if (f) f.outerHTML = window.BA.footer();

  const path = location.pathname.replace(/\\/g, "/");
  document.querySelectorAll("nav.primary a[data-nav]").forEach((a) => {
    const key = a.dataset.nav;
    const map = {
      klondike: /klondike/,
      spider: /spider-solitaire/,
      freecell: /freecell/,
      pyramid: /pyramid-solitaire/,
      tripeaks: /tripeaks/,
      mahjong: /mahjong/,
      sudoku: /sudoku/,
      all: /index\.html$|\/$|solitairefelt\/?$/
    };
    if (key === "all") {
      if (!path.includes("/games/") && !path.includes("/categories/") && /index\.html$|\/$/.test(path)) a.classList.add("active");
      return;
    }
    if (map[key] && map[key].test(path)) a.classList.add("active");
  });

  const toggle = document.querySelector(".nav-toggle");
  const header = document.querySelector(".site-header");
  if (toggle && header) {
    toggle.addEventListener("click", () => {
      const open = header.classList.toggle("open");
      toggle.textContent = open ? "Close" : "Menu";
    });
  }
};

window.BA.score = {
  get(id) {
    try { return JSON.parse(localStorage.getItem("ba-" + id) || "null"); } catch (e) { return null; }
  },
  set(id, data) { localStorage.setItem("ba-" + id, JSON.stringify(data)); }
};

window.BA.mulberry = function (seed) {
  let s = seed | 0;
  return function () {
    s = (s + 0x6D2B79F5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

window.BA.todaySeed = function () {
  const d = new Date();
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
};

document.addEventListener("DOMContentLoaded", () => window.BA.mountChrome());
