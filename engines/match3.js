(function () {
  const GEMS = ["◆","●","▲","■","✚"];
  window.BA.games.match3 = function (board, cfg, toolbar, hud) {
    const N = 8;
    let g, sel, score;
    function rnd() { return Math.floor(Math.random() * GEMS.length); }
    function reset() {
      g = Array.from({ length: N }, () => Array.from({ length: N }, rnd));
      sel = null;
      score = 0;
      resolve(true);
      draw();
    }
    function matches() {
      const m = Array.from({ length: N }, () => Array(N).fill(false));
      for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
        if (x < N - 2 && g[y][x] === g[y][x + 1] && g[y][x] === g[y][x + 2]) m[y][x] = m[y][x + 1] = m[y][x + 2] = true;
        if (y < N - 2 && g[y][x] === g[y + 1][x] && g[y][x] === g[y + 2][x]) m[y][x] = m[y + 1][x] = m[y + 2][x] = true;
      }
      return m;
    }
    function resolve(silent) {
      for (let k = 0; k < 20; k++) {
        const m = matches();
        let any = false;
        for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) if (m[y][x]) { g[y][x] = -1; any = true; if (!silent) score += 10; }
        if (!any) break;
        for (let x = 0; x < N; x++) {
          const col = [];
          for (let y = N - 1; y >= 0; y--) if (g[y][x] >= 0) col.push(g[y][x]);
          for (let y = N - 1; y >= 0; y--) g[y][x] = col[N - 1 - y] == null ? rnd() : col[N - 1 - y];
        }
      }
    }
    function draw() {
      board.innerHTML = "";
      const box = document.createElement("div");
      box.className = "match-grid";
      box.style.gridTemplateColumns = `repeat(${N},1fr)`;
      g.forEach((row, y) => row.forEach((v, x) => {
        const b = document.createElement("button");
        b.className = "btn";
        b.style.height = "42px";
        b.textContent = GEMS[v];
        if (sel && sel[0] === x && sel[1] === y) b.style.borderColor = "var(--brass)";
        b.onclick = () => {
          if (!sel) { sel = [x, y]; draw(); return; }
          const [sx, sy] = sel;
          if (Math.abs(sx - x) + Math.abs(sy - y) === 1) {
            [g[sy][sx], g[y][x]] = [g[y][x], g[sy][sx]];
            const m = matches();
            const ok = m.some((r) => r.some(Boolean));
            if (!ok) [g[sy][sx], g[y][x]] = [g[y][x], g[sy][sx]];
            else resolve(false);
          }
          sel = null;
          draw();
        };
        box.appendChild(b);
      }));
      board.appendChild(box);
      hud.textContent = "Score " + score;
    }
    toolbar.innerHTML = "";
    const n = document.createElement("button");
    n.className = "btn primary";
    n.textContent = "New board";
    n.onclick = reset;
    toolbar.appendChild(n);
    reset();
  };
})();
