(function () {
  window.BA.games.merge = function (board, cfg, toolbar, hud) {
    let grid, score;
    function spawn() {
      const z = [];
      grid.forEach((v, i) => { if (!v) z.push(i); });
      if (!z.length) return;
      grid[z[Math.floor(Math.random() * z.length)]] = Math.random() < 0.9 ? 2 : 4;
    }
    function reset() {
      grid = Array(16).fill(0);
      score = 0;
      spawn(); spawn();
      draw();
    }
    function rows() {
      const r = [];
      for (let y = 0; y < 4; y++) r.push(grid.slice(y * 4, y * 4 + 4));
      return r;
    }
    function fromRows(r) {
      grid = r.flat();
    }
    function slideRow(row) {
      const a = row.filter(Boolean);
      for (let i = 0; i < a.length - 1; i++) {
        if (a[i] === a[i + 1]) { a[i] *= 2; score += a[i]; a.splice(i + 1, 1); }
      }
      while (a.length < 4) a.push(0);
      return a;
    }
    function transpose() {
      const n = Array(16);
      for (let y = 0; y < 4; y++) for (let x = 0; x < 4; x++) n[x * 4 + y] = grid[y * 4 + x];
      grid = n;
    }
    function move(dir) {
      const before = grid.slice();
      if (dir === "up" || dir === "down") transpose();
      let r = rows();
      if (dir === "right" || dir === "down") r = r.map((row) => slideRow(row.reverse()).reverse());
      else r = r.map(slideRow);
      fromRows(r);
      if (dir === "up" || dir === "down") transpose();
      if (before.some((v, i) => v !== grid[i])) spawn();
      draw();
    }
    function draw() {
      board.innerHTML = "";
      const g = document.createElement("div");
      g.className = "merge-grid";
      g.style.gridTemplateColumns = "repeat(4,1fr)";
      const colors = { 0: "#1a3d33", 2: "#eee4da", 4: "#ede0c8", 8: "#f2b179", 16: "#f59563", 32: "#f67c5f", 64: "#f65e3b", 128: "#edcf72", 256: "#edcc61", 512: "#edc850", 1024: "#edc53f", 2048: "#edc22e" };
      grid.forEach((v) => {
        const c = document.createElement("div");
        c.className = "merge-cell";
        c.style.background = colors[v] || "#3c3a32";
        c.style.color = v > 4 ? "#f9f6f2" : "#1a1a1a";
        c.textContent = v || "";
        g.appendChild(c);
      });
      board.appendChild(g);
      hud.textContent = "Score " + score + (grid.some((v) => v >= 2048) ? " · Quad tile reached" : "");
    }
    board.tabIndex = 0;
    board.onkeydown = (e) => {
      const m = { ArrowLeft: "left", ArrowRight: "right", ArrowUp: "up", ArrowDown: "down" };
      if (m[e.key]) { e.preventDefault(); move(m[e.key]); }
    };
    let sx, sy;
    board.ontouchstart = (e) => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; };
    board.ontouchend = (e) => {
      const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) + Math.abs(dy) < 24) return;
      move(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? "right" : "left") : (dy > 0 ? "down" : "up"));
    };
    toolbar.innerHTML = "";
    const b = document.createElement("button");
    b.className = "btn primary";
    b.textContent = "New game";
    b.onclick = reset;
    toolbar.appendChild(b);
    ["←","↑","→","↓"].forEach((lab, i) => {
      const k = document.createElement("button");
      k.className = "btn";
      k.textContent = lab;
      k.onclick = () => move(["left","up","right","down"][i]);
      toolbar.appendChild(k);
    });
    reset();
    board.focus();
  };
})();
