(function () {
  function start() {
    const b = Array(64).fill(0);
    for (let i = 0; i < 12; i++) b[i] = (i % 8 + Math.floor(i / 8)) % 2 ? 0 : 2;
    for (let i = 52; i < 64; i++) b[i] = (i % 8 + Math.floor(i / 8)) % 2 ? 0 : 1;
    /* standard dark squares: row0 has pieces on odd files if we use top as black */
    for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) {
      const i = y * 8 + x, dark = (x + y) % 2 === 1;
      b[i] = 0;
      if (!dark) continue;
      if (y < 3) b[i] = 2;
      if (y > 4) b[i] = 1;
    }
    return b;
  }
  const side = (v) => v === 1 || v === 3;
  const king = (v) => v === 3 || v === 4;

  window.BA.games.checkers = function (board, cfg, toolbar, hud) {
    let b = start(), sel = null, turn = true;
    function moves(white) {
      const out = [], caps = [];
      const dirs = white ? [[-1, -1], [-1, 1]] : [[1, -1], [1, 1]];
      for (let i = 0; i < 64; i++) {
        const v = b[i];
        if (!v || side(v) !== white) continue;
        const d = king(v) ? dirs.concat(white ? [[1, -1], [1, 1]] : [[-1, -1], [-1, 1]]) : dirs;
        const x = i % 8, y = Math.floor(i / 8);
        d.forEach(([dy, dx]) => {
          const nx = x + dx, ny = y + dy;
          if (nx < 0 || ny < 0 || nx > 7 || ny > 7) return;
          const j = ny * 8 + nx;
          if (!b[j]) out.push([i, j]);
          const jx = x + 2 * dx, jy = y + 2 * dy;
          if (b[j] && side(b[j]) !== white && jx >= 0 && jy >= 0 && jx < 8 && jy < 8 && !b[jy * 8 + jx])
            caps.push([i, jy * 8 + jx, j]);
        });
      }
      return caps.length ? caps : out;
    }
    function apply(m) {
      const v = b[m[0]];
      b[m[1]] = v;
      b[m[0]] = 0;
      if (m[2] != null) b[m[2]] = 0;
      if (side(v) && Math.floor(m[1] / 8) === 0) b[m[1]] = 3;
      if (!side(v) && Math.floor(m[1] / 8) === 7) b[m[1]] = 4;
    }
    function draw() {
      board.innerHTML = "";
      const g = document.createElement("div");
      g.className = "check-board";
      g.style.gridTemplateColumns = "repeat(8,1fr)";
      b.forEach((v, i) => {
        const s = document.createElement("div");
        const x = i % 8, y = Math.floor(i / 8);
        s.className = "sq " + ((x + y) % 2 ? "dark" : "light") + (sel === i ? " mark" : "");
        s.textContent = v ? (v === 1 || v === 3 ? "●" : "○") : "";
        if (v === 3 || v === 4) s.style.outline = "2px solid gold";
        s.onclick = () => click(i);
        g.appendChild(s);
      });
      board.appendChild(g);
      hud.textContent = turn ? "Your move (dark)" : "Computer";
    }
    function click(i) {
      if (!turn) return;
      const ms = moves(true);
      if (sel == null) { if (b[i] && side(b[i])) sel = i; draw(); return; }
      const m = ms.find((x) => x[0] === sel && x[1] === i);
      if (m) { apply(m); sel = null; turn = false; draw(); setTimeout(cpu, 200); }
      else sel = b[i] && side(b[i]) ? i : null;
      draw();
    }
    function cpu() {
      const ms = moves(false);
      if (!ms.length) { hud.textContent = "You win"; return; }
      apply(ms[Math.floor(Math.random() * ms.length)]);
      turn = true;
      if (!moves(true).length) hud.textContent = "Computer wins";
      draw();
    }
    toolbar.innerHTML = "";
    const n = document.createElement("button");
    n.className = "btn primary";
    n.textContent = "New game";
    n.onclick = () => { b = start(); sel = null; turn = true; draw(); };
    toolbar.appendChild(n);
    draw();
  };
})();
