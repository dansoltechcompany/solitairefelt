(function () {
  const ICONS = ["♠","♥","♣","♦","★","☾","☀","✿","♔","♘","⚓","⌘"];
  window.BA.games.memory = function (board, cfg, toolbar, hud) {
    const n = cfg.pairs || 8;
    let cards, open, lock, moves;
    function reset() {
      const pick = ICONS.slice(0, n);
      cards = pick.concat(pick).map((v, i) => ({ v, id: i, up: false, done: false })).sort(() => Math.random() - 0.5);
      open = [];
      lock = false;
      moves = 0;
      draw();
    }
    function draw() {
      board.innerHTML = "";
      const g = document.createElement("div");
      g.className = "memory-grid";
      g.style.gridTemplateColumns = "repeat(4,1fr)";
      cards.forEach((c, i) => {
        const b = document.createElement("button");
        b.className = "memory-card"
          + (c.up || c.done ? " flipped" : "")
          + (c.done ? " matched" : "");
        b.innerHTML = c.up || c.done ? `<span class="memory-face">${c.v}</span>` : "";
        b.onclick = () => {
          if (lock || c.done || c.up) return;
          c.up = true;
          open.push(i);
          if (open.length === 2) {
            moves++;
            lock = true;
            const [a, d] = open;
            if (cards[a].v === cards[d].v) { cards[a].done = cards[d].done = true; open = []; lock = false; }
            else setTimeout(() => { cards[a].up = cards[d].up = false; open = []; lock = false; draw(); }, 600);
          }
          draw();
        };
        g.appendChild(b);
      });
      board.appendChild(g);
      hud.textContent = cards.every((c) => c.done) ? "Cleared in " + moves + " moves" : moves + " moves";
    }
    toolbar.innerHTML = "";
    const b = document.createElement("button");
    b.className = "btn primary";
    b.textContent = "Shuffle";
    b.onclick = reset;
    toolbar.appendChild(b);
    reset();
  };
})();
