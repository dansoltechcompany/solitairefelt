import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { GAMES, CATEGORIES, SITE } from "./js/catalog.mjs";
import { GAME_CONTENT } from "./js/game-content.mjs";
import { thumbSvg, heroFanSvg } from "./js/thumbs.mjs";

const root = path.dirname(fileURLToPath(import.meta.url));
const out = (...p) => path.join(root, ...p);

function article(g) {
  const custom = GAME_CONTENT[g.id];
  if (custom) return renderRichArticle(g, custom);
  return renderFallbackArticle(g);
}

function renderRichArticle(g, c) {
  let html = c.intro.map((p) => `<p>${p}</p>`).join("\n");
  html += `<h2>How to play ${esc(g.title)}</h2>\n`;
  if (Array.isArray(c.rules)) {
    html += `<ul>${c.rules.map((r) => `<li>${r}</li>`).join("")}</ul>\n`;
  } else {
    html += `<p>${c.rules}</p>\n`;
  }
  html += `<h2>Strategy tips</h2>\n<ul>${c.tips.map((t) => `<li>${t}</li>`).join("")}</ul>\n`;
  if (c.faq && c.faq.length) {
    html += `<h2>Common questions</h2>\n`;
    for (const { q, a } of c.faq) {
      html += `<h3>${esc(q)}</h3>\n<p>${a}</p>\n`;
    }
  }
  return html;
}

function renderFallbackArticle(g) {
  return `
<p>${esc(g.short)} Play in your browser on ${SITE.name} — no download or account.</p>
<h2>How to play ${esc(g.title)}</h2>
<p>${rules(g)}</p>
<h2>Strategy tips</h2>
<p>${tips(g)}</p>`;
}

function relatedFor(g) {
  const ids = GAME_CONTENT[g.id]?.related;
  if (ids) {
    return ids.map((id) => GAMES.find((x) => x.id === id)).filter(Boolean);
  }
  return GAMES.filter((x) => x.category === g.category && x.id !== g.id).slice(0, 6);
}

function pageDesc(g) {
  return GAME_CONTENT[g.id]?.metaDesc || `${g.short} Play ${g.title} in your browser — no download.`;
}

