(function () {
  const WORDS = "solitaire mahjong pyramid yukon spider freecell checkers reversi mancala gomoku jigsaw nonogram kiln arcade browser puzzle queen knight bishop castle harvest maple river canyon thunder".split(" ");
  window.BA.games.hangman = function (board, cfg, toolbar, hud) {
    let word, misses, used;
    function reset() {
      word = WORDS[Math.floor(Math.random() * WORDS.length)];
      misses = 0;
      used = new Set();
      draw();
    }
    function draw() {
      const show = word.split("").map((c) => used.has(c) ? c : "_").join(" ");
      board.innerHTML = `<div class="word-box"><p style="font-size:2rem;letter-spacing:6px;text-align:center">${show}</p>
        <p style="text-align:center">Misses ${misses} / 7</p>
        <div class="kb"></div></div>`;
      const kb = board.querySelector(".kb");
      "abcdefghijklmnopqrstuvwxyz".split("").forEach((k) => {
        const b = document.createElement("button");
        b.className = "btn";
        b.textContent = k;
        b.disabled = used.has(k);
        b.onclick = () => {
          used.add(k);
          if (!word.includes(k)) misses++;
          draw();
        };
        kb.appendChild(b);
      });
      const won = word.split("").every((c) => used.has(c));
      hud.textContent = won ? "Word found" : misses >= 7 ? "The word was " + word : "Guess a letter";
    }
    toolbar.innerHTML = "";
    const n = document.createElement("button");
    n.className = "btn primary";
    n.textContent = "New word";
    n.onclick = reset;
    toolbar.appendChild(n);
    reset();
  };
})();
