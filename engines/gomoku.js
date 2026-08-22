(function () {
  const N = 15;
  window.BA.games.gomoku = function (board, cfg, toolbar, hud) {
    let g, turn, over;
    function reset() {
      g = Array(N * N).fill(0);
      turn = 1;
      over = false;
      draw();
    }
    function line(i, p) {
      const x = i % N, y = Math.floor(i / N);
      const dirs = [[1, 0], [0, 1], [1, 1], [1, -1]];
      return dirs.some(([dx, dy]) => {
        let n = 1;
        for (const s of [-1, 1]) {
          let cx = x + dx * s, cy = y + dy * s;
          while (cx >= 0 && cy >= 0 && cx < N && cy < N && g[cy * N + cx] === p) { n++; cx += dx * s; cy += dy * s; }
        }
        return n >= 5;
      });
    }
    function cpu() {
      const empty = [];
      g.forEach((v, i) => { if (!v) empty.push(i); });
      let pick = empty[Math.floor(Math.random() * empty.length)];
      for (const i of empty) {
        g[i] = 2;
        if (line(i, 2)) { pick = i; g[i] = 0; break; }
        g[i] = 1;
        if (line(i, 1)) pick = i;
        g[i] = 0;
      }
      g[pick] = 2;
      if (line(pick, 2)) over = 2;
      turn = 1;
      draw();
    }
    function draw() {
      board.innerHTML = "";
      const box = document.createElement("div");
      box.className = "go-board";
      box.style.gridTemplateColumns = `repeat(${N},1fr)`;
      g.forEach((v, i) => {
        const s = document.createElement("div");
        s.className = "sq " + ((Math.floor(i / N) + i) % 2 ? "dark" : "light");
        s.style.fontSize = "0.9rem";
        s.textContent = v === 1 ? "●" : v === 2 ? "○" : "";
        s.onclick = () => {
          if (over || g[i] || turn !== 1) return;
          g[i] = 1;
          if (line(i, 1)) { over = 1; draw(); return; }
          turn = 2;
          draw();
          setTimeout(cpu, 120);
        };
        box.appendChild(s);
      });
      board.appendChild(box);
      hud.textContent = over === 1 ? "You win" : over === 2 ? "CPU wins" : "Five in a row";
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
