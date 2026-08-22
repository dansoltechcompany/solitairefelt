(function () {
  const SETS = [
    { letters: "ARCADE", words: ["arc","are","cad","car","care","card","cedar","dare","dear","race","read","red","ace"] },
    { letters: "SPIDER", words: ["sip","dip","rid","red","side","ripe","pride","dips","ride","pied","spire","spider","ripes","spired"] },
    { letters: "STONE", words: ["one","ton","net","not","set","son","eon","toes","notes","stone","nest","sent","tone"] }
  ];
  window.BA.games.anagrams = function (board, cfg, toolbar, hud) {
    let pack, need, got, buf = "";

    function canMake(w) {
      const pool = pack.letters.toLowerCase().split("");
      for (const ch of w) {
        const i = pool.indexOf(ch);
        if (i < 0) return false;
        pool.splice(i, 1);
      }
      return true;
    }

    function reset() {
      pack = SETS[Math.floor(Math.random() * SETS.length)];
      need = new Set(pack.words.map((w) => w.toLowerCase()).filter((w) => w.length >= 3));
      got = new Set();
      buf = "";
      draw();
    }

    function draw() {
      board.innerHTML = `<div class="word-box"><p style="text-align:center;font-size:2rem;letter-spacing:8px">${pack.letters}</p>
        <p style="text-align:center">${buf.toUpperCase() || "Type a word"}</p>
        <p>${[...got].join(", ")}</p></div>`;
      hud.textContent = got.size + " / " + need.size + " words"
        + (got.size === need.size ? " · All found" : "");
    }

    function submit() {
      const w = buf.toLowerCase();
      if (w.length >= 3 && need.has(w) && canMake(w)) got.add(w);
      else if (w.length >= 3) hud.textContent = need.has(w) ? "Use only the shown letters" : "Not in this hunt's list";
      buf = "";
      draw();
    }

    document.onkeydown = (e) => {
      if (e.key === "Enter") submit();
      else if (e.key === "Backspace") { buf = buf.slice(0, -1); draw(); }
      else if (/^[a-zA-Z]$/.test(e.key)) { buf += e.key.toLowerCase(); draw(); }
    };

    toolbar.innerHTML = "";
    const n = document.createElement("button");
    n.className = "btn primary";
    n.textContent = "New letters";
    n.onclick = reset;
    toolbar.appendChild(n);
    reset();
  };
})();
