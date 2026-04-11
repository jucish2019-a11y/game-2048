'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useGameStore } from '@/lib/store';
import GameBoard from '@/components/GameBoard';
import ScoreBoard from '@/components/ScoreBoard';
import GameControls from '@/components/GameControls';

// Minimum swipe distance to trigger move (in pixels)
const SWIPE_THRESHOLD = 30;
// Cooldown between moves to prevent accidental double-swipes
const MOVE_COOLDOWN = 100;

export default function GameContainer() {
  const [hasInitialized, setHasInitialized] = useState(false);
  const move = useGameStore((state) => state.move);
  const hasWon = useGameStore((state) => state.hasWon);
  const gameOver = useGameStore((state) => state.gameOver);
  const continueAfterWin = useGameStore((state) => state.continueAfterWin);
  const reset = useGameStore((state) => state.reset);
  const initializeGame = useGameStore((state) => state.initializeGame);
  
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const lastMoveTimeRef = useRef<number>(0);
  const boardRef = useRef<HTMLDivElement>(null);

  // Initialize game once
  useEffect(() => {
    if (!hasInitialized) {
      setHasInitialized(true);
      initializeGame();
    }
  }, [hasInitialized, initializeGame]);

  // Handle touch start
  const handleTouchStart = useCallback((e: TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  // Handle touch end
  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (!touchStartRef.current) return;

    // Check cooldown
    const now = Date.now();
    if (now - lastMoveTimeRef.current < MOVE_COOLDOWN) {
      touchStartRef.current = null;
      return;
    }

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);
    const distance = Math.sqrt(absX * absX + absY * absY);

    // Reset touch start
    touchStartRef.current = null;

    // Check if swipe is long enough
    if (distance < SWIPE_THRESHOLD) return;

    // Determine direction based on dominant axis
    if (absX > absY) {
      move(deltaX > 0 ? 'right' : 'left');
    } else {
      move(deltaY > 0 ? 'down' : 'up');
    }

    // Update last move time
    lastMoveTimeRef.current = now;
  }, [move]);

  // Attach touch event listeners
  useEffect(() => {
    const board = boardRef.current;
    if (!board) return;

    // Add passive listeners for better performance
    board.addEventListener('touchstart', handleTouchStart, { passive: true });
    board.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      board.removeEventListener('touchstart', handleTouchStart);
      board.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchEnd]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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
  }, [move, reset]);

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

      {/* Game Board with touch detection */}
      <div 
        ref={boardRef}
        className="touch-none select-none"
        style={{ touchAction: 'none', WebkitTouchCallout: 'none' }}
      >
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
