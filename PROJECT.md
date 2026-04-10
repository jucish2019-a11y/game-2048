# Game 2048 - Project Documentation

## 🎯 Project Overview

**Name:** Game 2048  
**Type:** Browser-based puzzle game  
**Purpose:** A polished 2048 clone built as a GitHub Pages project with smooth animations, score tracking, and mobile-friendly controls.  
**Status:** In Development (v0.1.0)  
**Created:** April 10, 2026

---

## 📋 Feature Specification

### Core Features
- [x] Classic 4x4 grid gameplay
- [x] Tile merging logic (2+2=4, 4+4=8, etc.)
- [x] Arrow key controls (desktop)
- [x] Swipe gesture controls (mobile)
- [x] Score tracking (current game)
- [x] Best score persistence (localStorage)
- [x] Win detection (reaching 2048 tile)
- [x] Game over detection (no moves available)
- [x] New game / reset functionality
- [x] Undo last move
- [x] Smooth slide and merge animations
- [x] Dark mode support
- [x] Responsive design (mobile-first)

### Nice-to-Have (Future)
- [ ] Game history / stats page
- [ ] Custom grid sizes (3x3, 5x5, 6x6)
- [ ] Sound effects
- [ ] Leaderboard (client-side only)
- [ ] Theme customization

---

## 🏗️ Architecture

### Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | ^14.2.0 |
| UI Library | React | ^18.3.0 |
| Language | TypeScript | ^5.3.0 |
| Styling | Tailwind CSS | ^3.4.0 |
| State Management | Zustand | ^4.5.0 |
| Touch Gestures | @use-gesture/react | ^10.3.0 |
| Icons | lucide-react | ^0.400.0 |

### Project Structure

```
game-2048/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout with font + dark mode
│   │   ├── page.tsx             # Main game page
│   │   └── globals.css          # Global styles, Tailwind, animations
│   ├── components/
│   │   ├── GameBoard.tsx        # 4x4 grid container
│   │   ├── Tile.tsx             # Individual tile with animations
│   │   ├── ScoreBoard.tsx       # Current score + best score display
│   │   └── GameControls.tsx     # New game, undo buttons
│   ├── lib/
│   │   ├── gameLogic.ts         # Core game logic (moves, merges, checks)
│   │   └── store.ts             # Zustand store for game state
│   └── types/
│       └── index.ts             # TypeScript interfaces
├── public/
│   ├── favicon.ico
│   └── og-image.png             # Social sharing image
├── PROJECT.md                   # This file
├── README.md                    # Public-facing documentation
├── package.json
├── next.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🎮 Game Logic

### Core Mechanics

1. **Grid:** 4x4 matrix, starts with 2 random tiles (value 2 or 4)
2. **Movement:** All tiles slide in chosen direction (up/down/left/right)
3. **Merging:** Adjacent tiles of same value merge into one (doubled value)
4. **Spawn:** New tile (2 or 4) appears after each valid move
5. **Win:** Create a 2048 tile
6. **Lose:** No valid moves remaining

### Tile Values & Colors

| Tile Value | Background Color | Text Color | Font Weight |
|-----------|-----------------|------------|-------------|
| 2 | #eee4da | #776e65 | Bold |
| 4 | #ede0c8 | #776e65 | Bold |
| 8 | #f2b179 | #f9f6f2 | Bold |
| 16 | #f59563 | #f9f6f2 | Bold |
| 32 | #f67c5f | #f9f6f2 | Bold |
| 64 | #f65e3b | #f9f6f2 | Bold |
| 128 | #edcf72 | #f9f6f2 | Bold |
| 256 | #edcc61 | #f9f6f2 | Bold |
| 512 | #edc850 | #f9f6f2 | Bold |
| 1024 | #edc53f | #f9f6f2 | Bold |
| 2048 | #edc22e | #f9f6f2 | Bold |
| 4096+ | #3c3a32 | #f9f6f2 | Bold |

---

## 📊 State Management

### Zustand Store Shape

```typescript
interface GameState {
  // Core state
  grid: number[][];              // 4x4 matrix
  score: number;                 // Current game score
  bestScore: number;             // Best score (persisted)
  hasWon: boolean;               // Reached 2048
  gameOver: boolean;             // No moves available
  
  // History (for undo)
  history: { grid: number[][]; score: number }[];
  
