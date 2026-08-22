/**
 * SolitaireFelt catalog — source of truth for pages + SEO.
 * Run: node generate.mjs
 */
export const SITE = {
  name: "SolitaireFelt",
  origin: "https://solitairefelt.com",
  tagline: "Free solitaire, mahjong & daily puzzles on the green felt.",
  email: "hello@solitairefelt.com"
};

export const CATEGORIES = [
  { id: "solitaire", title: "Solitaire & Cards", blurb: "Klondike, Spider, FreeCell, Pyramid, and more — the office-break games people actually search for." },
  { id: "mahjong", title: "Mahjong Solitaire", blurb: "Match free tiles across classic layouts. Slow, satisfying, and easy on accidental ad clicks." },
  { id: "sudoku", title: "Sudoku & Numbers", blurb: "Daily grids, difficulty levels, minesweeper, and number-merge puzzles." },
  { id: "words", title: "Word Games", blurb: "Daily five-letter puzzles, word search, hangman, anagrams, and typing." },
  { id: "board", title: "Board Games", blurb: "Chess, checkers, connect four, reversi, and other two-player classics versus the computer." },
  { id: "puzzles", title: "Brain Puzzles", blurb: "Memory, match-3, jigsaw, nonograms, sliding blocks, and an idle kiln." }
];

