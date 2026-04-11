'use client';

import { memo } from 'react';
import { getTileColorClasses, getTileFontSize } from '@/types';

interface TileProps {
  value: number;
  isNew?: boolean;
  isMerged?: boolean;
}

function Tile({ value, isNew, isMerged }: TileProps) {
  if (value === 0) {
    // Empty cell
    return (
      <div className="bg-cell-bg rounded-md" />
    );
  }

  const { bg, text } = getTileColorClasses(value);
  const fontSize = getTileFontSize(value);

  return (
    <div
      className={`
        ${bg} ${text} ${fontSize}
        rounded-md flex items-center justify-center
        font-bold select-none
        ${isNew ? 'animate-tile-appear' : ''}
        ${isMerged ? 'animate-tile-merge' : ''}
        transition-transform duration-100
      `}
    >
      {value}
    </div>
  );
}

export default memo(Tile);
