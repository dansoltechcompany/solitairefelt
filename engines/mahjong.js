(function () {
  /* 36 faces: wan, bamboo, circles, winds, dragons, flowers */
  const FACES = [
    ...Array.from({ length: 9 }, (_, i) => String.fromCodePoint(0x1F007 + i)),
    ...Array.from({ length: 9 }, (_, i) => String.fromCodePoint(0x1F010 + i)),
    ...Array.from({ length: 9 }, (_, i) => String.fromCodePoint(0x1F019 + i)),
    String.fromCodePoint(0x1F000),
    String.fromCodePoint(0x1F001),
    String.fromCodePoint(0x1F002),
    String.fromCodePoint(0x1F003),
    String.fromCodePoint(0x1F004),
    String.fromCodePoint(0x1F005),
    String.fromCodePoint(0x1F006),
    "梅", "竹"
  ];
  const BONUS = new Set([34, 35]);

  function shuffle(a, rnd) {
    const r = rnd || Math.random;
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(r() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function types(n, rnd) {
    const t = [];
    const pairs = Math.ceil(n / 2);
    for (let i = 0; i < pairs; i++) { t.push(i % 36); t.push(i % 36); }
    return shuffle(t, rnd).slice(0, n);
  }

  function makeLayout(kind, rnd) {
    const spots = [];
    if (kind === "fortress") {
      for (let y = 0; y < 6; y++) for (let x = 0; x < 12; x++) spots.push({ x, y, z: 0 });
      for (let y = 1; y < 5; y++) for (let x = 2; x < 10; x++) spots.push({ x, y, z: 1 });
      for (let y = 2; y < 4; y++) for (let x = 4; x < 8; x++) spots.push({ x, y, z: 2 });
    } else if (kind === "pyramid") {
      for (let y = 0; y < 8; y++) for (let x = y; x < 12 - y; x++) spots.push({ x, y, z: 0 });
      for (let y = 1; y < 6; y++) for (let x = y + 1; x < 11 - y; x++) spots.push({ x, y, z: 1 });
      spots.push({ x: 5, y: 3, z: 2 }, { x: 6, y: 3, z: 2 });
    } else if (kind === "spider") {
      for (let y = 0; y < 4; y++) for (let x = 0; x < 8; x++) spots.push({ x, y, z: 0 });
      for (let y = 0; y < 4; y++) for (let x = 8; x < 16; x++) spots.push({ x, y, z: 0 });
      for (let y = 1; y < 3; y++) for (let x = 2; x < 6; x++) spots.push({ x, y, z: 1 });
      for (let y = 1; y < 3; y++) for (let x = 10; x < 14; x++) spots.push({ x, y, z: 1 });
    } else if (kind === "dragon") {
      for (let y = 0; y < 8; y++) for (let x = 2; x < 14; x++) spots.push({ x, y, z: 0 });
      for (let y = 1; y < 7; y++) for (let x = 4; x < 12; x++) spots.push({ x, y, z: 1 });
      for (let y = 2; y < 6; y++) spots.push({ x: 5, y, z: 2 }, { x: 10, y, z: 2 });
      spots.push({ x: 7, y: 3, z: 3 }, { x: 8, y: 3, z: 3 }, { x: 7, y: 4, z: 3 }, { x: 8, y: 4, z: 3 });
    } else if (kind === "bridge") {
      for (let y = 2; y < 6; y++) for (let x = 0; x < 16; x++) spots.push({ x, y, z: 0 });
      for (let y = 1; y < 7; y++) for (let x = 3; x < 13; x++) spots.push({ x, y, z: 1 });
      for (let y = 2; y < 6; y++) for (let x = 6; x < 10; x++) spots.push({ x, y, z: 2 });
    } else if (kind === "aztec") {
      for (let y = 0; y < 8; y++) {
        const inset = y < 4 ? 4 - y : y - 3;
        for (let x = inset; x < 16 - inset; x++) spots.push({ x, y, z: 0 });
      }
      for (let y = 2; y < 6; y++) for (let x = 4; x < 12; x++) spots.push({ x, y, z: 1 });
      spots.push({ x: 7, y: 3, z: 2 }, { x: 8, y: 4, z: 2 });
    } else {
      for (let y = 0; y < 8; y++) for (let x = 1; x < 13; x++) spots.push({ x, y, z: 0 });
      for (let y = 1; y < 7; y++) for (let x = 3; x < 11; x++) spots.push({ x, y, z: 1 });
      for (let y = 2; y < 6; y++) for (let x = 4; x < 10; x++) spots.push({ x, y, z: 2 });
      for (let y = 3; y < 5; y++) for (let x = 5; x < 9; x++) spots.push({ x, y, z: 3 });
      spots.push({ x: 6, y: 3, z: 4 }, { x: 7, y: 4, z: 4 });
    }
    const t = types(spots.length - (spots.length % 2), rnd);
    if (spots.length % 2) spots.pop();
    return spots.map((p, i) => ({ ...p, t: t[i], gone: false }));
  }

  function blocked(tiles, a) {
    if (a.gone) return true;
    if (tiles.some((b) => !b.gone && b.z > a.z && b.x === a.x && b.y === a.y)) return true;
    const left = tiles.some((b) => !b.gone && b.z === a.z && b.y === a.y && b.x === a.x - 1);
    const right = tiles.some((b) => !b.gone && b.z === a.z && b.y === a.y && b.x === a.x + 1);
    return left && right;
  }

  function findFreePair(ts) {
    const free = ts.map((t, i) => ({ t, i })).filter((x) => !x.t.gone && !blocked(ts, x.t));
    for (let i = 0; i < free.length; i++)
      for (let j = i + 1; j < free.length; j++)
        if (free[i].t.t === free[j].t.t) return free[i].i;
    return null;
  }

  window.BA.games.mahjong = function (board, cfg, toolbar, hud) {
    let tiles, pick, t0;
    function syncHud() {
      const remaining = tiles.filter((t) => !t.gone).length;
      const sec = Math.floor((Date.now() - t0) / 1000);
      if (remaining === 0) {
        hud.textContent = "Cleared — well played.";
      } else if (findFreePair(tiles) == null) {
        hud.textContent = `No moves — tap New layout · ${remaining} tiles · ${sec}s`;
      } else {
        hud.textContent = `${remaining} tiles · ${sec}s`;
      }
    }
    function deal() {
      tiles = makeLayout(cfg.layout || "turtle", cfg.daily ? window.BA.mulberry(window.BA.todaySeed()) : Math.random);
      pick = null;
      t0 = Date.now();
      draw();
    }
    function draw() {
      board.innerHTML = "";
      const scroll = document.createElement("div");
      scroll.className = "mahjong-scroll";
      const wrap = document.createElement("div");
      wrap.className = "mahjong-board";
      let maxW = 0, maxH = 0;
      tiles.forEach((tile, i) => {
        if (tile.gone) return;
        const isBlocked = blocked(tiles, tile);
        const n = document.createElement("div");
        n.className = "mj-tile"
          + (isBlocked ? " blocked" : " free")
          + (pick === i ? " picked" : "")
          + (BONUS.has(tile.t) ? " mj-bonus" : "");
        n.dataset.z = String(tile.z);
        const left = tile.x * 30 + tile.z * 5;
        const top = tile.y * 34 + tile.z * 5;
        n.style.left = left + "px";
        n.style.top = top + "px";
        n.style.zIndex = tile.z * 24 + tile.y;
        maxW = Math.max(maxW, left + 46);
        maxH = Math.max(maxH, top + 58);
        n.innerHTML = `<span class="mj-face" aria-hidden="true">${FACES[tile.t]}</span>`;
        n.onclick = () => {
          if (isBlocked) return;
          if (pick == null) { pick = i; draw(); return; }
          if (pick === i) { pick = null; draw(); return; }
          if (tiles[pick].t === tile.t) {
            tiles[pick].gone = tile.gone = true;
            pick = null;
          } else pick = i;
          draw();
        };
        wrap.appendChild(n);
      });
      wrap.style.width = (maxW + 32) + "px";
      wrap.style.height = Math.max(420, maxH + 36) + "px";
      scroll.appendChild(wrap);
      board.appendChild(scroll);
      syncHud();
    }
    toolbar.innerHTML = "";
    const b = document.createElement("button");
    b.className = "btn primary";
    b.textContent = cfg.daily ? "Today's layout" : "New layout";
    b.onclick = deal;
    toolbar.appendChild(b);
    const s = document.createElement("button");
    s.className = "btn hint";
    s.textContent = "Hint";
    s.onclick = () => {
      const hint = findFreePair(tiles);
      if (hint != null) { pick = hint; draw(); return; }
      syncHud();
    };
    toolbar.appendChild(s);
    deal();
  };
})();
