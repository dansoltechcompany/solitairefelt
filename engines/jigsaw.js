(function () {
  window.BA.games.jigsaw = function (board, cfg, toolbar, hud) {
    const n = cfg.n || 4;
    const size = 360;
    const piece = size / n;
    let placed;

    function art(ctx) {
      ctx.fillStyle = "#16352c";
      ctx.fillRect(0, 0, size, size);
      for (let i = 0; i < 18; i++) {
        ctx.fillStyle = i % 2 ? "#d4a84b" : "#3d8b7a";
        ctx.beginPath();
        ctx.arc(40 + (i * 47) % size, 30 + (i * 73) % size, 18 + (i % 5) * 8, 0, 7);
        ctx.fill();
      }
    }

    function reset() {
      placed = Array(n * n).fill(false);
      board.innerHTML = "";
      const wrap = document.createElement("div");
      wrap.className = "jigsaw";
      wrap.style.height = size + 120 + "px";
      const target = document.createElement("canvas");
      target.width = target.height = size;
      target.style.border = "1px solid rgba(212,168,75,.3)";
      target.style.background = "#0f241e";
      wrap.appendChild(target);
      const src = document.createElement("canvas");
      src.width = src.height = size;
      let sctx = null;
      try { sctx = src.getContext("2d"); } catch (e) { sctx = null; }
      if (!sctx) {
        hud.textContent = "This browser cannot draw the jigsaw board.";
        board.innerHTML = `<p class="prose" style="text-align:center;padding:24px">${hud.textContent}</p>`;
        return;
      }
      art(sctx);
      const order = [...Array(n * n).keys()].sort(() => Math.random() - 0.5);
      order.forEach((idx, k) => {
        const sx = (idx % n) * piece, sy = Math.floor(idx / n) * piece;
        const c = document.createElement("canvas");
        c.width = c.height = piece;
        const pctx = c.getContext("2d");
        if (pctx) pctx.drawImage(src, sx, sy, piece, piece, 0, 0, piece, piece);
        c.className = "piece";
        c.style.left = (20 + (k % n) * (piece + 8)) + "px";
        c.style.top = (size + 16) + "px";
        let drag = null;
        c.onpointerdown = (e) => { drag = { x: e.clientX - c.offsetLeft, y: e.clientY - c.offsetTop }; c.setPointerCapture(e.pointerId); };
        c.onpointermove = (e) => {
          if (!drag) return;
          c.style.left = (e.clientX - drag.x) + "px";
          c.style.top = (e.clientY - drag.y) + "px";
        };
        c.onpointerup = () => {
          drag = null;
          const x = parseInt(c.style.left, 10), y = parseInt(c.style.top, 10);
          if (Math.abs(x - sx) < 18 && Math.abs(y - sy) < 18) {
            c.style.left = sx + "px";
            c.style.top = sy + "px";
            placed[idx] = true;
            hud.textContent = placed.filter(Boolean).length === n * n ? "Picture complete" : placed.filter(Boolean).length + " pieces seated";
          }
        };
        wrap.appendChild(c);
      });
      board.appendChild(wrap);
      hud.textContent = "Drag pieces onto the board";
    }
    toolbar.innerHTML = "";
    const b = document.createElement("button");
    b.className = "btn primary";
    b.textContent = "New scramble";
    b.onclick = reset;
    toolbar.appendChild(b);
    reset();
  };
})();
