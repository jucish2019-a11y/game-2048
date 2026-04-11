'use client';

import { useEffect, useState } from 'react';
import { useGameStore } from '@/lib/store';
import { useDrag } from '@use-gesture/react';
import GameBoard from '@/components/GameBoard';
import ScoreBoard from '@/components/ScoreBoard';
import GameControls from '@/components/GameControls';

// Minimum swipe distance to trigger move
const SWIPE_THRESHOLD = 30;

export default function GameContainer() {
  const [isMounted, setIsMounted] = useState(false);

  // ALL HOOKS MUST BE AT THE TOP - before any conditional returns
  const move = useGameStore((state) => state.move);
  const hasWon = useGameStore((state) => state.hasWon);
  const gameOver = useGameStore((state) => state.gameOver);
  const continueAfterWin = useGameStore((state) => state.continueAfterWin);
  const reset = useGameStore((state) => state.reset);
  const initializeGame = useGameStore((state) => state.initializeGame);

  // Initialize game on client mount
  useEffect(() => {
    setIsMounted(true);
    initializeGame();
  }, [initializeGame]);

  // Keyboard controls
  useEffect(() => {
    if (!isMounted) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default for arrow keys to avoid page scrolling
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }

      switch (e.key) {
        case 'ArrowUp':
          move('up');
          break;
        case 'ArrowDown':
          move('down');
          break;
        case 'ArrowLeft':
          move('left');
          break;
        case 'ArrowRight':
          move('right');
          break;
        case 'r':
        case 'R':
          if (!e.ctrlKey && !e.metaKey) {
            reset();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [move, reset, isMounted]);

  // Swipe gesture controls
  const bind = useDrag(({ offset: [dx, dy] }) => {
    if (!isMounted) return;

    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
    const distance = Math.sqrt(absDx * absDx + absDy * absDy);

    if (distance < SWIPE_THRESHOLD) return;

    if (absDx > absDy) {
      // Horizontal swipe
      move(dx > 0 ? 'right' : 'left');
    } else {
      // Vertical swipe
      move(dy > 0 ? 'down' : 'up');
    }
  });

  // Show loading skeleton until client is mounted
  if (!isMounted) {
    return (
      <div className="w-full max-w-lg mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-5xl font-bold text-game-text mb-2">2048</h1>
          <p className="text-game-text/70 text-sm">
            Join the tiles, get to <strong>2048!</strong>
          </p>
        </div>
        <div className="flex gap-4 mb-6">
          <div className="flex-1 bg-game-bg rounded-lg p-4 text-center">
            <div className="text-xs uppercase tracking-wide text-gray-400 font-semibold mb-1">Score</div>
            <div className="text-3xl font-bold text-white">0</div>
          </div>
          <div className="flex-1 bg-game-bg rounded-lg p-4 text-center">
            <div className="text-xs uppercase tracking-wide text-gray-400 font-semibold mb-1">Best</div>
            <div className="text-3xl font-bold text-white">0</div>
          </div>
        </div>
        <div className="bg-game-bg rounded-lg p-2 w-full max-w-md mx-auto aspect-square">
          <div className="grid grid-cols-4 grid-rows-4 gap-2 h-full">
            {Array(16).fill(null).map((_, i) => (
              <div key={i} className="bg-cell-bg rounded-md" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Full game UI
  return (
    <div className="w-full max-w-lg mx-auto px-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-5xl font-bold text-game-text mb-2">2048</h1>
        <p className="text-game-text/70 text-sm">
          Join the tiles, get to <strong>2048!</strong>
        </p>
      </div>

      {/* Score */}
      <ScoreBoard />

      {/* Game Board with swipe detection */}
      <div {...bind()} className="touch-none">
        <GameBoard />
      </div>

      {/* Controls */}
      <GameControls />

      {/* Game Over Overlay */}
      {gameOver && (
        <div className="mt-6 bg-red-500/10 border-2 border-red-500 rounded-lg p-6 text-center animate-tile-appear">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Game Over!</h2>
          <p className="text-game-text mb-4">No more moves available</p>
          <button
            onClick={reset}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Win Overlay */}
      {hasWon && !gameOver && (
        <div className="mt-6 bg-green-500/10 border-2 border-green-500 rounded-lg p-6 text-center animate-tile-appear">
          <h2 className="text-2xl font-bold text-green-600 mb-2">🎉 You Win!</h2>
          <p className="text-game-text mb-4">You reached 2048!</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={continueAfterWin}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              Keep Playing
            </button>
            <button
              onClick={reset}
              className="bg-game-accent hover:bg-game-accent/90 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              New Game
            </button>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-8 text-center text-game-text/60 text-sm">
        <p className="mb-2">
          <strong>HOW TO PLAY:</strong> Use arrow keys or swipe to move tiles.
        </p>
        <p>
          When two tiles with the same number touch, they merge into one!
        </p>
      </div>
    </div>
  );
}
