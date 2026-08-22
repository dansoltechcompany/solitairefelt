(function () {
  window.BA.games.mines = function (board, cfg, toolbar, hud) {
    const W = cfg.w, H = cfg.h, M = cfg.mines;
    let cells, open, flags, dead, won, start, first;

    function reset() {
      cells = Array(W * H).fill(0);
      open = Array(W * H).fill(false);
      flags = Array(W * H).fill(false);
      dead = won = false;
      first = true;
      start = Date.now();
      draw();
    }

    function plant(safe) {
      let n = 0;
      while (n < M) {
        const i = Math.floor(Math.random() * W * H);
        if (cells[i] === 9 || i === safe) continue;
        cells[i] = 9;
        n++;
      }
      for (let i = 0; i < W * H; i++) {
        if (cells[i] === 9) continue;
        let c = 0;
        neighbors(i).forEach((j) => { if (cells[j] === 9) c++; });
        cells[i] = c;
      }
    }

    function neighbors(i) {
      const x = i % W, y = Math.floor(i / W), out = [];
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
        if (!dx && !dy) continue;
        const nx = x + dx, ny = y + dy;
        if (nx >= 0 && nx < W && ny >= 0 && ny < H) out.push(ny * W + nx);
      }
      return out;
    }

    function flood(i) {
      const st = [i];
      while (st.length) {
        const k = st.pop();
        if (open[k] || flags[k]) continue;
        open[k] = true;
        if (cells[k] === 0) neighbors(k).forEach((j) => st.push(j));
      }
    }

    function click(i, right) {
      if (dead || won) return;
      if (right) {
        if (!open[i]) flags[i] = !flags[i];
        draw();
        return;
      }
      if (flags[i]) return;
      if (first) { plant(i); first = false; }
      if (cells[i] === 9) { dead = true; open[i] = true; }
      else flood(i);
      won = !dead && open.filter(Boolean).length === W * H - M;
      draw();
    }

    function draw() {
      board.innerHTML = "";
      const g = document.createElement("div");
      g.className = "mines-grid";
      g.style.gridTemplateColumns = `repeat(${W}, 28px)`;
      cells.forEach((v, i) => {
        const b = document.createElement("button");
        b.className = "mine" + (open[i] ? " open" : "") + (flags[i] ? " flag" : "");
        if (open[i]) b.textContent = v === 9 ? "✱" : v || "";
        else if (flags[i]) b.textContent = "⚑";
        b.oncontextmenu = (e) => { e.preventDefault(); click(i, true); };
        b.onclick = () => click(i, false);
        g.appendChild(b);
      });
      board.appendChild(g);
      hud.textContent = dead ? "Boom" : won ? "Cleared" : `${M - flags.filter(Boolean).length} mines left`;
    }

    toolbar.innerHTML = "";
    const n = document.createElement("button");
    n.className = "btn primary";
    n.textContent = "New board";
    n.onclick = reset;
    toolbar.appendChild(n);
    reset();
  };
})();
