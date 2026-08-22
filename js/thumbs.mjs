import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const deckDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "img", "deck");
const hrefCache = new Map();
const RANK_FILE = {
  A: "1", "2": "2", "3": "3", "4": "4", "5": "5", "6": "6",
  "7": "7", "8": "8", "9": "9", "10": "10", J: "j", Q: "q", K: "k"
};

function deckHref(file) {
  if (!hrefCache.has(file)) {
    const raw = fs.readFileSync(path.join(deckDir, file), "utf8");
    hrefCache.set(file, "data:image/svg+xml;charset=utf-8," + encodeURIComponent(raw));
  }
  return hrefCache.get(file);
}

function uid(id) {
  return String(id).replace(/[^a-z0-9]/gi, "");
}

function face(x, y, rank, suit, sc = 1, rot = 0) {
  const file = RANK_FILE[rank] + suit + ".svg";
  const w = 84 * sc;
  const h = w * 314 / 225;
  return `<g transform="translate(${x} ${y}) rotate(${rot})">
    <image href="${deckHref(file)}" x="${(-w / 2).toFixed(2)}" y="${(-h / 2).toFixed(2)}" width="${w.toFixed(2)}" height="${h.toFixed(2)}" />
  </g>`;
}

function cardBack(x, y, sc = 1, rot = 0) {
  const w = 84 * sc;
  const h = w * 314 / 225;
  return `<g transform="translate(${x} ${y}) rotate(${rot})">
    <image href="${deckHref("back.svg")}" x="${(-w / 2).toFixed(2)}" y="${(-h / 2).toFixed(2)}" width="${w.toFixed(2)}" height="${h.toFixed(2)}" />
  </g>`;
}

