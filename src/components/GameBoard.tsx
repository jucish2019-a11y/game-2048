'use client';

import { memo } from 'react';
import { useGameStore } from '@/lib/store';
import Tile from './Tile';

interface GameBoardProps {
  dragOffset: { x: number; y: number };
}

function GameBoardInner({ dragOffset }: GameBoardProps) {
  const grid = useGameStore((state) => state.grid);
  const hasNonZeroTiles = grid.some(row => row.some(cell => cell !== 0));
  
  // Calculate opacity based on drag distance (max at 100px)
  const dragDistance = Math.sqrt(dragOffset.x ** 2 + dragOffset.y ** 2);
  const followFactor = Math.min(dragDistance / 100, 1);

  return (
    <div
      className="bg-game-bg rounded-lg p-2 w-full max-w-md mx-auto aspect-square relative overflow-hidden"
      role="grid"
      aria-label="2048 game board"
    >
      {/* Grid background */}
      <div className="absolute inset-2 grid grid-cols-4 grid-rows-4 gap-2">
        {Array(16).fill(null).map((_, i) => (
          <div key={i} className="bg-cell-bg rounded-md" />
        ))}
      </div>

      {/* Tiles container with drag transform */}
      <div
        className="absolute inset-2 grid grid-cols-4 grid-rows-4 gap-2 transition-transform duration-150 ease-out"
        style={{
          transform: hasNonZeroTiles ? `translate(${dragOffset.x * 0.3}px, ${dragOffset.y * 0.3}px)` : undefined,
          opacity: 1 - followFactor * 0.15,
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((cellValue, colIndex) => (
            <Tile
              key={`${rowIndex}-${colIndex}-${cellValue}`}
              value={cellValue}
              isNew={cellValue !== 0}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default memo(GameBoardInner);
