(function () {
  const LEVELS = [
    [
      { id: "h", x: 1, y: 2, len: 2, horiz: true, hero: true },
      { id: "a", x: 0, y: 0, len: 2, horiz: true },
      { id: "b", x: 0, y: 1, len: 3, horiz: false },
      { id: "c", x: 3, y: 0, len: 2, horiz: false },
      { id: "d", x: 4, y: 2, len: 2, horiz: false },
      { id: "e", x: 2, y: 4, len: 3, horiz: true }
    ],
    [
      { id: "h", x: 0, y: 2, len: 2, horiz: true, hero: true },
      { id: "a", x: 2, y: 0, len: 3, horiz: false },
      { id: "b", x: 3, y: 1, len: 2, horiz: true },
      { id: "c", x: 1, y: 3, len: 2, horiz: false },
      { id: "d", x: 3, y: 3, len: 3, horiz: true }
    ]
  ];

  window.BA.games.rush = function (board, cfg, toolbar, hud) {
    let level = 0, cars, sel;
    const N = 6;
    function reset() {
      cars = JSON.parse(JSON.stringify(LEVELS[level % LEVELS.length]));
      sel = null;
      draw();
    }
    function occupancy() {
      const g = Array.from({ length: N }, () => Array(N).fill(null));
      cars.forEach((c) => {
        for (let i = 0; i < c.len; i++) {
          const x = c.x + (c.horiz ? i : 0), y = c.y + (c.horiz ? 0 : i);
          g[y][x] = c.id;
        }
      });
      return g;
    }
    function draw() {
      board.innerHTML = "";
      const g = occupancy();
      const box = document.createElement("div");
      box.style.display = "grid";
      box.style.gridTemplateColumns = `repeat(${N}, 48px)`;
      box.style.gap = "4px";
      box.style.width = "max-content";
      box.style.margin = "0 auto";
      box.style.background = "#3a1a1a";
      box.style.padding = "8px";
      box.style.borderRadius = "12px";
      for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
        const d = document.createElement("div");
        const id = g[y][x];
        const car = cars.find((c) => c.id === id);
        d.style.height = "48px";
        d.style.borderRadius = "8px";
        d.style.background = !id ? "#1a0a0a" : car.hero ? "#d4a84b" : "#6a8a9a";
        if (sel && sel.id === id) d.style.outline = "3px solid #fff";
        d.onclick = () => { if (car) { sel = car; draw(); } };
        box.appendChild(d);
      }
      board.appendChild(box);
      const bar = document.createElement("div");
      bar.className = "game-toolbar";
      [["◀", -1], ["▶", 1], ["▲", -1], ["▼", 1]].forEach(([lab, dir], i) => {
        const b = document.createElement("button");
        b.className = "btn";
        b.textContent = lab;
        b.onclick = () => slide(i < 2, dir);
        bar.appendChild(b);
      });
      board.appendChild(bar);
      const hero = cars.find((c) => c.hero);
      hud.textContent = hero.x + hero.len >= N && hero.y === 2 ? "Escaped — next puzzle with New" : "Slide the brass car out the right";
    }
    function slide(horiz, dir) {
      if (!sel || sel.horiz !== horiz) return;
      const nx = sel.x + (horiz ? dir : 0);
      const ny = sel.y + (horiz ? 0 : dir);
      const g = occupancy();
      for (let i = 0; i < sel.len; i++) {
        const x = sel.x + (sel.horiz ? i : 0), y = sel.y + (sel.horiz ? 0 : i);
        g[y][x] = null;
      }
      for (let i = 0; i < sel.len; i++) {
        const x = nx + (sel.horiz ? i : 0), y = ny + (sel.horiz ? 0 : i);
        if (x < 0 || y < 0 || x >= N || y >= N || g[y][x]) return;
      }
      sel.x = nx; sel.y = ny;
      draw();
    }
    toolbar.innerHTML = "";
    const n = document.createElement("button");
    n.className = "btn primary";
    n.textContent = "New / next";
    n.onclick = () => { level++; reset(); };
    toolbar.appendChild(n);
    reset();
  };
})();
