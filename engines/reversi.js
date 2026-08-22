(function () {
  window.BA.games.reversi = function (board, cfg, toolbar, hud) {
    let g, turn;
    function reset() {
      g = Array.from({ length: 8 }, () => Array(8).fill(0));
      g[3][3] = g[4][4] = 2;
      g[3][4] = g[4][3] = 1;
      turn = 1;
      draw();
    }
    function flips(r, c, p) {
      const out = [];
      if (g[r][c]) return out;
      for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) {
        if (!dr && !dc) continue;
        const line = [];
        let rr = r + dr, cc = c + dc;
        while (rr >= 0 && cc >= 0 && rr < 8 && cc < 8 && g[rr][cc] && g[rr][cc] !== p) {
          line.push([rr, cc]);
          rr += dr; cc += dc;
        }
        if (line.length && rr >= 0 && cc >= 0 && rr < 8 && cc < 8 && g[rr][cc] === p) out.push(...line);
      }
      return out;
    }
    function moves(p) {
      const m = [];
      for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) if (flips(r, c, p).length) m.push([r, c]);
      return m;
    }
    function play(r, c, p) {
      const f = flips(r, c, p);
      if (!f.length) return false;
      g[r][c] = p;
      f.forEach(([y, x]) => { g[y][x] = p; });
      return true;
    }
    function cpu() {
      const m = moves(2);
      if (m.length) {
        m.sort((a, b) => flips(b[0], b[1], 2).length - flips(a[0], a[1], 2).length);
        play(m[0][0], m[0][1], 2);
      }
      turn = 1;
      draw();
    }
    function draw() {
      board.innerHTML = "";
      const box = document.createElement("div");
      box.className = "rev-board";
      box.style.gridTemplateColumns = "repeat(8,1fr)";
      for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) {
        const s = document.createElement("div");
        s.className = "sq " + ((r + c) % 2 ? "dark" : "light");
        s.textContent = g[r][c] === 1 ? "●" : g[r][c] === 2 ? "○" : "";
        s.onclick = () => {
          if (turn !== 1) return;
          if (!play(r, c, 1)) return;
          turn = 2;
          draw();
          setTimeout(cpu, 200);
        };
        box.appendChild(s);
      }
      board.appendChild(box);
      let a = 0, b = 0;
      g.flat().forEach((v) => { if (v === 1) a++; if (v === 2) b++; });
      hud.textContent = `You ${a} · CPU ${b}`;
    }
    toolbar.innerHTML = "";
    const n = document.createElement("button");
    n.className = "btn primary";
    n.textContent = "New game";
    n.onclick = reset;
    toolbar.appendChild(n);
    reset();
  };
})();
