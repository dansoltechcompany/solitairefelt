(function () {
  const ANSWERS = "crane slate mango prism bloom plant spice honey grain stone flame river world music night light house paper water apple berry cloud dream earth fruit grape heart lemon maple ocean peach queen tiger uncle vapor whale angel brave charm dance eagle frost giant happy ivory joker kneel lucky metal north olive piano quiet royal smile train urban vivid youth".split(" ").filter((w) => w.length === 5);
  const EXTRA = "about above after again along among began begin black bring build carry cause check class clear close could court cover death doing early every extra field first found front great green group happy heard horse hotel house human idea image issue large laugh learn leave legal level light local lucky major match maybe metal might money month mouth music never night north noted occur offer often order other paper party piece place plant point power press prize quite radio ready right river round serve seven shall sharp sheet short shown since small sound south space speak speed spend stand start state still stone store story study style table taken teach thank there these thing think three today total track trade train treat tried truck under until using value visit voice watch water where which while white whole whose woman world would write young".split(" ");
  const ALLOWED = Array.from(new Set(ANSWERS.concat(EXTRA).filter((w) => w.length === 5)));

  window.BA.games.penta = function (board, cfg, toolbar, hud) {
    const rnd = window.BA.mulberry(window.BA.todaySeed());
    const answer = ANSWERS[Math.floor(rnd() * ANSWERS.length)];
    let row = 0, guesses = Array.from({ length: 6 }, () => "");

    function paint() {
      board.innerHTML = "";
      const box = document.createElement("div");
      box.className = "word-box";
      for (let r = 0; r < 6; r++) {
        const line = document.createElement("div");
        line.className = "letter-row";
        for (let c = 0; c < 5; c++) {
          const d = document.createElement("div");
          const ch = (guesses[r][c] || "").toUpperCase();
          d.className = "letter";
          d.textContent = ch;
          if (r < row && ch) {
            const a = answer[c];
            if (ch.toLowerCase() === a) d.classList.add("ok");
            else if (answer.includes(ch.toLowerCase())) d.classList.add("mid");
            else d.classList.add("no");
          }
          line.appendChild(d);
        }
        box.appendChild(line);
      }
      const kb = document.createElement("div");
      kb.className = "kb";
      "qwertyuiopasdfghjklzxcvbnm".split("").forEach((k) => {
        const b = document.createElement("button");
        b.className = "btn";
        b.textContent = k;
        b.onclick = () => type(k);
        kb.appendChild(b);
      });
      const enter = document.createElement("button");
      enter.className = "btn primary";
      enter.textContent = "Enter";
      enter.onclick = submit;
      kb.appendChild(enter);
      const del = document.createElement("button");
      del.className = "btn";
      del.textContent = "Delete";
      del.onclick = () => {
        if (row > 5 || !guesses[row]) return;
        guesses[row] = guesses[row].slice(0, -1);
        paint();
      };
      kb.appendChild(del);
      board.appendChild(box);
      board.appendChild(kb);
      hud.textContent = row >= 6 && guesses[5] !== answer ? "The word was " + answer.toUpperCase() : "Daily five-letter word";
    }

    function type(k) {
      if (row > 5 || guesses[row] == null) return;
      if (guesses[row].length < 5) guesses[row] += k;
      paint();
    }
    function submit() {
      if (row > 5 || !guesses[row]) return;
      const g = guesses[row];
      if (g.length < 5) return;
      if (!ALLOWED.includes(g) && g !== answer) { hud.textContent = "Not in the short list — try another word"; return; }
      const solved = g === answer;
      row++;
      paint();
      if (solved) hud.textContent = "Solved in " + row + (row === 1 ? " try" : " tries");
    }
    document.onkeydown = (e) => {
      if (row > 5) return;
      if (e.key === "Enter") submit();
      else if (e.key === "Backspace") { guesses[row] = (guesses[row] || "").slice(0, -1); paint(); }
      else if (/^[a-zA-Z]$/.test(e.key)) type(e.key.toLowerCase());
    };
    toolbar.innerHTML = "";
    paint();
  };
})();
