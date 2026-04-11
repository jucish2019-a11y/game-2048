'use client';

import { memo } from 'react';
import { useGameStore } from '@/lib/store';

function ScoreBoard() {
  const score = useGameStore((state) => state.score);
  const bestScore = useGameStore((state) => state.bestScore);

  return (
    <div className="flex gap-4 mb-6">
      {/* Current Score */}
      <div className="relative flex-1 bg-game-bg rounded-lg p-4 text-center">
        <div className="text-xs uppercase tracking-wide text-gray-400 font-semibold mb-1">
          Score
        </div>
        <div className="text-3xl font-bold text-white tabular-nums" aria-live="polite" aria-atomic="true">
          {score.toLocaleString()}
        </div>
      </div>

      {/* Best Score */}
      <div className="relative flex-1 bg-game-bg rounded-lg p-4 text-center">
        <div className="text-xs uppercase tracking-wide text-gray-400 font-semibold mb-1">
          Best
        </div>
        <div className="text-3xl font-bold text-white tabular-nums" aria-live="polite" aria-atomic="true">
          {bestScore.toLocaleString()}
        </div>
      </div>
    </div>
  );
}

export default memo(ScoreBoard);