function rules(g) {
  const v = (g.config && g.config.variant) || g.engine;
  const map = {
    klondike: "Deal seven tableau piles. Flip the stock " + (g.config.draw === 3 ? "three cards at a time" : "one card at a time") + ". Build tableau down by alternating colors. Foundations build ace through king in the same suit. Empty columns take a king. Double-click a card to send it home when it fits.",
    spider: "Spider uses ten columns and " + g.config.suits + " suit" + (g.config.suits > 1 ? "s" : "") + ". Build down regardless of suit; you may only move a run that is in-suit. Completing king through ace in one suit removes it. You cannot deal from the stock while a column is empty.",
    freecell: "All cards start face up in eight columns. Four free cells hold one card each. Foundations build by suit from ace. You can move a packed descending alternating run only if you have enough empty cells and columns as buffers.",
    pyramid: "Pairs of available cards that sum to 13 disappear. Kings clear alone. A card is free when no card covers it. Use the stock when the pyramid stalls.",
    tripeaks: "Play any exposed card that is one rank higher or lower than the waste. Aces sit next to kings. Clear all three peaks to win.",
    yukon: "Build down by alternating color like Klondike, but you may pick up a card and everything on it even if that stack is disordered. Empty piles still want kings.",
    golf: "Each tableau card that is one rank from the waste can be played. There is no wrapping from king to ace. Flip the stock when you are stuck. Fewer leftover cards is a better score.",
    canfield: "A thirteen-card reserve feeds the tableau. Foundations start at a random rank and wrap. Tableau builds down in alternating colors. Stock draws three.",
    scorpion: "Build down by suit. You may move any face-up card together with the cards covering it. Three leftover cards deal onto the first three columns.",
    fortythieves: "Two full decks, ten tableau columns. Build down in the same suit. Eight foundations take ace through king in suit — two per suit. Empty columns accept any card.",
    bakersdozen: "Thirteen columns of four cards each; kings are moved to the front of their piles at deal. Build down regardless of suit. Only one card moves at a time. Foundations build ace through king in suit.",
    spiderette: "A one-deck Spider on seven columns. Build down regardless of suit; in-suit runs move together. Four king-through-ace runs in one suit clear the board.",
    turtle: "Match two identical free tiles. A tile is free when nothing sits on it and at least one long side is open. Clear the turtle to win.",
    dragon: "Match free identical tiles on a long dragon spine. The high center peak locks tiles underneath — peel from the tail and head first.",
    bridge: "A flat bridge span with a open center seam. Match from the ends inward; do not strand a pair on the wrong plateau.",
    aztec: "Stepped aztec pyramid. Outer steps free first; the sun stone at the peak is last.",
    fortress: "Same matching rules as mahjong solitaire on a taller fortress layout. Corners open last — do not spend both of a pair early.",
    mjpyramid: "Mahjong matching on a triangular stack. Outer tiles free first; the peak is last.",
    mjspider: "Two mahjong plateaus share a seam. Keep one of each pair until you see which plateau needs it."
  };
  if (g.engine === "solitaire") {
    const r = map[g.config.variant];
    if (g.config.daily) return r + " Today's deal uses the calendar date as the shuffle seed — everyone gets the same layout.";
    return r;
  }
  if (g.engine === "mahjong") {
    const layoutKey = { pyramid: "mjpyramid", spider: "mjspider" }[g.config.layout] || g.config.layout;
    const r = map[layoutKey] || map.turtle;
    if (g.config.daily) return r + " Today's tile arrangement is seeded by the date.";
    return r;
  }
  if (g.engine === "sudoku") return g.config.size === 6
    ? "Fill 1–6 so each row, column, and 2×3 block is unique. Given digits are locked."
    : "Fill 1–9 so each row, column, and 3×3 box is unique. Given gold digits cannot be changed. Daily Sudoku uses today's date as the shuffle seed so everyone sharing the calendar day gets the same grid.";
  if (g.engine === "mines") return "Click to open a cell. Numbers count adjacent mines. Flag suspects. The first click is always safe. Intermediate is 16×16 with 40 mines; expert is 30×16 with 99.";
  if (g.engine === "merge") return "Swipe or use arrow keys. Equal tiles fuse into the next value. After every move a new 2 or 4 appears. Reach the gold 2048 tile, then keep going.";
  if (g.engine === "penta") return "Type a five-letter guess. Green is correct place, brass is wrong place, dim means the letter is out. Six tries. The daily word is seeded by the date.";
  if (g.engine === "wordsearch") return "Drag across letters to highlight a listed word. Words run in eight directions. Find them all to finish.";
  if (g.engine === "hangman") return "Guess letters. Each miss draws more of the gallows. Reveal the word before the drawing completes.";
  if (g.engine === "anagrams") return "The board shows a scrambled set of letters. Type words of three or more letters that use those letters at most as often as they appear.";
  if (g.engine === "typing") return "You have sixty seconds. Type the shown passage. WPM uses five characters as a word. Accuracy is correct characters over typed characters.";
  if (g.engine === "crossword") return "Click a square and type. Numbers match the clue list. Letters check as you go; finish when the grid is filled correctly.";
  if (g.engine === "chess") return "White moves first. Click a piece, then a legal square. The computer answers with a short search. Checkmate or resignation ends the game.";
  if (g.engine === "checkers") return "Dark squares only. Men move forward diagonally; captures jump. Kings fly both directions. Captures are required when available.";
  if (g.engine === "connect4") return "Players drop on a seven-column, six-row grid. Four of your color in a line wins. The CPU plays red.";
  if (g.engine === "reversi") return "Place a disc so it traps opponent discs in a straight line, then flip them. The player with more discs at the end wins.";
  if (g.engine === "mancala") return "Pick a pit on your side; sow stones counterclockwise. Landing in your store earns an extra turn. Captures happen when you land in your empty pit opposite stones.";
  if (g.engine === "battleship") return "The computer hides a fleet. Fire on the ten-by-ten grid. Hits mark red, misses mark pale. Sink every ship.";
  if (g.engine === "gomoku") return "Place stones on intersections. Five in a row, any direction, wins. The CPU plays a heuristic mix of attack and block.";
  if (g.engine === "tictactoe") return "Place X on the 3×3. Three in a row wins. The CPU plays O and will not fall for the easy forks.";
  if (g.engine === "killer") return "Fill 1–9 so each row, column, and 3×3 box is unique. Dotted cages show a sum; digits in a cage cannot repeat and must add to that clue. No given digits — the cage sums are the puzzle.";
  if (g.engine === "kakuro") {
    const r = "Fill white cells with 1–9 so each horizontal or vertical run matches its clue sum. Digits cannot repeat within a run.";
    if (g.config.daily) return r + " Today's grid is picked from the calendar date.";
    return r;
  }
  if (g.engine === "backgammon") return "Roll two dice, then move your checkers toward home. Hit lone opponent blots to send them to the bar. Bear off all fifteen checkers before the computer.";
  if (g.engine === "ginrummy") return "Draw from stock or take the discard. Form sets of rank or runs in suit. When your deadwood is ten or less, knock. The CPU plays a simple meld-and-discard game.";
  if (g.engine === "memory") return "Flip two cards. A match stays up. Clear the table in as few moves as you can.";
  if (g.engine === "simon") return "Watch the sequence of colored pads, then repeat it. Each round adds one step.";
  if (g.engine === "slider") return "Click a tile beside the hole to slide it. Restore 1–15 in reading order.";
  if (g.engine === "peg") return "Jump a peg over a neighbor into an empty hole, removing the jumped peg. English cross board. Aim for a single peg in the center.";
  if (g.engine === "match3") return "Swap two neighbors. Lines of three or more clear and gravity fills from above. Combos raise the score.";
  if (g.engine === "jigsaw") return "Drag pieces onto the board. They snap when close to the true slot. The picture is generated, not a stock photo.";
  if (g.engine === "nonogram") return "Numbers are runs of filled cells. Mark empties with a right-click or the X toggle. Complete the picture.";
  if (g.engine === "rush") return "Slide cars along their tracks. Get the brass car out the exit on the right. You cannot turn cars, only push them along the grid.";
  if (g.engine === "idle") return "Click the kiln for heat. Spend heat on stokers that run even while you read another page. Prestige resets for a permanent multiplier.";
  return "Follow the on-screen controls. New Game reshuffles. Undo steps back when the engine supports it.";
}

