'use client';

import dynamic from 'next/dynamic';

// Dynamically import GameContainer with no SSR to prevent any hydration issues
const GameContainer = dynamic(() => import('@/components/GameContainer'), {
  ssr: false,
  loading: () => (
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
  ),
});

export default function Home() {
  return (
    <main className="min-h-screen py-12">
      <GameContainer />
    </main>
  );
}
