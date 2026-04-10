import { create } from 'zustand';
import { GameState, Direction, GameHistoryEntry } from '@/types';
import { move, initGame, hasWon, hasAvailableMoves } from '@/lib/gameLogic';

const STORAGE_KEY_BEST_SCORE = 'game-2048-best-score';
const STORAGE_KEY_DARK_MODE = 'game-2048-dark-mode';

interface GameStore extends GameState {
  // Actions
  move: (direction: Direction) => void;
  undo: () => void;
  reset: () => void;
  continueAfterWin: () => void;
}

// Load best score from localStorage
function loadBestScore(): number {
  if (typeof window === 'undefined') return 0;
  const stored = localStorage.getItem(STORAGE_KEY_BEST_SCORE);
  return stored ? parseInt(stored, 10) : 0;
}

// Save best score to localStorage
function saveBestScore(score: number) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_BEST_SCORE, score.toString());
}

// Initialize game
const initialGame = initGame();

export const useGameStore = create<GameStore>((set, get) => ({
  // Initial state
  grid: initialGame.grid,
  score: initialGame.score,
  bestScore: loadBestScore(),
  hasWon: false,
  gameOver: false,
  history: [],

  // Move tiles in direction
  move: (direction: Direction) => {
    const state = get();
    if (state.gameOver) return;

    const { grid, score, moved } = move(state.grid, direction);

    if (!moved) return; // No movement happened

    // Save history for undo
    const newHistory: GameHistoryEntry[] = [
      ...state.history,
      { grid: state.grid, score: state.score },
    ].slice(-20); // Keep last 20 moves

    // Check win
    const newHasWon = hasWon(grid) && !state.hasWon;

    // Check game over
    const newGameOver = !hasAvailableMoves(grid);

    // Update best score
    const newScore = state.score + score;
    const newBestScore = Math.max(state.bestScore, newScore);
    if (newBestScore > state.bestScore) {
      saveBestScore(newBestScore);
    }

    set({
      grid,
      score: newScore,
      bestScore: newBestScore,
      hasWon: newHasWon || state.hasWon,
      gameOver: newGameOver,
      history: newHistory,
    });
  },

  // Undo last move
  undo: () => {
    const state = get();
    if (state.history.length === 0) return;

    const lastState = state.history[state.history.length - 1];
    set({
      grid: lastState.grid,
      score: lastState.score,
      history: state.history.slice(0, -1),
      gameOver: false,
    });
  },

  // Reset game
  reset: () => {
    const newGame = initGame();
    set({
      grid: newGame.grid,
      score: newGame.score,
      hasWon: false,
      gameOver: false,
      history: [],
    });
  },

  // Continue playing after reaching 2048
  continueAfterWin: () => {
    set({ hasWon: false });
  },
}));

// Dark mode store (separate to avoid re-renders)
interface UIStore {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

function loadDarkModePreference(): boolean {
  if (typeof window === 'undefined') return false;
  const stored = localStorage.getItem(STORAGE_KEY_DARK_MODE);
  if (stored !== null) return stored === 'true';
  // Default to dark mode
  return true;
}

export const useUIStore = create<UIStore>((set) => ({
  isDarkMode: loadDarkModePreference(),
  toggleDarkMode: () => {
    set((state) => {
      const newMode = !state.isDarkMode;
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY_DARK_MODE, newMode.toString());
      }
      return { isDarkMode: newMode };
    });
  },
}));
