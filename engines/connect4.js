(function () {
  window.BA.games.connect4 = function (board, cfg, toolbar, hud) {
    const W = 7, H = 6;
    let g, turn, over;
    function reset() {
      g = Array.from({ length: H }, () => Array(W).fill(0));
      turn = 1;
      over = false;
      draw();
    }
    function drop(c, p) {
      for (let r = H - 1; r >= 0; r--) if (!g[r][c]) { g[r][c] = p; return r; }
      return -1;
    }
    function winner() {
      const d = [[0, 1], [1, 0], [1, 1], [1, -1]];
      for (let r = 0; r < H; r++) for (let c = 0; c < W; c++) {
        const p = g[r][c];
        if (!p) continue;
        for (const [dr, dc] of d) {
          let n = 1;
          for (let k = 1; k < 4; k++) {
            const rr = r + dr * k, cc = c + dc * k;
            if (rr < 0 || cc < 0 || rr >= H || cc >= W || g[rr][cc] !== p) break;
            n++;
          }
          if (n >= 4) return p;
        }
      }
      return g.every((row) => row.every(Boolean)) ? 3 : 0;
    }
    function cpu() {
      const opts = [];
      for (let c = 0; c < W; c++) if (!g[0][c]) opts.push(c);
      if (!opts.length) { over = true; turn = 1; draw(); return; }
      drop(opts[Math.floor(Math.random() * opts.length)], 2);
      const w = winner();
      if (w) over = true;
      turn = 1;
      draw();
    }
    function draw() {
      board.innerHTML = "";
      const box = document.createElement("div");
      box.className = "c4";
      for (let r = 0; r < H; r++) for (let c = 0; c < W; c++) {
        const d = document.createElement("div");
        d.className = "c4-cell" + (g[r][c] === 1 ? " p" : g[r][c] === 2 ? " a" : "");
        d.onclick = () => {
          if (over || turn !== 1 || g[0][c]) return;
          drop(c, 1);
          const w = winner();
          if (w) { over = true; draw(); return; }
          turn = 2;
          draw();
          setTimeout(cpu, 180);
        };
        box.appendChild(d);
      }
      board.appendChild(box);
      const w = winner();
      hud.textContent = w === 1 ? "You win" : w === 2 ? "Computer wins" : w === 3 ? "Draw" : "Drop a brass disc";
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
