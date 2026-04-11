'use client';

import { useEffect } from 'react';
import { useUIStore } from '@/lib/store';

export default function DarkModeSync() {
  const isDarkMode = useUIStore((state) => state.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return null;
}
