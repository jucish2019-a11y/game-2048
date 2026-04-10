'use client';

import { useGameStore, useUIStore } from '@/lib/store';
import { RotateCcw, Undo2, Sun, Moon } from 'lucide-react';

export default function GameControls() {
  const reset = useGameStore((state) => state.reset);
  const undo = useGameStore((state) => state.undo);
  const history = useGameStore((state) => state.history);
  const isDarkMode = useUIStore((state) => state.isDarkMode);
  const toggleDarkMode = useUIStore((state) => state.toggleDarkMode);

  return (
    <div className="flex gap-3 mt-6">
      {/* New Game Button */}
      <button
        onClick={reset}
        className="flex-1 bg-game-accent hover:bg-game-accent/90 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        aria-label="Start new game"
      >
        <RotateCcw size={18} />
        New Game
      </button>

      {/* Undo Button */}
      <button
        onClick={undo}
        disabled={history.length === 0}
        className="flex-1 bg-game-accent hover:bg-game-accent/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        aria-label="Undo last move"
      >
        <Undo2 size={18} />
        Undo
      </button>

      {/* Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        className="bg-game-accent hover:bg-game-accent/90 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
        aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </div>
  );
}
