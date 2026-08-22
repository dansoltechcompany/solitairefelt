import fs from "fs";
const code = fs.readFileSync("engines/kakuro.js", "utf8");
const start = code.indexOf("const LAYOUT = [");
const layoutEnd = code.indexOf("];", start) + 2;
const LAYOUT = Function(`return ${code.slice(start + 15, layoutEnd)}`)();
const solBlocks = [...code.matchAll(/puzzle\(\"[^\"]+\", (\{[\s\S]*?\})\)/g)];
const PUZZLES = solBlocks.map((m, i) => {
  const solution = Function(`return ${m[1]}`)();
  const clues = {};
  const H = LAYOUT.length, W = LAYOUT[0].length;
  const white = (r, c) => { const ch = LAYOUT[r][c]; return ch !== "#" && ch !== "."; };
  for (let r = 0; r < H; r++) for (let c = 0; c < W; c++) {
    if (LAYOUT[r][c] !== ".") continue;
    const cl = {};
    let ac = 0, acN = 0;
    for (let x = c + 1; x < W && white(r, x); x++) { ac += solution[`${r},${x}`]; acN++; }
    if (acN) cl.ac = ac;
    let dn = 0, dnN = 0;
    for (let y = r + 1; y < H && white(y, c); y++) { dn += solution[`${y},${c}`]; dnN++; }
    if (dnN) cl.dn = dn;
    if (Object.keys(cl).length) clues[`${r},${c}`] = cl;
  }
  return { solution, clues };
});

function runsFor(puzzle) {
  const list = [];
  const H = puzzle.layout.length, W = puzzle.layout[0].length;
  const white = (r, c) => {
    const ch = puzzle.layout[r][c];
    return ch !== "#" && ch !== ".";
  };
  Object.entries(puzzle.clues).forEach(([key, cl]) => {
    const [r, c] = key.split(",").map(Number);
    if (cl.ac) {
      const cells = [];
      for (let x = c + 1; x < W && white(r, x); x++) cells.push(`${r},${x}`);
      if (cells.length) list.push({ cells, sum: cl.ac });
    }
    if (cl.dn) {
      const cells = [];
      for (let y = r + 1; y < H && white(y, c); y++) cells.push(`${y},${c}`);
      if (cells.length) list.push({ cells, sum: cl.dn });
    }
  });
  return list;
}

for (let i = 0; i < PUZZLES.length; i++) {
  const p = PUZZLES[i];
  const runs = runsFor(p);
  let ok = true;
  for (const run of runs) {
    const vals = run.cells.map((k) => p.solution[k]);
    if (vals.some((v) => v == null)) {
      console.log("puzzle", i, "INCOMPLETE", run, vals);
      ok = false;
      continue;
    }
    if (vals.reduce((a, b) => a + b, 0) !== run.sum) {
      console.log("puzzle", i, "BAD SUM", run, vals, "want", run.sum);
      ok = false;
    }
    if (new Set(vals).size !== vals.length) {
      console.log("puzzle", i, "DUP", run, vals);
      ok = false;
    }
  }
  const whites = [];
  p.layout.forEach((row, r) => [...row].forEach((ch, c) => {
    if (ch !== "#" && ch !== ".") whites.push(`${r},${c}`);
  }));
  if (whites.length !== Object.keys(p.solution).length) {
    console.log("puzzle", i, "WHITE MISMATCH", whites, Object.keys(p.solution));
    ok = false;
  }
  whites.forEach((k) => {
    if (!p.solution[k]) console.log("puzzle", i, "MISSING SOL", k);
  });
  console.log("puzzle", i, ok ? "OK" : "FAIL");
}
