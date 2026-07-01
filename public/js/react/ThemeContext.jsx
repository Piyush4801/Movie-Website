import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // Detect system preference or saved preference
    const saved = localStorage.getItem('cinestream_theme');
    if (saved) {
      setTheme(saved);
    } else {
      const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
      setTheme(prefersLight ? 'light' : 'dark');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cinestream_theme', theme);
    const root = document.documentElement;

    if (theme === 'light') {
      root.style.setProperty('--bg', '#f5f7fa');
      root.style.setProperty('--surface', '#ffffff');
      root.style.setProperty('--surface-hover', '#e2e8f0');
      root.style.setProperty('--text', '#1a202c');
      root.style.setProperty('--muted', '#718096');
      root.style.setProperty('--border', 'rgba(0, 0, 0, 0.1)');
      // Use Blue accent for light mode
      root.style.setProperty('--accent', '#007bff');
      root.style.setProperty('--accent-glow', 'rgba(0, 123, 255, 0.3)');
      document.body.classList.add('light-mode');
    } else {
      // Revert to original dark cinematic colors
      root.style.setProperty('--bg', '#0a0a0f');
      root.style.setProperty('--surface', 'rgba(255, 255, 255, 0.03)');
      root.style.setProperty('--surface-hover', 'rgba(255, 255, 255, 0.08)');
      root.style.setProperty('--text', '#ffffff');
      root.style.setProperty('--muted', '#888899');
      root.style.setProperty('--border', 'rgba(255, 255, 255, 0.1)');
      // Orange accent for dark mode (as requested)
      root.style.setProperty('--accent', '#ff5a00');
      root.style.setProperty('--accent-glow', 'rgba(255, 90, 0, 0.3)');
      document.body.classList.remove('light-mode');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
