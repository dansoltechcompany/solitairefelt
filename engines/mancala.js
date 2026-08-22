(function () {
  window.BA.games.mancala = function (board, cfg, toolbar, hud) {
    let pits, turn, over;
    function reset() {
      pits = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0];
      turn = 0;
      over = false;
      draw();
    }
    function sow(i) {
      if (over) return;
      const mine = turn === 0 ? i < 6 : i >= 7 && i < 13;
      if (!mine || !pits[i]) return;
      let n = pits[i];
      pits[i] = 0;
      let p = i;
      while (n--) {
        p = (p + 1) % 14;
        if (turn === 0 && p === 13) { n++; continue; }
        if (turn === 1 && p === 6) { n++; continue; }
        pits[p]++;
      }
      const store = turn === 0 ? 6 : 13;
      if (p !== store) {
        const rowStart = turn === 0 ? 0 : 7;
        if (p >= rowStart && p < rowStart + 6 && pits[p] === 1) {
          const opp = 12 - p;
          pits[store] += pits[opp] + 1;
          pits[opp] = pits[p] = 0;
        }
        turn = 1 - turn;
      }
      if (pits.slice(0, 6).every((x) => !x) || pits.slice(7, 13).every((x) => !x)) {
        pits[6] += pits.slice(0, 6).reduce((a, b) => a + b, 0);
        pits[13] += pits.slice(7, 13).reduce((a, b) => a + b, 0);
        for (let k = 0; k < 6; k++) pits[k] = pits[k + 7] = 0;
        over = true;
      }
      draw();
      if (!over && turn === 1) setTimeout(cpu, 280);
    }
    function cpu() {
      const opts = [];
      for (let i = 7; i < 13; i++) if (pits[i]) opts.push(i);
      if (opts.length) sow(opts[Math.floor(Math.random() * opts.length)]);
    }
    function draw() {
      board.innerHTML = "";
      const wrap = document.createElement("div");
      wrap.className = "mancala";
      const s1 = document.createElement("div");
      s1.className = "store";
      s1.textContent = pits[13];
      const mid = document.createElement("div");
      const top = document.createElement("div");
      top.style.display = "flex";
      top.style.gap = "8px";
      for (let i = 12; i >= 7; i--) midPit(top, i);
      const bot = document.createElement("div");
      bot.style.display = "flex";
      bot.style.gap = "8px";
      bot.style.marginTop = "8px";
      for (let i = 0; i < 6; i++) midPit(bot, i);
      mid.appendChild(top);
      mid.appendChild(bot);
      const s0 = document.createElement("div");
      s0.className = "store";
      s0.textContent = pits[6];
      wrap.append(s1, mid, s0);
      board.appendChild(wrap);
      hud.textContent = over ? (pits[6] > pits[13] ? "You win" : pits[6] < pits[13] ? "CPU wins" : "Draw") : (turn ? "CPU" : "Your pits are the bottom row");
    }
    function midPit(parent, i) {
      const d = document.createElement("div");
      d.className = "pit";
      d.textContent = pits[i];
      d.onclick = () => sow(i);
      parent.appendChild(d);
    }
    toolbar.innerHTML = "";
    const n = document.createElement("button");
    n.className = "btn primary";
    n.textContent = "New game";
    n.onclick = reset;
    toolbar.appendChild(n);
    reset();
  };
})();
