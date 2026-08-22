(function () {
  const TEXT = "classic solitaire still earns the most lunch-break searches because the rules never need a tutorial and a single deal can last twenty quiet minutes";
  window.BA.games.typing = function (board, cfg, toolbar, hud) {
    let i = 0, ok = 0, typed = 0, t0 = 0, done = false;
    function render() {
      board.innerHTML = `<div class="type-box"><p style="font-size:1.25rem;line-height:1.8">${TEXT.split("").map((ch, n) => {
        const col = n < i ? ( /* marked in paint */ "inherit") : "var(--cream-dim)";
        return `<span style="color:${n < i ? "var(--ok)" : n === i ? "var(--brass)" : "var(--cream-dim)"}">${ch}</span>`;
      }).join("")}</p>
      <textarea style="width:100%;min-height:90px;margin-top:12px;background:#1c1a16;color:#f3ead7;border:1px solid rgba(212,168,75,.22);border-radius:10px;padding:10px;font:inherit" placeholder="Click and type here"></textarea></div>`;
      const ta = board.querySelector("textarea");
      ta.oninput = () => {
        if (!t0) t0 = Date.now();
        const v = ta.value;
        typed = v.length;
        i = 0; ok = 0;
        for (; i < v.length && i < TEXT.length; i++) if (v[i] === TEXT[i]) ok++;
        i = v.length;
        const sec = Math.max(1, (Date.now() - t0) / 1000);
        const wpm = Math.round((ok / 5) / (sec / 60));
        const acc = typed ? Math.round(ok / typed * 100) : 100;
        hud.textContent = `${wpm} WPM · ${acc}% accuracy`;
        if (v.length >= TEXT.length) { done = true; ta.readOnly = true; }
        renderKeep(ta.value);
      };
      ta.focus();
    }
    function renderKeep(val) {
      const p = board.querySelector("p");
      p.innerHTML = TEXT.split("").map((ch, n) => {
        let c = "var(--cream-dim)";
        if (n < val.length) c = val[n] === ch ? "var(--ok)" : "var(--danger)";
        else if (n === val.length) c = "var(--brass)";
        return `<span style="color:${c}">${ch}</span>`;
      }).join("");
    }
    toolbar.innerHTML = "";
    const b = document.createElement("button");
    b.className = "btn primary";
    b.textContent = "Restart";
    b.onclick = () => { i = ok = typed = t0 = 0; done = false; render(); hud.textContent = "60-second style sprint — finish the line"; };
    toolbar.appendChild(b);
    render();
    hud.textContent = "Click the box and type the passage";
  };
})();
