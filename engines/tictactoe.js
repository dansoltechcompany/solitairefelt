(function () {
  window.BA.games.tictactoe = function (board, cfg, toolbar, hud) {
    let g, turn, over;
    const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    function winner(b) {
      for (const [a,c,d] of wins) if (b[a] && b[a] === b[c] && b[a] === b[d]) return b[a];
      return b.every(Boolean) ? "d" : null;
    }
    function best() {
      const empties = g.map((v, i) => v ? -1 : i).filter((i) => i >= 0);
      for (const i of empties) { const c = g.slice(); c[i] = "O"; if (winner(c) === "O") return i; }
      for (const i of empties) { const c = g.slice(); c[i] = "X"; if (winner(c) === "X") return i; }
      if (!g[4]) return 4;
      return empties[Math.floor(Math.random() * empties.length)];
    }
    function reset() { g = Array(9).fill(""); turn = true; over = null; draw(); }
    function draw() {
      board.innerHTML = "";
      const box = document.createElement("div");
      box.style.display = "grid";
      box.style.gridTemplateColumns = "repeat(3, 90px)";
      box.style.gap = "8px";
      box.style.justifyContent = "center";
      g.forEach((v, i) => {
        const b = document.createElement("button");
        b.className = "btn";
        b.style.height = "90px";
        b.style.fontSize = "2rem";
        b.textContent = v;
        b.onclick = () => {
          if (!turn || g[i] || over) return;
          g[i] = "X";
          over = winner(g);
          if (!over) {
            const m = best();
            if (m != null) g[m] = "O";
            over = winner(g);
          }
          draw();
        };
        box.appendChild(b);
      });
      board.appendChild(box);
      hud.textContent = over === "X" ? "You win" : over === "O" ? "CPU wins" : over === "d" ? "Draw" : "Place X";
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