function tips(g) {
  const t = {
    klondike: "Expose face-down cards before emptying a column for style points. Do not always empty a king slot if it hides useful aces.",
    spider: "Prefer in-suit builds even when an off-suit drop is legal. Empty columns are oxygen for rearranging runs.",
    fortythieves: "Do not bury low aces in deep columns. Two foundations per suit means you can park a deuce early.",
    bakersdozen: "Kings are already exposed — use them as anchors, not blockers. Move one card at a time; plan ahead.",
    spiderette: "Seven columns fill fast. Keep one empty column as long as you can for reshuffling runs.",
    freecell: "Count empty buffers before you move a long stack. Freeing an ace early is usually correct.",
    pyramid: "Do not pair two cards you will need to free a buried king unless you can see the win.",
    tripeaks: "Clear a peak before you burn stock if you can — each freed peak opens easier chains. Aces wrap with kings.",
    golf: "Play from columns that free buried cards first. Stock flips are limited, so do not waste them on dead ends.",
    mahjong: "Never spend the last copy of a tile you have not located. Scan the top layer first.",
    sudoku: "Pencil in box candidates. If a number exists in two rows of a box, it is not in the third.",
    mines: "Chord on a satisfied number by clicking it when its flags are placed — here, open neighbors with a quick second click on the number.",
    penta: "Start with a word that uses different vowels. Never reuse a dim letter.",
    chess: "Develop knights and bishops before queen adventures. The CPU loves hanging pieces.",
    idle: "Buy the cheapest upgrade that improves heat per second until prestige looks cheaper than another stoker."
  };
  if (g.engine === "solitaire") return t[g.config.variant] || t.klondike;
  if (g.engine === "mahjong") return t.mahjong;
  if (g.engine === "sudoku") return t.sudoku;
  if (g.engine === "mines") return t.mines;
  if (g.engine === "penta") return t.penta;
  if (g.engine === "chess") return t.chess;
  if (g.engine === "killer") return "Start with cages of only two cells — they pin a unique pair. Box lines still work; cages just add extra elimination.";
  if (g.engine === "kakuro") return "Look for runs with only one combination at the clue sum. Fill crossing cells first to break ties.";
  if (g.engine === "backgammon") return "Make points on your side of the board early. Leaving a blot is fine if the return shot is unlikely.";
  if (g.engine === "ginrummy") return "Track what the CPU discards. Keep high deadwood only when you are one card from a meld.";
  if (g.engine === "idle") return t.idle;
  return "Play a first round just to learn the buttons, then chase a cleaner score. Daily modes reward coming back tomorrow more than grinding one lucky shuffle.";
}

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
}

