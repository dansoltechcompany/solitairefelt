(function () {
  window.BA.games.idle = function (board, cfg, toolbar, hud) {
    const key = "ba-star-kiln";
    const shop = [
      { id: "stoker", name: "Stoker", base: 15, rate: 0.2 },
      { id: "bellows", name: "Bellows", base: 100, rate: 1.2 },
      { id: "forge", name: "Forge hand", base: 800, rate: 8 },
      { id: "foundry", name: "Foundry", base: 7000, rate: 50 }
    ];
    let s = { heat: 0, prest: 1, items: { stoker: 0, bellows: 0, forge: 0, foundry: 0 } };
    try { Object.assign(s, JSON.parse(localStorage.getItem(key) || "{}")); } catch (e) {}
    if (!s.items || typeof s.items !== "object") s.items = { stoker: 0, bellows: 0, forge: 0, foundry: 0 };
    if (typeof s.heat !== "number" || Number.isNaN(s.heat)) s.heat = 0;
    if (typeof s.prest !== "number" || Number.isNaN(s.prest)) s.prest = 1;

    function cost(it) { return Math.floor(it.base * Math.pow(1.15, s.items[it.id] || 0)); }
    function rate() {
      return shop.reduce((n, it) => n + (s.items[it.id] || 0) * it.rate, 0) * s.prest;
    }
    function save() { localStorage.setItem(key, JSON.stringify(s)); }

    function draw() {
      board.innerHTML = "";
      const box = document.createElement("div");
      box.className = "idle-box";
      const kiln = document.createElement("button");
      kiln.className = "btn primary";
      kiln.style.width = "100%";
      kiln.style.height = "90px";
      kiln.style.fontSize = "1.3rem";
      kiln.textContent = "Tend the kiln (+" + s.prest.toFixed(1) + ")";
      kiln.onclick = () => { s.heat += s.prest; save(); paintHud(); };
      box.appendChild(kiln);
      const store = document.createElement("div");
      store.className = "idle-store";
      shop.forEach((it) => {
        const row = document.createElement("div");
        row.className = "idle-item";
        row.innerHTML = `<div><strong>${it.name}</strong><br><span>${s.items[it.id] || 0} owned · +${it.rate}/s</span></div>`;
        const b = document.createElement("button");
        b.className = "btn";
        b.textContent = cost(it) + " heat";
        b.onclick = () => {
          const c = cost(it);
          if (s.heat < c) return;
          s.heat -= c;
          s.items[it.id] = (s.items[it.id] || 0) + 1;
          save();
          draw();
        };
        row.appendChild(b);
        store.appendChild(row);
      });
      box.appendChild(store);
      board.appendChild(box);
      paintHud();
    }
    function paintHud() {
      hud.textContent = Math.floor(s.heat) + " heat · " + rate().toFixed(1) + "/s · prestige ×" + s.prest.toFixed(1);
    }
    toolbar.innerHTML = "";
    const p = document.createElement("button");
    p.className = "btn";
    p.textContent = "Prestige (need 5000)";
    p.onclick = () => {
      if (s.heat < 5000) return;
      s.prest += 0.25;
      s.heat = 0;
      s.items = { stoker: 0, bellows: 0, forge: 0, foundry: 0 };
      save();
      draw();
    };
    toolbar.appendChild(p);
    draw();
    setInterval(() => { s.heat += rate() / 5; save(); paintHud(); }, 200);
  };
})();
