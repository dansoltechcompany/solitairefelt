# SolitaireFelt

Free solitaire, mahjong, sudoku, and daily puzzles on the green felt — play instantly in your browser.

**Live site:** [solitairefelt.com](https://solitairefelt.com)

## Develop

```bash
npm run generate   # rebuild HTML from js/catalog.mjs
npm run smoke      # boot-test all 63 game engines
npx serve -l 8080  # preview locally
```

## Stack

Static HTML/CSS/JS — no backend, no build step beyond `generate.mjs`.
