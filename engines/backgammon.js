(function () {
  window.BA.games.backgammon = function (board, cfg, toolbar, hud) {
    let pts, bar, off, turn = true, sel = null, dice = [0, 0], rolled = false, movesLeft = [];
    let rollBtn;

    function start() {
      pts = Array(24).fill(0);
      pts[0] = -2;
      pts[5] = 5;
      pts[7] = -3;
      pts[11] = 5;
      pts[12] = -5;
      pts[16] = 3;
      pts[18] = -5;
      pts[23] = 2;
      bar = [0, 0];
      off = [0, 0];
      turn = true;
      sel = null;
      rolled = false;
      dice = [0, 0];
      movesLeft = [];
      draw();
    }

    function rollDice() {
      if (!turn || rolled) return;
      dice = [1 + Math.floor(Math.random() * 6), 1 + Math.floor(Math.random() * 6)];
      movesLeft = dice[0] === dice[1]
        ? [dice[0], dice[0], dice[0], dice[0]]
        : [dice[0], dice[1]];
      rolled = true;
      sel = null;
      draw();
    }

    function playerHomeOnly() {
      if (bar[0]) return false;
      for (let i = 6; i < 24; i++) if (pts[i] > 0) return false;
      return true;
    }

    function cpuHomeOnly() {
      if (bar[1]) return false;
      for (let i = 0; i < 18; i++) if (pts[i] < 0) return false;
      return true;
    }

    function canLandPlayer(i) {
      return pts[i] >= 0 || pts[i] === -1;
    }

    function canLandCpu(i) {
      return pts[i] <= 0 || pts[i] === 1;
    }

    function applyPlayerMove(from, to, dist) {
      if (to >= 0 && to < 24) {
        if (!canLandPlayer(to)) return false;
        if (pts[to] === -1) { pts[to] = 1; bar[1]++; }
        else pts[to]++;
      } else if (to === -1 && playerHomeOnly() && from <= 5) {
        off[0]++;
      } else return false;
      pts[from]--;
      const idx = movesLeft.indexOf(dist);
      if (idx >= 0) movesLeft.splice(idx, 1);
      return true;
    }

    function applyCpuMove(from, to) {
      if (to >= 0 && to < 24) {
        if (!canLandCpu(to)) return false;
        if (pts[to] === 1) { pts[to] = -1; bar[0]++; }
        else pts[to]--;
      } else if (to === 24 && cpuHomeOnly()) {
        off[1]++;
      } else return false;
      pts[from]++;
      return true;
    }

    function endPlayerTurn() {
      sel = null;
      if (movesLeft.length && !bar[0]) {
        draw();
        return;
      }
      rolled = false;
      movesLeft = [];
      turn = false;
      if (off[0] >= 15) { hud.textContent = "You win — all checkers borne off"; draw(); return; }
      setTimeout(cpu, 350);
      draw();
    }

    function click(i) {
      if (!turn || !rolled) return;

      if (bar[0] > 0) {
        const entry = 24 - movesLeft[0];
        if (i !== entry || pts[entry] <= -2) return;
        bar[0]--;
        if (pts[entry] === -1) { pts[entry] = 1; bar[1]++; }
        else pts[entry]++;
        movesLeft.shift();
        endPlayerTurn();
        return;
      }

      if (sel == null) {
        if (pts[i] <= 0) return;
        sel = i;
        draw();
        return;
      }

      const from = sel;
      sel = null;
      let moved = false;
      for (const dist of [...movesLeft]) {
        const to = from - dist;
        if (to >= 0 && to < from && applyPlayerMove(from, to, dist)) { moved = true; break; }
        if (to < 0 && playerHomeOnly() && from <= 5 && applyPlayerMove(from, -1, dist)) { moved = true; break; }
      }
      if (!moved) { sel = from; draw(); return; }
      endPlayerTurn();
    }

    function cpu() {
      if (off[1] >= 15) { hud.textContent = "Computer wins"; turn = true; draw(); return; }

      dice = [1 + Math.floor(Math.random() * 6), 1 + Math.floor(Math.random() * 6)];
      const cpuMoves = dice[0] === dice[1]
        ? [dice[0], dice[0], dice[0], dice[0]]
        : [dice[0], dice[1], dice[0] + dice[1]];

      let moved = false;
      if (bar[1] > 0) {
        const entry = cpuMoves[0] - 1;
        if (entry >= 0 && entry < 24 && canLandCpu(entry)) {
          bar[1]--;
          if (pts[entry] === 1) { pts[entry] = -1; bar[0]++; }
          else pts[entry]--;
          moved = true;
        }
      }

      if (!moved) {
        outer: for (const dist of cpuMoves) {
          for (let i = 0; i < 24; i++) {
            if (pts[i] >= 0) continue;
            const to = i + dist;
            if (to === 24 && cpuHomeOnly() && applyCpuMove(i, 24)) { moved = true; break outer; }
            if (to < 24 && applyCpuMove(i, to)) { moved = true; break outer; }
          }
        }
      }

      turn = true;
      rolled = false;
      movesLeft = [];
      hud.textContent = moved
        ? `Computer rolled ${dice[0]} & ${dice[1]} — roll to reply`
        : `Computer rolled ${dice[0]} & ${dice[1]} but passed — roll to play`;
      draw();
    }

    function draw() {
      board.innerHTML = "";
      const wrap = document.createElement("div");
      wrap.className = "backgammon-wrap";

      const meta = document.createElement("div");
      meta.className = "bg-meta";
      meta.innerHTML = `<span>You off: ${off[0]}</span><span>Bar: ${bar[0]} / ${bar[1]}</span><span>CPU off: ${off[1]}</span>`;
      wrap.appendChild(meta);

      const g = document.createElement("div");
      g.className = "backgammon-board";
      for (let i = 23; i >= 0; i--) {
        const p = document.createElement("div");
        p.className = "bg-point" + (sel === i ? " sel" : "");
        const n = Math.abs(pts[i]);
        p.innerHTML = `<span class="bg-n">${n || ""}</span><span class="bg-i">${i + 1}</span>`;
        if (pts[i] > 0) p.classList.add("you");
        if (pts[i] < 0) p.classList.add("cpu");
        p.onclick = () => click(i);
        g.appendChild(p);
      }
      wrap.appendChild(g);
      board.appendChild(wrap);

      if (off[0] >= 15) hud.textContent = "You win — all checkers borne off";
      else if (off[1] >= 15) hud.textContent = "Computer wins";
      else if (turn) {
        if (!rolled) hud.textContent = "Roll dice to begin your turn";
        else {
          const left = movesLeft.length ? ` · ${movesLeft.length} move${movesLeft.length > 1 ? "s" : ""} left` : "";
          hud.textContent = `Dice ${dice[0]} & ${dice[1]}${left} — ${bar[0] ? "enter from bar" : "pick checker, then destination"}`;
        }
      } else hud.textContent = "Computer thinking…";

      if (rollBtn) rollBtn.disabled = !turn || rolled;
    }

    toolbar.innerHTML = "";
    const b = document.createElement("button");
    b.className = "btn primary";
    b.textContent = "New game";
    b.onclick = start;
    toolbar.appendChild(b);
    rollBtn = document.createElement("button");
    rollBtn.className = "btn hint";
    rollBtn.textContent = "Roll dice";
    rollBtn.onclick = rollDice;
    toolbar.appendChild(rollBtn);
    start();
  };
})();