  // Actions
  move: (direction: Direction) => void;
  undo: () => void;
  reset: () => void;
  updateBestScore: () => void;
}
```

---

## 🎨 Design System

### Color Palette

| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| `--bg-primary` | #faf8ef | #1a1a2e | Main background |
| `--bg-secondary` | #bbada0 | #16213e | Game board background |
| `--bg-cell` | #cdc1b4 | #0f3460 | Empty cell background |
| `--text-primary` | #776e65 | #eaeaea | Primary text |
| `--text-secondary` | #f9f6f2 | #f9f6f2 | Tile text (high values) |
| `--accent` | #8f7a66 | #e94560 | Buttons, highlights |

### Typography

- **Font Family:** `Inter` (Google Fonts), fallback to system sans-serif
- **Score Display:** Large, monospace-style numbers
- **Tile Values:** Bold, centered, responsive size

### Spacing Scale

- Grid gap: `0.5rem` (8px)
- Cell padding: `0.25rem` (4px)
- Component margins: `1rem`, `1.5rem`, `2rem`

---

## 🎬 Animation System

| Animation | Duration | Easing | Trigger |
|-----------|----------|--------|---------|
| Tile slide | 100ms | ease-out | Direction move |
| Tile merge | 150ms | ease-in-out | Same value collision |
| New tile appear | 200ms | ease-out (scale 0→1) | After move |
| Score update | 300ms | ease-in-out (pulse) | Points earned |
| Game over overlay | 400ms | ease-in-out (fade) | No moves left |
| Win celebration | 500ms | ease-out (confetti) | 2048 reached |

---

## ⌨️ Controls

### Desktop
- **Arrow Keys:** Move tiles
- **Ctrl+Z / Cmd+Z:** Undo last move
- **R:** New game
- **D:** Toggle dark mode

### Mobile
- **Swipe Up/Down/Left/Right:** Move tiles
- **Tap Button:** New game, undo

---

## 🔐 Data Persistence

| Key | Storage | Purpose |
|-----|---------|---------|
| `game-2048-best-score` | localStorage | Persist best score across sessions |
| `game-2048-dark-mode` | localStorage | Remember dark mode preference |

---

## 📱 Responsive Breakpoints

| Breakpoint | Width | Layout Adjustments |
|-----------|-------|-------------------|
| Mobile | <640px | Full-width grid, smaller tiles |
| Tablet | 640px-1024px | Centered grid, medium tiles |
| Desktop | >1024px | Centered grid, large tiles |

---

## 🧪 Testing Strategy

### Manual Testing Checklist
- [ ] All arrow key moves work correctly
- [ ] Tiles merge properly (2+2=4, not 2+2+2=8)
- [ ] New tile spawns after valid move
- [ ] Score updates correctly
- [ ] Best score persists after refresh
- [ ] Undo restores previous state
- [ ] Game over detects when no moves available
- [ ] Win triggers when 2048 tile created
- [ ] Dark mode toggles and persists
- [ ] Mobile swipe gestures work
- [ ] Responsive layout at all breakpoints

---

## 🚀 Deployment

### GitHub Pages Setup
1. Build: `npm run build`
2. Output: `out/` directory (static export)
3. Deploy to `gh-pages` branch
4. Custom domain (optional): `yourusername.github.io/game-2048`

### Build Commands
```bash
# Development
npm run dev              # Start dev server

# Production
npm run build            # Build static site
npm run start            # Preview production build

# Linting
npm run lint             # Run ESLint
```

---

## 📝 Development Guidelines

### Code Style
- Strict TypeScript (no `any`)
- Functional components with hooks
- Zustand for all state management
- Tailwind utility classes (avoid inline styles)
- Semantic HTML with ARIA attributes

### Git Workflow
- Feature branches: `feature/xxx`
- Conventional commits: `feat:`, `fix:`, `chore:`, `docs:`
- Main branch: `main`
- Deploy branch: `gh-pages`

---

## 🎯 Future Enhancements (Roadmap)

### Phase 2 (v0.2.0)
- Game statistics page (moves made, max tile, time played)
- Custom grid sizes (3x3, 5x5, 6x6)
- Theme selector (classic, neon, pastel)

### Phase 3 (v0.3.0)
- Sound effects (merge, win, game over)
- Haptic feedback (mobile)
- Accessibility improvements (screen reader support)

### Phase 4 (v0.4.0)
- PWA support (installable, offline)
- Local leaderboard
- Share score as image

---

## 🤝 Credits

- **Original Game:** 2048 by Gabriele Cirulli
- **Built With:** Next.js, React, TypeScript, Tailwind CSS, Zustand
- **Developer:** [Your Name]

---

## 📄 License

MIT License - See LICENSE file for details

---

**Last Updated:** April 10, 2026
