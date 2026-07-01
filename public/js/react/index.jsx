import React from 'react';
import { createRoot } from 'react-dom/client';
import MoodScanner from './MoodScanner.jsx';
import VoiceSearch from './VoiceSearch.jsx';
import CinemaMode from './CinemaMode.jsx';
import { ThemeProvider } from './ThemeContext.jsx';
import NavbarThemeToggle from './NavbarThemeToggle.jsx';
import ButtonManager from './ButtonManager.jsx';
import Router from './Router.jsx';

// Wait for DOM to load fully so the root element is available
document.addEventListener('DOMContentLoaded', () => {
  // Mount Mood Scanner in Hero
  const moodRoot = document.getElementById('mood-scanner-root');
  if (moodRoot) {
    const root = createRoot(moodRoot);
    root.render(<MoodScanner />);
  }

  // Mount Voice Search in Topbar
  const voiceRoot = document.getElementById('voice-search-root');
  if (voiceRoot) {
    const root2 = createRoot(voiceRoot);
    root2.render(<VoiceSearch />);
  }

  // Mount Theme Toggle in Topbar
  const themeRoot = document.getElementById('theme-toggle-root');
  if (themeRoot) {
    const root3 = createRoot(themeRoot);
    root3.render(
      <ThemeProvider>
        <NavbarThemeToggle />
      </ThemeProvider>
    );
  }

  // Mount Cinema Mode manager globally (it handles its own portals)
  const cinemaRoot = document.createElement('div');
  document.body.appendChild(cinemaRoot);
  createRoot(cinemaRoot).render(<CinemaMode />);

  // Mount Button Manager globally (it handles its own portals for action buttons)
  const buttonsRoot = document.createElement('div');
  document.body.appendChild(buttonsRoot);
  createRoot(buttonsRoot).render(<ButtonManager />);

  // Mount Router
  const routerRoot = document.getElementById('react-router-root');
  if (routerRoot) {
    createRoot(routerRoot).render(<Router />);
  }
});
