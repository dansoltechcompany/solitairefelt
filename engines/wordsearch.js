(function () {
  const BANK = ["SOLITAIRE","SUDOKU","MAHJONG","PUZZLE","FELT","CARDS","SPIDER","FREECELL","QUEEN","KING","PAWN","CHECK","KNIGHT","RIVER","STONE","FLAME","CLOUD","MAPLE"];
  window.BA.games.wordsearch = function (board, cfg, toolbar, hud) {
    const N = 12;
    let grid, found, words, drag = [];

    function place(word) {
      const dirs = [[1,0],[0,1],[1,1],[-1,1]];
      for (let t = 0; t < 80; t++) {
        const [dx, dy] = dirs[Math.floor(Math.random() * dirs.length)];
        const x = Math.floor(Math.random() * N), y = Math.floor(Math.random() * N);
        let ok = true;
        for (let i = 0; i < word.length; i++) {
          const nx = x + dx * i, ny = y + dy * i;
          if (nx < 0 || ny < 0 || nx >= N || ny >= N) { ok = false; break; }
          if (grid[ny][nx] && grid[ny][nx] !== word[i]) { ok = false; break; }
        }
        if (!ok) continue;
        for (let i = 0; i < word.length; i++) grid[y + dy * i][x + dx * i] = word[i];
        words.push(word);
        return true;
      }
      return false;
    }

    function reset() {
      grid = Array.from({ length: N }, () => Array(N).fill(""));
      found = new Set();
      words = [];
      BANK.slice().sort(() => Math.random() - 0.5).slice(0, 8).forEach(place);
      for (let y = 0; y < N; y++) for (let x = 0; x < N; x++)
        if (!grid[y][x]) grid[y][x] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)];
      drag = [];
      draw();
    }

    function pick(x, y) {
      if (drag.length && drag[drag.length - 1].x === x && drag[drag.length - 1].y === y) return;
      drag.push({ x, y });
      draw();
    }

    function finishDrag() {
      const w = drag.filter((p) => p && grid[p.y] && grid[p.y][p.x]).map((p) => grid[p.y][p.x]).join("");
      const rev = w.split("").reverse().join("");
      words.forEach((word) => { if (word === w || word === rev) found.add(word); });
      drag = [];
      draw();
    }

    function draw() {
      board.innerHTML = "";
      const box = document.createElement("div");
      box.className = "word-box";
      const g = document.createElement("div");
      g.style.display = "grid";
      g.style.gridTemplateColumns = `repeat(${N}, 28px)`;
      g.style.gap = "2px";
      g.style.justifyContent = "center";
      grid.forEach((row, y) => row.forEach((ch, x) => {
        const b = document.createElement("button");
        b.className = "btn";
        b.textContent = ch;
        b.style.width = "28px";
        b.style.minWidth = "28px";
        b.style.padding = "4px";
        if (drag.some((p) => p.x === x && p.y === y)) b.style.borderColor = "var(--gold)";
        b.onmousedown = (e) => { e.preventDefault(); drag = [{ x, y }]; draw(); };
        b.onmouseenter = () => { if (drag.length) pick(x, y); };
        b.onpointerdown = (e) => { e.preventDefault(); drag = [{ x, y }]; draw(); b.setPointerCapture(e.pointerId); };
        b.onpointerenter = () => { if (drag.length) pick(x, y); };
        g.appendChild(b);
      }));
      box.appendChild(g);
      const list = document.createElement("p");
      list.innerHTML = words.map((w) => found.has(w) ? `<s>${w}</s>` : w).join(" · ");
      box.appendChild(list);
      board.appendChild(box);
      hud.textContent = found.size + " / " + words.length + " words"
        + (found.size === words.length && words.length ? " · All found" : "");
    }

    board.onmouseup = finishDrag;
    board.onpointerup = finishDrag;

    toolbar.innerHTML = "";
    const n = document.createElement("button");
    n.className = "btn primary";
    n.textContent = "New grid";
    n.onclick = reset;
    toolbar.appendChild(n);
    reset();
  };
})();
