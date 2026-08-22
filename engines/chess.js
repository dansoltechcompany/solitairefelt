(function () {
  const GLYPH = { P: "♙", N: "♘", B: "♗", R: "♖", Q: "♕", K: "♔", p: "♟", n: "♞", b: "♝", r: "♜", q: "♛", k: "♚" };
  const VAL = { P: 100, N: 320, B: 330, R: 500, Q: 900, K: 20000, p: -100, n: -320, b: -330, r: -500, q: -900, k: -20000 };

  function start() {
    return [
      "r","n","b","q","k","b","n","r",
      "p","p","p","p","p","p","p","p",
      "","","","","","","","",
      "","","","","","","","",
      "","","","","","","","",
      "","","","","","","","",
      "P","P","P","P","P","P","P","P",
      "R","N","B","Q","K","B","N","R"
    ];
  }
  const isW = (p) => p && p === p.toUpperCase();
  const sq = (x, y) => y * 8 + x;
  const xy = (i) => [i % 8, Math.floor(i / 8)];

  function attacks(b, from, to) {
    const p = b[from];
    if (!p) return false;
    const [fx, fy] = xy(from), [tx, ty] = xy(to);
    const dx = tx - fx, dy = ty - fy;
    const adx = Math.abs(dx), ady = Math.abs(dy);
    const piece = p.toUpperCase();
    const empty = (x, y) => b[sq(x, y)] === "";
    const ray = (sx, sy, n) => {
      for (let i = 1; i < n; i++) if (!empty(fx + sx * i, fy + sy * i)) return false;
      return true;
    };
    if (piece === "P") {
      const dir = isW(p) ? -1 : 1;
      if (dx === 0 && dy === dir && b[to] === "") return true;
      if (dx === 0 && dy === 2 * dir && b[to] === "" && empty(fx, fy + dir) && fy === (isW(p) ? 6 : 1)) return true;
      if (adx === 1 && dy === dir && b[to] && isW(b[to]) !== isW(p)) return true;
      return false;
    }
    if (piece === "N") return (adx === 1 && ady === 2) || (adx === 2 && ady === 1);
    if (piece === "K") return adx <= 1 && ady <= 1;
    if (piece === "B") return adx === ady && adx > 0 && ray(Math.sign(dx), Math.sign(dy), adx);
    if (piece === "R") return ((dx === 0) !== (dy === 0)) && ray(Math.sign(dx), Math.sign(dy), Math.max(adx, ady));
    if (piece === "Q") return attacks(Object.assign(b.slice(), { [from]: adx === ady ? "B" : "R" }), from, to) ||
      ((adx === ady || ((dx === 0) !== (dy === 0))) && ray(Math.sign(dx) || 0, Math.sign(dy) || 0, Math.max(adx, ady)));
    return false;
  }

  function legalMoves(b, white) {
    const moves = [];
    for (let i = 0; i < 64; i++) {
      if (!b[i] || isW(b[i]) !== white) continue;
      for (let j = 0; j < 64; j++) {
        if (i === j) continue;
        if (b[j] && isW(b[j]) === white) continue;
        if (!pseudo(b, i, j)) continue;
        const nb = b.slice();
        nb[j] = nb[i] === "P" && Math.floor(j / 8) === 0 ? "Q" : nb[i] === "p" && Math.floor(j / 8) === 7 ? "q" : nb[i];
        nb[i] = "";
        if (inCheck(nb, white)) continue;
        moves.push([i, j]);
      }
    }
    return moves;
  }

  function pseudo(b, from, to) {
    const p = b[from];
    const [fx, fy] = xy(from), [tx, ty] = xy(to);
    const dx = tx - fx, dy = ty - fy;
    const adx = Math.abs(dx), ady = Math.abs(dy);
    const piece = p.toUpperCase();
    const pathClear = () => {
      const sx = Math.sign(dx), sy = Math.sign(dy);
      const n = Math.max(adx, ady);
      for (let k = 1; k < n; k++) if (b[sq(fx + sx * k, fy + sy * k)]) return false;
      return true;
    };
    if (piece === "P") {
      const dir = isW(p) ? -1 : 1;
      if (dx === 0 && dy === dir && !b[to]) return true;
      if (dx === 0 && dy === 2 * dir && !b[to] && !b[sq(fx, fy + dir)] && fy === (isW(p) ? 6 : 1)) return true;
      if (adx === 1 && dy === dir && b[to] && isW(b[to]) !== isW(p)) return true;
      return false;
    }
    if (piece === "N") return (adx === 1 && ady === 2) || (adx === 2 && ady === 1);
    if (piece === "K") return adx <= 1 && ady <= 1 && (adx + ady) > 0;
    if (piece === "B") return adx === ady && adx > 0 && pathClear();
    if (piece === "R") return adx * ady === 0 && adx + ady > 0 && pathClear();
    if (piece === "Q") return ((adx === ady && adx > 0) || (adx * ady === 0 && adx + ady > 0)) && pathClear();
    return false;
  }

  function kingAt(b, white) {
    const k = white ? "K" : "k";
    return b.indexOf(k);
  }
  function inCheck(b, white) {
    const k = kingAt(b, white);
    if (k < 0) return true;
    for (let i = 0; i < 64; i++) {
      if (!b[i] || isW(b[i]) === white) continue;
      if (pseudo(b, i, k)) return true;
    }
    return false;
  }
  function score(b) {
    return b.reduce((n, p) => n + (VAL[p] || 0), 0);
  }
  function minimax(b, depth, white) {
    const ms = legalMoves(b, white);
    if (!depth || !ms.length) return { v: score(b) + (white ? -ms.length : ms.length), m: ms[0] };
    let best = white ? { v: -99999 } : { v: 99999 };
    for (const m of ms.slice(0, 40)) {
      const nb = b.slice();
      nb[m[1]] = nb[m[0]]; nb[m[0]] = "";
      if (nb[m[1]] === "P" && Math.floor(m[1] / 8) === 0) nb[m[1]] = "Q";
      if (nb[m[1]] === "p" && Math.floor(m[1] / 8) === 7) nb[m[1]] = "q";
      const r = minimax(nb, depth - 1, !white);
      if (white ? r.v > best.v : r.v < best.v) best = { v: r.v, m };
    }
    return best;
  }

  window.BA.games.chess = function (board, cfg, toolbar, hud) {
    let b = start(), sel = null, turn = true, over = "";
    function draw() {
      board.innerHTML = "";
      const g = document.createElement("div");
      g.className = "chess-board";
      g.style.gridTemplateColumns = "repeat(8,1fr)";
      b.forEach((p, i) => {
        const s = document.createElement("div");
        const [x, y] = xy(i);
        s.className = "sq " + ((x + y) % 2 ? "dark" : "light") + (sel === i ? " mark" : "");
        s.textContent = GLYPH[p] || "";
        s.onclick = () => click(i);
        g.appendChild(s);
      });
      board.appendChild(g);
      hud.textContent = over || (turn ? "Your move (white)" : "Computer thinking…");
    }
    function click(i) {
      if (over || !turn) return;
      if (sel == null) {
        if (b[i] && isW(b[i])) sel = i;
        draw();
        return;
      }
      const ok = legalMoves(b, true).some((m) => m[0] === sel && m[1] === i);
      if (ok) {
        b[i] = b[sel] === "P" && Math.floor(i / 8) === 0 ? "Q" : b[sel];
        b[sel] = "";
        sel = null;
        turn = false;
        draw();
        setTimeout(cpu, 80);
      } else sel = b[i] && isW(b[i]) ? i : null;
      draw();
    }
    function cpu() {
      const ms = legalMoves(b, false);
      if (!ms.length) { over = inCheck(b, false) ? "Checkmate — you win" : "Stalemate"; draw(); return; }
      const pick = minimax(b, 2, false).m || ms[0];
      b[pick[1]] = b[pick[0]] === "p" && Math.floor(pick[1] / 8) === 7 ? "q" : b[pick[0]];
      b[pick[0]] = "";
      turn = true;
      if (!legalMoves(b, true).length) over = inCheck(b, true) ? "Checkmate — computer wins" : "Stalemate";
      draw();
    }
    toolbar.innerHTML = "";
    const n = document.createElement("button");
    n.className = "btn primary";
    n.textContent = "New game";
    n.onclick = () => { b = start(); sel = null; turn = true; over = ""; draw(); };
    toolbar.appendChild(n);
    draw();
  };
})();
