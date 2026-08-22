(function () {
  const PUZ = {
    grid: [
      "CARD",
      "AURA",
      "KING",
      "EASY"
    ],
    across: [
      { n: 1, clue: "Klondike piece" },
      { n: 5, clue: "Soft glow" },
      { n: 6, clue: "Highest court card" },
      { n: 7, clue: "Spider one-suit difficulty" }
    ],
    down: [
      { n: 1, clue: "Dessert, or to look after" },
      { n: 2, clue: "Dawn goddess" },
      { n: 3, clue: "Was carried" },
      { n: 4, clue: "24 hours, casually" }
    ]
  };
  window.BA.games.crossword = function (board, cfg, toolbar, hud) {
    const H = PUZ.grid.length, W = PUZ.grid[0].length;
    const fill = Array.from({ length: H }, () => Array(W).fill(""));
    function draw() {
      board.innerHTML = "";
      const box = document.createElement("div");
      box.className = "word-box";
      const g = document.createElement("div");
      g.style.display = "grid";
      g.style.gridTemplateColumns = `repeat(${W}, 42px)`;
      g.style.gap = "3px";
      g.style.justifyContent = "center";
      for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
        const inp = document.createElement("input");
        inp.maxLength = 1;
        inp.style.textAlign = "center";
        inp.style.fontWeight = "800";
        inp.style.height = "42px";
        inp.value = fill[y][x];
        inp.oninput = () => {
          fill[y][x] = (inp.value || "").toUpperCase();
          let ok = true;
          for (let r = 0; r < H; r++) for (let c = 0; c < W; c++)
            if (fill[r][c] !== PUZ.grid[r][c]) ok = false;
          hud.textContent = ok ? "Mini crossword complete" : "Across and down clues below";
        };
        g.appendChild(inp);
      }
      box.appendChild(g);
      const clues = document.createElement("div");
      clues.innerHTML = `<p><strong>Across</strong><br>${PUZ.across.map((c) => c.n + ". " + c.clue).join("<br>")}</p>
        <p><strong>Down</strong><br>${PUZ.down.map((c) => c.n + ". " + c.clue).join("<br>")}</p>`;
      box.appendChild(clues);
      board.appendChild(box);
      hud.textContent = "Fill every square";
    }
    toolbar.innerHTML = "";
    draw();
  };
})();