function wrap(id, inner) {
  const i = uid(id);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 450" width="360" height="450">
    <defs>
      <filter id="ds-${i}" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="8" stdDeviation="7" flood-color="#000" flood-opacity="0.5"/>
      </filter>
      <linearGradient id="vg-${i}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0.58" stop-color="#000" stop-opacity="0"/>
        <stop offset="1" stop-color="#000" stop-opacity="0.5"/>
      </linearGradient>
    </defs>
    ${inner}
    <rect width="360" height="450" fill="url(#vg-${i})" pointer-events="none"/>
  </svg>`;
}

function bg(c1, c2) {
  return `<rect width="360" height="450" fill="#120c08"/>
    <rect x="8" y="8" width="344" height="434" rx="32" fill="#5c3a16"/>
    <rect x="8" y="8" width="344" height="434" rx="32" fill="none" stroke="#e8c97a" stroke-width="1.4" opacity="0.35"/>
    <rect x="22" y="22" width="316" height="406" rx="22" fill="${c1}"/>
    <rect x="22" y="22" width="316" height="406" rx="22" fill="${c2}" opacity="0.36"/>
    <ellipse cx="180" cy="86" rx="124" ry="46" fill="#fff" opacity="0.08"/>`;
}

function wordmark() {
  return "";
}

const POSTERS = {
  "klondike-solitaire": (id) => wrap(id, `
    ${bg("#146b4a", "#0a3d2b")}
    <g filter="url(#ds-${uid(id)})">
      ${cardBack(124, 196, 1.38, -18)}
      ${face(186, 178, "A", "s", 1.55, -3)}
      ${face(246, 196, "10", "h", 1.34, 14)}
    </g>`),

  "klondike-draw-3": (id) => wrap(id, `
    ${bg("#12382e", "#07141c")}
    <g filter="url(#ds-${uid(id)})">
      ${face(118, 192, "10", "d", 1.32, -16)}
      ${face(180, 174, "7", "s", 1.52, -3)}
      ${face(244, 192, "A", "h", 1.36, 16)}
    </g>`),

  "spider-solitaire": (id) => wrap(id, `
    ${bg("#3a0d16", "#100508")}
    <g filter="url(#ds-${uid(id)})">
      ${face(102, 192, "A", "s", 1.28, -12)}
      ${face(158, 176, "A", "h", 1.36, -4)}
      ${face(214, 176, "A", "c", 1.36, 4)}
      ${face(270, 192, "A", "d", 1.28, 12)}
    </g>`),

  "spider-solitaire-2-suits": (id) => wrap(id, `
    ${bg("#3a1018", "#100508")}
    <g filter="url(#ds-${uid(id)})">
      ${face(128, 180, "A", "s", 1.52, -12)}
      ${face(232, 192, "A", "h", 1.48, 12)}
    </g>`),

  "spider-solitaire-1-suit": (id) => wrap(id, `
    ${bg("#5a1824", "#1a080c")}
    <g filter="url(#ds-${uid(id)})">
      ${cardBack(126, 192, 1.38, -14)}
      ${face(226, 178, "A", "s", 1.58, 8)}
    </g>`),

  "freecell": (id) => wrap(id, `
    ${bg("#0d2a44", "#061018")}
    ${[0,1,2,3].map((i) => `<rect x="${54 + i * 64}" y="64" width="52" height="68" rx="7" fill="none" stroke="#7ec8e3" stroke-width="2" opacity="0.4"/>`).join("")}
    <g filter="url(#ds-${uid(id)})">
      ${face(132, 198, "A", "s", 1.28, -10)}
      ${face(216, 182, "A", "c", 1.48, 6)}
    </g>`),

  "pyramid-solitaire": (id) => wrap(id, `
    ${bg("#4a3414", "#160e06")}
    <g filter="url(#ds-${uid(id)})">
      ${face(180, 108, "A", "s", 0.82, 0)}
      ${face(148, 158, "10", "h", 0.82, -3)}
      ${face(212, 158, "9", "d", 0.82, 3)}
      ${face(116, 208, "7", "c", 0.82, -5)}
      ${face(180, 208, "4", "s", 0.86, 0)}
      ${face(244, 208, "2", "h", 0.82, 5)}
    </g>`),

  "tripeaks-solitaire": (id) => wrap(id, `
    ${bg("#1b3a28", "#08140e")}
    <g filter="url(#ds-${uid(id)})">
      ${face(108, 188, "A", "s", 1.08, -12)}
      ${face(180, 164, "10", "h", 1.22, 0)}
      ${face(252, 188, "9", "d", 1.08, 12)}
    </g>`),

  "yukon-solitaire": (id) => wrap(id, `
    ${bg("#123844", "#061018")}
    <g filter="url(#ds-${uid(id)})">
      ${face(132, 190, "10", "s", 1.32, -14)}
      ${face(192, 174, "A", "h", 1.46, 3)}
      ${face(254, 192, "9", "c", 1.28, 16)}
    </g>`),

  "golf-solitaire": (id) => wrap(id, `
    ${bg("#1f6b3a", "#0a2816")}
    <ellipse cx="180" cy="268" rx="140" ry="28" fill="#04140a" opacity="0.35"/>
    <g filter="url(#ds-${uid(id)})">
      ${cardBack(236, 168, 1.12, 12)}
      ${face(160, 182, "A", "s", 1.5, -8)}
    </g>`),

  "canfield-solitaire": (id) => wrap(id, `
    ${bg("#3b1844", "#120610")}
    <g filter="url(#ds-${uid(id)})">
      ${cardBack(126, 190, 1.28, -14)}
      ${face(222, 176, "A", "d", 1.52, 8)}
    </g>`),

  "scorpion-solitaire": (id) => wrap(id, `
    ${bg("#1a0808", "#050202")}
    <g filter="url(#ds-${uid(id)})">
      ${face(138, 188, "10", "c", 1.3, -10)}
      ${face(226, 176, "A", "s", 1.48, 10)}
    </g>`),

  "mahjong-solitaire": (id) => wrap(id, `
    ${bg("#6b2a22", "#2a100c")}
    ${[[92,108,"東","#1a4a2a"],[158,86,"中","#b42318"],[224,108,"白","#1a1a1a"],[124,178,"發","#1a4a2a"],[196,192,"五","#b42318"]].map(([x,y,t,c]) =>
      `<g transform="translate(${x} ${y})" filter="url(#ds-${uid(id)})">
        <rect x="4" y="6" width="68" height="86" rx="8" fill="#5a3a1c"/>
        <rect width="68" height="86" rx="8" fill="#fff6e0" stroke="#d4a84b" stroke-width="1.5"/>
        <text x="34" y="56" text-anchor="middle" font-size="34" fill="${c}">${t}</text>
      </g>`).join("")}`),

  "mahjong-fortress": (id) => wrap(id, `
    ${bg("#4a1c16", "#180808")}
    <rect x="70" y="80" width="220" height="220" fill="#c4a574" opacity="0.15"/>
    <rect x="100" y="50" width="160" height="40" fill="#e8c97a"/>
    <rect x="90" y="90" width="180" height="200" fill="none" stroke="#e8c97a" stroke-width="6"/>
    <text x="180" y="210" text-anchor="middle" font-size="72" fill="#fff3d6">🀄</text>
    ${wordmark("Fortress", "HIGH WALLS")}`),

  "mahjong-pyramid": (id) => wrap(id, `
    ${bg("#7a3a18", "#2a1408")}
    <g filter="url(#ds-${uid(id)})">
      <rect x="150" y="70" width="60" height="74" rx="6" fill="#fff3d6"/>
      <rect x="118" y="150" width="60" height="74" rx="6" fill="#fff3d6"/>
      <rect x="182" y="150" width="60" height="74" rx="6" fill="#fff3d6"/>
      <rect x="86" y="230" width="60" height="74" rx="6" fill="#fff3d6"/>
      <rect x="150" y="230" width="60" height="74" rx="6" fill="#fff3d6"/>
      <rect x="214" y="230" width="60" height="74" rx="6" fill="#fff3d6"/>
    </g>
    ${wordmark("Pyramid", "MAHJONG STACK")}`),

  "mahjong-spider": (id) => wrap(id, `
    ${bg("#3a1020", "#12060c")}
    <rect x="30" y="120" width="140" height="160" rx="12" fill="#fff3d6"/>
    <rect x="190" y="120" width="140" height="160" rx="12" fill="#fff3d6"/>
    <text x="100" y="215" text-anchor="middle" font-size="48" fill="#6b2418">東</text>
    <text x="260" y="215" text-anchor="middle" font-size="48" fill="#1a4a2a">南</text>
    ${wordmark("Spider", "TWO PLATEAUS")}`),

  "sudoku-easy": (id) => wrap(id, `
    ${bg("#1a5a4a", "#0c2a24")}
    <text x="24" y="120" font-family="Georgia,serif" font-size="120" fill="#7cb89a">2</text>
    <text x="120" y="210" font-family="Georgia,serif" font-size="160" fill="#f3ead7">9</text>
    <text x="230" y="160" font-family="Georgia,serif" font-size="80" fill="#d4a84b">4</text>
    ${wordmark("Easy", "SUDOKU")}`),

  "sudoku-medium": (id) => wrap(id, `
    ${bg("#163d52", "#0a1e2a")}
    ${[0,1,2].map((y) => [0,1,2].map((x) => `<rect x="${70 + x * 74}" y="${70 + y * 74}" width="68" height="68" fill="${(x+y)%2?"#f3ead7":"#d4e4ea"}" rx="6"/>
      <text x="${104 + x * 74}" y="${118 + y * 74}" text-anchor="middle" font-size="28" fill="#163d52">${((x*3+y*2)%9)+1}</text>`).join("")).join("")}
    ${wordmark("Medium", "SUDOKU")}`),

  "sudoku-hard": (id) => wrap(id, `
    ${bg("#101820", "#070b10")}
    <text x="180" y="230" text-anchor="middle" font-family="Georgia,serif" font-size="180" fill="#d4a84b" opacity="0.9">?</text>
    <text x="180" y="80" text-anchor="middle" font-family="Segoe UI,Arial" letter-spacing="8" fill="#8aa" font-size="14">SPARSE GIVENS</text>
    ${wordmark("Hard", "SUDOKU")}`),

  "daily-sudoku": (id) => wrap(id, `
    ${bg("#0e4a4a", "#062424")}
    <rect x="90" y="70" width="180" height="200" rx="16" fill="#f3ead7"/>
    <text x="180" y="130" text-anchor="middle" font-size="18" fill="#0e4a4a" font-weight="700">TODAY</text>
    <text x="180" y="210" text-anchor="middle" font-family="Georgia,serif" font-size="72" fill="#0e4a4a">31</text>
    ${wordmark("Daily", "ONE GRID A DAY")}`),

  "mini-sudoku": (id) => wrap(id, `
    ${bg("#245a4a", "#102820")}
    ${[0,1,2,3,4,5].map((i) => `<rect x="${48 + (i%3)*88}" y="${70 + Math.floor(i/3)*100}" width="80" height="88" rx="10" fill="#f3ead7"/>
      <text x="${88 + (i%3)*88}" y="${128 + Math.floor(i/3)*100}" text-anchor="middle" font-size="36" fill="#245a4a">${i+1}</text>`).join("")}
    ${wordmark("Mini 6×6", "QUICK SUDOKU")}`),

  "minesweeper": (id) => wrap(id, `
    ${bg("#3a3a3a", "#1a1a1a")}
    <rect x="70" y="80" width="220" height="200" rx="8" fill="#8d8d8d"/>
    <circle cx="180" cy="170" r="48" fill="#111"/>
    <circle cx="180" cy="170" r="16" fill="#c45c4a"/>
    <rect x="176" y="110" width="8" height="28" fill="#111"/>
    ${wordmark("Beginner", "MINESWEEPER")}`),

  "minesweeper-intermediate": (id) => wrap(id, `
    ${bg("#2a2a32", "#101014")}
    <text x="90" y="200" font-size="64" fill="#4aa3ff" font-weight="800">1</text>
    <text x="160" y="230" font-size="64" fill="#3d8b5a" font-weight="800">2</text>
    <text x="230" y="190" font-size="64" fill="#c45c4a" font-weight="800">3</text>
    <rect x="140" y="260" width="40" height="36" fill="#666"/>
    ${wordmark("Intermediate", "16 × 16")}`),

  "minesweeper-expert": (id) => wrap(id, `
    ${bg("#120808", "#000")}
    <text x="180" y="210" text-anchor="middle" font-family="Georgia,serif" font-size="92" fill="#c45c4a">99</text>
    <text x="180" y="250" text-anchor="middle" letter-spacing="6" fill="#888" font-size="14">MINES</text>
    ${wordmark("Expert", "30 × 16 BOARD")}`),

  "quad-merge": (id) => wrap(id, `
    ${bg("#bbada0", "#8f7a66")}
    <rect x="70" y="80" width="220" height="220" rx="18" fill="#edc22e"/>
    <text x="180" y="210" text-anchor="middle" font-size="56" font-weight="800" fill="#f9f6f2">2048</text>
    ${wordmark("Quad Merge", "SLIDE  ·  COMBINE")}`),

  "penta-daily": (id) => wrap(id, `
    ${bg("#1a1a1c", "#0a0a0c")}
    ${["P","E","N","T","A"].map((ch, i) => `<g filter="url(#ds-${uid(id)})">
      <rect x="${38 + i * 58}" y="154" width="50" height="58" rx="8" fill="${i===2?"#3d8b5a":i%2?"#c9a227":"#2a2a2e"}"/>
      <text x="${63 + i * 58}" y="193" text-anchor="middle" font-size="24" font-weight="800" fill="#fff" font-family="Outfit, Segoe UI, sans-serif">${ch}</text>
    </g>`).join("")}`),

  "word-search": (id) => wrap(id, `
    ${bg("#3a2a12", "#1a1208")}
    <text x="40" y="140" font-size="36" font-weight="700" fill="#f3ead7">A R C A D E</text>
    <text x="40" y="190" font-size="36" font-weight="700" fill="#e8c97a">P U Z Z L E</text>
    <text x="40" y="240" font-size="36" font-weight="700" fill="#f3ead7">G A M E S</text>
    <line x1="48" y1="118" x2="250" y2="255" stroke="#e8c97a" stroke-width="6" opacity="0.8"/>
    ${wordmark("Word Search", "FIND THE LIST")}`),

  "hangman": (id) => wrap(id, `
    ${bg("#241c1c", "#0e0a0a")}
    <line x1="80" y1="300" x2="170" y2="300" stroke="#cfc4ae" stroke-width="8"/>
    <line x1="110" y1="70" x2="110" y2="300" stroke="#cfc4ae" stroke-width="8"/>
    <line x1="110" y1="70" x2="230" y2="70" stroke="#cfc4ae" stroke-width="8"/>
    <line x1="230" y1="70" x2="230" y2="110" stroke="#cfc4ae" stroke-width="6"/>
    <circle cx="230" cy="132" r="22" fill="none" stroke="#e8c97a" stroke-width="6"/>
    ${wordmark("Hangman", "GUESS THE WORD")}`),

  "anagram-hunt": (id) => wrap(id, `
    ${bg("#1c3044", "#0a141c")}
    <text x="180" y="200" text-anchor="middle" font-size="52" letter-spacing="10" fill="#e8c97a">A C E D R</text>
    <text x="180" y="250" text-anchor="middle" font-size="22" fill="#cfc4ae">arcade  ·  card  ·  race</text>
    ${wordmark("Anagrams", "BUILD WORDS")}`),

  "typing-sprint": (id) => wrap(id, `
    ${bg("#10241e", "#071410")}
    <rect x="36" y="120" width="288" height="140" rx="14" fill="#1c1a16" stroke="#d4a84b"/>
    <text x="56" y="180" font-size="22" fill="#7cb89a">classic solitaire_</text>
    <rect x="56" y="188" width="4" height="22" fill="#d4a84b"/>
    ${wordmark("Typing Sprint", "WPM  ·  ACCURACY")}`),

  "crossword-daily": (id) => wrap(id, `
    ${bg("#1a2744", "#0c1220")}
    ${["C","A","R","D"].map((ch,i)=>`<rect x="${70+i*55}" y="120" width="50" height="50" fill="#f4efe2"/>
      <text x="${95+i*55}" y="155" text-anchor="middle" font-size="22" fill="#1a1a1a">${ch}</text>`).join("")}
    ${["A","U","R","A"].map((ch,i)=>`<rect x="${70+i*55}" y="175" width="50" height="50" fill="#f4efe2"/>
      <text x="${95+i*55}" y="210" text-anchor="middle" font-size="22" fill="#1a1a1a">${ch}</text>`).join("")}
    ${wordmark("Mini Crossword", "CLUES INCLUDED")}`),

  "chess": (id) => wrap(id, `
    ${bg("#2a2118", "#120e0a")}
    ${Array.from({length:64}, (_,i) => {
      const x = i % 8, y = Math.floor(i / 8);
      return `<rect x="${52 + x * 32}" y="${48 + y * 32}" width="32" height="32" fill="${(x+y)%2 ? "#6b8f71" : "#e6d5ae"}"/>`;
    }).join("")}
    <text x="180" y="200" text-anchor="middle" font-size="64">♚</text>
    ${wordmark("Chess", "VS COMPUTER")}`),

  "checkers": (id) => wrap(id, `
    ${bg("#4a2414", "#1a0c08")}
    ${Array.from({length:8}, (_,y)=>Array.from({length:8}, (_,x)=>`<rect x="${52+x*32}" y="${48+y*32}" width="32" height="32" fill="${(x+y)%2?"#7a3a22":"#e6d5ae"}"/>`).join("")).join("")}
    <circle cx="132" cy="144" r="18" fill="#1a1a1a"/>
    <circle cx="196" cy="208" r="18" fill="#f3ead7" stroke="#1a1a1a"/>
    ${wordmark("Checkers", "ENGLISH DRAUGHTS")}`),

  "connect-four": (id) => wrap(id, `
    ${bg("#0b2a52", "#061428")}
    <rect x="40" y="70" width="280" height="240" rx="20" fill="#0a3a6b"/>
    ${[0,1,2,3,4,5,6].map((x,i)=>`<circle cx="${70+x*40}" cy="140" r="16" fill="${i%3===0?"#d4a84b":i%3===1?"#c45c4a":"#082018"}"/>
      <circle cx="${70+x*40}" cy="190" r="16" fill="${i%2?"#c45c4a":"#d4a84b"}"/>
      <circle cx="${70+x*40}" cy="240" r="16" fill="#082018"/>`).join("")}
    ${wordmark("Connect Four", "FOUR IN A LINE")}`),

  "reversi": (id) => wrap(id, `
    ${bg("#0e2418", "#06140e")}
    <rect x="70" y="70" width="220" height="220" fill="#1a3a28"/>
    <circle cx="140" cy="140" r="28" fill="#111"/>
    <circle cx="220" cy="140" r="28" fill="#f3ead7"/>
    <circle cx="140" cy="220" r="28" fill="#f3ead7"/>
    <circle cx="220" cy="220" r="28" fill="#111"/>
    ${wordmark("Reversi", "FLIP THE BOARD")}`),

  "mancala": (id) => wrap(id, `
    ${bg("#4a3010", "#1c1208")}
    <rect x="30" y="140" width="300" height="140" rx="70" fill="#6b4a22"/>
    <ellipse cx="60" cy="210" rx="22" ry="50" fill="#3a280e"/>
    <ellipse cx="300" cy="210" rx="22" ry="50" fill="#3a280e"/>
    ${[0,1,2,3,4,5].map((i)=>`<circle cx="${100+i*32}" cy="180" r="12" fill="#e8c97a"/><circle cx="${100+i*32}" cy="240" r="12" fill="#d4a84b"/>`).join("")}
    ${wordmark("Mancala", "SOW THE STONES")}`),

  "battleship": (id) => wrap(id, `
    ${bg("#0d3a4a", "#061820")}
    ${Array.from({length:8},(_,y)=>Array.from({length:8},(_,x)=>`<rect x="${52+x*32}" y="${50+y*32}" width="30" height="30" fill="${x===2&&y<4?"#c45c4a":"#1a6a88"}"/>`).join("")).join("")}
    <path d="M90,80 L90,200 L60,220 L120,220 Z" fill="#e8e8e8" opacity="0.9"/>
    ${wordmark("Sea Battle", "HUNT THE FLEET")}`),

  "gomoku": (id) => wrap(id, `
    ${bg("#e6d5ae", "#c4b48a")}
    ${[0,1,2,3,4,5,6].map(i=>`<line x1="50" y1="${70+i*36}" x2="310" y2="${70+i*36}" stroke="#3a2a18" stroke-width="2"/>
      <line x1="${50+i*43}" y1="70" x2="${50+i*43}" y2="286" stroke="#3a2a18" stroke-width="2"/>`).join("")}
    <circle cx="180" cy="178" r="14" fill="#111"/>
    <circle cx="223" cy="178" r="14" fill="#f3ead7" stroke="#111"/>
    <circle cx="180" cy="214" r="14" fill="#f3ead7" stroke="#111"/>
    ${wordmark("Gomoku", "FIVE IN A ROW")}`),

  "tic-tac-toe": (id) => wrap(id, `
    ${bg("#1e2a22", "#0c1410")}
    <line x1="130" y1="70" x2="130" y2="300" stroke="#e8c97a" stroke-width="8"/>
    <line x1="230" y1="70" x2="230" y2="300" stroke="#e8c97a" stroke-width="8"/>
    <line x1="50" y1="145" x2="310" y2="145" stroke="#e8c97a" stroke-width="8"/>
    <line x1="50" y1="225" x2="310" y2="225" stroke="#e8c97a" stroke-width="8"/>
    <text x="90" y="130" text-anchor="middle" font-size="56" fill="#d4a84b">X</text>
    <text x="180" y="210" text-anchor="middle" font-size="56" fill="#cfc4ae">O</text>
    ${wordmark("Tic-Tac-Toe", "THREE IN A ROW")}`),

  "memory-match": (id) => wrap(id, `
    ${bg("#3a1548", "#16081e")}
    <g filter="url(#ds-${uid(id)})">
      ${face(118, 188, "A", "h", 1.25, -12)}
      ${cardBack(248, 196, 1.25, 14)}
    </g>
    ${wordmark("Memory", "MATCH THE PAIRS")}`),

  "chroma-path": (id) => wrap(id, `
    ${bg("#101018", "#000")}
    <path d="M180,70 A90,90 0 0 1 270,160 L180,160 Z" fill="#c45c4a"/>
    <path d="M270,160 A90,90 0 0 1 180,250 L180,160 Z" fill="#d4a84b"/>
    <path d="M180,250 A90,90 0 0 1 90,160 L180,160 Z" fill="#3d8b7a"/>
    <path d="M90,160 A90,90 0 0 1 180,70 L180,160 Z" fill="#4a6fa5"/>
    <circle cx="180" cy="160" r="32" fill="#0a0a0a"/>
    ${wordmark("Chroma Path", "REPEAT THE SEQUENCE")}`),

  "slide-fifteen": (id) => wrap(id, `
    ${bg("#1a3340", "#0a161c")}
    ${[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0].map((v,i)=> {
      const x = 58 + (i%4)*62, y = 58 + Math.floor(i/4)*62;
      return v ? `<rect x="${x}" y="${y}" width="56" height="56" rx="8" fill="#3d7a9a"/><text x="${x+28}" y="${y+36}" text-anchor="middle" fill="#fff" font-size="20" font-weight="800">${v}</text>`
        : `<rect x="${x}" y="${y}" width="56" height="56" rx="8" fill="#0d1a22"/>`;
    }).join("")}
    ${wordmark("Slide 15", "RESTORE THE ORDER")}`),

  "peg-solitaire": (id) => wrap(id, `
    ${bg("#3a2a1c", "#161008")}
    ${[[2,0],[3,0],[4,0],[2,1],[3,1],[4,1],[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[6,2],[0,3],[1,3],[2,3],[4,3],[5,3],[6,3],[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[2,5],[3,5],[4,5],[2,6],[3,6],[4,6]].map(([x,y]) =>
      `<circle cx="${70+x*32}" cy="${70+y*32}" r="11" fill="${x===3&&y===3?"#1a1008":"#d4a84b"}" stroke="#5a3a1a"/>`).join("")}
    ${wordmark("Peg Solitaire", "ONE IN THE CENTER")}`),

  "gem-cascade": (id) => wrap(id, `
    ${bg("#2a0e28", "#100410")}
    ${[[80,100,"#c45c4a","◆"],[160,90,"#d4a84b","●"],[240,110,"#3d8b7a","▲"],[80,190,"#4a6fa5","■"],[160,180,"#8a4aaa","✚"],[240,200,"#c45c4a","◆"]].map(([x,y,c,s])=>
      `<rect x="${x}" y="${y}" width="70" height="70" rx="14" fill="${c}"/><text x="${x+35}" y="${y+48}" text-anchor="middle" font-size="28">${s}</text>`).join("")}
    ${wordmark("Gem Cascade", "MATCH THREE")}`),

  "jigsaw-table": (id) => wrap(id, `
    ${bg("#16352c", "#0a1c16")}
    <rect x="40" y="80" width="130" height="110" rx="8" fill="#d4a84b"/>
    <rect x="190" y="70" width="130" height="110" rx="8" fill="#3d8b7a"/>
    <rect x="60" y="210" width="130" height="110" rx="8" fill="#c45c4a"/>
    <rect x="210" y="200" width="110" height="110" rx="8" fill="#4a6fa5"/>
    ${wordmark("Jigsaw", "SNAP THE PIECES")}`),

  "nonogram-ink": (id) => wrap(id, `
    ${bg("#12121a", "#000")}
    ${[
      [0,1,1,1,0,1,1,0],[1,1,0,1,1,0,1,1],[1,0,0,0,0,0,0,1],[1,0,1,1,1,1,0,1],
      [1,0,1,0,0,1,0,1],[1,0,1,1,1,1,0,1],[1,1,0,0,0,0,1,1],[0,1,1,1,1,1,1,0]
    ].map((row,y)=>row.map((v,x)=>`<rect x="${70+x*28}" y="${50+y*28}" width="26" height="26" fill="${v?"#d4a84b":"#1a1a22"}"/>`).join("")).join("")}
    ${wordmark("Nonogram", "PAINT BY NUMBERS")}`),

  "rush-lanes": (id) => wrap(id, `
    ${bg("#4a1515", "#1a0808")}
    <rect x="40" y="70" width="280" height="240" fill="#2a0c0c"/>
    <rect x="90" y="160" width="130" height="44" rx="8" fill="#d4a84b"/>
    <rect x="50" y="90" width="50" height="120" rx="8" fill="#6a8a9a"/>
    <rect x="250" y="100" width="50" height="150" rx="8" fill="#4a6a7a"/>
    <rect x="160" y="230" width="140" height="44" rx="8" fill="#8aa"/>
    ${wordmark("Rush Lanes", "FREE THE BRASS CAR")}`),

  "star-kiln": (id) => wrap(id, `
    ${bg("#3a1e08", "#140a04")}
    <ellipse cx="180" cy="280" rx="90" ry="28" fill="#1a0e04"/>
    <path d="M110,270 Q180,70 250,270" fill="#c45c4a"/>
    <path d="M140,250 Q180,120 220,250" fill="#e8c97a"/>
    <circle cx="180" cy="92" r="22" fill="#fff3d6"/>
    <text x="180" y="100" text-anchor="middle" font-size="22">★</text>
    ${wordmark("Star Kiln", "IDLE  ·  PRESTIGE")}`),

  "forty-thieves-solitaire": (id) => wrap(id, `
    ${bg("#2a4a3a", "#101820")}
    ${[0,1,2,3,4,5,6,7,8,9].map((i) => cardBack(36 + i * 32, 120 + (i % 2) * 8, 0.55, -4 + i)).join("")}
    ${face(180, 260, "K", "s", 1.1, 0)}
    ${wordmark("Forty Thieves", "TWO DECKS")}`),

  "bakers-dozen-solitaire": (id) => wrap(id, `
    ${bg("#3a2844", "#161018")}
    ${[0,1,2,3,4,5,6,7,8,9,10,11,12].map((i) => face(28 + i * 26, 140, i % 2 ? "K" : "7", "h", 0.48, -6 + i * 0.8)).join("")}
    ${wordmark("Baker's Dozen", "13 PILES")}`),

  "spiderette-solitaire": (id) => wrap(id, `
    ${bg("#5a2030", "#200810")}
    ${[0,1,2,3,4,5,6].map((i) => cardBack(50 + i * 44, 130, 0.7, 0)).join("")}
    ${wordmark("Spiderette", "MINI SPIDER")}`),

  "daily-klondike": (id) => wrap(id, `
    ${bg("#1e5a42", "#0a2418")}
    ${face(120, 160, "A", "h", 1.2, -8)}
    ${face(180, 150, "K", "s", 1.3, 0)}
    ${cardBack(240, 160, 1.1, 8)}
    <text x="180" y="300" text-anchor="middle" fill="#e8c97a" font-size="16" letter-spacing="4">TODAY</text>
    ${wordmark("Daily Klondike", "SAME DEAL")}`),

  "daily-spider": (id) => wrap(id, `
    ${bg("#4a1824", "#180810")}
    ${[0,1,2,3,4].map((i) => cardBack(60 + i * 60, 150, 0.85, 0)).join("")}
    <text x="180" y="300" text-anchor="middle" fill="#e8c97a" font-size="16" letter-spacing="4">TODAY</text>
    ${wordmark("Daily Spider", "ONE SUIT")}`),

  "mahjong-dragon": (id) => wrap(id, `
    ${bg("#5a2418", "#200808")}
    ${[[90,120],[130,100],[170,90],[210,100],[250,120],[170,160],[130,200],[210,200]].map(([x,y])=>
      `<rect x="${x}" y="${y}" width="44" height="56" rx="6" fill="#efe6cf" stroke="#cbb992"/>`).join("")}
    ${wordmark("Dragon", "MAHJONG")}`),

  "mahjong-bridge": (id) => wrap(id, `
    ${bg("#4a3020", "#181008")}
    <rect x="40" y="150" width="120" height="80" rx="10" fill="#efe6cf" opacity="0.9"/>
    <rect x="200" y="150" width="120" height="80" rx="10" fill="#efe6cf" opacity="0.9"/>
    ${wordmark("Bridge", "MAHJONG")}`),

  "mahjong-aztec": (id) => wrap(id, `
    ${bg("#6b3a18", "#241008")}
    ${[[150,220],[120,180],[180,180],[90,140],[150,140],[210,140],[120,100],[180,100]].map(([x,y])=>
      `<rect x="${x}" y="${y}" width="40" height="52" rx="6" fill="#efe6cf"/>`).join("")}
    ${wordmark("Aztec", "MAHJONG")}`),

  "daily-mahjong": (id) => wrap(id, `
    ${bg("#7a3228", "#281008")}
    <rect x="110" y="100" width="50" height="64" rx="6" fill="#efe6cf"/>
    <rect x="200" y="100" width="50" height="64" rx="6" fill="#efe6cf"/>
    <text x="180" y="280" text-anchor="middle" fill="#e8c97a" font-size="16" letter-spacing="4">TODAY</text>
    ${wordmark("Daily Mahjong", "TURTLE")}`),

  "killer-sudoku": (id) => wrap(id, `
    ${bg("#1a2844", "#0a1018")}
    ${[0,1,2,3,4,5,6,7,8].map((i) => `<rect x="${70 + (i%3)*74}" y="${70 + Math.floor(i/3)*74}" width="68" height="68" fill="#12553c" stroke="#e8c97a" stroke-dasharray="4 3" rx="4"/>`).join("")}
    <text x="180" y="320" text-anchor="middle" fill="#e8c97a" font-size="22" font-weight="800">17</text>
    ${wordmark("Killer", "CAGE SUMS")}`),

  "daily-killer-sudoku": (id) => wrap(id, `
    ${bg("#142838", "#060c14")}
    ${[0,1,2,3,4,5,6,7,8].map((i) => `<rect x="${70 + (i%3)*74}" y="${70 + Math.floor(i/3)*74}" width="68" height="68" fill="#12553c" stroke="#e8c97a" stroke-dasharray="4 3" rx="4"/>`).join("")}
    <text x="180" y="320" text-anchor="middle" fill="#e8c97a" font-size="14" letter-spacing="4">TODAY</text>
    ${wordmark("Daily Killer", "CAGES")}`),

  "kakuro": (id) => wrap(id, `
    ${bg("#2a3a52", "#101820")}
    <rect x="70" y="80" width="80" height="80" fill="#1a1a1a"/>
    <text x="110" y="110" text-anchor="middle" fill="#e8c97a" font-size="14">4↓</text>
    <text x="130" y="145" text-anchor="middle" fill="#e8c97a" font-size="14">16→</text>
    <rect x="150" y="80" width="80" height="80" fill="#12553c"/>
    <text x="190" y="135" text-anchor="middle" fill="#f3ead7" font-size="36" font-weight="800">9</text>
    ${wordmark("Kakuro", "CROSS SUMS")}`),

  "daily-kakuro": (id) => wrap(id, `
    ${bg("#1a2844", "#0a1018")}
    <rect x="70" y="80" width="80" height="80" fill="#1a1a1a"/>
    <text x="110" y="110" text-anchor="middle" fill="#e8c97a" font-size="14">4↓</text>
    <text x="130" y="145" text-anchor="middle" fill="#e8c97a" font-size="14">16→</text>
    <rect x="150" y="80" width="80" height="80" fill="#12553c"/>
    <text x="190" y="135" text-anchor="middle" fill="#f3ead7" font-size="36" font-weight="800">9</text>
    <text x="180" y="320" text-anchor="middle" fill="#e8c97a" font-size="14" letter-spacing="4">TODAY</text>
    ${wordmark("Daily Kakuro", "CROSS SUMS")}`),

  "backgammon": (id) => wrap(id, `
    ${bg("#5a3a1a", "#201008")}
    ${[0,1,2,3,4,5].map((i) => `<ellipse cx="${70 + i * 45}" cy="${i % 2 ? 280 : 120}" rx="18" ry="18" fill="#3d8b7a"/>`).join("")}
    ${[0,1,2,3].map((i) => `<ellipse cx="${250 + i * 45}" cy="${i % 2 ? 120 : 280}" rx="18" ry="18" fill="#c45c4a"/>`).join("")}
    ${wordmark("Backgammon", "BEAR OFF")}`),

  "gin-rummy": (id) => wrap(id, `
    ${bg("#2a4a28", "#0a1808")}
    ${face(90, 160, "J", "h", 1.0, -10)}
    ${face(150, 150, "10", "d", 1.05, -4)}
    ${face(210, 160, "3", "c", 1.0, 6)}
    ${face(270, 155, "A", "s", 1.05, 12)}
    ${wordmark("Gin Rummy", "MELD  ·  KNOCK")}`)
};

export function thumbSvg(g) {
  const fn = POSTERS[g.id];
  if (fn) return fn(g.id);
  return wrap(g.id, `${bg("#1a1814", "#000")}${wordmark(g.title, g.category.toUpperCase())}`);
}

export function heroFanSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 360" fill="none" role="img" aria-hidden="true">
  <defs>
    <filter id="card-shadow" x="-40%" y="-30%" width="180%" height="180%">
      <feDropShadow dx="0" dy="12" stdDeviation="9" flood-color="#000" flood-opacity="0.46"/>
    </filter>
  </defs>
  <ellipse cx="240" cy="228" rx="198" ry="102" fill="#0a3d2b"/>
  <ellipse cx="240" cy="228" rx="198" ry="102" fill="none" stroke="#e8c97a" stroke-width="5" opacity="0.42"/>
  <ellipse cx="240" cy="176" rx="132" ry="44" fill="#fff" opacity="0.06"/>
  <g filter="url(#card-shadow)">
    ${cardBack(132, 176, 1.18, -22)}
    ${face(198, 160, "10", "h", 1.24, -8)}
    ${face(268, 154, "A", "s", 1.38, 5)}
    ${cardBack(338, 178, 1.18, 20)}
  </g>
</svg>`;
}
