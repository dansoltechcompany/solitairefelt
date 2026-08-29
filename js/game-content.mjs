/**
 * Per-game page copy — intro, rules, tips, FAQ, related overrides.
 * Used by generate.mjs. Games without an entry get a cleaner generic fallback.
 */
export const GAME_CONTENT = {
  "klondike-solitaire": {
    metaDesc: "Classic Klondike with draw-one from the stock. Build foundations ace to king — free in your browser, no download.",
    intro: [
      "Klondike is the solitaire most people mean when they say “solitaire”: seven tableau columns, a stock you flip one card at a time, and four foundation piles that build up by suit from ace to king.",
      "On SolitaireFelt the board runs entirely in your browser. Undo is available when you want to test a line without committing to it."
    ],
    rules: [
      "Deal: seven columns with one to seven cards; only the top card in each column starts face up.",
      "Tableau: build down in alternating colors (red on black, black on red). You may move a face-up stack if the bottom card fits on the destination.",
      "Empty columns accept only a king (or a stack starting with a king).",
      "Stock: click to flip one card to the waste. When the stock is empty, click again to recycle the waste.",
      "Foundations: build up in suit from ace through king. You win when all 52 cards sit on the foundations."
    ],
    tips: [
      "Uncover face-down tableau cards before you worry about empty columns — hidden cards are the main bottleneck.",
      "Move aces and low cards to foundations early, but leave a deuce on the tableau if you still need it to bury a king.",
      "Before emptying a column, check whether the king waiting to move there will block a card you still need below another pile.",
      "When the stock is cycling, note which ranks you have already passed — repeating the waste without tableau progress usually means try a different column order.",
      "Use Undo to replay a stock pass if you realize a waste card should have stayed for a tableau build."
    ],
    faq: [
      {
        q: "Can every Klondike deal be won?",
        a: "No. Draw-one Klondike has unwinnable shuffles. The goal is to play the deal well; a loss often means the layout was dead, not that you missed the only line."
      },
      {
        q: "What is the difference between draw-one and draw-three?",
        a: "Draw-one turns a single stock card at a time, which is easier and closer to what most casual players expect. Draw-three reveals three cards per click and only lets you play the top waste card — fewer options, tougher odds."
      }
    ],
    related: ["klondike-draw-3", "daily-klondike", "freecell", "spider-solitaire-1-suit", "yukon-solitaire", "pyramid-solitaire"]
  },

  "spider-solitaire": {
    metaDesc: "Four-suit Spider Solitaire online — ten columns, two decks, clear eight in-suit king-to-ace runs. Free, no download.",
    intro: [
      "Spider is a patience game for players who like longer puzzles. Two full decks fill ten columns; you build descending sequences and remove complete in-suit runs from king down to ace.",
      "Four-suit Spider is the hardest standard setting: all four suits are in play, so off-suit stacks are easy to build but hard to untangle. Most wins come from creating empty columns and reshuffling long runs into single-suit stacks."
    ],
    rules: [
      "Layout: 54 cards are dealt across ten columns; the last card dealt to each column starts face up (one per column).",
      "Build tableau columns down by rank. Color and suit do not matter for placing a single card — only the rank must be exactly one lower.",
      "Moving stacks: you may only drag a run if every card in the run shares the same suit and ranks descend by one.",
      "Completing a full in-suit king-through-ace run removes it from the board and counts toward your win.",
      "Stock: deals one face-up card to each column when every column has at least one card. You cannot deal while a column is empty.",
      "Win: clear eight complete runs (two decks, eight suits worth of sequences)."
    ],
    tips: [
      "Treat empty columns as currency — use one to rearrange, but try not to spend your last empty slot before a run is ready to move.",
      "Build in-suit whenever possible, even if an off-suit move is legal. Off-suit stacks become dead weight until you break them apart.",
      "Expose face-down cards early; buried cards limit which ranks you can chain.",
      "Before dealing from the stock, scan whether the ten new cards will bury sequences you were about to complete.",
      "If two suits compete for the same column, prefer the suit that already has a longer in-suit chain attached."
    ],
    faq: [
      {
        q: "Why can’t I deal from the stock?",
        a: "Spider blocks deals while any column is empty. Fill empty columns with kings or useful stacks first, then deal."
      },
      {
        q: "Is four-suit Spider harder than two-suit?",
        a: "Much harder. With four suits, mixed stacks are common and in-suit runs take more planning. Try one-suit or two-suit Spider on SolitaireFelt if you are learning the layout."
      }
    ],
    related: ["spider-solitaire-2-suits", "spider-solitaire-1-suit", "spiderette-solitaire", "daily-spider", "freecell", "forty-thieves-solitaire"]
  },

  "spider-solitaire-2-suits": {
    metaDesc: "Two-suit Spider Solitaire — a balanced middle ground between one-suit practice and four-suit expert play. Free online.",
    intro: [
      "Two-suit Spider uses the same ten-column layout as full Spider, but only two suits appear in the deck. That cuts down mixed stacks without making every column trivial.",
      "It is the variant many players use for daily practice: enough friction to matter, not so much that every deal feels hopeless."
    ],
    rules: [
      "Same Spider rules as the four-suit game: build down on the tableau, move only same-suit descending runs as a unit, clear king-to-ace runs to win.",
      "Only two suits are dealt, so in-suit builds happen more often and empty columns pay off faster.",
      "You still need eight completed runs to win (two decks).",
      "Stock deals require every column to contain at least one card."
    ],
    tips: [
      "With only two suits, prioritize keeping runs separated by suit from the first deal — mixing suits is still legal but costly.",
      "Empty columns are slightly easier to recover here; use them to split a mixed stack and rebuild one side in-suit.",
      "Deal from stock only when face-down cards are exposed or you have a plan for the ten incoming cards.",
      "Watch for near-complete runs sitting under the wrong suit — one empty column often unlocks them.",
      "If you beat two-suit consistently, step up to four-suit Spider on the same site when you want a real step up in difficulty."
    ],
    faq: [
      {
        q: "Which two suits are used?",
        a: "The engine picks two suits from the standard deck for each shuffle. The rules are identical regardless of which pair appears — only the count of suits matters for difficulty."
      }
    ],
    related: ["spider-solitaire-1-suit", "spider-solitaire", "spiderette-solitaire", "daily-spider", "freecell", "klondike-solitaire"]
  },

  "spider-solitaire-1-suit": {
    metaDesc: "One-suit Spider Solitaire — learn the ten-column layout and run-clearing rhythm without four suits fighting you. Free online.",
    intro: [
      "One-suit Spider is the training wheels version of Spider: every card shares the same suit, so any descending stack can move as a unit and king-to-ace clears are straightforward.",
      "Use it to learn dealing rhythm, empty-column timing, and stock management before moving to two-suit or four-suit Spider."
    ],
    rules: [
      "Ten columns, two decks, single suit — build down by rank on the tableau.",
      "Because all cards share one suit, any face-up descending run may move together (not just in-suit runs — there is only one suit).",
      "Clear eight king-through-ace runs to win.",
      "Stock deals one card per column when no column is empty."
    ],
    tips: [
      "Focus on empty columns: even in one-suit Spider, buried face-down cards dictate pace.",
      "Do not deal from stock if you still have easy face-down flips available in the tableau.",
      "Long runs are fine to move — there is no off-suit penalty, so consolidate columns aggressively.",
      "Try to keep at least one column empty before each stock deal so new cards have somewhere useful to land.",
      "When comfortable here, switch to two-suit Spider — that is where suit discipline actually matters."
    ],
    faq: [
      {
        q: "Is one-suit Spider still Spider?",
        a: "Same layout, deal pattern, and win condition. The only change is suit count, which removes the main source of four-suit difficulty."
      }
    ],
    related: ["spider-solitaire-2-suits", "spider-solitaire", "spiderette-solitaire", "daily-spider", "klondike-solitaire", "freecell"]
  },

  "freecell": {
    metaDesc: "FreeCell solitaire with four free cells and all cards visible. Plan stacks using empty cells as buffers — play free online.",
    intro: [
      "FreeCell is the thinking player’s solitaire: every card starts face up, so nothing is hidden. Four free cells hold one card each and act as temporary parking while you rearrange the eight tableau columns.",
      "Nearly every FreeCell deal is winnable with perfect play — the challenge is sequence planning, not luck."
    ],
    rules: [
      "Tableau: eight columns built down by alternating color.",
      "Free cells: each holds at most one card. Cards in cells can move back to the tableau or foundations.",
      "Foundations: build up by suit from ace to king.",
      "Moving stacks: you may move a run of length N only if you have enough empty cells and empty columns combined to hold the cards above the segment you are moving (standard FreeCell buffer rule).",
      "Win: all cards on the four foundations."
    ],
    tips: [
      "Keep free cells open when possible — a full set of four occupied cells locks the board quickly.",
      "Send aces (and often twos) to foundations early unless you need a low card as a tableau anchor.",
      "Before moving a long stack, count buffers: empty cells plus empty columns must cover the cards you are carrying.",
      "Empty a column when you need a king parking spot, not just because it is empty.",
      "If stuck, work backward from foundations: which cards are blocking the next foundation build, and can a cell hold them briefly?"
    ],
    faq: [
      {
        q: "Are all FreeCell deals solvable?",
        a: "Classic FreeCell has a few documented impossible deals, but the vast majority are solvable. If you are stuck, the layout usually needs a different cell assignment, not a new shuffle."
      },
      {
        q: "How is FreeCell different from Klondike?",
        a: "Klondike hides cards and uses a stock. FreeCell shows everything and gives you four buffer cells instead — much more planning, much less luck."
      }
    ],
    related: ["klondike-solitaire", "spider-solitaire", "yukon-solitaire", "forty-thieves-solitaire", "bakers-dozen-solitaire", "daily-klondike"]
  },

  "pyramid-solitaire": {
    metaDesc: "Pyramid Solitaire — pair cards that sum to 13, clear kings alone, and empty the pyramid. Free online, no download.",
    intro: [
      "Pyramid solitaire is a pairing game, not a build-down tableau game. Twenty-eight cards form a pyramid; you remove pairs of available cards that add up to thirteen, or lone kings.",
      "The stock and waste give extra options when the pyramid stalls, but you cannot move cards between pyramid positions — only remove them when free."
    ],
    rules: [
      "Available cards: not covered by any card below them in the pyramid, plus the top waste card.",
      "Pairs that sum to 13 are removed (ace + queen, two + jack, etc.). Kings count as 13 and clear alone.",
      "Click the stock to flip the next waste card when no pyramid pair exists.",
      "You win when every pyramid card is cleared. You lose when the stock is exhausted and no pairs remain."
    ],
    tips: [
      "Kings are free points — take them immediately so they stop blocking cards underneath.",
      "Before pairing, ask whether either card is the only way to free a buried card you will need later.",
      "Queens and aces are scarce; do not spend your only ace on a queen if another pair is available.",
      "Work from the bottom row of the pyramid upward when you have choices — lower cards unlock more above them.",
      "If two pairs are possible, prefer the pair that exposes a new card on a tall stack over a pair at the edge."
    ],
    faq: [
      {
        q: "Does every pyramid deal have a solution?",
        a: "No. Some shuffles are unwinnable regardless of play order. Pyramid is shorter than Klondike — replaying a new deal is normal."
      }
    ],
    related: ["tripeaks-solitaire", "golf-solitaire", "klondike-solitaire", "canfield-solitaire", "mahjong-solitaire", "freecell"]
  },

  "tripeaks-solitaire": {
    metaDesc: "TriPeaks Solitaire — play cards one rank higher or lower than the waste, clear three peaks. Aces wrap with kings. Free online.",
    intro: [
      "TriPeaks (also called Three Peaks) is a fast solitaire variant: three overlapping peaks of cards, one waste pile, and simple rank adjacency rules. Aces and kings wrap — ace plays on king and vice versa.",
      "Games are shorter than Klondike or Spider, which makes TriPeaks a good warm-up or coffee-break table."
    ],
    rules: [
      "Play any exposed peak card that is exactly one rank higher or lower than the current waste card.",
      "Aces and kings connect: king ↔ queen ↔ … ↔ ace wraps both ways.",
      "When no peak card fits, flip the stock to a new waste card.",
      "Clear all cards from the three peaks to win."
    ],
    tips: [
      "Clear a peak early when you can — removing a whole peak opens longer chains on the remaining mountains.",
      "Save stock flips for dead ends; each waste card you burn without clearing a peak card is lost tempo.",
      "When two peak cards are playable, choose the one that uncovers more cards below it.",
      "Watch for aces and kings on the peaks — they bridge suits and ranks and often unlock stalled boards.",
      "Long chains beat cautious single-card taps: plan two or three moves ahead before flipping stock."
    ],
    faq: [
      {
        q: "Do suits matter in TriPeaks?",
        a: "No. Only rank adjacency matters. Any suit can play on any suit if the rank is one step away (with ace–king wrap)."
      }
    ],
    related: ["pyramid-solitaire", "golf-solitaire", "klondike-solitaire", "spider-solitaire-1-suit", "mahjong-solitaire", "daily-klondike"]
  },

  "mahjong-solitaire": {
    metaDesc: "Mahjong Solitaire turtle layout — match identical free tiles and clear the board. Classic pairs puzzle, free in your browser.",
    intro: [
      "Mahjong solitaire is a tile-matching puzzle, not a four-player mahjong game. The classic turtle layout stacks tiles in overlapping layers; you remove identical pairs when both tiles are “free.”",
      "A tile is free when nothing sits on top of it and at least one long side (left or right) is open. Plan two or three matches ahead or you can lock yourself out of a pair."
    ],
    rules: [
      "Find two identical tiles that are both free and click them to remove the pair.",
      "Free means: no tile covering from above, and at least one horizontal edge open.",
      "Match identical tile faces only — both tiles must show the same symbol.",
      "You win when all tiles are cleared. You lose when no free pairs remain."
    ],
    tips: [
      "Scan the top layer first — matches there unlock the most tiles below.",
      "If a tile has only one copy left on the board, make sure it is free before you remove its partner elsewhere.",
      "Work from the outside of the turtle toward the center; edge tiles free more options than center taps.",
      "Do not grab the first obvious pair — ask which match opens the most new faces.",
      "Use Hint to spot a playable pair while learning a layout; on later passes try to beat your time without it."
    ],
    faq: [
      {
        q: "Is every mahjong layout solvable?",
        a: "Not every shuffle is guaranteed winnable from the deal. Hint highlights a matching pair among tiles you can play right now. If Hint finds nothing, you have no legal move left — tap New layout. That does not always mean the original deal was impossible; earlier moves may have boxed you in."
      },
      {
        q: "How is this different from mahjong solitaire layouts like Fortress or Dragon?",
        a: "Matching rules are the same; only the tile arrangement changes. Try Fortress or Dragon on SolitaireFelt when you want a different shape with the same pair rules."
      }
    ],
    related: ["mahjong-fortress", "mahjong-pyramid", "mahjong-dragon", "daily-mahjong", "memory-match", "pyramid-solitaire"]
  },

  "sudoku-easy": {
    metaDesc: "Easy 9×9 Sudoku with generous givens — a gentle grid for learning pencil marks and box logic. Free online, new puzzle anytime.",
    intro: [
      "This is standard 9×9 sudoku with more starting digits than our medium or hard boards — a good place to learn scanning without guessing.",
      "Each row, column, and 3×3 box must contain digits 1 through 9 exactly once. Given digits are fixed; tap a cell and pick a number from the pad."
    ],
    rules: [
      "Fill every empty cell with a digit 1–9.",
      "No digit repeats in any row, column, or 3×3 box.",
      "Use logic only — a well-formed easy puzzle should not require guessing.",
      "New game shuffles a fresh grid anytime."
    ],
    tips: [
      "Start with boxes that already have six or seven givens — singles appear quickly there.",
      "When a digit can only fit one cell in a row, column, or box, fill it (hidden singles).",
      "Pencil in candidates mentally for empty cells; if a digit appears twice in one box across two rows, it must go in the third row of that box.",
      "Finish all obvious singles before hunting pairs — easy grids rarely need advanced techniques.",
      "If you stall, pick the most filled row and list missing digits; one cell often has only one legal option left."
    ],
    faq: [
      {
        q: "How is easy different from medium or hard on SolitaireFelt?",
        a: "We remove more givens as difficulty rises. Easy keeps more clues on the board; hard forces techniques like naked pairs and box-line reduction."
      },
      {
        q: "Can I play today’s shared daily grid instead?",
        a: "Yes — open Daily Sudoku for one puzzle per calendar day that every player shares."
      }
    ],
    related: ["sudoku-medium", "sudoku-hard", "daily-sudoku", "mini-sudoku", "killer-sudoku", "kakuro"]
  },

  "daily-klondike": {
    metaDesc: "Daily Klondike — same draw-one deal for everyone today. Come back tomorrow for a new shuffle. Free online solitaire.",
    intro: [
      "Daily Klondike is standard draw-one Klondike with a fixed shuffle seeded by the calendar date. Every player sees the same deal on the same day — useful for comparing lines with a friend or retrying your own best run.",
      "Tomorrow at midnight (local device date) the seed changes and a fresh board appears."
    ],
    rules: [
      "Same rules as Klondike Solitaire: alternating-color tableau builds, ace-to-king foundations, draw-one stock.",
      "The deal is determined by today’s date — reloading the page does not change the layout until the date changes.",
      "Undo works within a session so you can explore different stock passes on the same daily deal."
    ],
    tips: [
      "Treat the daily deal like a puzzle with one authoritative layout — note where your first loss happened and retry later the same day.",
      "Compare strategy, not just win/loss: two players can clear the same daily deal with different foundation timing.",
      "If you want a random shuffle anytime, use regular Klondike Solitaire instead of the daily mode.",
      "Screenshot or remember your move count if you are racing a friend on the identical deal.",
      "Daily boards reward patience on the stock cycle — the fixed deal means your second attempt is pure improvement."
    ],
    faq: [
      {
        q: "When does the daily puzzle reset?",
        a: "When your device’s calendar date changes. The seed is derived from the year, month, and day — not a global timezone clock."
      },
      {
        q: "Is the daily deal the same as normal Klondike?",
        a: "Same rules and engine. Only the shuffle is fixed per day instead of random on each new game."
      }
    ],
    related: ["klondike-solitaire", "daily-spider", "daily-sudoku", "daily-mahjong", "klondike-draw-3", "freecell"]
  },

  "klondike-draw-3": {
    metaDesc: "Klondike draw-three solitaire — flip three stock cards per click for a tougher classic. Free online, no download.",
    intro: [
      "Draw-three Klondike uses the same tableau and foundation rules as classic Klondike, but the stock reveals three cards at a time and only the top waste card is playable.",
      "That cuts your options on each pass through the deck and makes unwinnable deals more common — most players find it noticeably harder than draw-one."
    ],
    rules: [
      "Tableau and foundations follow standard Klondike: alternating colors down, suit up on foundations, kings in empty columns.",
      "Stock: each click flips three cards onto the waste pile (or fewer if fewer remain in stock).",
      "Only the top card of the waste may be played to the tableau or foundations.",
      "When the stock empties, click the stock area to recycle the waste and continue.",
      "Win by moving all 52 cards to the foundations."
    ],
    tips: [
      "Track the buried waste cards — in draw-three, the two cards under the top waste are locked until you play or recycle.",
      "Be more conservative sending cards to foundations; a card on a foundation cannot return to help bury a tableau king.",
      "Recycle the waste only when you have scanned every playable waste card and still need options from deeper in the pile.",
      "Empty columns are rarer wins in draw-three; do not empty a column unless the incoming king opens a real line.",
      "If draw-three feels brutal, compare your line on draw-one Klondike — same skills, more stock luck."
    ],
    faq: [
      {
        q: "Is draw-three harder than draw-one?",
        a: "Yes. You see fewer playable cards per stock pass and cannot access buried waste cards until the top card moves. Win rates are lower even with perfect play."
      },
      {
        q: "Can I switch to draw-one on SolitaireFelt?",
        a: "Yes — open Klondike Solitaire for draw-one, or Daily Klondike for a shared daily draw-one deal."
      }
    ],
    related: ["klondike-solitaire", "daily-klondike", "freecell", "yukon-solitaire", "spider-solitaire", "pyramid-solitaire"]
  },

  "sudoku-medium": {
    metaDesc: "Medium 9×9 Sudoku online — fewer givens than easy, more logic than guessing. Free in your browser.",
    intro: [
      "Medium sudoku removes more starting digits than our easy board, so singles appear less often and you will need candidate tracking in harder boxes.",
      "The grid is still a standard 9×9 with nine 3×3 boxes — only the clue density changes."
    ],
    rules: [
      "Place digits 1–9 so each row, column, and 3×3 box contains every digit exactly once.",
      "Given digits cannot be changed.",
      "New game generates a fresh puzzle. No guessing should be required on a well-formed medium grid — look for the next logical elimination."
    ],
    tips: [
      "Mark mentally which digits are still possible in each empty cell within its row, column, and box.",
      "Hidden singles: if a digit can only sit in one cell inside a row (or column or box), fill it even if the cell has other candidates.",
      "Naked pairs: two cells in a unit sharing exactly the same two candidates eliminate those digits from other cells in that unit.",
      "When stuck, pick the box with the fewest empty cells — constrained boxes break open faster.",
      "If easy sudoku feels slow, medium is the step where technique starts to matter more than scanning."
    ],
    faq: [
      {
        q: "How is medium different from easy on SolitaireFelt?",
        a: "We remove more givens on medium (46 empty cells versus 36 on easy). The rules are identical; difficulty comes from clue sparsity."
      }
    ],
    related: ["sudoku-easy", "sudoku-hard", "daily-sudoku", "killer-sudoku", "mini-sudoku", "kakuro"]
  },

  "sudoku-hard": {
    metaDesc: "Hard 9×9 Sudoku with sparse givens — for players comfortable with pairs and box-line logic. Free online.",
    intro: [
      "Hard sudoku starts with the fewest givens in our 9×9 set. Early moves are not obvious singles — you will use elimination patterns like naked pairs and pointing pairs.",
      "Still no guessing: if you feel forced to gamble, re-scan for a constraint you missed."
    ],
    rules: [
      "Standard 9×9 sudoku: unique digits in every row, column, and 3×3 box.",
      "Givens are minimal — expect to reason about multiple candidates per cell.",
      "Use New game for another puzzle anytime."
    ],
    tips: [
      "Pointing pairs: if a digit’s candidates in a box all lie in one row, eliminate that digit from the rest of that row outside the box.",
      "Naked triples: three cells in a unit sharing three digits among them lock those digits out of other cells in the unit.",
      "Avoid filling a cell until only one candidate remains unless you are sure — a wrong digit cascades fast on hard grids.",
      "Crosshatch: pick a digit and scan which rows and columns already contain it to see where it must go in a box.",
      "Step down to medium if a puzzle stalls you for ten minutes — building technique beats brute force."
    ],
    faq: [
      {
        q: "Do I need advanced sudoku notation for hard?",
        a: "Not on paper, but thinking in candidates helps. The techniques named above are enough for our hard puzzles without X-Wings or coloring."
      }
    ],
    related: ["sudoku-medium", "sudoku-easy", "killer-sudoku", "daily-sudoku", "kakuro", "daily-killer-sudoku"]
  },

  "mini-sudoku": {
    metaDesc: "Mini 6×6 Sudoku — digits 1–6, six 2×3 boxes. A quick logic puzzle when 9×9 feels like too much.",
    intro: [
      "Mini sudoku shrinks the grid to six rows and six columns with six 2×3 boxes. Rules mirror the big game: no repeats in any row, column, or box.",
      "Games finish in a couple of minutes — good for learning box-line scanning before full 9×9."
    ],
    rules: [
      "Fill digits 1 through 6 in every row, column, and 2×3 box without repetition.",
      "Givens are locked; tap a cell and choose from the number pad.",
      "New game shuffles a fresh 6×6 layout."
    ],
    tips: [
      "With only six digits, singles show up quickly — scan rows with five givens first.",
      "Each 2×3 box has only six cells, so a missing digit is often trapped in one spot after one elimination pass.",
      "Use mini grids to practice candidate thinking without the visual noise of a 9×9.",
      "If a digit appears in four of six rows in a column, the last two rows share only two possible cells for that digit.",
      "When this feels easy, step up to Sudoku Easy for the full 9×9."
    ],
    faq: [
      {
        q: "Is mini sudoku the same rules as 9×9?",
        a: "Same logic, smaller grid and boxes. Digits run 1–6 instead of 1–9."
      }
    ],
    related: ["sudoku-easy", "sudoku-medium", "daily-sudoku", "killer-sudoku", "kakuro", "quad-merge"]
  },

  "daily-sudoku": {
    metaDesc: "Daily Sudoku — one shared 9×9 puzzle per calendar day. Same grid for every player. Free online.",
    intro: [
      "Daily Sudoku uses medium-density givens (same hole count as our medium level) but fixes the puzzle to today’s calendar date. Everyone playing on the same day gets the identical grid.",
      "Come back tomorrow for a new seed — or use regular Sudoku Easy/Medium/Hard for unlimited random puzzles."
    ],
    rules: [
      "Standard 9×9 sudoku rules: unique digits in each row, column, and 3×3 box.",
      "The puzzle is seeded by the date — refreshing the page does not change today’s layout.",
      "New game on a daily page still shows today’s puzzle until the date rolls over."
    ],
    tips: [
      "Race friends on time, not just completion — the grid is identical.",
      "Retry the same daily puzzle later in the day to beat your earlier time without a new shuffle.",
      "Daily difficulty sits around medium; use Sudoku Hard if you want sparser givens on random boards.",
      "Note which technique broke the grid open (a hidden single, a pair) so tomorrow’s daily starts faster.",
      "Combine with Daily Killer Sudoku or Daily Kakuro for a full numbers routine."
    ],
    faq: [
      {
        q: "When does Daily Sudoku reset?",
        a: "When your device’s calendar date changes. The seed uses year, month, and day locally."
      },
      {
        q: "Is it harder than Sudoku Easy?",
        a: "Yes — daily uses medium-style clue density, not the generous easy givens."
      }
    ],
    related: ["sudoku-medium", "sudoku-easy", "sudoku-hard", "daily-killer-sudoku", "daily-kakuro", "daily-klondike"]
  },

  "minesweeper": {
    metaDesc: "Beginner Minesweeper — 9×9 grid, ten mines. Learn flagging and number logic. Free online, first click safe.",
    intro: [
      "This is the gentle introduction to minesweeper: a 9×9 field with only ten mines. Numbers tell you how many mines touch each cell; flags mark suspected bombs.",
      "Your first click never hits a mine — the board generates after you open the first cell."
    ],
    rules: [
      "Left-click to open a cell. A number shows how many mines touch that cell (including diagonals).",
      "Right-click to flag a cell you believe contains a mine (use your browser’s context menu on touch devices).",
      "Open every non-mine cell to win. Hitting a mine ends the game.",
      "Empty cells (zero) auto-expand to reveal neighboring safe areas."
    ],
    tips: [
      "When a 1 touches exactly one hidden cell, that cell must be a mine — flag it.",
      "When a number’s touching cells already have that many flags, every other neighbor is safe to open.",
      "Start from corners and edges — they touch fewer cells, so deductions are simpler.",
      "Do not flag randomly; wrong flags hide cells you still need to open.",
      "Once comfortable here, move to Minesweeper Intermediate for the classic 16×16 board."
    ],
    faq: [
      {
        q: "Is the first click always safe?",
        a: "Yes. Mines are placed after your first open, with that cell guaranteed mine-free."
      }
    ],
    related: ["minesweeper-intermediate", "minesweeper-expert", "sudoku-easy", "nonogram-ink", "memory-match", "daily-sudoku"]
  },

  "minesweeper-intermediate": {
    metaDesc: "Intermediate Minesweeper — classic 16×16 board with 40 mines. Free online minesweeper.",
    intro: [
      "The Windows-classic size: 16×16 cells and forty mines. Number logic scales up — a single mistake is costly, so flag before you chord risky areas mentally.",
      "First click is still safe; the minefield is generated after you start."
    ],
    rules: [
      "16×16 grid, 40 hidden mines.",
      "Numbers count mines in all eight neighboring cells.",
      "Flag with right-click; left-click opens. Clear all safe cells to win."
    ],
    tips: [
      "Solve locally: finish one numbered region before jumping across the board.",
      "A 3 in a corner pattern often pins mines along the edge — learn the small repeating shapes.",
      "When two numbers share hidden neighbors, compare their counts to find forced safe cells.",
      "If two choices look 50/50, pick the cell that touches more unopened area — information gain matters.",
      "Expert mode on SolitaireFelt widens to 30×16 with 99 mines when this size feels routine."
    ],
    faq: [
      {
        q: "How many mines are on intermediate?",
        a: "Forty mines on a 16×16 grid — the density is higher than beginner but lower than expert."
      }
    ],
    related: ["minesweeper", "minesweeper-expert", "sudoku-medium", "nonogram-ink", "killer-sudoku", "kakuro"]
  },

  "minesweeper-expert": {
    metaDesc: "Expert Minesweeper — 30×16 grid, 99 mines. Wide board for experienced players. Free online.",
    intro: [
      "Expert stretches the field to 30 columns by 16 rows with ninety-nine mines. You will scroll horizontally on smaller screens — take your time on edge deductions.",
      "This is the minesweeper mode for players who have cleared intermediate boards reliably."
    ],
    rules: [
      "30×16 grid, 99 mines.",
      "Same click and flag rules as smaller boards.",
      "First click is safe; win by opening every non-mine cell."
    ],
    tips: [
      "Work in vertical strips on wide boards so you do not lose track of flagged cells off-screen.",
      "Edge numbers along the top and bottom rows are high-value — they touch fewer hidden cells than center numbers.",
      "When a 5 or 6 appears, pause and list every neighbor before clicking — expert punishes rushed opens.",
      "If stuck, solve the densest numbered cluster first; empty regions rarely help until borders are resolved.",
      "Drop to intermediate for speed-run practice; return to expert when you want density."
    ],
    faq: [
      {
        q: "Why is the expert board so wide?",
        a: "30×16 matches the classic expert proportions many players remember from desktop minesweeper — more horizontal scanning, same logic."
      }
    ],
    related: ["minesweeper-intermediate", "minesweeper", "sudoku-hard", "nonogram-ink", "killer-sudoku", "daily-sudoku"]
  },

  "daily-spider": {
    metaDesc: "Daily Spider Solitaire — one-suit Spider with today’s shared deal. Same layout for every player. Free online.",
    intro: [
      "Daily Spider is one-suit Spider with a shuffle fixed to the calendar date. Everyone gets the same column deal today — good for comparing how many runs you cleared or how fast you finished.",
      "Rules match Spider Solitaire 1 Suit; only the seed is daily instead of random."
    ],
    rules: [
      "One-suit Spider: ten columns, build down by rank, move any descending run, clear eight king-to-ace sequences.",
      "Stock deals one card per column when no column is empty.",
      "Today’s layout repeats until your local date changes."
    ],
    tips: [
      "On a fixed daily deal, your second attempt is pure improvement — note which column you dealt into too early.",
      "Empty-column timing matters more on some daily seeds than others; do not burn your last empty slot before a clear.",
      "Compare with a friend on the identical board without sharing screenshots of hidden cards — the deal is public by date.",
      "Want four suits? Use regular Spider Solitaire for random hard shuffles instead.",
      "Pair with Daily Klondike for a short solitaire double-header."
    ],
    faq: [
      {
        q: "Is Daily Spider four-suit?",
        a: "No — daily mode uses one suit for accessibility. Open Spider Solitaire for four-suit random deals."
      }
    ],
    related: ["spider-solitaire-1-suit", "daily-klondike", "spider-solitaire", "spiderette-solitaire", "daily-sudoku", "freecell"]
  },

  "killer-sudoku": {
    metaDesc: "Killer Sudoku online — standard sudoku plus sum cages with no repeated digits in a cage. Free 9×9 puzzle.",
    intro: [
      "Killer sudoku removes most givens and replaces them with dotted cages: digits in a cage must add to the small clue and cannot repeat inside that cage.",
      "Normal sudoku row, column, and box rules still apply — cages add arithmetic constraints on top."
    ],
    rules: [
      "Fill 1–9 in each row, column, and 3×3 box with no duplicates.",
      "Each dotted cage shows a target sum. Cells in that cage must add to the sum and cannot repeat a digit within the cage.",
      "No starting digits are shown — only cage sums. Use logic to find forced combinations.",
      "New game generates a fresh cage layout."
    ],
    tips: [
      "Start with two-cell cages: each sum has only a few possible pairs (e.g. 3 must be 1+2).",
      "Use box rules to eliminate pair candidates that would break a row or column.",
      "Large cages with unique combinations (only one way to hit the sum with distinct digits) are anchor points.",
      "If stuck, scan for a cage where only one digit fits after sudoku eliminations — not just cage math."
    ],
    faq: [
      {
        q: "Do I need to guess in Killer Sudoku?",
        a: "Well-formed killer puzzles should be logic-only. If you are guessing, revisit small cages and box-line eliminations."
      }
    ],
    related: ["daily-killer-sudoku", "sudoku-hard", "sudoku-medium", "kakuro", "daily-sudoku", "daily-kakuro"]
  },

  "daily-killer-sudoku": {
    metaDesc: "Daily Killer Sudoku — one cage layout per calendar day, shared by all players. Free online.",
    intro: [
      "Daily Killer Sudoku fixes both the sudoku solution and cage arrangement to today’s date. Retry the same arithmetic constraints all day or compare with another player.",
      "Same killer rules as the standard mode — cages sum correctly, no repeats in a cage, full sudoku uniqueness."
    ],
    rules: [
      "Killer sudoku rules with a date-seeded cage layout.",
      "Refreshing does not change today’s puzzle until the calendar date changes.",
      "New game reloads today’s daily grid, not a random one."
    ],
    tips: [
      "On a daily killer, write down which two-cell cages you solved first — tomorrow’s puzzle will feel faster with the same habit.",
      "Cross-reference cage sums with box boundaries; cages often straddle box edges deliberately.",
      "Daily mode rewards methodical cage order over random scanning.",
      "Use regular Killer Sudoku for unlimited random cage sets.",
      "Pair with Daily Sudoku for a numbers double without killer cages."
    ],
    faq: [
      {
        q: "When does the daily killer reset?",
        a: "At local midnight when your device’s date changes, same as other daily modes on SolitaireFelt."
      }
    ],
    related: ["killer-sudoku", "daily-sudoku", "daily-kakuro", "sudoku-hard", "kakuro", "daily-klondike"]
  },

  "kakuro": {
    metaDesc: "Kakuro online — fill runs to match sum clues, no digit repeats in a run. Free cross-sum puzzle.",
    intro: [
      "Kakuro looks like a crossword but uses sums. White runs have a clue; digits 1–9 fill the run, cannot repeat within that run, and must add to the clue.",
      "Black cells separate runs — horizontal and vertical clues intersect like a crossword."
    ],
    rules: [
      "Each white run has a sum clue (shown at the start of the run).",
      "Digits 1–9 fill white cells. No digit repeats within a single run.",
      "Digits in a run must add exactly to the clue sum.",
      "Crossing runs share cells — a digit must satisfy both its horizontal and vertical run."
    ],
    tips: [
      "Learn unique combinations for short runs (e.g. sum 17 in two cells must be 8+9).",
      "Fill runs that cross the most other runs first — they constrain the grid fastest.",
      "A run of length N with sum S has limited possibilities; eliminate combos that need a digit already used in the crossing run.",
      "Long runs with high sums leave fewer combinations — check reference tables mentally for 6-cell runs.",
      "If kakuro feels dense, warm up on Mini Sudoku or Killer Sudoku for digit-placement practice."
    ],
    faq: [
      {
        q: "Is Kakuro like Killer Sudoku?",
        a: "Both use sums without repeating digits in a group, but kakuro is run-based like a crossword while killer uses sudoku boxes plus cages."
      }
    ],
    related: ["daily-kakuro", "killer-sudoku", "sudoku-hard", "crossword-daily", "daily-sudoku", "nonogram-ink"]
  },

  "daily-kakuro": {
    metaDesc: "Daily Kakuro — one cross-sum puzzle per day for all players. Free online, date-seeded grid.",
    intro: [
      "Daily Kakuro serves the same grid and clues to every player on a given calendar day. Useful for racing a friend or retrying a tricky intersection you missed earlier.",
      "Rules match standard Kakuro on SolitaireFelt — only the puzzle is fixed per day."
    ],
    rules: [
      "Standard kakuro: unique digits per run, sums must match clues.",
      "Puzzle is seeded by the date; it changes when your local date changes.",
      "New game reloads today’s layout."
    ],
    tips: [
      "Screenshot your finished grid if you clear a hard daily — compare paths with friends.",
      "On daily puzzles, solve the shortest runs first; they rarely change between days but the habit speeds every kakuro.",
      "When a horizontal and vertical clue meet, list both run’s possible combos before filling.",
      "Retry later the same day if you dead-end — the grid is identical.",
      "Use random Kakuro for unlimited practice outside the daily schedule."
    ],
    faq: [
      {
        q: "Does Daily Kakuro get harder on weekends?",
        a: "No — difficulty varies by seed, not by day of week. Some daily grids are gentler than others by chance."
      }
    ],
    related: ["kakuro", "daily-killer-sudoku", "daily-sudoku", "killer-sudoku", "crossword-daily", "sudoku-medium"]
  },

  "mahjong-fortress": {
    metaDesc: "Mahjong Fortress layout — tall walls, tight corners. Match free identical tiles. Free online.",
    intro: [
      "Fortress is a taller, wall-heavy mahjong layout. Tiles stack in high corners that lock the center — matches on the outer ramparts free more faces than tapping the middle early.",
      "Matching rules are standard mahjong solitaire: pair identical free tiles only."
    ],
    rules: [
      "Click two identical free tiles to remove them.",
      "Free: nothing on top, at least one long side open.",
      "Match identical tile faces only — both tiles must show the same symbol.",
      "Clear every tile to win."
    ],
    tips: [
      "Peel the outer walls down before attacking the central tower — center tiles stay blocked longer.",
      "Fortress punishes early pair greed: if two copies of a tile exist, keep the more accessible one free.",
      "Corners often hold the last copies of a symbol — do not match a corner tile if the twin is buried under a stack.",
      "Use Hint to learn fortress geometry on your first few boards.",
      "Compare with the turtle layout on Mahjong Solitaire when you want a flatter classic shape."
    ],
    faq: [
      {
        q: "Is Fortress harder than the turtle layout?",
        a: "Usually yes — more layers and corner locks mean fewer free tiles early. Rules are the same."
      }
    ],
    related: ["mahjong-solitaire", "mahjong-dragon", "mahjong-pyramid", "daily-mahjong", "mahjong-aztec", "memory-match"]
  },

  "mahjong-pyramid": {
    metaDesc: "Mahjong Pyramid layout — triangular tile stack, open from the edges. Free mahjong solitaire online.",
    intro: [
      "Mahjong Pyramid arranges tiles in a triangular stack similar in spirit to card TriPeaks — outer tiles free first, the peak comes last.",
      "Same pair-matching rules as every mahjong layout on SolitaireFelt; only the silhouette changes."
    ],
    rules: [
      "Match identical free tiles to remove pairs.",
      "Tiles under others are blocked until covering tiles are cleared.",
      "Match identical tile faces only — both tiles must show the same symbol.",
      "Win by clearing the board."
    ],
    tips: [
      "Work the base edges of the pyramid symmetrically so you do not strand one wing.",
      "Peak tiles look tempting but are often blocked longest — free the slopes first.",
      "When two pairs are available on the same layer, choose the match that unlocks a lower layer.",
      "Do not confuse this with Pyramid Solitaire (cards) — open Pyramid Solitaire in our solitaire section for sum-to-13 cards.",
      "Try Mahjong Fortress next if you want a taller challenge."
    ],
    faq: [
      {
        q: "Is this the same as Pyramid Solitaire?",
        a: "No. This is mahjong tile matching in a pyramid shape. Pyramid Solitaire is a card pairing game with different rules."
      }
    ],
    related: ["mahjong-solitaire", "pyramid-solitaire", "mahjong-aztec", "tripeaks-solitaire", "daily-mahjong", "mahjong-spider"]
  },

  "mahjong-spider": {
    metaDesc: "Mahjong Spider layout — two plateaus joined by a seam. Match free tiles fast. Free online.",
    intro: [
      "Mahjong Spider splits the board into two connected plateaus with a shared seam down the middle. Tiles along that seam unlock both halves — prioritize the bridge early.",
      "A quicker layout than Fortress for players who like horizontal scanning."
    ],
    rules: [
      "Standard mahjong solitaire matching on a two-plateau spider shape.",
      "Free tiles only; identical pairs remove.",
      "Match identical tile faces only — both tiles must show the same symbol.",
    ],
    tips: [
      "Clear the center seam first — it usually blocks the most tiles on both plateaus.",
      "Do not drain one plateau while the other still has a full top layer — alternate sides to keep options open.",
      "Spider layouts expose many tiles at once; scan before clicking the first obvious pair.",
      "If the seam stalls, look for a pair entirely on one plateau that frees a seam tile next.",
      "Card Spider Solitaire is a different game — find it under Spider Solitaire in our solitaire menu."
    ],
    faq: [
      {
        q: "Is Mahjong Spider related to Spider Solitaire?",
        a: "Only in name. This is tile matching; Spider Solitaire is a card game with ten columns and in-suit runs."
      }
    ],
    related: ["mahjong-solitaire", "mahjong-bridge", "spider-solitaire-1-suit", "mahjong-dragon", "daily-mahjong", "mahjong-fortress"]
  },

  "mahjong-dragon": {
    metaDesc: "Mahjong Dragon layout — long spine with a high center peak. Free mahjong solitaire online.",
    intro: [
      "The Dragon layout stretches tiles along a long spine with a raised center peak — like a serpent’s back. Tail and head sections often free before the highest ridge.",
      "Ideal if you like reading layered shapes rather than symmetric pyramids."
    ],
    rules: [
      "Match pairs of identical free mahjong tiles.",
      "Blocked tiles cannot be selected until coverings are removed.",
      "Match identical tile faces only — both tiles must show the same symbol.",
    ],
    tips: [
      "Start at the dragon’s tail and head extremities — the center peak is the last boss.",
      "High ridge tiles look free but may still be sandwiched — check both long sides.",
      "Keep one copy of rare tiles on the spine until you see its partner’s location.",
      "Dragon rewards patience more than Fortress rewards corner sweeps — different shape, same pair discipline.",
      "Rotate through layouts: turtle for classic, dragon for spine practice."
    ],
    faq: [
      {
        q: "Which mahjong layout is hardest?",
        a: "Subjective — Fortress and Dragon both lock many center tiles. Try both and see which shape confuses you less."
      }
    ],
    related: ["mahjong-solitaire", "mahjong-fortress", "mahjong-bridge", "mahjong-aztec", "daily-mahjong", "mahjong-pyramid"]
  },

  "mahjong-bridge": {
    metaDesc: "Mahjong Bridge layout — flat span with an open center seam. Free tile-matching puzzle online.",
    intro: [
      "Mahjong Bridge is a flatter, wide layout with a gap along the center seam — tiles on both sides lean toward that opening. Clearing the bridge line splits the board into manageable halves.",
      "A good mid-difficulty layout between turtle and Fortress."
    ],
    rules: [
      "Identical free tiles pair off and leave the board.",
      "At least one side open and nothing on top — same free-tile definition as other layouts.",
      "Clear all tiles to finish."
    ],
    tips: [
      "Open the center seam early — it is the bridge’s choke point.",
      "Work outward from the seam rather than clearing one end cap in isolation.",
      "Flat layouts expose more tiles at once; slow down and compare two possible pairs before clicking.",
      "If a tile sits on the seam, check whether removing its partner strands the other side.",
      "Mahjong Spider also has a two-sided shape — try it after Bridge for a different seam geometry."
    ],
    faq: [
      {
        q: "How is Bridge different from Spider mahjong layout?",
        a: "Bridge is flatter with a central gap; Spider uses two raised plateaus. Both need seam strategy but feel different to scan."
      }
    ],
    related: ["mahjong-spider", "mahjong-solitaire", "mahjong-fortress", "daily-mahjong", "mahjong-pyramid", "memory-match"]
  },

  "mahjong-aztec": {
    metaDesc: "Mahjong Aztec layout — stepped pyramid with a sun-stone peak. Free mahjong solitaire online.",
    intro: [
      "Aztec stacks tiles in stepped terraces around a central peak — outer steps free first, the sun-stone center last.",
      "Feels like climbing a ziggurat: wide base, narrow top, many layers at the edges."
    ],
    rules: [
      "Mahjong solitaire pair rules on an aztec stepped pyramid.",
      "Match identical tile faces only — both tiles must show the same symbol.",
      "Remove all tiles to win."
    ],
    tips: [
      "Clear the lowest terrace completely before jumping to mid-level steps — half-cleared terraces block sideways freedom.",
      "The peak tile is often the last match; do not worry if the center looks stuck late game.",
      "Step corners free three directions of tiles — prioritize outer corners over inner steps.",
      "Aztec and Mahjong Pyramid both taper upward; Aztec has more terraces and a wider base.",
      "Daily Mahjong uses the turtle layout if you want a shared daily tile puzzle instead."
    ],
    faq: [
      {
        q: "Is Aztec harder than the turtle?",
        a: "Generally yes — more steps mean more blocking layers. Same matching rules throughout."
      }
    ],
    related: ["mahjong-pyramid", "mahjong-solitaire", "mahjong-fortress", "daily-mahjong", "pyramid-solitaire", "mahjong-dragon"]
  },

  "daily-mahjong": {
    metaDesc: "Daily Mahjong — today’s turtle layout, same tiles for every player. Free mahjong solitaire online.",
    intro: [
      "Daily Mahjong fixes the classic turtle layout to today’s calendar seed. Everyone sees the same tile arrangement on the same day — compare times or hint usage with a friend.",
      "Matching rules match Mahjong Solitaire; only the shuffle is shared and daily."
    ],
    rules: [
      "Standard mahjong solitaire on the turtle layout.",
      "Tile positions and identities are date-seeded.",
      "New game reloads today’s board until the date changes."
    ],
    tips: [
      "On a daily turtle, map the top layer in your first minute — the seed will not change if you restart.",
      "Retry the same daily board to beat your time without learning a new shape.",
      "Hint highlights a playable matching pair if one exists. No hint usually means no legal move — not necessarily that today's daily was unwinnable from the start.",
      "Want a different shape? Fortress and Dragon are random each new game.",
      "Pair with Daily Klondike or Daily Sudoku for a full daily classics routine."
    ],
    faq: [
      {
        q: "Which layout does Daily Mahjong use?",
        a: "The turtle layout — the same shape as Mahjong Solitaire, with a date-fixed tile deal."
      }
    ],
    related: ["mahjong-solitaire", "daily-klondike", "daily-sudoku", "mahjong-fortress", "daily-spider", "memory-match"]
  },

  "yukon-solitaire": {
    metaDesc: "Yukon Solitaire online — move any face-up stack if the bottom card fits. Like Klondike without the stock. Free in your browser.",
    intro: [
      "Yukon plays like Klondike on the tableau — alternating colors, descending builds, kings in empty columns — but there is no stock pile. Instead, extra cards are dealt face-up onto columns at the start, and you may move any face-up card together with everything on top of it, even if that stack is not in order.",
      "That freedom makes Yukon faster and more tactical than Klondike: planning which buried card to lift matters more than cycling a deck."
    ],
    rules: [
      "Seven tableau columns with a Yukon deal: column one has one face-up card; each next column adds face-down cards plus a block of face-up cards.",
      "Build tableau down by alternating color.",
      "Move any face-up card and every card above it as one unit, regardless of internal order.",
      "Empty columns take kings only.",
      "Foundations build up by suit from ace to king. Win when all 52 cards are on foundations."
    ],
    tips: [
      "Use the scoop move to expose a buried ace or low card without first reordering the whole column.",
      "Do not lift a deep stack unless the bottom card has a real destination — you may bury cards you just freed.",
      "Empty a column for a king only when the king opens a column that was blocking progress.",
      "Foundations can wait for tableau cards that are acting as anchors for scoops.",
      "If Yukon feels chaotic, compare a deal to Klondike — same foundations, no second chance from stock."
    ],
    faq: [
      {
        q: "How is Yukon different from Klondike?",
        a: "No stock or waste. You can move messy face-up stacks as a unit, which Klondike does not allow unless the stack is properly ordered."
      }
    ],
    related: ["klondike-solitaire", "freecell", "canfield-solitaire", "forty-thieves-solitaire", "spider-solitaire", "daily-klondike"]
  },

  "golf-solitaire": {
    metaDesc: "Golf Solitaire — clear tableau cards one rank from the waste. No king-to-ace wrap. Fewer leftovers wins. Free online.",
    intro: [
      "Golf solitaire (sometimes called Golf Patience) is a quick clearing game: seven columns of cards, one waste pile, and simple rank adjacency — but unlike TriPeaks, ranks do not wrap from king to ace.",
      "Your score is how few cards remain when the stock runs out. Clearing the whole tableau is a full win."
    ],
    rules: [
      "Remove any exposed tableau card that is exactly one rank higher or lower than the current waste card.",
      "No wrapping: ace and king are not connected.",
      "When no tableau card fits, flip the next card from the stock onto the waste.",
      "Win by clearing all tableau cards. Fewer leftovers mean a better result when stuck."
    ],
    tips: [
      "Before flipping stock, scan all seven columns — one flip wasted is one less chance.",
      "Prefer a move that uncovers a new column card over a move that only shrinks an already-short column.",
      "Kings and aces are dead ends at the edges of rank — plan around them when the waste shows a 2 or queen.",
      "If two columns offer the same rank, choose the one with more cards still buried underneath.",
      "Compare with TriPeaks when you want ace–king wrapping and a peak layout instead of columns."
    ],
    faq: [
      {
        q: "Is Golf the same as TriPeaks?",
        a: "Similar adjacency idea, but Golf uses columns, does not wrap ace–king, and scores by cards left in the tableau."
      }
    ],
    related: ["tripeaks-solitaire", "pyramid-solitaire", "klondike-solitaire", "canfield-solitaire", "spiderette-solitaire", "mahjong-solitaire"]
  },

  "canfield-solitaire": {
    metaDesc: "Canfield Solitaire — reserve pile, wrap-around foundations from a random base rank. Classic patience online, free.",
    intro: [
      "Canfield is an old casino patience game: a thirteen-card reserve feeds the tableau, foundations start at a random rank and wrap (king to ace continues), and the stock flips one card at a time.",
      "It feels like Klondike with tighter constraints and a visible reserve you must manage before it empties."
    ],
    rules: [
      "Four tableau columns build down by alternating color.",
      "Reserve: thirteen face-up cards — only the top reserve card is playable.",
      "Foundations start from a random base rank (for example, if the base is 7♠, you build 7 through king then ace through 6 in that suit).",
      "Stock flips one card to waste; empty columns accept kings only.",
      "Win by moving all 52 cards to the foundations."
    ],
    tips: [
      "Watch the base rank immediately — every foundation starts there, not at ace.",
      "Reserve cards run out fast; use them to unblock tableau columns before the pile is empty.",
      "Empty columns are for kings — use them to reposition a blocking king stack, not arbitrary cards.",
      "Do not bury the base rank in deep tableau stacks if you still need to start other suits.",
      "Wrapping foundations confuse newcomers: remember king is followed by ace on the same foundation pile."
    ],
    faq: [
      {
        q: "Why do my foundations not start with aces?",
        a: "Canfield uses a random base rank per deal. Each foundation builds upward in suit from that rank and wraps through ace."
      }
    ],
    related: ["klondike-solitaire", "yukon-solitaire", "forty-thieves-solitaire", "freecell", "scorpion-solitaire", "bakers-dozen-solitaire"]
  },

  "scorpion-solitaire": {
    metaDesc: "Scorpion Solitaire — build down by rank, scoop face-up stacks. Clear four runs or empty the board. Free online.",
    intro: [
      "Scorpion sits between Spider and Yukon: you build down by rank on seven columns (suit does not matter for placement), but you may pick up any face-up card together with all cards covering it — order inside that scoop need not be valid.",
      "Clear four in-suit king-through-ace runs from the board, or empty every column, to win."
    ],
    rules: [
      "Seven columns build down by rank (suit does not matter on the tableau).",
      "Move any face-up card and every card stacked above it, even if that group is not a proper run.",
      "Empty columns accept any card.",
      "Stock: three cards deal to the first three columns when you click the stock.",
      "Win by clearing four in-suit king-through-ace runs from the board, or by emptying all tableau columns."
    ],
    tips: [
      "Tableau builds down by rank (any suit); cleared runs must be in-suit king-through-ace.",
      "Use scoops to flip face-down cards at the bottom of a column.",
      "Empty columns let you break apart a bad stack and rebuild in-suit.",
      "Before dealing the final three cards, try to have columns where new cards can land on same-suit targets.",
      "If you like Scorpion’s scoop, try Yukon for alternating-color scoops without suit builds."
    ],
    faq: [
      {
        q: "Is Scorpion the same as Spider?",
        a: "Scorpion uses seven columns, rank-down builds, and messy scoops. Cleared runs must be in-suit king-to-ace like Spider, but tableau placement ignores suit."
      }
    ],
    related: ["spider-solitaire-1-suit", "spiderette-solitaire", "yukon-solitaire", "forty-thieves-solitaire", "freecell", "klondike-solitaire"]
  },

  "forty-thieves-solitaire": {
    metaDesc: "Forty Thieves Solitaire — two decks, ten columns, same-suit builds. Eight foundations. Free online.",
    intro: [
      "Forty Thieves (also called Napoleon at St Helena in some books) uses two full decks, ten tableau columns, and strict same-suit descending builds. Eight foundations take ace through king — two complete decks, two piles per suit.",
      "Empty columns accept any card, which helps when rearranging long same-suit chains."
    ],
    rules: [
      "Ten columns build down in the same suit only.",
      "Move only one card at a time — no packed multi-card moves.",
      "Eight foundations: two per suit, ace to king each.",
      "Stock deals one card to waste at a time; empty columns accept any card.",
      "Win when all 104 cards sit on foundations."
    ],
    tips: [
      "Do not bury low aces — with two foundations per suit, starting aces early doubles your outlet.",
      "Same-suit discipline is stricter than Spider’s color-blind builds; one off-suit card blocks a column until scooped away.",
      "Empty columns are precious — use them to swap a blocking card off a deep stack.",
      "Deal from stock only when tableau moves stall; each click adds one card to the waste pile.",
      "If Forty Thieves feels dense, try Baker’s Dozen for a one-deck alternative with more columns."
    ],
    faq: [
      {
        q: "Why are there eight foundations?",
        a: "Two decks mean two king-to-ace sequences per suit — eight piles total."
      }
    ],
    related: ["bakers-dozen-solitaire", "spider-solitaire", "freecell", "yukon-solitaire", "canfield-solitaire", "daily-spider"]
  },

  "bakers-dozen-solitaire": {
    metaDesc: "Baker's Dozen Solitaire — thirteen columns, kings moved forward at deal. Build down, one card at a time. Free online.",
    intro: [
      "Baker’s Dozen deals four cards into each of thirteen columns and immediately moves every king to the bottom of its pile (under the other cards). You build down regardless of suit, but only one card moves at a time — no packed stacks.",
      "Foundations still build ace through king in suit. Empty columns cannot receive cards on SolitaireFelt, so every move must work within the crowded tableau."
    ],
    rules: [
      "Thirteen columns, four cards each; kings are moved to the bottom of their column at the deal.",
      "Tableau builds down regardless of suit.",
      "Only one card may move at a time — no multi-card runs.",
      "Empty columns cannot receive cards — unlike Forty Thieves or FreeCell, you cannot park cards in an empty slot.",
      "Foundations build in suit from ace to king.",
      "Win with all cards on foundations."
    ],
    tips: [
      "Kings sit at the bottom of each column — plan moves that uncover cards above them.",
      "With one-card moves, think two steps ahead: where does the card below land after this move?",
      "Do not rush aces to foundations if the deuce you need is still trapped under a king.",
      "Free buried cards by peeling from the top of a column before shuffling kings around.",
      "Thirteen columns look crowded — sequence planning beats speed."
    ],
    faq: [
      {
        q: "Can I move stacked sequences in Baker's Dozen?",
        a: "No. Only one card at a time, which is the defining constraint of this variant."
      }
    ],
    related: ["forty-thieves-solitaire", "freecell", "canfield-solitaire", "spiderette-solitaire", "klondike-solitaire", "scorpion-solitaire"]
  },

  "spiderette-solitaire": {
    metaDesc: "Spiderette — one-deck mini Spider on seven columns. Clear four in-suit runs. Free solitaire online.",
    intro: [
      "Spiderette is Spider compressed to one deck and seven columns. Build down regardless of suit, move in-suit runs together, and clear four king-through-ace sequences to win.",
      "It is the bridge between Klondike players and full Spider — same run-clearing satisfaction in a shorter session."
    ],
    rules: [
      "Seven columns with a Spider-style deal; only the top card in each column starts face up.",
      "Build down by rank on the tableau; move groups only if they form a same-suit descending run.",
      "Complete in-suit king-to-ace runs remove from the board.",
      "Stock deals one card per column when no column is empty.",
      "Win after four cleared runs (one deck)."
    ],
    tips: [
      "Seven columns fill quickly — protect one empty column until you need it for a run swap.",
      "Build in-suit runs whenever you can — this one-suit deck lets any descending stack move as a unit.",
      "Flip face-down cards before dealing; each stock round adds seven cards you may not want.",
      "If Spiderette feels easy, step to Spider 1 Suit, then 2 Suit, then full Spider.",
      "Compare with Scorpion for a scoop-based alternative on seven columns."
    ],
    faq: [
      {
        q: "How is Spiderette different from Spider?",
        a: "One deck, seven columns, four runs to clear instead of two decks, ten columns, and eight runs."
      }
    ],
    related: ["spider-solitaire-1-suit", "spider-solitaire", "scorpion-solitaire", "daily-spider", "klondike-solitaire", "freecell"]
  },

  "quad-merge": {
    metaDesc: "Quad Merge — slide tiles, combine matching numbers, reach 2048 and beyond. Free 2048-style puzzle online.",
    intro: [
      "Quad Merge is a 2048-style merge puzzle: swipe or use arrow keys to slide all tiles in a direction; equal values fuse into the next number; after each move a new 2 or 4 appears.",
      "The board is four-by-four — plan corners and edges so high tiles do not get trapped in the middle."
    ],
    rules: [
      "Swipe up, down, left, or right (or arrow keys) to slide tiles.",
      "When two tiles with the same value collide, they merge into one tile with double the value.",
      "One new tile (2 or 4) spawns after every successful move.",
      "Game ends when no moves remain. Reaching 2048 is a milestone; you can keep playing for higher values."
    ],
    tips: [
      "Pick a corner and keep your highest tile there — chase merges toward that anchor.",
      "Avoid swiping toward the corner that holds your biggest tile unless you are sure it will merge.",
      "Try to keep rows or columns monotonic (values increasing toward the corner) to prevent fragmentation.",
      "When the board fills, one bad swipe ends the run — slow down when only a few empty cells remain.",
      "Undo is not part of classic 2048 — each move is permanent, so think one step ahead."
    ],
    faq: [
      {
        q: "Is Quad Merge the same as 2048?",
        a: "Same core rules and grid size. The name reflects the four-direction merge mechanic on SolitaireFelt."
      }
    ],
    related: ["slide-fifteen", "gem-cascade", "sudoku-easy", "mini-sudoku", "memory-match", "nonogram-ink"]
  },

  "penta-daily": {
    metaDesc: "Penta Daily — guess the five-letter word in six tries. New word every calendar day. Free word puzzle online.",
    intro: [
      "Penta Daily is a five-letter word puzzle with six guesses. Each guess must be a valid five-letter word; tiles turn gold if the letter is correct and in place, brass if the letter is in the word elsewhere, dim if it is not in the word.",
      "The answer is seeded by today’s date — everyone gets the same word on the same day."
    ],
    rules: [
      "Type a five-letter word and submit. Use the on-screen keyboard or physical keyboard.",
      "Gold: correct letter, correct spot. Brass: letter exists elsewhere in the answer. Dim: letter not in the word.",
      "Six guesses maximum. Invalid words are rejected and do not count as a guess.",
      "A new word arrives when your calendar date changes."
    ],
    tips: [
      "Open with a word that uses five distinct common letters (often including A, E, R, S, T).",
      "Use your second guess to test remaining vowels, not repeat gold letters in the same spots unless confirming.",
      "If two letters are brass, try them in opposite positions before repeating a dim letter.",
      "Hard mode habit: do not reuse dim letters — our board still accepts them, but disciplined play speeds wins.",
      "Compare your guess count with friends — the daily word is identical for everyone today."
    ],
    faq: [
      {
        q: "When does Penta Daily reset?",
        a: "When your device’s date changes. The word is picked from a fixed list using the calendar seed."
      }
    ],
    related: ["word-search", "hangman", "anagram-hunt", "crossword-daily", "typing-sprint", "daily-sudoku"]
  },

  "word-search": {
    metaDesc: "Word Search online — find hidden words in eight directions on a letter grid. Free browser puzzle.",
    intro: [
      "Word search hides a short list of words in a square grid. Words run forward or backward horizontally, vertically, or diagonally. Drag across letters to highlight a match.",
      "Each puzzle uses a fresh random placement — good for a calm five-minute scan without account setup."
    ],
    rules: [
      "Words from the list are hidden in the grid.",
      "Drag in a straight line through consecutive letters to select a word.",
      "Words may read in any of eight directions.",
      "Find every listed word to finish the puzzle."
    ],
    tips: [
      "Scan for rare letters first (Q, X, Z) — they anchor few possible words.",
      "Long words are easier to spot; clear them before hunting three-letter fragments.",
      "If stuck, pick one word from the list and trace each starting letter in the grid.",
      "Diagonal words are easy to miss — sweep each corner direction once.",
      "After finishing, hit New puzzle for another random grid."
    ],
    faq: [
      {
        q: "Can words overlap?",
        a: "Yes. Letters can belong to more than one word in the same grid."
      }
    ],
    related: ["penta-daily", "hangman", "anagram-hunt", "crossword-daily", "typing-sprint", "memory-match"]
  },

  "hangman": {
    metaDesc: "Hangman online — guess letters before the gallows completes. Free word game in your browser.",
    intro: [
      "Classic hangman: a secret word, blank spaces, and letter guesses. Each wrong guess draws another part of the gallows. Win by revealing the full word before the drawing finishes.",
      "Good for warming up vocabulary before Penta Daily or word search."
    ],
    rules: [
      "The word uses common English letters; spaces may appear for multi-word answers.",
      "Click or type a letter. Correct letters fill every matching position.",
      "Wrong letters add to the gallows drawing.",
      "Win by completing the word. Lose after seven wrong guesses."
    ],
    tips: [
      "Start with E, T, A, O, I, N — they cover most English word mass.",
      "If no vowels appear early, try R, S, L, C.",
      "Pattern recognition helps: _ING and _TION shapes narrow options fast.",
      "Avoid rare letters (Q, X, Z) until the pattern suggests them.",
      "New game picks a fresh word — use it to practice letter frequency without pressure."
    ],
    faq: [
      {
        q: "Are proper nouns used?",
        a: "Words are general English vocabulary, not trivia names — think everyday puzzle words."
      }
    ],
    related: ["penta-daily", "word-search", "anagram-hunt", "crossword-daily", "typing-sprint", "memory-match"]
  },

  "anagram-hunt": {
    metaDesc: "Anagram Hunt — form words from a letter set. Score points for longer words. Free online word game.",
    intro: [
      "Anagram Hunt shows a fixed set of letters. Type words of three or more letters using only those letters (each letter at most as many times as it appears in the set). Longer words score more.",
      "A timed or score-chasing challenge for players who like Boggle-style thinking."
    ],
    rules: [
      "Use the displayed letters only.",
      "Words must be at least three letters.",
      "You cannot use a letter more times than it appears in the set.",
      "Submit valid words to add to your score. New letter sets come with New game."
    ],
    tips: [
      "Find the longest word first — it often uses a core consonant cluster others miss.",
      "Try common suffixes (-ING, -ED, -ER) once you spot a root.",
      "Shuffle the letters mentally: consonants on one side, vowels on the other.",
      "Do not ignore plurals if you have an S in the set.",
      "Three-letter words add up — scan corners when time is almost out."
    ],
    faq: [
      {
        q: "Is there a dictionary check?",
        a: "Yes — invalid or unknown words are rejected. Stick to common English words."
      }
    ],
    related: ["word-search", "penta-daily", "hangman", "typing-sprint", "crossword-daily", "daily-sudoku"]
  },

  "typing-sprint": {
    metaDesc: "Typing Sprint — type a passage with live WPM and accuracy. Free online keyboard practice.",
    intro: [
      "Typing Sprint shows a short passage. Type it as accurately as you can; words per minute and accuracy update live as you go.",
      "Useful for warming up fingers or tracking improvement over repeat visits."
    ],
    rules: [
      "Click the text area and type the shown passage from start to finish.",
      "WPM uses five characters per word (standard gross WPM formula).",
      "Accuracy counts correct characters versus total typed characters.",
      "Finish the full passage to complete the sprint."
    ],
    tips: [
      "Accuracy beats speed at first — errors cost more time than slow correct typing.",
      "Keep your eyes on the passage, not the HUD.",
      "Pause one beat at punctuation; many errors happen at commas and periods.",
      "Run twice back-to-back: first for accuracy, second for speed once your fingers know the shape.",
      "Compare WPM on the same passage after a week of daily sprints, not across different texts."
    ],
    faq: [
      {
        q: "What counts as a word for WPM?",
        a: "Five typed characters equal one word in the standard gross WPM calculation used here."
      }
    ],
    related: ["word-search", "penta-daily", "anagram-hunt", "crossword-daily", "hangman", "memory-match"]
  },

  "crossword-daily": {
    metaDesc: "Mini Crossword online — compact grid with clue list. Type answers, check as you go. Free, no account.",
    intro: [
      "A small crossword grid with across and down clues. Click a square, type letters, and move between words with the clue list. The grid validates as you fill — finish when every cell is correct.",
      "Sized for a short break, not a Sunday newspaper marathon."
    ],
    rules: [
      "Click a cell to select it; type letters to fill.",
      "Numbers match the clue list for across and down entries.",
      "Use clues to infer crossing letters — each intersection must satisfy both words.",
      "Complete the grid to win. New game loads another mini puzzle."
    ],
    tips: [
      "Fill the longest clue you know first — crossings help shorter words.",
      "If two letters conflict, the across word is often wrong — revisit that clue.",
      "Plural clues usually mean plural answers; watch clue tense and grammar hints.",
      "Stuck on one corner? switch to the opposite corner and work inward.",
      "Pair with Penta Daily for a word double without a large grid commitment."
    ],
    faq: [
      {
        q: "Is this a new crossword every day?",
        a: "New game shuffles available mini grids. For a date-fixed word puzzle, use Penta Daily."
      }
    ],
    related: ["penta-daily", "word-search", "kakuro", "hangman", "anagram-hunt", "daily-sudoku"]
  },

  "chess": {
    metaDesc: "Chess vs computer online — click piece, click square. Browser AI responds. Free, no download.",
    intro: [
      "Play chess against a browser opponent on SolitaireFelt. White moves first; click a piece, then a highlighted square to move. The computer searches a few plies ahead and punishes loose pieces.",
      "Standard chess rules: check, checkmate, stalemate, and piece movement as usual."
    ],
    rules: [
      "White (you) moves first unless configured otherwise.",
      "Click a piece to see legal squares; click a destination to move.",
      "The computer plays black automatically after your move.",
      "Checkmate ends the game. Stalemate is a draw."
    ],
    tips: [
      "Develop knights and bishops before launching the queen — the CPU targets early queen adventures.",
      "Control the center with pawns and pieces; rim chess gives the AI easy files.",
      "Before capturing, ask what recapture opens — the engine loves hanging material.",
      "Castle when the center is stable; an exposed king is easy prey for coordinated checks.",
      "If losing, look for checks that force the king — even lost games teach tempo."
    ],
    faq: [
      {
        q: "How strong is the chess AI?",
        a: "A short lookahead search — beatable by careful play, not grandmaster level. Good for casual practice."
      }
    ],
    related: ["checkers", "reversi", "gomoku", "connect-four", "tic-tac-toe", "backgammon"]
  },

  "checkers": {
    metaDesc: "Checkers (English draughts) vs computer — diagonal moves, forced captures, kings. Free online.",
    intro: [
      "English draughts on an eight-by-eight dark-square board. Men move diagonally forward; captures jump opponent pieces. Reaching the far rank crowns a king that moves diagonally both ways.",
      "Captures are mandatory when available — plan jumps or the rules force a line you did not want."
    ],
    rules: [
      "Dark squares only. Men move one diagonal step forward to an empty square.",
      "Jump an adjacent opponent piece to capture it; multiple jumps in one turn if available.",
      "When a man reaches the opposite back row, it becomes a king.",
      "Kings move diagonally forward or backward.",
      "Win by capturing all opponent pieces or blocking them completely."
    ],
    tips: [
      "Control the center early — edge pieces have fewer jump options.",
      "If a capture is available, you must take it — scan for forced sequences before casual moves.",
      "Trade pieces when ahead in material; avoid trades when behind.",
      "Advance on both flanks so one side is not stuck while the other fights alone.",
      "Kings in the center dominate — aim your promotion path toward open diagonals."
    ],
    faq: [
      {
        q: "Is this American checkers or international draughts?",
        a: "English draughts on eight-by-eight: men move forward only until crowned, captures mandatory."
      }
    ],
    related: ["chess", "reversi", "connect-four", "mancala", "tic-tac-toe", "gomoku"]
  },

  "connect-four": {
    metaDesc: "Connect Four online — drop discs, four in a row wins. Play against the computer. Free browser game.",
    intro: [
      "Drop discs into a seven-column, six-row grid. Gravity fills the lowest empty slot in a column. First to connect four horizontally, vertically, or diagonally wins.",
      "You play against the computer. Think one row above your win — block before you build."
    ],
    rules: [
      "Click a column to drop your disc in the lowest empty cell.",
      "Players alternate turns.",
      "Four in a row in any direction wins.",
      "Full columns reject new discs — pick another column."
    ],
    tips: [
      "Control the center columns — they participate in more winning lines.",
      "Create two threats at once (forks) when you can — the CPU picks randomly among legal columns, not perfect defense.",
      "Block an opponent three-in-a-row immediately — the fourth is often unstoppable above.",
      "Watch diagonal lines through the middle; they are easier to miss than horizontals.",
      "If the top row fills without a winner, the game is a draw — rare but possible."
    ],
    faq: [
      {
        q: "Does the computer play optimally?",
        a: "It picks a random legal column — good for casual play, not perfect endgame defense."
      }
    ],
    related: ["tic-tac-toe", "gomoku", "reversi", "checkers", "mancala", "chess"]
  },

  "reversi": {
    metaDesc: "Reversi (Othello) online — trap discs to flip them. Most discs at the end wins. Free vs computer.",
    intro: [
      "Reversi starts with four discs in the center. Place a disc so it traps opponent pieces between your new disc and another of yours in a straight line; trapped discs flip to your color.",
      "The game ends when neither player can move; whoever has more discs wins."
    ],
    rules: [
      "Black and white alternate. You must play if a legal flip exists.",
      "A legal move traps at least one opponent disc between your new disc and an existing disc, horizontally, vertically, or diagonally.",
      "All trapped discs flip to your color.",
      "If you cannot move, your turn passes. Game ends when both pass or the board fills."
    ],
    tips: [
      "Corners never flip — a corner disc is permanent once taken.",
      "Avoid playing adjacent to corners early unless you can take the corner next turn.",
      "Edges are safer than interior cells but still vulnerable to long lines.",
      "Minimize discs in the opening; fewer discs often means more mobility midgame.",
      "Force your opponent into a move that gives you a corner — that swing wins many casual games."
    ],
    faq: [
      {
        q: "Is Reversi the same as Othello?",
        a: "Same rules and starting setup in practice. Othello is the trademarked board brand name."
      }
    ],
    related: ["chess", "checkers", "connect-four", "gomoku", "mancala", "tic-tac-toe"]
  },

  "mancala": {
    metaDesc: "Mancala (Kalah) online — sow stones, capture opposite pits, extra turns. Free vs computer.",
    intro: [
      "Kalah-style mancala on a two-row board with a store on each end. Pick a pit on your side, sow stones counterclockwise one per pit, and capture when your last stone lands in an empty pit on your side opposite opponent stones.",
      "Landing in your store earns an extra turn — chain those when possible."
    ],
    rules: [
      "On your turn, pick any non-empty pit on your side.",
      "Drop one stone into each following pit, including your store but skipping the opponent’s store.",
      "If your last stone lands in your store, play again.",
      "If your last stone lands in an empty pit on your side, capture that stone plus stones in the opposite pit.",
      "Win with more stones in your store when one side’s pits are empty."
    ],
    tips: [
      "Extra turns from the store swing games — count sowing distance before you pick up.",
      "Empty pits on your side can set up captures; do not leave large opposite pits vulnerable.",
      "Stones in your store are safe — prioritize moves that add there without giving captures.",
      "Late game, empty your pits efficiently so the opponent’s leftover stones count for you.",
      "Against the CPU, watch for forced capture setups on your empty near-side pits."
    ],
    faq: [
      {
        q: "Which mancala rules are used?",
        a: "Kalah: six pits per side, stores on the ends, sow counterclockwise, capture on empty own pit."
      }
    ],
    related: ["chess", "checkers", "reversi", "connect-four", "backgammon", "gomoku"]
  },

  "battleship": {
    metaDesc: "Sea Battle — find and sink the hidden fleet on a 10×10 grid. Free battleship vs computer online.",
    intro: [
      "Sea Battle is solo hunt mode: the computer hides a standard fleet (sizes 5, 4, 3, 3, 2) on a ten-by-ten grid. Click cells to fire — hits and misses mark until every ship cell is found.",
      "No placement phase on this table — you are the hunter, not the admiral setting up both sides."
    ],
    rules: [
      "Click an unshot cell to fire.",
      "Misses mark pale; hits mark when you strike ship.",
      "Ships do not move after placement.",
      "Win when every ship cell has been hit."
    ],
    tips: [
      "Use a parity pattern on the hunt phase — ship size 2 forces even/odd coverage logic on open water.",
      "After a hit, target the four orthogonally adjacent cells before spraying elsewhere.",
      "When two hits align, finish that line before returning to wide search.",
      "Corners and edges fit fewer ship orientations — they are lower-yield but sometimes necessary.",
      "New fleet reshuffles the hidden layout for another hunt."
    ],
    faq: [
      {
        q: "Do I place my own ships?",
        a: "Not in this mode — you only fire at the computer’s hidden fleet on one grid."
      }
    ],
    related: ["minesweeper", "memory-match", "nonogram-ink", "chess", "connect-four", "word-search"]
  },

  "gomoku": {
    metaDesc: "Gomoku online — five in a row on a 15×15 board vs AI. Free browser strategy game.",
    intro: [
      "Gomoku (five in a row) on a fifteen-by-fifteen grid. You and the computer alternate placing stones on intersections. First uninterrupted line of five wins — horizontal, vertical, or diagonal.",
      "Open threes and fours are lethal; the AI blocks obvious wins but can be outflanked with double threats."
    ],
    rules: [
      "Click an empty intersection to place your stone.",
      "Players alternate.",
      "Five stones in a row in any straight direction wins.",
      "No capture — placement only."
    ],
    tips: [
      "Play near the center early — lines need room to grow in four directions.",
      "Create two open-ended threats so the opponent can block only one.",
      "Block an opponent four immediately; a three can become two winning fours next turn.",
      "Watch diagonals — they are the most commonly overlooked winning lines.",
      "If the board feels crowded, reset — gomoku on 15×15 still has air until midgame."
    ],
    faq: [
      {
        q: "Is this renju or free gomoku?",
        a: "Free gomoku rules — first five in a row wins, without renju opening restrictions."
      }
    ],
    related: ["connect-four", "tic-tac-toe", "reversi", "chess", "checkers", "mancala"]
  },

  "tic-tac-toe": {
    metaDesc: "Tic-Tac-Toe vs computer — three in a row on 3×3. Quick classic. Free online.",
    intro: [
      "The three-by-three classic. You play X, the CPU plays O. First to complete a row, column, or diagonal wins. Perfect for a thirty-second reset between longer games.",
      "The CPU blocks forks — you need a double threat to win, not a single line."
    ],
    rules: [
      "Click an empty square to place X.",
      "Players alternate until someone has three in a row or the grid fills.",
      "Three in a row wins. Full grid with no line is a draw."
    ],
    tips: [
      "Take a corner if the center is taken — corners participate in more winning lines than edges.",
      "If you start, center or corner gives the best win chances against a blocking AI.",
      "Set up two lines at once; the CPU can block one but not two.",
      "An edge opening as first player is weakest — the AI will force a draw or loss.",
      "Use tic-tac-toe to teach fork logic before Connect Four or Gomoku."
    ],
    faq: [
      {
        q: "Can I win as X every time?",
        a: "Against perfect play the game is usually a draw. The CPU is beatable if you create a proper fork."
      }
    ],
    related: ["connect-four", "gomoku", "reversi", "checkers", "memory-match", "chess"]
  },

  "backgammon": {
    metaDesc: "Backgammon vs computer — roll, move, hit blots, bear off. Free online board game.",
    intro: [
      "Race your fifteen checkers around the board into your home board and bear them off before the computer does. Roll two dice each turn; move one or two checkers according to the pips shown.",
      "Hit lone opponent blots to send them to the bar — they must re-enter before moving again."
    ],
    rules: [
      "Roll two dice at the start of your turn.",
      "Move checkers toward your home board following standard backgammon direction.",
      "A blot (single checker) can be hit to the bar; re-enter on the opponent’s home quadrant.",
      "Bear off when all checkers are in your home board.",
      "First to bear off all checkers wins."
    ],
    tips: [
      "Make points on your side of the board (two checkers on a point) to block re-entry.",
      "Leaving a blot is acceptable if the return shot is unlikely — count opposing builders.",
      "Use doubles to run or to secure key points, not both randomly.",
      "Bear off efficiently: do not waste pips moving checkers already deep in home unless required.",
      "When behind in the race, stay back to hit; when ahead, run and avoid contact."
    ],
    faq: [
      {
        q: "Does this use doubling cube or match play?",
        a: "Single-game casual backgammon — no doubling cube, one game per reset."
      }
    ],
    related: ["mancala", "chess", "checkers", "gin-rummy", "reversi", "connect-four"]
  },

  "gin-rummy": {
    metaDesc: "Gin Rummy vs CPU — meld sets and runs, knock with low deadwood. Free card game online.",
    intro: [
      "Gin rummy against a simple computer opponent: draw from stock or take the discard, form sets (same rank) and runs (same suit, consecutive rank), then knock when your unmatched deadwood totals ten or less.",
      "The CPU knocks too — watch its discards for clues about its melds."
    ],
    rules: [
      "Ten-card hands. Draw one card from stock or discard pile, then discard one.",
      "Sets are three or four cards of the same rank. Runs are three or more consecutive cards in one suit.",
      "Knock when deadwood (unmelded cards) totals 10 points or less.",
      "Face cards count ten; aces one; number cards face value.",
      "Lower deadwood wins the hand after knock."
    ],
    tips: [
      "Track discards — if the CPU repeats low cards, it may be avoiding your run.",
      "Keep middle cards that can join multiple runs (7♦ connects 5-6 and 8-9).",
      "Knock early when ahead in deadwood — waiting for gin risks the CPU undercutting.",
      "Do not break a near-meld to chase one card unless the discard proves it.",
      "High deadwood face cards hurt — dump them unless they complete a meld soon."
    ],
    faq: [
      {
        q: "Can I knock with 11 deadwood?",
        a: "No. Deadwood must be 10 or less to knock on SolitaireFelt."
      }
    ],
    related: ["klondike-solitaire", "freecell", "pyramid-solitaire", "backgammon", "chess", "memory-match"]
  },

  "memory-match": {
    metaDesc: "Memory Match — flip cards, find pairs, clear the board in few moves. Free concentration game online.",
    intro: [
      "A concentration grid of face-down cards. Flip two at a time; matching pairs stay revealed. Clear all pairs in as few moves as you can.",
      "Eight pairs on the standard board — pure short-term memory, no timer pressure unless you add your own."
    ],
    rules: [
      "Click a card to flip it face up.",
      "Flip a second card. If they match, both stay up. If not, they flip back.",
      "Remember positions for later turns.",
      "Win when every pair is found."
    ],
    tips: [
      "On your first pass, flip systematically left-to-right to gather information even on misses.",
      "When you see a match candidate, pair it immediately — do not explore elsewhere first.",
      "Cards that appeared once are anchors — revisit them when you see their twin.",
      "Reduce random guessing: if you know two locations, pick between them, do not flip blindly.",
      "Fewer moves mean a cleaner score — treat it like golf."
    ],
    faq: [
      {
        q: "Does the board shuffle each game?",
        a: "Yes. New game randomizes pair positions."
      }
    ],
    related: ["chroma-path", "mahjong-solitaire", "word-search", "hangman", "jigsaw-table", "minesweeper"]
  },

  "chroma-path": {
    metaDesc: "Chroma Path — repeat the growing color sequence (Simon-style). Free memory reflex game online.",
    intro: [
      "Chroma Path is a Simon-style memory game: the board plays a sequence of colored pads; you repeat it in order. Each successful round adds one more step.",
      "One mistake ends the run — listen and watch the pattern before tapping."
    ],
    rules: [
      "Watch the sequence of highlighted colors.",
      "Repeat the sequence by clicking the same pads in the same order.",
      "Each cleared round adds one new step at the end.",
      "A wrong click ends the game."
    ],
    tips: [
      "Say the colors quietly as they play — audio memory helps motor memory.",
      "Chunk long sequences into groups of three or four in your head.",
      "Do not tap early; wait for the full playback each round.",
      "Focus on the new last color — earlier parts you already know.",
      "Short breaks between attempts improve scores more than instant retries."
    ],
    faq: [
      {
        q: "Does speed matter?",
        a: "You repeat after playback finishes — accuracy matters, not milliseconds between taps."
      }
    ],
    related: ["memory-match", "typing-sprint", "slide-fifteen", "gem-cascade", "nonogram-ink", "quad-merge"]
  },

  "slide-fifteen": {
    metaDesc: "15 Puzzle online — slide tiles into order on a 4×4 grid. Classic sliding block puzzle, free.",
    intro: [
      "The classic fifteen puzzle: a four-by-four grid with fifteen numbered tiles and one hole. Click a tile adjacent to the hole to slide it. Restore reading order from 1 through 15.",
      "Shuffle always produces a solvable layout — each shuffle applies legal moves from the solved state."
    ],
    rules: [
      "Only tiles orthogonally adjacent to the empty cell can move.",
      "Click a movable tile to slide it into the hole.",
      "Win when tiles read 1–15 left-to-right, top-to-bottom, with the hole at bottom-right."
    ],
    tips: [
      "Solve the top row first, then the second row, leaving the bottom two rows for last.",
      "Keep the empty cell on the bottom-right when possible while building early rows.",
      "Move 1, then 2, then 3 on the top row using a standard corner-cycling pattern.",
      "Do not undo randomly — plan cycles of three tiles around the hole.",
      "If stuck for minutes, try a different move order — every shuffle here is solvable."
    ],
    faq: [
      {
        q: "Why can’t I solve my board?",
        a: "Every shuffle on SolitaireFelt is built from legal moves, so the board can always be solved. Keep trying or hit Shuffle for a fresh start."
      }
    ],
    related: ["quad-merge", "rush-lanes", "peg-solitaire", "jigsaw-table", "nonogram-ink", "sudoku-easy"]
  },

  "peg-solitaire": {
    metaDesc: "Peg Solitaire — jump pegs, remove jumped pieces, leave one in the center. Free board puzzle online.",
    intro: [
      "English peg solitaire on the cross-shaped board. Jump a peg over an adjacent peg into an empty hole; remove the jumped peg. Goal: finish with a single peg in the center (or as close as you can).",
      "There is no luck — pure sequence planning."
    ],
    rules: [
      "Jump horizontally or vertically over one peg into an empty hole.",
      "Remove the peg that was jumped.",
      "No diagonal jumps.",
      "When no jumps remain, the game ends. One peg left is ideal."
    ],
    tips: [
      "Work from the edges inward — outer pegs are easier to eliminate early.",
      "Avoid isolating pegs with no neighbors to jump over.",
      "Keep the center hole open until late game when possible.",
      "Symmetry helps: mirror moves on left and right when the board allows.",
      "Classic solution books exist for the standard cross — experiment, then retry for fewer remaining pegs."
    ],
    faq: [
      {
        q: "Must the last peg land in the center?",
        a: "Traditional win is one peg in the center hole. Other endings still score how few pegs remain."
      }
    ],
    related: ["slide-fifteen", "rush-lanes", "chess", "mancala", "quad-merge", "nonogram-ink"]
  },

  "gem-cascade": {
    metaDesc: "Gem Cascade — swap gems, match three in a row, chain combos. Free match-3 puzzle online.",
    intro: [
      "Match-three on a gem grid: swap two adjacent gems to form a line of three or more identical gems. Matches clear, gems fall, and new ones fill from above. Combos raise your score.",
      "Look one swap ahead for cascades — a single move can trigger multiple clears."
    ],
    rules: [
      "Swap two neighboring gems (horizontal or vertical adjacency).",
      "Lines of three or more identical gems clear.",
      "Gravity fills empty cells; new gems drop from the top.",
      "Chain reactions count toward score.",
      "Keep playing until no productive swaps remain or you reset."
    ],
    tips: [
      "Prioritize swaps that create two matches at once or set up a falling combo.",
      "Clear gems from the bottom when possible — drops above can chain.",
      "Do not swap randomly — only swaps that make a line of three are valid.",
      "Longer lines of three or more clear more gems at once — hunt L and T shapes when the grid allows.",
      "When stuck, scan the whole board once before swapping — the best move is often peripheral."
    ],
    faq: [
      {
        q: "Is there a move limit?",
        a: "Play until you choose New game or the board stalls — focus on score from combos."
      }
    ],
    related: ["quad-merge", "memory-match", "chroma-path", "jigsaw-table", "nonogram-ink", "star-kiln"]
  },

  "jigsaw-table": {
    metaDesc: "Jigsaw Table — drag generated art pieces into place. Snaps when close. Free jigsaw online.",
    intro: [
      "A small jigsaw built from generated art, not stock photography. Drag pieces onto the board; they snap when near the correct slot. Four-by-four piece grid on the standard table.",
      "Relaxing assembly without downloading a jigsaw app."
    ],
    rules: [
      "Drag pieces from the tray onto the board.",
      "Pieces snap when positioned close to their true location.",
      "Seat all pieces to complete the picture.",
      "New game generates a fresh image and cut."
    ],
    tips: [
      "Place corner and edge pieces first — borders frame the image.",
      "Group pieces with similar color blobs before attaching to the board.",
      "Snap is forgiving — get close and release rather than pixel-perfect dragging.",
      "Rotate is not required on this table — orientation is fixed per piece.",
      "Use the image preview in piece colors: sky vs ground vs accent regions."
    ],
    faq: [
      {
        q: "How many pieces?",
        a: "Sixteen pieces on the default four-by-four jigsaw table."
      }
    ],
    related: ["nonogram-ink", "slide-fifteen", "memory-match", "mahjong-solitaire", "word-search", "gem-cascade"]
  },

  "nonogram-ink": {
    metaDesc: "Nonogram (Picross) online — fill cells from row and column clues. Reveal the picture. Free puzzle.",
    intro: [
      "Nonograms (Picross) give you numbers along each row and column describing runs of filled cells. Mark fills and empties; when correct, a pixel picture appears.",
      "Use the Fill and Mark empty toolbar buttons to set cells solid or blank."
    ],
    rules: [
      "Numbers show consecutive groups of filled cells in that row or column, in order.",
      "Multiple numbers mean multiple groups separated by at least one blank.",
      "Fill cells you know are solid; mark X on cells that must be empty.",
      "Complete the grid to reveal the picture and win."
    ],
    tips: [
      "Start with rows or columns where numbers sum plus required gaps equals the line length — those lines are fully determined.",
      "Mark X aggressively — blank space is as informative as fills.",
      "Overlap technique: if a row clue is 8 on a ten-wide line, the middle six cells must be filled.",
      "Cross-check perpendicular lines; a fill in a row constrains columns crossing it.",
      "If two clues on a short line force placement, do that line before ambiguous long ones."
    ],
    faq: [
      {
        q: "Do I need to guess?",
        a: "Well-formed nonograms should be logic-only. If guessing, recheck sums and overlaps."
      }
    ],
    related: ["minesweeper", "kakuro", "crossword-daily", "jigsaw-table", "sudoku-hard", "daily-kakuro"]
  },

  "rush-lanes": {
    metaDesc: "Rush Lanes — slide blocking cars until the red car reaches the exit. Unblock puzzle online, free.",
    intro: [
      "A sliding-block traffic puzzle: cars sit on lanes and move only forward or backward along their orientation. Get the red car out the exit on the right side of the grid.",
      "Trucks span two cells; cars span one. Nothing turns — only slides."
    ],
    rules: [
      "Click a vehicle to select it, then use the arrow buttons to slide it forward or back along its lane.",
      "Vehicles move only along their row or column orientation.",
      "The red car must reach the exit opening on the right.",
      "Win when the red car exits. New puzzle reshuffles the lot."
    ],
    tips: [
      "Free the red car’s row first — even one blocking car stops the win.",
      "Long trucks block two cells; account for their tail when sliding.",
      "Move vehicles that block the exit lane before fussing with unrelated lanes.",
      "Sometimes you must push a truck away from the exit, not toward it, to open a gap.",
      "Work backward from the exit: what must be clear for the red car to drive straight out?"
    ],
    faq: [
      {
        q: "Can cars turn corners?",
        a: "No. Each vehicle slides only along its lane orientation."
      }
    ],
    related: ["slide-fifteen", "peg-solitaire", "quad-merge", "nonogram-ink", "minesweeper", "gem-cascade"]
  },

  "star-kiln": {
    metaDesc: "Star Kiln — idle clicker. Tap for heat, buy stokers, prestige for multipliers. Free browser idle game.",
    intro: [
      "Star Kiln is a lightweight idle game: click the kiln for heat, spend heat on stokers that generate passively, and prestige to reset progress for a permanent multiplier.",
      "It runs in the tab while you read or play another SolitaireFelt game — progress saves locally."
    ],
    rules: [
      "Click the kiln to earn heat.",
      "Buy upgrades and stokers that add heat per second.",
      "Prestige resets buildings but grants a multiplier to future earnings (available at 5000 heat).",
    ],
    tips: [
      "Buy the cheapest heat-per-second upgrade first until costs outpace gains.",
      "Prestige when the next stoker would take longer to afford than a reset bonus pays back.",
      "Leave the tab open briefly — idle gains accumulate while you play elsewhere on the site.",
      "Click bursts help early; midgame is mostly automation math.",
      "Track multiplier before prestige — resetting too early slows long runs."
    ],
    faq: [
      {
        q: "Does Star Kiln save progress?",
        a: "Yes, on this device via browser local storage — clearing site data resets the kiln."
      }
    ],
    related: ["quad-merge", "gem-cascade", "typing-sprint", "memory-match", "daily-klondike", "penta-daily"]
  }
};
