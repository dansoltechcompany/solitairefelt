(function () {
  const SHIPS = [5, 4, 3, 3, 2];
  window.BA.games.battleship = function (board, cfg, toolbar, hud) {
    let hidden, shots;
    function place() {
      const g = Array(100).fill(0);
      SHIPS.forEach((len) => {
        for (let t = 0; t < 80; t++) {
          const horiz = Math.random() < 0.5;
          const x = Math.floor(Math.random() * (horiz ? 11 - len : 10));
          const y = Math.floor(Math.random() * (horiz ? 10 : 11 - len));
          let ok = true;
          for (let k = 0; k < len; k++) {
            const i = horiz ? y * 10 + x + k : (y + k) * 10 + x;
            if (g[i]) ok = false;
          }
          if (!ok) continue;
          for (let k = 0; k < len; k++) g[horiz ? y * 10 + x + k : (y + k) * 10 + x] = 1;
          return;
        }
      });
      return g;
    }
    function reset() {
      hidden = place();
      shots = Array(100).fill(0);
      draw();
    }
    function draw() {
      board.innerHTML = "";
      const g = document.createElement("div");
      g.className = "ship-grid";
      hidden.forEach((_, i) => {
        const b = document.createElement("button");
        b.className = "sea" + (shots[i] === 1 ? " miss" : shots[i] === 2 ? " hit" : "");
        b.onclick = () => {
          if (shots[i]) return;
          shots[i] = hidden[i] ? 2 : 1;
          draw();
        };
        g.appendChild(b);
      });
      board.appendChild(g);
      const hits = shots.filter((s, i) => s === 2).length;
      const need = hidden.filter(Boolean).length;
      hud.textContent = hits >= need ? "Fleet sunk" : `${hits} hits`;
    }
    toolbar.innerHTML = "";
    const n = document.createElement("button");
    n.className = "btn primary";
    n.textContent = "New fleet";
    n.onclick = reset;
    toolbar.appendChild(n);
    reset();
  };
})();
