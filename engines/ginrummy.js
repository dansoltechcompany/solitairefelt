(function () {
  const RANK = [null, "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  const SUITS = ["s", "h", "c", "d"];
  const GLYPH = { s: "♠", h: "♥", c: "♣", d: "♦" };
  const red = (s) => s === "h" || s === "d";

  function deck() {
    const d = [];
    let id = 0;
    for (const s of SUITS) for (let r = 1; r <= 13; r++) d.push({ s, r, id: id++ });
    return shuffle(d);
  }
  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function deadwood(cards) {
    const val = (c) => Math.min(c.r, 10);
    let best = cards.reduce((t, c) => t + val(c), 0);

    function dfs(unused) {
      if (!unused.length) { best = 0; return; }
      let sub = unused.reduce((t, c) => t + val(c), 0);
      if (sub >= best) return;
      best = Math.min(best, sub);

      for (let r = 1; r <= 13; r++) {
        const set = unused.filter((c) => c.r === r);
        for (let k = 3; k <= set.length; k++) {
          dfs(unused.filter((c) => !set.slice(0, k).some((x) => x.id === c.id)));
        }
      }
      for (const s of SUITS) {
        const suited = unused.filter((c) => c.s === s).sort((a, b) => a.r - b.r);
        for (let i = 0; i < suited.length; i++) {
          for (let j = i + 2; j < suited.length; j++) {
            let ok = true;
            for (let k = i + 1; k <= j; k++) if (suited[k].r !== suited[k - 1].r + 1) ok = false;
            if (!ok) continue;
            const pick = suited.slice(i, j + 1).map((c) => c.id);
            dfs(unused.filter((c) => !pick.includes(c.id)));
          }
        }
      }
    }

    dfs(cards.slice());
    return best;
  }

  window.BA.games.ginrummy = function (board, cfg, toolbar, hud) {
    let hand, cpuHand, stock, discard, turn = true, phase = "draw", over = false;

    function deal() {
      const d = deck();
      hand = d.splice(0, 10);
      cpuHand = d.splice(0, 10);
      discard = [d.pop()];
      stock = d;
      turn = true;
      phase = "draw";
      over = false;
      draw();
    }

    function cardEl(c, fn, title) {
      const n = document.createElement("div");
      n.className = "playing-card " + (red(c.s) ? "red" : "black");
      n.innerHTML = window.BA.cardHTML ? window.BA.cardHTML(c) : (RANK[c.r] + GLYPH[c.s]);
      if (title) n.title = title;
      if (fn) n.onclick = fn;
      return n;
    }

    function endRound(msg) {
      over = true;
      hud.textContent = msg;
    }

    function cpuTurn() {
      if (over || !stock.length) return;
      const takeDiscard = discard.length && Math.random() < 0.35;
      if (takeDiscard) cpuHand.push(discard.pop());
      else cpuHand.push(stock.pop());
      const cdw = deadwood(cpuHand);
      if (cdw === 0) { endRound("Computer gin — you lose."); draw(); return; }
      if (cdw <= 6 && Math.random() < 0.55) {
        const pdw = deadwood(hand);
        endRound(cdw < pdw
          ? `Computer knocks with ${cdw}. Your deadwood ${pdw} — you lose by ${pdw - cdw}.`
          : `Computer knocks with ${cdw}, but you undercut with ${pdw} — you win by ${pdw - cdw}.`);
        draw();
        return;
      }
      const i = Math.floor(Math.random() * cpuHand.length);
      discard.push(cpuHand.splice(i, 1)[0]);
      turn = true;
      phase = "draw";
      draw();
    }

    function drawFromStock() {
      if (!turn || over || phase !== "draw" || !stock.length) return;
      hand.push(stock.pop());
      phase = "discard";
      draw();
    }

    function takeDiscard() {
      if (!turn || over || phase !== "draw" || !discard.length) return;
      hand.push(discard.pop());
      phase = "discard";
      draw();
    }

    function discardCard(i) {
      if (!turn || over || phase !== "discard") return;
      discard.push(hand.splice(i, 1)[0]);
      const dw = deadwood(hand);
      if (dw === 0) { endRound("Gin! You win."); draw(); return; }
      turn = false;
      phase = "draw";
      cpuTurn();
      draw();
    }

    function knock() {
      if (!turn || over || phase !== "discard") return;
      const dw = deadwood(hand);
      if (dw > 10) { hud.textContent = "Deadwood must be 10 or less to knock"; return; }
      const cdw = deadwood(cpuHand);
      if (dw === 0) endRound("Gin! You win.");
      else if (cdw < dw) endRound(`Undercut — CPU ${cdw} vs your ${dw}. You lose by ${dw - cdw}.`);
      else endRound(`You knock with ${dw}. CPU had ${cdw}. You win by ${cdw - dw}.`);
      draw();
    }

    function draw() {
      board.innerHTML = "";
      const wrap = document.createElement("div");
      wrap.className = "gin-table";

      const top = document.createElement("div");
      top.className = "gin-row";
      const stockEl = document.createElement("div");
      stockEl.className = "gin-pile gin-clickable";
      stockEl.textContent = `Stock (${stock.length})`;
      stockEl.title = "Draw from stock";
      stockEl.onclick = drawFromStock;
      top.appendChild(stockEl);

      const discardWrap = document.createElement("div");
      discardWrap.className = "gin-discard";
      if (discard.length) {
        const topCard = cardEl(discard[discard.length - 1], takeDiscard, "Take discard");
        topCard.classList.add("gin-clickable");
        discardWrap.appendChild(topCard);
      }
      top.appendChild(discardWrap);
      wrap.appendChild(top);

      const row = document.createElement("div");
      row.className = "gin-hand";
      hand.forEach((c, i) => {
        row.appendChild(cardEl(c, () => discardCard(i), phase === "discard" ? "Discard" : ""));
      });
      wrap.appendChild(row);
      board.appendChild(wrap);

      const dw = deadwood(hand);
      if (over) return;
      if (!turn) hud.textContent = "Computer turn…";
      else if (phase === "draw") hud.textContent = `Draw from stock or take discard · Deadwood ${dw}`;
      else hud.textContent = `Discard a card or knock · Deadwood ${dw}`;
    }

    toolbar.innerHTML = "";
    const b = document.createElement("button");
    b.className = "btn primary";
    b.textContent = "New deal";
    b.onclick = deal;
    toolbar.appendChild(b);
    const k = document.createElement("button");
    k.className = "btn hint";
    k.textContent = "Knock";
    k.onclick = knock;
    toolbar.appendChild(k);
    deal();
  };
})();