export const GAMES = [
  { id: "klondike-solitaire", title: "Klondike Solitaire", category: "solitaire", engine: "solitaire", config: { variant: "klondike", draw: 1 }, thumb: "#1e4d3a", icon: "♠", short: "Classic draw-1 Klondike. Build ace-to-king by suit.", search: "klondike solitaire online free draw 1" },
  { id: "klondike-draw-3", title: "Klondike Draw 3", category: "solitaire", engine: "solitaire", config: { variant: "klondike", draw: 3 }, thumb: "#184a3a", icon: "♥", short: "Tougher Klondike: turn three cards from the stock.", search: "solitaire draw 3 online" },
  { id: "spider-solitaire", title: "Spider Solitaire", category: "solitaire", engine: "solitaire", config: { variant: "spider", suits: 4 }, thumb: "#5a1d28", icon: "🕷", short: "Four-suit Spider. Clear eight king-to-ace runs.", search: "spider solitaire 4 suits" },
  { id: "spider-solitaire-2-suits", title: "Spider Solitaire 2 Suits", category: "solitaire", engine: "solitaire", config: { variant: "spider", suits: 2 }, thumb: "#6b2430", icon: "🕷", short: "Two-suit Spider — the balanced daily grind.", search: "spider solitaire 2 suits" },
  { id: "spider-solitaire-1-suit", title: "Spider Solitaire 1 Suit", category: "solitaire", engine: "solitaire", config: { variant: "spider", suits: 1 }, thumb: "#7a2c38", icon: "🕷", short: "One-suit Spider for learning the layout fast.", search: "spider solitaire 1 suit easy" },
  { id: "freecell", title: "FreeCell", category: "solitaire", engine: "solitaire", config: { variant: "freecell" }, thumb: "#1d3f5a", icon: "♣", short: "Open information solitaire with four free cells.", search: "freecell online free" },
  { id: "pyramid-solitaire", title: "Pyramid Solitaire", category: "solitaire", engine: "solitaire", config: { variant: "pyramid" }, thumb: "#4a3a18", icon: "▲", short: "Clear pairs that add to 13. Kings go alone.", search: "pyramid solitaire online" },
  { id: "tripeaks-solitaire", title: "TriPeaks Solitaire", category: "solitaire", engine: "solitaire", config: { variant: "tripeaks" }, thumb: "#3a4a18", icon: "△", short: "Play cards one rank away across three peaks.", search: "tripeaks solitaire free" },
  { id: "yukon-solitaire", title: "Yukon Solitaire", category: "solitaire", engine: "solitaire", config: { variant: "yukon" }, thumb: "#2a3f4a", icon: "♦", short: "Move stacks freely as long as the moving card fits.", search: "yukon solitaire online" },
  { id: "golf-solitaire", title: "Golf Solitaire", category: "solitaire", engine: "solitaire", config: { variant: "golf" }, thumb: "#1e5a32", icon: "⛳", short: "Clear columns onto the waste, plus or minus one rank.", search: "golf solitaire online" },
  { id: "canfield-solitaire", title: "Canfield Solitaire", category: "solitaire", engine: "solitaire", config: { variant: "canfield" }, thumb: "#4a2a4a", icon: "K", short: "Reserve pile, wrapping foundations, old-school patience.", search: "canfield solitaire online" },
  { id: "scorpion-solitaire", title: "Scorpion Solitaire", category: "solitaire", engine: "solitaire", config: { variant: "scorpion" }, thumb: "#3a1a1a", icon: "🦂", short: "Build down by suit and scoop any face-up card.", search: "scorpion solitaire free" },

  { id: "forty-thieves-solitaire", title: "Forty Thieves", category: "solitaire", engine: "solitaire", config: { variant: "fortythieves" }, thumb: "#2a4a3a", icon: "40", short: "Two decks, ten columns, build same-suit down. Foundations ace to king.", search: "forty thieves solitaire online" },
  { id: "bakers-dozen-solitaire", title: "Baker's Dozen", category: "solitaire", engine: "solitaire", config: { variant: "bakersdozen" }, thumb: "#3a2844", icon: "13", short: "Thirteen piles, kings moved to the front. Build down regardless of suit.", search: "bakers dozen solitaire" },
  { id: "spiderette-solitaire", title: "Spiderette", category: "solitaire", engine: "solitaire", config: { variant: "spiderette", suits: 1 }, thumb: "#5a2030", icon: "🕸", short: "Mini Spider on seven columns. One deck, four runs to clear.", search: "spiderette solitaire free" },
  { id: "daily-klondike", title: "Daily Klondike", category: "solitaire", engine: "solitaire", config: { variant: "klondike", draw: 1, daily: true, seedOff: 1 }, thumb: "#1e5a42", icon: "📅", short: "Same Klondike deal for everyone today. Come back tomorrow for a new shuffle.", search: "daily klondike solitaire" },
  { id: "daily-spider", title: "Daily Spider", category: "solitaire", engine: "solitaire", config: { variant: "spider", suits: 1, daily: true, seedOff: 2 }, thumb: "#4a1824", icon: "📅", short: "One-suit Spider with a shared daily layout. Beat today's board.", search: "daily spider solitaire" },

  { id: "mahjong-solitaire", title: "Mahjong Solitaire", category: "mahjong", engine: "mahjong", config: { layout: "turtle" }, thumb: "#6b2a22", icon: "🀄", short: "Classic turtle layout. Match identical free tiles.", search: "mahjong solitaire online" },
  { id: "mahjong-fortress", title: "Mahjong Fortress", category: "mahjong", engine: "mahjong", config: { layout: "fortress" }, thumb: "#5a241e", icon: "🏯", short: "High walls and tight corners. Plan two matches ahead.", search: "mahjong fortress free" },
  { id: "mahjong-pyramid", title: "Mahjong Pyramid", category: "mahjong", engine: "mahjong", config: { layout: "pyramid" }, thumb: "#7a3a20", icon: "🏔", short: "A triangular stack that opens from the outer edges.", search: "mahjong pyramid solitaire" },
  { id: "mahjong-spider", title: "Mahjong Spider", category: "mahjong", engine: "mahjong", config: { layout: "spider" }, thumb: "#4a1a28", icon: "✦", short: "Two connected plateaus — a faster mahjong layout.", search: "mahjong spider layout" },
  { id: "mahjong-dragon", title: "Mahjong Dragon", category: "mahjong", engine: "mahjong", config: { layout: "dragon" }, thumb: "#5a2418", icon: "🐉", short: "A long dragon spine with a high center peak.", search: "mahjong dragon layout free" },
  { id: "mahjong-bridge", title: "Mahjong Bridge", category: "mahjong", engine: "mahjong", config: { layout: "bridge" }, thumb: "#4a3020", icon: "🌉", short: "A flat bridge span — open the center seam first.", search: "mahjong bridge solitaire" },
  { id: "mahjong-aztec", title: "Mahjong Aztec", category: "mahjong", engine: "mahjong", config: { layout: "aztec" }, thumb: "#6b3a18", icon: "☀", short: "Stepped aztec pyramid. Outer tiles free first.", search: "mahjong aztec layout" },
  { id: "daily-mahjong", title: "Daily Mahjong", category: "mahjong", engine: "mahjong", config: { layout: "turtle", daily: true }, thumb: "#7a3228", icon: "📅", short: "Today's turtle layout — same tiles for every player.", search: "daily mahjong solitaire" },

  { id: "sudoku-easy", title: "Sudoku Easy", category: "sudoku", engine: "sudoku", config: { size: 9, holes: 36 }, thumb: "#1a3a4a", icon: "9", short: "Gentle 9×9 sudoku with plenty of given digits.", search: "sudoku easy online" },
  { id: "sudoku-medium", title: "Sudoku Medium", category: "sudoku", engine: "sudoku", config: { size: 9, holes: 46 }, thumb: "#16344a", icon: "9", short: "A balanced 9×9 that needs pencil-mark thinking.", search: "sudoku medium online" },
  { id: "sudoku-hard", title: "Sudoku Hard", category: "sudoku", engine: "sudoku", config: { size: 9, holes: 54 }, thumb: "#102838", icon: "9", short: "Sparse givens. Naked pairs and pointing pairs help.", search: "sudoku hard online free" },
  { id: "daily-sudoku", title: "Daily Sudoku", category: "sudoku", engine: "sudoku", config: { size: 9, holes: 46, daily: true }, thumb: "#0e4a4a", icon: "📅", short: "One shared puzzle per calendar day. Come back tomorrow.", search: "daily sudoku online" },
  { id: "mini-sudoku", title: "Mini Sudoku 6×6", category: "sudoku", engine: "sudoku", config: { size: 6, holes: 18 }, thumb: "#245a4a", icon: "6", short: "Six-by-six grids for a two-minute break.", search: "mini sudoku 6x6" },
  { id: "minesweeper", title: "Minesweeper Beginner", category: "sudoku", engine: "mines", config: { w: 9, h: 9, mines: 10 }, thumb: "#3a3a3a", icon: "💣", short: "9×9, ten mines. Right-click or long-press to flag.", search: "minesweeper online free" },
  { id: "minesweeper-intermediate", title: "Minesweeper Intermediate", category: "sudoku", engine: "mines", config: { w: 16, h: 16, mines: 40 }, thumb: "#2a2a2a", icon: "💣", short: "The classic 16×16, forty-mine board.", search: "minesweeper intermediate" },
  { id: "minesweeper-expert", title: "Minesweeper Expert", category: "sudoku", engine: "mines", config: { w: 30, h: 16, mines: 99 }, thumb: "#1a1a1a", icon: "💣", short: "Expert 30×16 with 99 mines.", search: "minesweeper expert online" },
  { id: "quad-merge", title: "Quad Merge", category: "sudoku", engine: "merge", config: {}, thumb: "#f2b179", icon: "2048", short: "Slide numbered tiles. Combine equals to climb the ladder.", search: "2048 game online free" },
  { id: "killer-sudoku", title: "Killer Sudoku", category: "sudoku", engine: "killer", config: {}, thumb: "#1a2844", icon: "➕", short: "Classic sudoku plus dotted cages that must sum to the clue.", search: "killer sudoku online free" },
  { id: "daily-killer-sudoku", title: "Daily Killer Sudoku", category: "sudoku", engine: "killer", config: { daily: true }, thumb: "#142838", icon: "📅", short: "One killer grid per day. Cage layout seeded by the calendar.", search: "daily killer sudoku" },
  { id: "kakuro", title: "Kakuro", category: "sudoku", engine: "kakuro", config: {}, thumb: "#2a3a52", icon: "▦", short: "Cross sums with no repeats in a run — the crossword of numbers.", search: "kakuro puzzle online free" },
  { id: "daily-kakuro", title: "Daily Kakuro", category: "sudoku", engine: "kakuro", config: { daily: true }, thumb: "#1a2844", icon: "📅", short: "One cross-sum grid per day. Same puzzle for every player.", search: "daily kakuro puzzle online" },

  { id: "penta-daily", title: "Penta Daily", category: "words", engine: "penta", config: { daily: true }, thumb: "#3d5a1e", icon: "P", short: "Guess the five-letter word in six tries. New word each day.", search: "daily word puzzle five letters" },
  { id: "word-search", title: "Word Search", category: "words", engine: "wordsearch", config: {}, thumb: "#4a3a1a", icon: "Aa", short: "Find hidden words in a letter grid.", search: "word search online free" },
  { id: "hangman", title: "Hangman", category: "words", engine: "hangman", config: {}, thumb: "#3a2a2a", icon: "⌂", short: "Reveal the word before the gallows fills in.", search: "hangman game online" },
  { id: "anagram-hunt", title: "Anagram Hunt", category: "words", engine: "anagrams", config: {}, thumb: "#2a3a4a", icon: "∞", short: "Make as many words as you can from a letter set.", search: "anagram word game online" },
  { id: "typing-sprint", title: "Typing Sprint", category: "words", engine: "typing", config: {}, thumb: "#1a4a3a", icon: "⌨", short: "A one-minute typing test with accuracy and WPM.", search: "typing test online wpm" },
  { id: "crossword-daily", title: "Mini Crossword", category: "words", engine: "crossword", config: {}, thumb: "#2a2a4a", icon: "■", short: "A small crossword with unique clues. No account needed.", search: "mini crossword online free" },

  { id: "chess", title: "Chess", category: "board", engine: "chess", config: {}, thumb: "#5a4632", icon: "♟", short: "Play chess against a browser AI. No install.", search: "chess online vs computer" },
  { id: "checkers", title: "Checkers", category: "board", engine: "checkers", config: {}, thumb: "#4a2a1a", icon: "●", short: "English draughts versus the computer.", search: "checkers online free" },
  { id: "connect-four", title: "Connect Four", category: "board", engine: "connect4", config: {}, thumb: "#1a3a6b", icon: "◉", short: "Drop discs. Get four in a line before the AI does.", search: "connect four online" },
  { id: "reversi", title: "Reversi", category: "board", engine: "reversi", config: {}, thumb: "#1a1a1a", icon: "◐", short: "Flip the board. Classic Othello-style reversi.", search: "reversi othello online" },
  { id: "mancala", title: "Mancala", category: "board", engine: "mancala", config: {}, thumb: "#6b4a1a", icon: "◯", short: "Sow stones around the Kalah board against the CPU.", search: "mancala online free" },
  { id: "battleship", title: "Sea Battle", category: "board", engine: "battleship", config: {}, thumb: "#1a4a6b", icon: "🚢", short: "Place your fleet and hunt the computer's ships.", search: "battleship game online" },
  { id: "gomoku", title: "Gomoku", category: "board", engine: "gomoku", config: {}, thumb: "#e8d5a3", icon: "✦", short: "Five in a row on a 15×15 grid versus AI.", search: "gomoku five in a row" },
  { id: "tic-tac-toe", title: "Tic-Tac-Toe", category: "board", engine: "tictactoe", config: {}, thumb: "#3a4a3a", icon: "X", short: "The three-in-a-row classic. Perfect for a 30-second reset.", search: "tic tac toe online" },
  { id: "backgammon", title: "Backgammon", category: "board", engine: "backgammon", config: {}, thumb: "#5a3a1a", icon: "⚂", short: "Bear off your checkers before the computer. Roll and race.", search: "backgammon online vs computer free" },
  { id: "gin-rummy", title: "Gin Rummy", category: "board", engine: "ginrummy", config: {}, thumb: "#2a4a28", icon: "🃏", short: "Meld sets and runs, knock with low deadwood versus the CPU.", search: "gin rummy online free" },

  { id: "memory-match", title: "Memory Match", category: "puzzles", engine: "memory", config: { pairs: 8 }, thumb: "#4a1a4a", icon: "🃏", short: "Flip cards and remember the pairs.", search: "memory card game online" },
  { id: "chroma-path", title: "Chroma Path", category: "puzzles", engine: "simon", config: {}, thumb: "#1a4a6b", icon: "◎", short: "Repeat an growing color sequence.", search: "simon memory game online" },
  { id: "slide-fifteen", title: "Slide Fifteen", category: "puzzles", engine: "slider", config: {}, thumb: "#3a4a5a", icon: "15", short: "The 15-puzzle. Slide tiles into order.", search: "15 puzzle sliding online" },
  { id: "peg-solitaire", title: "Peg Solitaire", category: "puzzles", engine: "peg", config: {}, thumb: "#4a3a2a", icon: "•", short: "Jump pegs until one remains in the center.", search: "peg solitaire online" },
  { id: "gem-cascade", title: "Gem Cascade", category: "puzzles", engine: "match3", config: {}, thumb: "#5a1a4a", icon: "◆", short: "Swap adjacent gems to make lines of three.", search: "match 3 game online free" },
  { id: "jigsaw-table", title: "Jigsaw Table", category: "puzzles", engine: "jigsaw", config: { n: 4 }, thumb: "#2a5a4a", icon: "🧩", short: "Assemble a generated art board. No stock photos.", search: "free jigsaw puzzle online" },
  { id: "nonogram-ink", title: "Nonogram Ink", category: "puzzles", engine: "nonogram", config: {}, thumb: "#1a1a2a", icon: "▦", short: "Paint squares from row and column clues.", search: "nonogram picross online" },
  { id: "rush-lanes", title: "Rush Lanes", category: "puzzles", engine: "rush", config: {}, thumb: "#8a2a2a", icon: "🚗", short: "Slide cars until the red one can escape.", search: "unblock car puzzle online" },
  { id: "star-kiln", title: "Star Kiln", category: "puzzles", engine: "idle", config: {}, thumb: "#6b3a10", icon: "★", short: "An idle kiln. Click, buy stokers, prestige overnight.", search: "idle clicker game browser" }
];
