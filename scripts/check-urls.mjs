import fs from "node:fs";

const sitemap = fs.readFileSync("sitemap.xml", "utf8");
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const failures = [];

function fail(msg) {
  failures.push(msg);
}

if (locs.some((u) => u.includes(".html"))) fail("sitemap still lists an .html address");
for (const required of [
  "https://solitairefelt.com/",
  "https://solitairefelt.com/about",
  "https://solitairefelt.com/categories/solitaire",
  "https://solitairefelt.com/games/chess/",
]) {
  if (!locs.includes(required)) fail("sitemap missing " + required);
}

function canonical(file) {
  const html = fs.readFileSync(file, "utf8");
  const m = html.match(/rel="canonical" href="([^"]+)"/);
  return m ? m[1] : "";
}

if (canonical("about.html") !== "https://solitairefelt.com/about") fail("about canonical");
if (canonical("categories/solitaire.html") !== "https://solitairefelt.com/categories/solitaire") fail("category canonical");
if (canonical("games/chess/index.html") !== "https://solitairefelt.com/games/chess/") fail("chess canonical");
if (canonical("index.html") !== "https://solitairefelt.com/") fail("home canonical");

const home = fs.readFileSync("index.html", "utf8");
if (home.includes("index.html")) fail("homepage still links to index.html");
if (!home.includes('target":"https://solitairefelt.com/?q={query}"') && !home.includes("https://solitairefelt.com/?q={query}")) {
  fail("search target");
}

const chrome = fs.readFileSync("js/chrome.js", "utf8");
if (/href="\$\{r\}\/[^"]*\.html/.test(chrome)) fail("chrome.js still links to .html");

const worker = fs.readFileSync("_worker.js", "utf8");
if (!worker.includes("www.solitairefelt.com")) fail("worker missing www fold");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log("public addresses ok,", locs.length, "sitemap urls");
