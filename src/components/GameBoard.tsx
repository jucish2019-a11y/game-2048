'use client';

import { memo } from 'react';
import { useGameStore } from '@/lib/store';
import Tile from './Tile';

function GameBoardInner() {
  const grid = useGameStore((state) => state.grid);

  return (
    <div
      className="bg-game-bg rounded-lg p-2 w-full max-w-md mx-auto aspect-square"
      role="grid"
      aria-label="2048 game board"
    >
      <div className="grid grid-cols-4 grid-rows-4 gap-2 h-full">
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
