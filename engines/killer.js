(function () {
  function shuffle(a, rnd) {
    const r = rnd || Math.random;
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(r() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function valid(grid, i, v) {
    const r = Math.floor(i / 9), c = i % 9;
    for (let k = 0; k < 9; k++) if (grid[r * 9 + k] === v || grid[k * 9 + c] === v) return false;
    const br = Math.floor(r / 3) * 3, bc = Math.floor(c / 3) * 3;
    for (let y = 0; y < 3; y++) for (let x = 0; x < 3; x++) if (grid[(br + y) * 9 + bc + x] === v) return false;
    return true;
  }
  function solve(grid, rnd) {
    const i = grid.indexOf(0);
    if (i < 0) return true;
    for (const v of shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9], rnd)) {
      if (!valid(grid, i, v)) continue;
      grid[i] = v;
      if (solve(grid, rnd)) return true;
      grid[i] = 0;
    }
    return false;
  }
  function fullGrid(rnd) {
    const g = Array(81).fill(0);
    for (let b = 0; b < 3; b++) {
      const nums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9], rnd);
      let k = 0;
      for (let y = 0; y < 3; y++) for (let x = 0; x < 3; x++) g[(b * 3 + y) * 9 + b * 3 + x] = nums[k++];
    }
    if (!solve(g, rnd)) return fullGrid(null);
    return g;
  }
  function cagesFrom(sol, rnd) {
    const used = Array(81).fill(false);
    const cages = [];
    const nbr = (i) => {
      const r = Math.floor(i / 9), c = i % 9, o = [];
      if (r) o.push(i - 9);
      if (r < 8) o.push(i + 9);
      if (c) o.push(i - 1);
      if (c < 8) o.push(i + 1);
      return o;
    };
    for (let start = 0; start < 81; start++) {
      if (used[start]) continue;
      const size = 2 + Math.floor((rnd ? rnd() : Math.random()) * 3);
      const cells = [start];
      used[start] = true;
      while (cells.length < size) {
        const edge = shuffle(cells.flatMap(nbr).filter((j) => !used[j]), rnd);
        if (!edge.length) break;
        used[edge[0]] = true;
        cells.push(edge[0]);
      }
      cages.push({ cells, sum: cells.reduce((n, i) => n + sol[i], 0) });
    }
    return cages;
  }

  window.BA.games.killer = function (board, cfg, toolbar, hud) {
    const rnd = cfg.daily ? window.BA.mulberry(window.BA.todaySeed() + 17) : Math.random;
    let puzzle, cages, cageOf;

    function deal() {
      const sol = fullGrid(rnd);
      cages = cagesFrom(sol, rnd);
      cageOf = Array(81).fill(-1);
      cages.forEach((c, i) => c.cells.forEach((cell) => { cageOf[cell] = i; }));
      puzzle = Array(81).fill(0);
      draw();
    }

    function draw() {
      board.innerHTML = "";
      const grid = document.createElement("div");
      grid.className = "sudoku-grid killer-grid";
      puzzle.forEach((v, i) => {
        const cell = document.createElement("div");
        cell.className = "killer-cell";
        const r = Math.floor(i / 9), c = i % 9;
        const id = cageOf[i];
        const cage = cages[id];
        if (!cage) return;
        if (c === 0 || cageOf[i - 1] !== id) cell.classList.add("cl");
        if (c === 8 || cageOf[i + 1] !== id) cell.classList.add("cr");
        if (r === 0 || cageOf[i - 9] !== id) cell.classList.add("ct");
        if (r === 8 || cageOf[i + 9] !== id) cell.classList.add("cb");
        if (cage.cells[0] === i) {
          const tag = document.createElement("span");
          tag.className = "killer-sum";
          tag.textContent = cage.sum;
          cell.appendChild(tag);
        }
        const inp = document.createElement("input");
        inp.maxLength = 1;
        inp.inputMode = "numeric";
        inp.value = v ? String(v) : "";
        inp.oninput = () => {
          const x = parseInt(inp.value, 10);
          puzzle[i] = x >= 1 && x <= 9 ? x : 0;
          check();
        };
        cell.appendChild(inp);
        grid.appendChild(cell);
      });
      board.appendChild(grid);
      check();
    }

    function check() {
      if (puzzle.some((v) => !v)) { hud.textContent = "Fill every cage"; return; }
      const okSudoku = puzzle.every((v, i) => {
        const copy = puzzle.slice();
        copy[i] = 0;
        return valid(copy, i, v);
      });
      const okCage = cages.every((c) => {
        const vals = c.cells.map((i) => puzzle[i]);
        return vals.reduce((a, b) => a + b, 0) === c.sum && new Set(vals).size === vals.length;
      });
      hud.textContent = okSudoku && okCage ? "Solved" : "Conflict in a row, box, or cage";
    }

    toolbar.innerHTML = "";
    const b = document.createElement("button");
    b.className = "btn primary";
    b.textContent = cfg.daily ? "Today's cages" : "New puzzle";
    b.onclick = deal;
    toolbar.appendChild(b);
    deal();
  };
})();
