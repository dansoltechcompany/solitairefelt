(function () {
  const CROSS = [
    0,0,1,1,1,0,0,
    0,0,1,1,1,0,0,
    1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,
    0,0,1,1,1,0,0,
    0,0,1,1,1,0,0
  ];
  window.BA.games.peg = function (board, cfg, toolbar, hud) {
    let g, sel;
    function reset() {
      g = CROSS.slice();
      g[24] = 0;
      sel = null;
      draw();
    }
    function idx(x, y) { return y * 7 + x; }
    function draw() {
      board.innerHTML = "";
      const box = document.createElement("div");
      box.style.display = "grid";
      box.style.gridTemplateColumns = "repeat(7, 42px)";
      box.style.gap = "6px";
      box.style.justifyContent = "center";
      g.forEach((v, i) => {
        const x = i % 7, y = Math.floor(i / 7);
        const on = CROSS[i];
        const b = document.createElement("button");
        b.className = "btn";
        b.style.height = "42px";
        if (!on) { b.style.visibility = "hidden"; box.appendChild(b); return; }
        b.textContent = v ? "●" : "";
        if (sel === i) b.style.borderColor = "var(--brass)";
        b.onclick = () => {
          if (sel == null) { if (v) sel = i; draw(); return; }
          const sx = sel % 7, sy = Math.floor(sel / 7);
          const mx = (sx + x) / 2, my = (sy + y) / 2;
          if (!v && Math.abs(sx - x) + Math.abs(sy - y) === 2 && ((sx === x) || (sy === y)) && g[idx(mx, my)]) {
            g[sel] = 0;
            g[idx(mx, my)] = 0;
            g[i] = 1;
          }
          sel = null;
          draw();
        };
        box.appendChild(b);
      });
      board.appendChild(box);
      hud.textContent = g.filter(Boolean).length + " pegs · aim for one in the center";
    }
    toolbar.innerHTML = "";
    const n = document.createElement("button");
    n.className = "btn primary";
    n.textContent = "Reset";
    n.onclick = reset;
    toolbar.appendChild(n);
    reset();
  };
})();
