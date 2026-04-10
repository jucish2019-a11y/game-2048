// Direction type for tile movement
export type Direction = 'up' | 'down' | 'left' | 'right';

// Game state interface
export interface GameState {
  grid: number[][];
  score: number;
  bestScore: number;
  hasWon: boolean;
  gameOver: boolean;
  history: GameHistoryEntry[];
}

// History entry for undo functionality
export interface GameHistoryEntry {
  grid: number[][];
  score: number;
}

// Tile position and value for rendering
export interface TileData {
  value: number;
  row: number;
  col: number;
  id: number; // Unique ID for animation tracking
  mergedFrom?: [number, number]; // Positions this tile merged from
  isNew?: boolean; // Flag for appear animation
}

// Color mapping for tile values
export const TILE_COLORS: Record<number, { bg: string; text: string }> = {
  2: { bg: 'bg-tile-2', text: 'text-game-text' },
  4: { bg: 'bg-tile-4', text: 'text-game-text' },
  8: { bg: 'bg-tile-8', text: 'text-white' },
  16: { bg: 'bg-tile-16', text: 'text-white' },
  32: { bg: 'bg-tile-32', text: 'text-white' },
  64: { bg: 'bg-tile-64', text: 'text-white' },
  128: { bg: 'bg-tile-128', text: 'text-white' },
  256: { bg: 'bg-tile-256', text: 'text-white' },
  512: { bg: 'bg-tile-512', text: 'text-white' },
  1024: { bg: 'bg-tile-1024', text: 'text-white' },
  2048: { bg: 'bg-tile-2048', text: 'text-white' },
};

// Get color classes for a tile value
export function getTileColorClasses(value: number): { bg: string; text: string } {
  return TILE_COLORS[value] || { bg: 'bg-tile-super', text: 'text-white' };
}

// Get font size based on tile value (for rendering 2-digit vs 4-digit numbers)
export function getTileFontSize(value: number): string {
  if (value >= 1000) return 'text-xl';
  if (value >= 100) return 'text-2xl';
  return 'text-3xl';
}
