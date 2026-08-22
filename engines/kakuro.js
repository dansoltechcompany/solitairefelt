(function () {
  /* Layout: # block, . clue, 0 white cell */
  const LAYOUT = [
    "##.#0#.",
    "#.000#.",
    "#.0#0#.",
    "#.000#.",
    "#.0#0#.",
    "#.000#.",
    "##.#0#."
  ];

  function buildClues(layout, solution) {
    const clues = {};
    const H = layout.length, W = layout[0].length;
    const white = (r, c) => {
      const ch = layout[r][c];
      return ch !== "#" && ch !== ".";
    };
    for (let r = 0; r < H; r++) {
      for (let c = 0; c < W; c++) {
        if (layout[r][c] !== ".") continue;
        const cl = {};
        let ac = 0, acN = 0;
        for (let x = c + 1; x < W && white(r, x); x++) {
          ac += solution[`${r},${x}`];
          acN++;
        }
        if (acN) cl.ac = ac;
        let dn = 0, dnN = 0;
        for (let y = r + 1; y < H && white(y, c); y++) {
          dn += solution[`${y},${c}`];
          dnN++;
        }
        if (dnN) cl.dn = dn;
        if (Object.keys(cl).length) clues[`${r},${c}`] = cl;
      }
    }
    return clues;
  }

  function puzzle(name, solution) {
    return { name, layout: LAYOUT, solution, clues: buildClues(LAYOUT, solution) };
  }

  const PUZZLES = [
    puzzle("Crossroads", {
      "0,4": 9, "1,2": 1, "1,3": 2, "1,4": 4,
      "2,2": 8, "2,4": 9,
      "3,2": 3, "3,3": 5, "3,4": 8,
      "4,2": 2, "4,4": 9,
      "5,2": 4, "5,3": 9, "5,4": 3,
      "6,4": 5
    }),
    puzzle("Ledger", {
      "0,4": 8, "1,2": 3, "1,3": 4, "1,4": 5,
      "2,2": 7, "2,4": 6,
      "3,2": 2, "3,3": 1, "3,4": 6,
      "4,2": 5, "4,4": 4,
      "5,2": 6, "5,3": 7, "5,4": 2,
      "6,4": 6
    }),
    puzzle("Switchback", {
      "0,4": 7, "1,2": 2, "1,3": 1, "1,4": 4,
      "2,2": 9, "2,4": 8,
      "3,2": 4, "3,3": 3, "3,4": 6,
      "4,2": 1, "4,4": 7,
      "5,2": 5, "5,3": 8, "5,4": 2,
      "6,4": 4
    })
  ];

  function pickPuzzle(cfg) {
    if (cfg.daily) {
      const seed = window.BA.todaySeed();
      return PUZZLES[seed % PUZZLES.length];
    }
    if (cfg.puzzle != null) return PUZZLES[cfg.puzzle % PUZZLES.length];
    return PUZZLES[Math.floor(Math.random() * PUZZLES.length)];
  }

  function runsFor(puzzle) {
    const list = [];
    const H = puzzle.layout.length;
    const W = puzzle.layout[0].length;
    const white = (r, c) => {
      const ch = puzzle.layout[r][c];
      return ch !== "#" && ch !== ".";
    };
    Object.entries(puzzle.clues).forEach(([key, cl]) => {
      const [r, c] = key.split(",").map(Number);
      if (cl.ac) {
        const cells = [];
        for (let x = c + 1; x < W && white(r, x); x++) cells.push(`${r},${x}`);
        if (cells.length) list.push({ cells, sum: cl.ac });
      }
      if (cl.dn) {
        const cells = [];
        for (let y = r + 1; y < H && white(y, c); y++) cells.push(`${y},${c}`);
        if (cells.length) list.push({ cells, sum: cl.dn });
      }
    });
    return list;
  }

  window.BA.games.kakuro = function (board, cfg, toolbar, hud) {
    let puzzle, vals, runs;

    function deal() {
      puzzle = pickPuzzle(cfg);
      vals = {};
      runs = runsFor(puzzle);
      draw();
    }

    function draw() {
      board.innerHTML = "";
      const wrap = document.createElement("div");
      wrap.className = "kakuro-grid";
      wrap.style.gridTemplateColumns = `repeat(${puzzle.layout[0].length}, 1fr)`;
      puzzle.layout.forEach((row, r) => {
        [...row].forEach((ch, c) => {
          const key = `${r},${c}`;
          const cell = document.createElement("div");
          if (ch === "#") {
            cell.className = "kakuro-block";
          } else if (ch === ".") {
            cell.className = "kakuro-clue";
            const cl = puzzle.clues[key] || {};
            cell.innerHTML = `<span class="k-dn">${cl.dn || ""}</span><span class="k-ac">${cl.ac || ""}</span>`;
          } else {
            cell.className = "kakuro-cell";
            const inp = document.createElement("input");
            inp.maxLength = 1;
            inp.inputMode = "numeric";
            inp.value = vals[key] ? String(vals[key]) : "";
            inp.oninput = () => {
              const x = parseInt(inp.value, 10);
              vals[key] = x >= 1 && x <= 9 ? x : 0;
              check();
            };
            cell.appendChild(inp);
          }
          wrap.appendChild(cell);
        });
      });
      board.appendChild(wrap);
      check();
    }

    function check() {
      const keys = Object.keys(puzzle.solution);
      let msg = cfg.daily ? "Today's kakuro · " + puzzle.name : puzzle.name;
      let bad = false;

      for (const run of runs) {
        const filled = run.cells.map((k) => vals[k]).filter(Boolean);
        if (!filled.length) continue;
        if (new Set(filled).size !== filled.length) { bad = true; msg = "Duplicate digit in a run"; break; }
        const sum = filled.reduce((a, b) => a + b, 0);
        if (filled.length === run.cells.length && sum !== run.sum) { bad = true; msg = "A run sum does not match its clue"; break; }
        if (sum > run.sum) { bad = true; msg = "Run sum exceeds clue"; break; }
      }

      if (!bad && keys.every((k) => vals[k])) {
        const ok = keys.every((k) => vals[k] === puzzle.solution[k]);
        hud.textContent = ok ? "Solved" : "Almost — recheck crossing sums";
        return;
      }
      if (!bad) {
        const n = keys.filter((k) => vals[k]).length;
        hud.textContent = `${msg} · ${n}/${keys.length} cells`;
      } else hud.textContent = msg;
    }

    toolbar.innerHTML = "";
    const b = document.createElement("button");
    b.className = "btn primary";
    b.textContent = cfg.daily ? "Today's puzzle" : "New puzzle";
    b.onclick = deal;
    toolbar.appendChild(b);
    if (!cfg.daily) {
      const c = document.createElement("button");
      c.className = "btn hint";
      c.textContent = "Check";
      c.onclick = () => {
        const keys = Object.keys(puzzle.solution);
        if (keys.every((k) => vals[k] === puzzle.solution[k])) hud.textContent = "Solved";
        else hud.textContent = "Keep going — sums must match every clue";
      };
      toolbar.appendChild(c);
    }
    deal();
  };
})();
