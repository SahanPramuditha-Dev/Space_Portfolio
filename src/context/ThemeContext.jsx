import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

const colors = {
  sky: { accent: '#38bdf8', glow: '#0ea5e9', lightAccent: '#0284c7' },
  purple: { accent: '#a855f7', glow: '#d8b4fe', lightAccent: '#9333ea' },
  green: { accent: '#22c55e', glow: '#4ade80', lightAccent: '#16a34a' },
  orange: { accent: '#f97316', glow: '#fb923c', lightAccent: '#ea580c' },
  pink: { accent: '#ec4899', glow: '#f472b6', lightAccent: '#db2777' },
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [accentColor, setAccentColor] = useState(() => {
    return localStorage.getItem('accentColor') || 'sky';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const root = window.document.documentElement;
    const selectedColor = colors[accentColor];

    if (theme === 'dark') {
      root.style.setProperty('--color-accent', selectedColor.accent);
      root.style.setProperty('--color-accent-glow', selectedColor.glow);
    } else {
      root.style.setProperty('--color-accent', selectedColor.lightAccent);
      root.style.setProperty('--color-accent-glow', selectedColor.accent);
    }
    
    localStorage.setItem('accentColor', accentColor);
  }, [accentColor, theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const changeAccentColor = (color) => {
    setAccentColor(color);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, accentColor, changeAccentColor, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
