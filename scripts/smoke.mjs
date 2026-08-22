import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createDom } from "./dom-shim.mjs";
import { GAMES } from "../js/catalog.mjs";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const { window, document } = createDom();
global.window = window;
global.document = document;
global.localStorage = window.localStorage;
global.HTMLElement = window.HTMLElement;
global.setTimeout = window.setTimeout;
global.location = window.location;
global.Image = window.Image;
global.requestAnimationFrame = window.requestAnimationFrame;

window.eval(fs.readFileSync(path.join(root, "js/deck.js"), "utf8"));
// Minimal card helpers some engines expect on BA
window.BA.cardHTML = window.BA.cardHTML || (() => "");
window.BA.cardBackHTML = window.BA.cardBackHTML || (() => "");
const loaded = new Set();
const fails = [];
const warns = [];

function loadEngine(name) {
  if (loaded.has(name)) return;
  window.eval(fs.readFileSync(path.join(root, "engines", name + ".js"), "utf8"));
  loaded.add(name);
}

function okBoard(board, hud, g) {
  if (board.childNodes.length) return true;
  if (hud.textContent && !/failed|could not|cannot draw/i.test(hud.textContent)) return true;
  if (g.engine === "jigsaw" && /cannot draw/i.test(hud.textContent || "")) {
    warns.push(g.id + ": canvas unavailable in test runner (ok in browser)");
    return true;
  }
  return false;
}

for (const g of GAMES) {
  try {
    loadEngine(g.engine);
    const board = document.createElement("div");
    board.style.width = "900px";
    const toolbar = document.createElement("div");
    const hud = document.createElement("div");
    document.body.append(board, toolbar, hud);
    const fn = window.BA.games[g.engine];
    if (!fn) throw new Error("engine missing " + g.engine);
    fn(board, g.config || {}, toolbar, hud);
    if (!okBoard(board, hud, g)) throw new Error("empty board");
    if (/could not start|failed to load/i.test(hud.textContent || "")) throw new Error("hud error: " + hud.textContent);
    if (!toolbar.querySelector("button") && g.engine !== "crossword") warns.push(g.id + ": no toolbar button");
    board.remove();
    toolbar.remove();
    hud.remove();
  } catch (e) {
    fails.push(g.id + ": " + e.message);
  }
}

if (warns.length) console.warn("WARNINGS\n" + warns.join("\n"));
if (fails.length) {
  console.error("FAILS\n" + fails.join("\n"));
  process.exit(1);
}
console.log("booted", GAMES.length, "games");
