import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import DarkModeSync from '@/components/DarkModeSync';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '2048 Game - Join the Tiles!',
  description: 'A polished implementation of the classic 2048 puzzle game. Swipe or use arrow keys to merge tiles and reach 2048!',
  keywords: ['2048', 'puzzle', 'game', 'browser game', 'next.js'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <DarkModeSync />
        {children}
      </body>
    </html>
  );
}
