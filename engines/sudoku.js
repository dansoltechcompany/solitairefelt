(function () {
  function shuffle(a, rnd) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor((rnd ? rnd() : Math.random()) * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function boxSize(n) { return n === 6 ? [3, 2] : [3, 3]; }

  function valid(grid, n, i, v) {
    const r = Math.floor(i / n), c = i % n;
    const [bw, bh] = boxSize(n);
    for (let k = 0; k < n; k++) {
      if (grid[r * n + k] === v || grid[k * n + c] === v) return false;
    }
    const br = Math.floor(r / bh) * bh, bc = Math.floor(c / bw) * bw;
    for (let y = 0; y < bh; y++) for (let x = 0; x < bw; x++)
      if (grid[(br + y) * n + bc + x] === v) return false;
    return true;
  }

  function solve(grid, n, rnd) {
    const i = grid.indexOf(0);
    if (i < 0) return true;
    const nums = shuffle(Array.from({ length: n }, (_, k) => k + 1), rnd);
    for (const v of nums) {
      if (!valid(grid, n, i, v)) continue;
      grid[i] = v;
      if (solve(grid, n, rnd)) return true;
      grid[i] = 0;
    }
    return false;
  }

  function generate(n, holes, rnd, attempt) {
    const grid = Array(n * n).fill(0);
    if (n === 9) {
      for (let b = 0; b < 3; b++) {
        const nums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9], rnd);
        let k = 0;
        for (let y = 0; y < 3; y++) for (let x = 0; x < 3; x++)
          grid[(b * 3 + y) * 9 + b * 3 + x] = nums[k++];
      }
    }
    if (!solve(grid, n, rnd)) {
      if ((attempt || 0) > 6) {
        const full = (n === 6
          ? [1,2,3,4,5,6, 4,5,6,1,2,3, 2,3,4,5,6,1, 5,6,1,2,3,4, 3,4,5,6,1,2, 6,1,2,3,4,5]
          : [5,3,4,6,7,8,9,1,2, 6,7,2,1,9,5,3,4,8, 1,9,8,3,4,2,5,6,7, 8,5,9,7,6,1,4,2,3, 4,2,6,8,5,3,7,9,1, 7,1,3,9,2,4,8,5,6, 9,6,1,5,3,7,2,8,4, 2,8,7,4,1,9,6,3,5, 3,4,5,2,8,6,1,7,9]);
        const puzzle = full.slice();
        const order = shuffle(Array.from({ length: n * n }, (_, i) => i), rnd);
        for (let i = 0; i < Math.min(holes, order.length); i++) puzzle[order[i]] = 0;
        return { puzzle, solution: full };
      }
      return generate(n, holes, null, (attempt || 0) + 1);
    }
    const full = grid.slice();
    const order = shuffle(Array.from({ length: n * n }, (_, i) => i), rnd);
    let removed = 0;
    for (const i of order) {
      if (removed >= holes) break;
      grid[i] = 0;
      removed++;
    }
    return { puzzle: grid, solution: full };
  }

  window.BA.games.sudoku = function (board, cfg, toolbar, hud) {
    const n = cfg.size || 9;
    const rnd = cfg.daily ? window.BA.mulberry(window.BA.todaySeed()) : null;
    let puzzle, given;

    function deal() {
      const g = generate(n, cfg.holes || 40, rnd);
      puzzle = g.puzzle.slice();
      given = puzzle.map((v) => v !== 0);
      draw();
    }

    function draw() {
      board.innerHTML = "";
      const grid = document.createElement("div");
      grid.className = "sudoku-grid" + (n === 6 ? " mini" : "");
      if (n === 6) grid.style.gridTemplateColumns = "repeat(6,1fr)";
      puzzle.forEach((v, i) => {
        const inp = document.createElement("input");
        inp.maxLength = 1;
        inp.value = v ? String(v) : "";
        inp.readOnly = given[i];
        if (given[i]) inp.className = "given";
        inp.inputMode = "numeric";
        inp.oninput = () => {
          const x = parseInt(inp.value, 10);
          puzzle[i] = x >= 1 && x <= n ? x : 0;
          check();
        };
        grid.appendChild(inp);
      });
      board.appendChild(grid);
      check();
    }

    function check() {
      if (puzzle.some((v) => !v)) { hud.textContent = "Fill every cell"; return; }
      const ok = puzzle.every((v, i) => {
        const copy = puzzle.slice();
        copy[i] = 0;
        return valid(copy, n, i, v);
      });
      hud.textContent = ok ? "Solved" : "Conflict in a row, column, or box";
    }

    toolbar.innerHTML = "";
    const b = document.createElement("button");
    b.className = "btn primary";
    b.textContent = cfg.daily ? "Today's grid" : "New puzzle";
    b.onclick = deal;
    toolbar.appendChild(b);
    deal();
  };
})();
