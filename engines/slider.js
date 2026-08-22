(function () {
  window.BA.games.slider = function (board, cfg, toolbar, hud) {
    let tiles;
    function reset() {
      tiles = [...Array(15).keys()].map((n) => n + 1).concat(0);
      for (let i = 0; i < 80; i++) move(Math.floor(Math.random() * 4));
      draw();
    }
    function hole() { return tiles.indexOf(0); }
    function move(dir) {
      const h = hole(), x = h % 4, y = Math.floor(h / 4);
      const n = [[0, -1], [1, 0], [0, 1], [-1, 0]][dir];
      const nx = x + n[0], ny = y + n[1];
      if (nx < 0 || ny < 0 || nx > 3 || ny > 3) return;
      const j = ny * 4 + nx;
      [tiles[h], tiles[j]] = [tiles[j], tiles[h]];
    }
    function draw() {
      board.innerHTML = "";
      const g = document.createElement("div");
      g.className = "slide-grid";
      g.style.gridTemplateColumns = "repeat(4,1fr)";
      tiles.forEach((v, i) => {
        const b = document.createElement("button");
        b.className = "slide-tile" + (v ? "" : " hole");
        b.textContent = v || "";
        b.onclick = () => {
          const h = hole();
          const ax = i % 4, ay = Math.floor(i / 4), hx = h % 4, hy = Math.floor(h / 4);
          if (Math.abs(ax - hx) + Math.abs(ay - hy) === 1) {
            [tiles[i], tiles[h]] = [tiles[h], tiles[i]];
            draw();
          }
        };
        g.appendChild(b);
      });
      board.appendChild(g);
      hud.textContent = tiles.every((v, i) => i === 15 ? v === 0 : v === i + 1) ? "Ordered" : "Slide tiles into 1–15";
    }
    toolbar.innerHTML = "";
    const n = document.createElement("button");
    n.className = "btn primary";
    n.textContent = "Shuffle";
    n.onclick = reset;
    toolbar.appendChild(n);
    reset();
  };
})();
