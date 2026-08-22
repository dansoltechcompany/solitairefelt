(function () {
  const PUZ = [
    [1,1,0,0,1,1,0,0, [2,2],[2,2],[1,1],[1,1],[2,2],[2,2],[1,1],[1,1]],
  ];
  function clue(line) {
    const out = [];
    let n = 0;
    line.forEach((v) => { if (v) n++; else if (n) { out.push(n); n = 0; } });
    if (n) out.push(n);
    return out.length ? out : [0];
  }

  window.BA.games.nonogram = function (board, cfg, toolbar, hud) {
    const sol = [
      [0,1,1,1,0,1,1,0],
      [1,1,0,1,1,0,1,1],
      [1,0,0,0,0,0,0,1],
      [1,0,1,1,1,1,0,1],
      [1,0,1,0,0,1,0,1],
      [1,0,1,1,1,1,0,1],
      [1,1,0,0,0,0,1,1],
      [0,1,1,1,1,1,1,0]
    ];
    const N = 8;
    let g = Array.from({ length: N }, () => Array(N).fill(0));
    const rows = sol.map(clue);
    const cols = Array.from({ length: N }, (_, x) => clue(sol.map((r) => r[x])));
    let mark = 1;

    function draw() {
      board.innerHTML = "";
      const wrap = document.createElement("div");
      wrap.style.overflow = "auto";
      const table = document.createElement("div");
      table.style.display = "grid";
      table.style.gridTemplateColumns = `80px repeat(${N}, 28px)`;
      table.style.gap = "2px";
      table.appendChild(document.createElement("div"));
      cols.forEach((c) => {
        const d = document.createElement("div");
        d.style.fontSize = "11px";
        d.style.textAlign = "center";
        d.textContent = c.join(" ");
        table.appendChild(d);
      });
      for (let y = 0; y < N; y++) {
        const lab = document.createElement("div");
        lab.style.fontSize = "11px";
        lab.textContent = rows[y].join(" ");
        table.appendChild(lab);
        for (let x = 0; x < N; x++) {
          const b = document.createElement("button");
          b.className = "mine";
          b.style.background = g[y][x] === 1 ? "#d4a84b" : g[y][x] === 2 ? "#1a1a1a" : "#2f5a4c";
          b.onclick = () => { g[y][x] = g[y][x] === mark ? 0 : mark; draw(); };
          table.appendChild(b);
        }
      }
      wrap.appendChild(table);
      board.appendChild(wrap);
      let ok = true;
      for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) if ((sol[y][x] === 1) !== (g[y][x] === 1)) ok = false;
      hud.textContent = ok ? "Picture complete" : "Fill = brass, X = empty";
    }
    toolbar.innerHTML = "";
    [["Fill", 1], ["Mark empty", 2]].forEach(([lab, v]) => {
      const b = document.createElement("button");
      b.className = "btn" + (v === 1 ? " primary" : "");
      b.textContent = lab;
      b.onclick = () => { mark = v; };
      toolbar.appendChild(b);
    });
    draw();
  };
})();
