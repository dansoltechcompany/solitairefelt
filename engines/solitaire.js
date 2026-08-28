(function () {
  const SUITS = ["s", "h", "c", "d"];
  const GLYPH = { s: "♠", h: "♥", c: "♣", d: "♦" };
  const RANK = [null, "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  const red = (s) => s === "h" || s === "d";

  function deck52() {
    const d = [];
    let n = 0;
    for (const s of SUITS) for (let r = 1; r <= 13; r++) d.push({ s, r, up: false, id: n++ });
    return d;
  }
  function shuffle(a, rnd) {
    const r = rnd || Math.random;
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(r() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function decks(n, rnd) {
    const d = [];
    for (let i = 0; i < n; i++) d.push(...deck52().map((c, k) => ({ ...c, id: i * 52 + k })));
    return shuffle(d, rnd);
  }

  window.BA.games.solitaire = function (board, cfg, toolbar, hud) {
    const variant = cfg.variant;
    const drawN = cfg.draw || 1;
    const spiderSuits = cfg.suits || 4;
    const rng = cfg.daily ? window.BA.mulberry(window.BA.todaySeed() + (cfg.seedOff || 0)) : Math.random;
    let state, undo = [], t0, tick;

    function makeSpiderDeck(total) {
      const suits = SUITS.slice(0, spiderSuits);
      const d = [];
      let id = 0;
      const copies = (total || 104) / (13 * suits.length);
      for (let n = 0; n < copies; n++)
        for (const s of suits) for (let r = 1; r <= 13; r++) d.push({ s, r, up: false, id: id++ });
      return shuffle(d, rng);
    }

    function deal() {
      undo = [];
      t0 = Date.now();
      if (variant === "klondike") {
        const d = shuffle(deck52(), rng);
        const tab = Array.from({ length: 7 }, () => []);
        for (let i = 0; i < 7; i++) for (let j = 0; j <= i; j++) {
          const c = d.pop();
          c.up = j === i;
          tab[i].push(c);
        }
        state = { tab, stock: d, waste: [], found: [[], [], [], []], sel: null };
      } else if (variant === "spider") {
        const d = makeSpiderDeck(104);
        const tab = Array.from({ length: 10 }, () => []);
        for (let i = 0; i < 54; i++) {
          const c = d.pop();
          c.up = i >= 44;
          tab[i % 10].push(c);
        }
        state = { tab, stock: d, waste: [], found: [], sel: null, cleared: 0 };
      } else if (variant === "freecell") {
        const d = shuffle(deck52(), rng);
        const tab = Array.from({ length: 8 }, () => []);
        d.forEach((c, i) => { c.up = true; tab[i % 8].push(c); });
        state = { tab, cells: [null, null, null, null], found: [[], [], [], []], sel: null };
      } else if (variant === "pyramid") {
        const d = shuffle(deck52(), rng);
        const py = [];
        for (let r = 0; r < 7; r++) {
          py[r] = [];
          for (let c = 0; c <= r; c++) {
            const x = d.pop();
            x.up = true;
            py[r].push(x);
          }
        }
        state = { py, stock: d, waste: [], sel: null };
      } else if (variant === "tripeaks") {
        const d = shuffle(deck52(), rng);
        const py = [];
        const rows = [3, 6, 9, 10];
        rows.forEach((n, r) => {
          py[r] = [];
          for (let i = 0; i < n; i++) { const c = d.pop(); c.up = r === 3; py[r].push(c); }
        });
        const waste = [d.pop()];
        waste[0].up = true;
        state = { py, stock: d, waste, sel: null };
      } else if (variant === "yukon") {
        const d = shuffle(deck52(), rng);
        const tab = Array.from({ length: 7 }, () => []);
        tab[0].push(Object.assign(d.pop(), { up: true }));
        for (let i = 1; i < 7; i++) {
          for (let j = 0; j < i; j++) tab[i].push(Object.assign(d.pop(), { up: false }));
          for (let j = 0; j < 5; j++) tab[i].push(Object.assign(d.pop(), { up: true }));
        }
        state = { tab, found: [[], [], [], []], sel: null };
      } else if (variant === "golf") {
        const d = shuffle(deck52(), rng);
        const tab = Array.from({ length: 7 }, () => []);
        for (let i = 0; i < 35; i++) tab[i % 7].push(Object.assign(d.pop(), { up: true }));
        const waste = [Object.assign(d.pop(), { up: true })];
        state = { tab, stock: d, waste, sel: null };
      } else if (variant === "canfield") {
        const d = shuffle(deck52(), rng);
        const reserve = [];
        for (let i = 0; i < 13; i++) reserve.push(Object.assign(d.pop(), { up: true }));
        const tab = Array.from({ length: 4 }, () => [Object.assign(d.pop(), { up: true })]);
        const base = d.pop();
        base.up = true;
        const found = [[base], [], [], []];
        state = { tab, stock: d, waste: [], reserve, found, base: base.r, sel: null };
      } else if (variant === "scorpion") {
        const d = shuffle(deck52(), rng);
        const tab = Array.from({ length: 7 }, () => []);
        for (let col = 0; col < 7; col++) {
          for (let r = 0; r < 7; r++) {
            const c = d.pop();
            c.up = !(col < 4 && r < 3);
            tab[col].push(c);
          }
        }
        state = { tab, stock: d, sel: null, cleared: 0 };
      } else if (variant === "fortythieves") {
        const d = decks(2, rng);
        const tab = Array.from({ length: 10 }, () => []);
        for (let i = 0; i < 10; i++) for (let j = 0; j < 4; j++) tab[i].push(Object.assign(d.pop(), { up: true }));
        state = { tab, stock: d, waste: [], found: Array.from({ length: 8 }, () => []), sel: null };
      } else if (variant === "bakersdozen") {
        const d = shuffle(deck52(), rng);
        const tab = Array.from({ length: 13 }, () => []);
        for (let i = 0; i < 52; i++) tab[i % 13].push(Object.assign(d.pop(), { up: true }));
        tab.forEach((pile) => {
          const k = pile.findIndex((c) => c.r === 13);
          if (k > 0) pile.unshift(pile.splice(k, 1)[0]);
        });
        state = { tab, found: [[], [], [], []], sel: null };
      } else if (variant === "spiderette") {
        const d = makeSpiderDeck(52);
        const tab = Array.from({ length: 7 }, () => []);
        for (let i = 0; i < 7; i++) for (let j = 0; j <= i; j++) {
          const c = d.pop();
          c.up = j === i;
          tab[i].push(c);
        }
        state = { tab, stock: d, waste: [], found: [], sel: null, cleared: 0 };
      }
      draw();
    }

    function pushUndo() { undo.push(JSON.parse(JSON.stringify(state))); if (undo.length > 80) undo.shift(); }
    function top(arr) { return arr[arr.length - 1]; }
    function colorAlt(a, b) { return red(a.s) !== red(b.s); }

    function runFrom(col, idx) {
      const pile = state.tab[col];
      if (!pile[idx] || !pile[idx].up) return null;
      for (let i = idx; i < pile.length - 1; i++) {
        const a = pile[i], b = pile[i + 1];
        if (variant === "spider" || variant === "spiderette") {
          if (a.s !== b.s || a.r !== b.r + 1) return null;
        } else if (variant === "fortythieves" || variant === "bakersdozen") {
          return null;
        } else if (variant === "scorpion") {
          /* scorpion can move disordered stacks from any face-up card */
        } else if (variant === "yukon") {
          /* yukon too */
        } else {
          if (!colorAlt(a, b) || a.r !== b.r + 1) return null;
        }
      }
      return pile.slice(idx);
    }

    function canOnTab(dest, card) {
      if (!dest) {
        if (variant === "bakersdozen") return false;
        if (variant === "spider" || variant === "spiderette" || variant === "scorpion" || variant === "freecell" || variant === "fortythieves") return true;
        return card.r === 13;
      }
      if (variant === "fortythieves") return dest.s === card.s && dest.r === card.r + 1;
      if (variant === "bakersdozen") return dest.r === card.r + 1;
      if (variant === "spider" || variant === "spiderette" || variant === "scorpion") return dest.r === card.r + 1;
      return colorAlt(dest, card) && dest.r === card.r + 1;
    }

    function canFound(f, card) {
      if (variant === "canfield") {
        if (!f.length) return card.r === state.base;
        const nxt = top(f).r === 13 ? 1 : top(f).r + 1;
        return card.s === top(f).s && card.r === nxt;
      }
      if (!f.length) return card.r === 1;
      return card.s === top(f).s && card.r === top(f).r + 1;
    }

    function toast(msg) {
      if (window.BA && typeof window.BA.toast === "function") window.BA.toast(msg);
    }

    function tabFailMsg(dest, card) {
      if (!dest) {
        if (variant === "bakersdozen") return "Empty columns stay empty in Baker's Dozen.";
        return "Only a king can fill an empty column.";
      }
      if (variant === "fortythieves") {
        if (dest.s !== card.s) return "Build down in the same suit.";
        return "Build down by one rank.";
      }
      if (variant === "bakersdozen") return "Build down by one rank (any suit).";
      if (variant === "spider" || variant === "spiderette" || variant === "scorpion") {
        return "Build down by one rank.";
      }
      if (!colorAlt(dest, card) && dest.r !== card.r + 1) return "Build down, alternating colors.";
      if (!colorAlt(dest, card)) return "Colors must alternate.";
      return "Build down by one rank.";
    }

    function foundFailMsg(f, card) {
      if (variant === "canfield") {
        if (!f.length) return "Start this foundation on the base rank.";
        return "Foundations build up in suit (wrapping king to ace).";
      }
      if (!f.length) return "Foundations start with an ace.";
      if (card.s !== top(f).s) return "Foundations build in the same suit.";
      return "Build up by one rank on the foundation.";
    }

    function moveFailMsg(from, to) {
      let cards;
      if (from.kind === "tab") {
        cards = runFrom(from.col, from.idx);
        if (!cards) {
          if (variant === "spider" || variant === "spiderette") return "Only same-suit runs can move together.";
          if (variant === "fortythieves" || variant === "bakersdozen") return "Only one card can move at a time.";
          return "That stack is not a valid run.";
        }
      } else if (from.kind === "waste") cards = state.waste && state.waste.length ? [top(state.waste)] : null;
      else if (from.kind === "cell") cards = state.cells[from.i] ? [state.cells[from.i]] : null;
      else if (from.kind === "reserve") cards = state.reserve && state.reserve.length ? [top(state.reserve)] : null;
      else return "That move is not allowed.";
      if (!cards || !cards[0]) return "Nothing to move.";

      if (to.kind === "found") {
        if (cards.length !== 1) return "Only one card can go to the foundation.";
        return foundFailMsg(state.found[to.i], cards[0]);
      }
      if (to.kind === "cell") {
        if (cards.length !== 1) return "Free cells hold one card only.";
        if (state.cells[to.i]) return "That free cell is already full.";
        return "That move is not allowed.";
      }
      if (to.kind === "tab") {
        const dest = top(state.tab[to.col]);
        if (!canOnTab(dest, cards[0])) return tabFailMsg(dest, cards[0]);
        if (variant === "freecell" && cards.length > 1) {
          const emptyCells = state.cells.filter((c) => !c).length;
          const emptyCols = state.tab.filter((p, i) => !p.length && i !== to.col).length;
          if (cards.length > (emptyCells + 1) * (2 ** emptyCols)) {
            return "Not enough free cells to move that stack.";
          }
        }
      }
      return "That move is not allowed.";
    }

    function expose(col) {
      const p = state.tab[col];
      if (p && p.length && !top(p).up) top(p).up = true;
    }

    function clearSpiderRuns() {
      if (variant !== "spider" && variant !== "spiderette" && variant !== "scorpion") return;
      state.tab.forEach((pile) => {
        if (pile.length < 13) return;
        const slice = pile.slice(-13);
        if (!slice.every((c, i) => c.up && c.s === slice[0].s && c.r === 13 - i)) return;
        pile.splice(-13);
        state.cleared = (state.cleared || 0) + 1;
      });
    }

    function win() {
      if (variant === "klondike" || variant === "yukon" || variant === "canfield" || variant === "freecell" || variant === "fortythieves" || variant === "bakersdozen")
        return (state.found || []).every((f) => f.length === 13) && (variant !== "canfield" || state.found.reduce((n, f) => n + f.length, 0) === 52) && (variant !== "fortythieves" || state.found.reduce((n, f) => n + f.length, 0) === 104);
      if (variant === "spider") return state.cleared >= 8;
      if (variant === "spiderette") return state.cleared >= 4;
      if (variant === "scorpion") return state.tab.every((p) => !p.length) || state.cleared >= 4;
      if (variant === "pyramid") return state.py.every((row) => row.every((c) => !c));
      if (variant === "tripeaks") return state.py.every((row) => row.every((c) => !c));
      if (variant === "golf") return state.tab.every((p) => !p.length);
      return false;
    }

    function locSel() { return state.sel; }

    function clickStock() {
      pushUndo();
      if (variant === "spider" || variant === "spiderette") {
        const n = variant === "spiderette" ? 7 : 10;
        if (state.tab.some((p) => !p.length)) {
          undo.pop();
          toast("Fill empty columns before dealing.");
          return;
        }
        if (!state.stock.length) {
          undo.pop();
          toast("No cards left in the stock.");
          return;
        }
        for (let i = 0; i < n; i++) {
          const c = state.stock.pop();
          c.up = true;
          state.tab[i].push(c);
        }
      } else if (variant === "scorpion") {
        if (!state.stock.length) {
          undo.pop();
          toast("No cards left to deal.");
          return;
        }
        for (let i = 0; i < 3 && state.stock.length; i++) {
          const c = state.stock.pop();
          c.up = true;
          state.tab[i].push(c);
        }
      } else if (state.stock && state.stock.length) {
        for (let i = 0; i < drawN && state.stock.length; i++) {
          const c = state.stock.pop();
          c.up = true;
          state.waste.push(c);
        }
      } else if (state.waste && variant !== "golf") {
        while (state.waste.length) {
          const c = state.waste.pop();
          c.up = false;
          state.stock.push(c);
        }
      } else {
        undo.pop();
        toast("No cards left in the stock.");
        return;
      }
      state.sel = null;
      draw();
    }

    function tryMoveToFound(card, from) {
      if (!state.found || !card) return false;
      for (let i = 0; i < state.found.length; i++) {
        if (canFound(state.found[i], card)) {
          pushUndo();
          from();
          state.found[i].push(card);
          return true;
        }
      }
      return false;
    }

    function pyramidCovered(r, c) {
      if (!state.py[r][c]) return true;
      if (r === state.py.length - 1) return false;
      return !!(state.py[r + 1][c] || state.py[r + 1][c + 1]);
    }

    function val13(c) { return c.r === 13 ? 13 : c.r === 1 ? 1 : Math.min(c.r, 13); }

    function onCard(info) {
      if (variant === "golf") {
        const wasteTop = top(state.waste);
        if (!wasteTop) return;
        if (info.kind === "tab") {
          const card = top(state.tab[info.col]);
          if (!card || Math.abs(card.r - wasteTop.r) !== 1) {
            toast("Play a card one rank higher or lower.");
            return;
          }
          pushUndo();
          state.waste.push(state.tab[info.col].pop());
          draw();
        }
        return;
      }
      if (variant === "tripeaks") {
        if (info.kind === "py") {
          const card = state.py[info.r][info.c];
          if (!card || pyramidCoveredTri(info.r, info.c)) return;
          const w = top(state.waste);
          if (!w) return;
          const wrap = (card.r === 1 && w.r === 13) || (card.r === 13 && w.r === 1);
          if (Math.abs(card.r - w.r) === 1 || wrap) {
            pushUndo();
            state.waste.push(card);
            state.py[info.r][info.c] = null;
            faceTri();
            draw();
          } else {
            toast("Play a card one rank higher or lower.");
          }
        }
        return;
      }
      if (variant === "pyramid") {
        const pick = info.kind === "py" ? state.py[info.r][info.c]
          : info.kind === "waste" ? top(state.waste) : null;
        if (info.kind === "py" && pyramidCovered(info.r, info.c)) return;
        if (!pick) return;
        if (pick.r === 13) {
          pushUndo();
          removePyramid(info);
          draw();
          return;
        }
        if (!state.sel) { state.sel = info; draw(); return; }
        const a = state.sel;
        const ca = a.kind === "py" ? state.py[a.r][a.c] : top(state.waste);
        if (ca && pick && ca.id !== pick.id && val13(ca) + val13(pick) === 13) {
          pushUndo();
          removePyramid(a);
          removePyramid(info);
          state.sel = null;
          draw();
          return;
        }
        if (ca && pick && ca.id !== pick.id) toast("Cards must add up to 13.");
        state.sel = info;
        draw();
        return;
      }

      if (info.kind === "stock") { clickStock(); return; }
      if (info.kind === "found" && !state.sel) return;

      if (!state.sel) {
        if (info.kind === "waste" && !state.waste.length) return;
        if (info.kind === "tab" && (!state.tab[info.col].length || !state.tab[info.col][info.idx].up)) return;
        if (info.kind === "cell" && !state.cells[info.i]) return;
        if (info.kind === "reserve" && !state.reserve.length) return;
        state.sel = info;
        draw();
        return;
      }

      const from = state.sel;
      if (JSON.stringify(from) === JSON.stringify(info)) { state.sel = null; draw(); return; }

      pushUndo();
      const moved = applyMove(from, info);
      if (!moved) {
        undo.pop();
        toast(moveFailMsg(from, info));
      }
      state.sel = null;
      clearSpiderRuns();
      if (state.tab) state.tab.forEach((_, i) => expose(i));
      draw();
    }

    function pyramidCoveredTri(r, c) {
      if (r === 3) return false;
      const map = { 0: [0, 1], 1: [1, 2], 2: [2, 3] };
      /* simplified: lower row covers if neighboring tiles exist */
      if (r === 2) return !!(state.py[3][c] || state.py[3][c + 1]);
      if (r === 1) return !!(state.py[2][c] || state.py[2][c + 1]);
      if (r === 0) return !!(state.py[1][c * 2] || state.py[1][c * 2 + 1]);
      return false;
    }
    function faceTri() {
      for (let r = 0; r < state.py.length; r++)
        for (let c = 0; c < state.py[r].length; c++)
          if (state.py[r][c] && !pyramidCoveredTri(r, c)) state.py[r][c].up = true;
    }
    function removePyramid(info) {
      if (info.kind === "py") state.py[info.r][info.c] = null;
      if (info.kind === "waste") state.waste.pop();
    }

    function takeFrom(from) {
      if (from.kind === "waste") return [state.waste.pop()];
      if (from.kind === "cell") { const c = state.cells[from.i]; state.cells[from.i] = null; return [c]; }
      if (from.kind === "reserve") return [state.reserve.pop()];
      if (from.kind === "tab") {
        const run = state.tab[from.col].splice(from.idx);
        return run;
      }
      return [];
    }

    function applyMove(from, to) {
      let cards;
      if (from.kind === "tab") {
        cards = runFrom(from.col, from.idx);
        if (!cards) return false;
      } else if (from.kind === "waste") cards = [top(state.waste)];
      else if (from.kind === "cell") cards = [state.cells[from.i]];
      else if (from.kind === "reserve") cards = [top(state.reserve)];
      else return false;
      if (!cards || !cards[0]) return false;

      if (to.kind === "found") {
        if (cards.length !== 1 || !canFound(state.found[to.i], cards[0])) return false;
        takeFrom(from);
        state.found[to.i].push(cards[0]);
        return true;
      }
      if (to.kind === "cell") {
        if (cards.length !== 1 || state.cells[to.i]) return false;
        takeFrom(from);
        state.cells[to.i] = cards[0];
        return true;
      }
      if (to.kind === "tab") {
        const dest = top(state.tab[to.col]);
        if (!canOnTab(dest, cards[0])) return false;
        if (variant === "freecell" && cards.length > 1) {
          const emptyCells = state.cells.filter((c) => !c).length;
          const emptyCols = state.tab.filter((p, i) => !p.length && i !== to.col).length;
          if (cards.length > (emptyCells + 1) * (2 ** emptyCols)) return false;
        }
        takeFrom(from);
        state.tab[to.col].push(...cards);
        return true;
      }
      return false;
    }

    function elCard(c, extra) {
      const d = document.createElement("div");
      d.className = "playing-card " + (c.up ? (red(c.s) ? "red" : "black") : "back") + (extra || "");
      d.dataset.id = c.id;
      d.innerHTML = c.up ? window.BA.cardHTML(c) : window.BA.cardBackHTML();
      return d;
    }

    function selected(info) {
      return state.sel && JSON.stringify(state.sel) === JSON.stringify(info);
    }

    function fitLayout(root) {
      const tabCols = (state.tab && state.tab.length) || 0;
      const topCols = (state.stock ? 1 : 0) + (state.waste ? 1 : 0) + (state.cells ? state.cells.length : 0) + (state.reserve ? 1 : 0) + (state.found ? state.found.length : 0);
      const cols = Math.max(tabCols, topCols, 7);
      root.className = "solitaire solitaire--" + variant;
      const avail = Math.max(260, board.clientWidth || 900);
      const narrow = avail < 520;
      const gap = cols >= 10 ? (narrow ? 2 : 6) : cols >= 8 ? (narrow ? 4 : 8) : (narrow ? 4 : 12);
      const target = cols >= 10 ? 82 : cols >= 8 ? 84 : 94;
      const fitted = Math.floor((avail - gap * (cols - 1)) / cols);
      const cw = Math.max(narrow ? 32 : 80, Math.min(target, fitted));
      const ch = Math.round(cw * 314 / 225);
      const layoutCols = tabCols || cols;
      const tableW = layoutCols * cw + (layoutCols - 1) * gap;
      root.style.setProperty("--card-w", cw + "px");
      root.style.setProperty("--card-h", ch + "px");
      root.style.setProperty("--card-gap", gap + "px");
      root.style.setProperty("--card-peek", Math.max(26, Math.round(cw * 0.32)) + "px");
      root.style.setProperty("--card-back-peek", Math.max(12, Math.round(cw * 0.14)) + "px");
      root.style.setProperty("--table-w", Math.max(tableW, topCols * cw + Math.max(0, topCols - 1) * gap) + "px");
      return cw;
    }

    function draw() {
      board.innerHTML = "";
      const root = document.createElement("div");
      const cw = fitLayout(root);

      if (variant === "pyramid" || variant === "tripeaks") {
        const wrap = document.createElement("div");
        wrap.className = "solitaire-pyramid";
        wrap.style.position = "relative";
        const scale = cw / 84;
        const ch = Math.round(cw * 314 / 225);
        const rowStep = 28;
        const rows = state.py.length;
        let maxRight = cw;
        wrap.style.height = Math.round((rows - 1) * rowStep * scale + ch) + "px";
        wrap.style.marginBottom = "8px";
        state.py.forEach((row, r) => {
          row.forEach((c, col) => {
            if (!c) return;
            const node = elCard(c, selected({ kind: "py", r, c: col }) ? " selected" : "");
            const left = Math.round((36 + col * 86 + (7 - row.length) * 40) * scale);
            node.style.left = left + "px";
            node.style.top = Math.round((r * rowStep) * scale) + "px";
            maxRight = Math.max(maxRight, left + cw);
            node.onclick = () => onCard({ kind: "py", r, c: col });
            wrap.appendChild(node);
          });
        });
        wrap.style.width = maxRight + "px";
        root.style.setProperty("--table-w", maxRight + "px");
        root.appendChild(wrap);
        const row = document.createElement("div");
        row.className = "solitaire-row solitaire-row--stock";
        row.appendChild(pileBox("Stock", state.stock && state.stock.length, () => clickStock()));
        row.appendChild(pileCards("Waste", state.waste, "waste"));
        root.appendChild(row);
      } else {
        const topRow = document.createElement("div");
        topRow.className = "solitaire-top";
        if (state.stock) topRow.appendChild(pileBox("Stock", state.stock.length, () => clickStock()));
        if (state.waste) topRow.appendChild(pileCards("Waste", state.waste, "waste"));
        if (state.cells) state.cells.forEach((c, i) => {
          const p = document.createElement("div");
          p.className = "pile";
          p.title = "Free cell";
          if (c) {
            const n = elCard(c, selected({ kind: "cell", i }) ? " selected" : "");
            n.style.position = "relative";
            n.onclick = () => onCard({ kind: "cell", i });
            p.appendChild(n);
          } else p.onclick = () => state.sel && onCard({ kind: "cell", i });
          topRow.appendChild(p);
        });
        if (state.reserve) topRow.appendChild(pileCards("Reserve", state.reserve, "reserve"));
        if (state.found) state.found.forEach((f, i) => {
          const p = document.createElement("div");
          p.className = "pile pile-found";
          p.title = "Foundation";
          p.dataset.suit = GLYPH[SUITS[i % 4]];
          if (f.length) {
            const n = elCard(top(f));
            n.style.position = "relative";
            p.appendChild(n);
          }
          p.onclick = () => state.sel && onCard({ kind: "found", i });
          topRow.appendChild(p);
        });
        root.appendChild(topRow);

        if (state.tab) {
          const row = document.createElement("div");
          row.className = "solitaire-row";
          state.tab.forEach((pile, col) => {
            const p = document.createElement("div");
            p.className = "pile pile-tab" + (pile.length ? "" : " pile-empty");
            /* Reserve only a little headroom so empty piles stay droppable without a tall empty felt. */
            p.style.minHeight = pile.length
              ? "var(--card-h)"
              : "calc(var(--card-h) + 2 * var(--card-back-peek))";
            p.style.width = "var(--card-w)";
            if (!pile.length) p.onclick = () => state.sel && onCard({ kind: "tab", col, idx: 0 });
            pile.forEach((c, idx) => {
              const n = elCard(c, selected({ kind: "tab", col, idx }) ? " selected" : "");
              n.style.position = "relative";
              n.style.marginTop = idx
                ? (c.up && pile[idx - 1] && pile[idx - 1].up
                  ? "calc(var(--card-peek) - var(--card-h))"
                  : "calc(var(--card-back-peek) - var(--card-h))")
                : "0";
              n.style.zIndex = idx;
              n.onclick = (e) => { e.stopPropagation(); onCard({ kind: "tab", col, idx }); };
              p.appendChild(n);
            });
            row.appendChild(p);
          });
          root.appendChild(row);
        }
      }
      board.appendChild(root);
      const sec = Math.floor((Date.now() - t0) / 1000);
      hud.textContent = win()
        ? "Cleared — well played."
        : `Time ${sec}s${state.cleared != null ? " · Runs " + state.cleared : ""}${state.waste && variant === "golf" ? " · Left " + state.tab.reduce((n, p) => n + p.length, 0) : ""}`;
      if (win()) {
        const best = window.BA.score.get(variant) || 1e9;
        if (sec < best) window.BA.score.set(variant, sec);
      }
    }

    function pileBox(label, n, fn) {
      const p = document.createElement("div");
      p.className = "pile";
      p.title = label;
      p.onclick = fn;
      if (n) {
        const d = document.createElement("div");
        d.className = "playing-card back";
        d.style.position = "relative";
        d.innerHTML = window.BA.cardBackHTML();
        p.appendChild(d);
      }
      return p;
    }
    function pileCards(label, arr, kind) {
      const p = document.createElement("div");
      p.className = "pile";
      p.title = label;
      if (arr.length) {
        const n = elCard(top(arr), selected({ kind }) ? " selected" : "");
        n.style.position = "relative";
        n.onclick = () => onCard({ kind });
        p.appendChild(n);
      } else p.onclick = () => kind === "waste" && onCard({ kind: "stock" });
      return p;
    }

    toolbar.innerHTML = "";
    [["New game", deal, "primary"], ["Undo", () => { if (undo.length) { state = undo.pop(); draw(); } }, "undo"]].forEach(([label, fn, cls]) => {
      const b = document.createElement("button");
      b.className = "btn " + cls;
      b.textContent = cfg.daily && cls === "primary" ? "Today's deal" : label;
      b.onclick = fn;
      toolbar.appendChild(b);
    });
    deal();
    if (!board._baResize) {
      let t;
      board._baResize = () => {
        clearTimeout(t);
        t = setTimeout(() => { if (state) draw(); }, 80);
      };
      window.addEventListener("resize", board._baResize);
    }
    clearInterval(tick);
    tick = setInterval(() => {
      if (!t0 || win()) return;
      const sec = Math.floor((Date.now() - t0) / 1000);
      hud.textContent = `Time ${sec}s${state.cleared != null ? " · Runs " + state.cleared : ""}`;
    }, 1000);
  };
})();
