import React, { useState, useEffect } from 'react';
import FavoritesPage from './Pages/FavoritesPage.jsx';
import WatchLaterPage from './Pages/WatchLaterPage.jsx';
import TrendingPage from './Pages/TrendingPage.jsx';
import TopRatedPage from './Pages/TopRatedPage.jsx';
import GenresPage from './Pages/GenresPage.jsx';

const Router = () => {
  const [currentRoute, setCurrentRoute] = useState(() => {
    return window.location.hash.replace('#', '') || 'home';
  });

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(window.location.hash.replace('#', '') || 'home');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Return null for routes that are handled by Vanilla JS
  if (['home', 'movies', 'tv'].includes(currentRoute)) {
    return null;
  }

  return (
    <div style={{ padding: '40px', minHeight: '80vh' }}>
      {currentRoute === 'favorites' && <FavoritesPage />}
      {currentRoute === 'watch-later' && <WatchLaterPage />}
      {currentRoute === 'trending' && <TrendingPage />}
      {currentRoute === 'top-rated' && <TopRatedPage />}
      {currentRoute === 'genres' && <GenresPage />}
    </div>
  );
};

export default Router;
