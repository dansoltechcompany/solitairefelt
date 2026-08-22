/**
 * Traditional English-pattern faces (Chris Aguilar / Byron Knoll, LGPL).
 * See img/deck/LICENSE.
 */
window.BA = window.BA || {};

(function () {
  const FILE = {
    1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6",
    7: "7", 8: "8", 9: "9", 10: "10", 11: "j", 12: "q", 13: "k"
  };

  function src(name) {
    const root = (window.BA.root || ".").replace(/\/$/, "");
    return root + "/img/deck/" + name + "?v=2";
  }

  window.BA.cardHTML = function (c) {
    const file = FILE[c.r] + c.s + ".svg";
    return `<img class="card-face" src="${src(file)}" alt="" draggable="false" />`;
  };

  window.BA.cardBackHTML = function () {
    return `<img class="card-face" src="${src("back.svg")}" alt="" draggable="false" />`;
  };
})();
