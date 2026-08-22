(function () {
  const COLS = ["#c45c4a", "#d4a84b", "#3d8b7a", "#4a6fa5"];
  window.BA.games.simon = function (board, cfg, toolbar, hud) {
    let seq = [], step = 0, play = false;
    function flash(i) {
      const pads = [...board.querySelectorAll(".simon-pad")];
      if (!pads[i]) return;
      pads[i].style.filter = "brightness(1.6)";
      setTimeout(() => { pads[i].style.filter = ""; }, 280);
    }
    function next() {
      seq.push(Math.floor(Math.random() * 4));
      step = 0;
      play = false;
      hud.textContent = "Watch · round " + seq.length;
      seq.forEach((v, n) => setTimeout(() => flash(v), 400 * (n + 1)));
      setTimeout(() => { play = true; hud.textContent = "Repeat"; }, 400 * (seq.length + 1));
    }
    function draw() {
      board.innerHTML = "";
      const g = document.createElement("div");
      g.className = "simon-board";
      COLS.forEach((c, i) => {
        const d = document.createElement("button");
        d.className = "simon-pad";
        d.dataset.color = String(i);
        d.onclick = () => {
          if (!play) return;
          flash(i);
          if (i !== seq[step]) { hud.textContent = "Missed at round " + seq.length; play = false; return; }
          step++;
          if (step === seq.length) setTimeout(next, 400);
        };
        g.appendChild(d);
      });
      board.appendChild(g);
    }
    toolbar.innerHTML = "";
    const b = document.createElement("button");
    b.className = "btn primary";
    b.textContent = "Start";
    b.onclick = () => { seq = []; next(); };
    toolbar.appendChild(b);
    draw();
    hud.textContent = "Press Start";
  };
})();
