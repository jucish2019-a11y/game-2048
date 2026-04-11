import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Tile colors
        'tile-2': '#eee4da',
        'tile-4': '#ede0c8',
        'tile-8': '#f2b179',
        'tile-16': '#f59563',
        'tile-32': '#f67c5f',
        'tile-64': '#f65e3b',
        'tile-128': '#edcf72',
        'tile-256': '#edcc61',
        'tile-512': '#edc850',
        'tile-1024': '#edc53f',
        'tile-2048': '#edc22e',
        'tile-super': '#3c3a32',
        
        // UI colors
        'game-bg': '#bbada0',
        'cell-bg': '#cdc1b4',
        'game-text': '#776e65',
        'game-accent': '#8f7a66',
      },
      animation: {
        'tile-appear': 'appear 200ms ease-out',
        'tile-merge': 'merge 150ms ease-in-out',
        'score-pulse': 'pulse 300ms ease-in-out',
      },
      keyframes: {
        appear: {
          '0%': { opacity: '0', transform: 'scale(0)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        merge: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.15)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
