import React, { useEffect, useRef } from 'react';
import { useSharedStorage } from '../useSharedStorage.js';
import { renderRow } from '../../modules/render.js';
import { motion } from 'framer-motion';

const FavoritesPage = () => {
  const [favorites] = useSharedStorage('cinestream_favorites', []);
  const gridRef = useRef(null);

  useEffect(() => {
    if (gridRef.current && favorites.length > 0) {
      renderRow('favoritesGridContainer', favorites);
    }
  }, [favorites]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h1 style={{ color: 'white', marginBottom: '30px', fontSize: '32px' }}>My Favorites</h1>
      
      {favorites.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '100px 0', color: 'var(--muted)' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>No Favorites Yet</h2>
          <p>Click the heart icon on any movie to add it to your favorites.</p>
        </div>
      ) : (
        <div 
          id="favoritesGridContainer" 
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '20px'
          }}
        />
      )}
    </motion.div>
  );
};

export default FavoritesPage;
