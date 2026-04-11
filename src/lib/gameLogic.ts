import { Direction } from '@/types';

/**
 * Core 2048 game logic functions
 */

// Create empty 4x4 grid
export function createEmptyGrid(): number[][] {
  return Array(4).fill(null).map(() => Array(4).fill(0));
}

// Get all empty positions
export function getEmptyPositions(grid: number[][]): [number, number][] {
  const positions: [number, number][] = [];
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (grid[row][col] === 0) {
        positions.push([row, col]);
      }
    }
  }
  return positions;
}

// Spawn a new tile (2 or 4) at random empty position
export function spawnTile(grid: number[][]): { grid: number[][]; row: number; col: number } | null {
  const emptyPositions = getEmptyPositions(grid);
  if (emptyPositions.length === 0) return null;

  const [row, col] = emptyPositions[Math.floor(Math.random() * emptyPositions.length)];
  const value = Math.random() < 0.9 ? 2 : 4; // 90% chance of 2, 10% chance of 4

  const newGrid = grid.map(r => [...r]);
  newGrid[row][col] = value;

  return { grid: newGrid, row, col };
}

// Check if grid has any moves available
export function hasAvailableMoves(grid: number[][]): boolean {
  // Check for empty cells
  if (getEmptyPositions(grid).length > 0) return true;

  // Check for possible merges
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      const current = grid[row][col];
      // Check right neighbor
      if (col < 3 && grid[row][col + 1] === current) return true;
      // Check bottom neighbor
      if (row < 3 && grid[row + 1][col] === current) return true;
    }
  }

  return false;
}

// Check if grid contains 2048
export function hasWon(grid: number[][]): boolean {
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (grid[row][col] === 2048) return true;
    }
  }
  return false;
}

// Deep clone grid
function cloneGrid(grid: number[][]): number[][] {
  return grid.map(row => [...row]);
}

// Slide a single row to the left (core merge logic)
function slideRow(row: number[]): { newRow: number[]; scoreGained: number } {
  // Remove zeros
  let filtered = row.filter(val => val !== 0);
  let scoreGained = 0;

  // Merge adjacent equal values
  for (let i = 0; i < filtered.length - 1; i++) {
    if (filtered[i] === filtered[i + 1]) {
      filtered[i] *= 2;
      scoreGained += filtered[i];
      filtered[i + 1] = 0;
    }
  }

  // Remove zeros created by merging
  filtered = filtered.filter(val => val !== 0);

  // Pad with zeros
  while (filtered.length < 4) {
    filtered.push(0);
  }

  return { newRow: filtered, scoreGained };
}

// Move tiles in a direction and return new grid + score
export function move(grid: number[][], direction: Direction): { grid: number[][]; score: number; moved: boolean } {
  const oldGrid = cloneGrid(grid);
  let totalScore = 0;

  let result: number[][];

  switch (direction) {
    case 'left':
      result = cloneGrid(grid);
      for (let row = 0; row < 4; row++) {
        const { newRow, scoreGained } = slideRow(result[row]);
        result[row] = newRow;
        totalScore += scoreGained;
      }
      break;

    case 'right':
      result = cloneGrid(grid);
      for (let row = 0; row < 4; row++) {
        const { newRow, scoreGained } = slideRow(result[row].reverse());
        result[row] = newRow.reverse();
        totalScore += scoreGained;
      }
      break;

    case 'up':
      result = cloneGrid(grid);
      for (let col = 0; col < 4; col++) {
        const column = [result[0][col], result[1][col], result[2][col], result[3][col]];
        const { newRow, scoreGained } = slideRow(column);
        for (let row = 0; row < 4; row++) {
          result[row][col] = newRow[row];
        }
        totalScore += scoreGained;
      }
      break;

    case 'down':
      result = cloneGrid(grid);
      for (let col = 0; col < 4; col++) {
        const column = [result[0][col], result[1][col], result[2][col], result[3][col]].reverse();
        const { newRow, scoreGained } = slideRow(column);
        const reversed = newRow.reverse();
        for (let row = 0; row < 4; row++) {
          result[row][col] = reversed[row];
        }
        totalScore += scoreGained;
      }
      break;
  }

  // Check if grid actually changed (efficient array comparison)
  const moved = oldGrid.some((row, i) => row.some((val, j) => val !== result[i][j]));

  return { grid: result, score: totalScore, moved };
}

// Initialize new game
export function initGame(): { grid: number[][]; score: number } {
  let grid = createEmptyGrid();

  // Spawn two initial tiles
  const spawn1 = spawnTile(grid);
  if (!spawn1) throw new Error('Failed to spawn initial tile');
  grid = spawn1.grid;
  
  const spawn2 = spawnTile(grid);
  if (!spawn2) throw new Error('Failed to spawn second tile');
  grid = spawn2.grid;

  return { grid, score: 0 };
}