function page({ title, desc, canonical, extraHead, body, rootRel, bodyClass }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}" />
  <link rel="canonical" href="${esc(canonical)}" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(desc)}" />
  <meta property="og:site_name" content="${esc(SITE.name)}" />
  <meta property="og:url" content="${esc(canonical)}" />
  <link rel="icon" href="${rootRel}/favicon.svg" type="image/svg+xml" />
  <link rel="apple-touch-icon" href="${rootRel}/img/logo-mark.svg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="${rootRel}/css/site.css?v=33" />
  <link rel="stylesheet" href="${rootRel}/css/games.css?v=30" />
  ${extraHead || ""}
</head>
<body data-root="${rootRel}" class="${esc(bodyClass || "")}">
  <script src="${rootRel}/js/chrome.js?v=3"></script>
  <script src="${rootRel}/js/catalog.js"></script>
  <div id="site-header"></div>
  ${body}
  <div id="site-footer"></div>
</body>
</html>`;
}

function gameJsonLd(g, url) {
  const blocks = [{
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: g.title,
    description: pageDesc(g),
    url,
    genre: g.category,
    playMode: "SinglePlayer",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
  }];
  const faq = GAME_CONTENT[g.id]?.faq;
  if (faq && faq.length) {
    blocks.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a }
      }))
    });
  }
  return blocks.map((b) => `<script type="application/ld+json">${JSON.stringify(b)}</script>`).join("\n  ");
}

function write(file, text) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, text);
}

function card(g, prefix, opts = {}) {
  const badge = opts.badge ? `<span class="card-badge">${esc(opts.badge)}</span>` : "";
  const hot = opts.featured ? " card--hot" : "";
  return `<a class="card${hot}" href="${prefix}games/${g.id}/index.html" data-category="${esc(g.category)}" data-title="${esc(g.title)}">
    <div class="card-cover">
      <img src="${prefix}thumbs/${g.id}.svg?v=8" alt="${esc(g.title)}" width="360" height="450" />
      ${badge}
      <div class="card-play"><span>Play</span></div>
      <span class="card-body"><h3>${esc(g.title)}</h3></span>
    </div>
  </a>`;
}

const origin = SITE.origin;

write(out("js/catalog.js"), `window.BA = window.BA || {};
window.BA.GAMES = ${JSON.stringify(GAMES)};
window.BA.CATEGORIES = ${JSON.stringify(CATEGORIES)};
window.BA.SITE = ${JSON.stringify(SITE)};
`);

for (const g of GAMES) write(out("thumbs", g.id + ".svg"), thumbSvg(g));
write(out("img", "hero-fan.svg"), heroFanSvg());

const homeBody = `
<main class="wrap">
  <section class="hero">
    <div>
      <div class="eyebrow">SolitaireFelt.com</div>
      <h1>Sit down. Deal a hand.</h1>
      <p class="lede">Free solitaire, mahjong, sudoku, daily words, and board games on the green felt. No download, no account — pick a table and play.</p>
      <div class="hero-actions">
        <a class="btn primary" href="games/klondike-solitaire/index.html">Play Solitaire</a>
        <a class="btn ghost" href="games/spider-solitaire/index.html">Spider</a>
      </div>
      <div class="quick-links">
        <a href="games/freecell/index.html">FreeCell</a>
        <a href="games/pyramid-solitaire/index.html">Pyramid</a>
        <a href="games/tripeaks-solitaire/index.html">TriPeaks</a>
        <a href="games/mahjong-solitaire/index.html">Mahjong</a>
        <a href="games/sudoku-easy/index.html">Sudoku</a>
        <a href="games/penta-daily/index.html">Daily word</a>
      </div>
      <div class="hero-stats">
        <div class="stat"><b>${GAMES.length}</b><span>playable games</span></div>
        <div class="stat"><b>${CATEGORIES.length}</b><span>collections</span></div>
        <div class="stat"><b>0</b><span>installs needed</span></div>
      </div>
    </div>
    <div class="hero-visual" aria-hidden="true"><img src="img/hero-fan.svg?v=7" alt="" width="480" height="360" /></div>
  </section>
  <section class="felt-panel featured-panel">
    <div class="section-head">
      <div>
        <div class="eyebrow">On the table</div>
        <h2>Featured</h2>
      </div>
      <a class="section-link" href="games/klondike-solitaire/index.html">Play now</a>
    </div>
    <div class="featured">
      ${card(GAMES.find((g) => g.id === "klondike-solitaire"), "", { badge: "Classic", featured: true })}
      ${card(GAMES.find((g) => g.id === "spider-solitaire"), "", { badge: "Popular", featured: true })}
      ${card(GAMES.find((g) => g.id === "mahjong-solitaire"), "", { badge: "Calm", featured: true })}
      ${card(GAMES.find((g) => g.id === "penta-daily"), "", { badge: "Daily", featured: true })}
    </div>
  </section>
  <section class="felt-panel catalog-panel">
    <div class="section-head">
      <div>
        <div class="eyebrow">Full catalog</div>
        <h2>All games</h2>
      </div>
      <span class="section-count">${GAMES.length} titles</span>
    </div>
    <div class="cats" id="filters">
      <button class="chip active" data-cat="all" type="button">All</button>
      ${CATEGORIES.map((c) => `<button class="chip" data-cat="${c.id}" type="button">${c.title}</button>`).join("")}
    </div>
    <div class="grid" id="game-grid">${GAMES.map((g) => card(g, "")).join("")}</div>
  </section>
  <article class="prose" style="margin-top:48px">
    <h2>A full classics catalog</h2>
    <p>${SITE.name} is a set of original HTML5 games on the green felt: Klondike and Spider, mahjong layouts, daily sudoku, minesweeper, five-letter words, and chess versus a computer. Every title has its own page and rules. Progress stays on this device.</p>
  </article>
