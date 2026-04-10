import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '2048 Game - Join the Tiles!',
  description: 'A polished implementation of the classic 2048 puzzle game. Swipe or use arrow keys to merge tiles and reach 2048!',
  keywords: ['2048', 'puzzle', 'game', 'browser game', 'next.js'],
  authors: [{ name: 'Your Name' }],
  openGraph: {
    title: '2048 Game - Join the Tiles!',
    description: 'A polished implementation of the classic 2048 puzzle game.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
