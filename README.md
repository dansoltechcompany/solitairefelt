# SolitaireFelt

Free solitaire, mahjong, sudoku, and daily puzzles on the green felt — play instantly in your browser.

**Live site:** [solitairefelt.com](https://solitairefelt.com)

## Develop

```bash
npm run generate   # rebuild HTML from js/catalog.mjs
npm run check:urls # one public address per page
npm run smoke      # boot-test all 63 game engines
npx serve -l 8080  # preview locally
```

Each page has one public address on `https://solitairefelt.com`: no `www`, no `.html`, and game pages keep the trailing slash. The menu, sitemap, and canonical tags use those addresses. Old `.html` addresses and `www.solitairefelt.com` forward to them.

## Stack

Static HTML/CSS/JS — no backend, no build step beyond `generate.mjs`.
