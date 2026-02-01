'use client';

import { createContext, useLayoutEffect, useState } from 'react';

export const ThemeContext = createContext(null);

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');

  useLayoutEffect(() => {
    // Initialize theme based on document class
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');

    // Mark theme as ready to prevent FOUC
    document.documentElement.classList.add('theme-ready');
  }, []);

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';

      document.documentElement.classList.toggle('dark', next === 'dark');

      document.cookie = `theme=${next}; path=/; max-age=31536000`; // 1 year

      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