</main>
<script>
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("game-grid");
  const chips = document.querySelectorAll("#filters [data-cat]");
  const q = new URLSearchParams(location.search).get("q") || "";
  function apply() {
    const cat = document.querySelector("#filters .chip.active")?.dataset.cat || "all";
    const n = q.toLowerCase();
    grid.querySelectorAll(".card").forEach((c) => {
      const okCat = cat === "all" || c.dataset.category === cat;
      const okQ = !n || (c.dataset.title || "").toLowerCase().includes(n);
      c.style.display = okCat && okQ ? "" : "none";
    });
  }
  chips.forEach((chip) => chip.addEventListener("click", () => {
    chips.forEach((c) => c.classList.toggle("active", c === chip));
    apply();
  }));
  apply();
});
</script>
`;

write(out("index.html"), page({
  title: `${SITE.name} — Free Solitaire, Mahjong, Sudoku & Daily Puzzles`,
  desc: SITE.tagline,
  canonical: origin + "/",
  extraHead: `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: origin + "/",
    potentialAction: { "@type": "SearchAction", target: origin + "/index.html?q={query}", "query-input": "required name=query" }
  })}</script>`,
  body: homeBody,
  rootRel: ".",
  bodyClass: "home-page"
}));

for (const cat of CATEGORIES) {
  const list = GAMES.filter((g) => g.category === cat.id);
  write(out("categories", cat.id + ".html"), page({
    title: `${cat.title} — Play Free Online | ${SITE.name}`,
    desc: cat.blurb,
    canonical: `${origin}/categories/${cat.id}.html`,
    body: `<main class="wrap catalog-hero">
      <nav class="crumbs"><a href="../index.html">Home</a> · ${esc(cat.title)}</nav>
      <div class="eyebrow">Collection</div>
      <h1>${esc(cat.title)}</h1>
      <p class="lede">${esc(cat.blurb)}</p>
      <div class="grid" style="margin-top:24px">${list.map((g) => card(g, "../")).join("")}</div>
      <article class="prose"><p>Every ${esc(cat.title.toLowerCase())} title here is an original HTML5 game with its own page. Play in the browser; nothing is installed.</p></article>
    </main>`,
    rootRel: "..",
    bodyClass: "catalog-page"
  }));
}

for (const g of GAMES) {
  const url = `${origin}/games/${g.id}/`;
  const related = relatedFor(g);
  const catTitle = CATEGORIES.find((c) => c.id === g.category)?.title || g.category;
  write(out("games", g.id, "index.html"), page({
    title: `Play ${g.title} Free Online | ${SITE.name}`,
    desc: pageDesc(g),
    canonical: url,
    extraHead: gameJsonLd(g, url),
    body: `<main class="game-page">
      <section class="play-stage">
        <div class="play-shell">
          <aside class="ad-rail" aria-hidden="true"></aside>
          <div class="play-table">
            <div class="play-bar">
              <div class="play-identity">
                <nav class="crumbs"><a href="../../index.html">Home</a> · <a href="../../categories/${g.category}.html">${esc(catTitle)}</a></nav>
                <h1>${esc(g.title)}</h1>
              </div>
              <div id="hud" class="hud"></div>
              <div class="game-toolbar" id="toolbar"></div>
            </div>
            <div class="board-frame" id="board" data-engine="${esc(g.engine)}" data-config='${JSON.stringify(g.config).replace(/'/g, "&#39;")}'></div>
          </div>
          <aside class="ad-rail" aria-hidden="true"></aside>
        </div>
      </section>
      <div class="play-copy">
        <div class="wrap">
          <article class="prose">${article(g)}</article>
          <div class="section-head"><h2>Related</h2></div>
          <div class="related">${related.map((x) => card(x, "../../")).join("")}</div>
        </div>
      </div>
    </main>
    ${g.engine === "solitaire" || g.engine === "ginrummy" ? `<script src="../../js/deck.js?v=5"></script>\n    ` : ""}<script src="../../engines/${g.engine}.js?v=12"></script>
    <script>
      document.addEventListener("DOMContentLoaded", () => {
        const board = document.getElementById("board");
        const hud = document.getElementById("hud");
        let cfg = {};
        try { cfg = JSON.parse(board.getAttribute("data-config") || "{}"); } catch (e) { cfg = {}; }
        const boot = window.BA.games && window.BA.games[${JSON.stringify(g.engine)}];
        if (boot) {
          try { boot(board, cfg, document.getElementById("toolbar"), hud); }
          catch (err) { hud.textContent = "Could not start this game. Try New game or refresh."; console.error(err); }
        } else hud.textContent = "This game failed to load. Refresh the page.";
      });
    </script>`,
    rootRel: "../..",
    bodyClass: "play-page"
  }));
}

const legal = (title, slug, inner) => page({
  title: `${title} | ${SITE.name}`,
  desc: `${title} for ${SITE.name}.`,
  canonical: `${origin}/${slug}.html`,
  body: `<main class="wrap prose" style="padding:32px 0 56px;max-width:760px">${inner}</main>`,
  rootRel: ".",
  bodyClass: "legal-page"
});

write(out("about.html"), legal("About", "about", `
<h1>About ${SITE.name}</h1>
<p>${SITE.name} is a catalog of original HTML5 classics on the green felt: solitaire families, mahjong solitaire, sudoku, word puzzles, and board games against a computer. We built a full niche on purpose. A handful of demo pages does not give players a reason to stay, and it does not give search engines a reason to treat the site as a destination.</p>
<p>There is no account system and no server-side game logic. That keeps hosting cheap and privacy simple: progress lives in your browser's local storage.</p>
<p>Playing-card faces use the traditional English pattern: Vectorized Playing Cards by Chris Aguilar (Ace of Spades by Byron Knoll), licensed under LGPL 3.0. See <a href="img/deck/LICENSE">img/deck/LICENSE</a>.</p>
<p>We do not embed other studios' copyrighted titles. If you need a game added inside this classics niche, use the contact page.</p>
`));

write(out("contact.html"), legal("Contact", "contact", `
<h1>Contact</h1>
<p>For feedback, takedown requests, or advertising questions, email <a href="mailto:${SITE.email}">${SITE.email}</a>.</p>
<p>This is a static site, so there is no ticket form backend. Email is the supported channel.</p>
`));

write(out("privacy.html"), legal("Privacy Policy", "privacy", `
<h1>Privacy Policy</h1>
<p>Last updated 22 August 2026.</p>
<p>${SITE.name} is a static website. Games run in your browser. High scores and idle progress use localStorage on your device. We do not operate a game account database.</p>
<p>If you enable Google AdSense, Google may use cookies and collect device and usage data as described in Google's policies. You are responsible for pasting your own AdSense code and for disclosing your publisher practices once ads are live.</p>
<p>We do not knowingly target children under 13. These games are general-audience classics.</p>
<p>Contact: ${SITE.email}</p>
`));

write(out("terms.html"), legal("Terms of Use", "terms", `
<h1>Terms of Use</h1>
<p>Games are provided free, as-is, for personal play. You may not scrape or republish the engines as your own product without permission. Solitaire and sudoku are traditional game rules; our code, copy, and art are original to this site.</p>
<p>Do not attempt to inject ads or malware around these files if you self-host a copy. No gambling for real money is offered.</p>
`));

write(out("cookies.html"), legal("Cookies", "cookies", `
<h1>Cookies</h1>
<p>The game files themselves do not set advertising cookies. Local storage holds scores. After you add AdSense or analytics, those vendors may set cookies. Update this page with your cookie list before inviting traffic.</p>
`));

write(out("ads.txt"), `# Replace pub-XXXXXXXXXXXXXXXX with your AdSense publisher ID
# google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
`);

write(out("robots.txt"), `User-agent: *
Allow: /
Sitemap: ${origin}/sitemap.xml
`);

const urls = ["/", "/about.html", "/contact.html", "/privacy.html", "/terms.html", "/cookies.html", ...CATEGORIES.map((c) => `/categories/${c.id}.html`), ...GAMES.map((g) => `/games/${g.id}/`)];
write(out("sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${origin}${u}</loc></url>`).join("\n")}
</urlset>
`);

console.log("Wrote", GAMES.length, "games +", CATEGORIES.length, "categories");
