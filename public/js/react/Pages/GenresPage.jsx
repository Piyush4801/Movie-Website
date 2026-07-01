import React, { useState, useEffect, useRef } from 'react';
import { genreMap, fetchByGenre } from '../../modules/api.js';
import { renderRow } from '../../modules/render.js';
import { motion } from 'framer-motion';

const GenresPage = () => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const gridRef = useRef(null);

  // We only want unique genre names to display as chips
  const genresList = Object.entries(genreMap).reduce((acc, [id, name]) => {
    if (!acc.find(g => g.name === name)) {
      acc.push({ id, name });
    }
    return acc;
  }, []);

  const handleGenreClick = async (genreId) => {
    setSelectedGenre(genreId);
    setLoading(true);
    setError(null);
    try {
      const movies = await fetchByGenre(genreId, 'movie');
      if (gridRef.current) {
        renderRow('genresGridContainer', movies);
      }
    } catch (e) {
      setError('⚠ Unable to load movies for this genre.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h1 style={{ color: 'white', marginBottom: '20px', fontSize: '32px' }}>Explore Genres</h1>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '30px' }}>
        {genresList.map(genre => (
          <button
            key={genre.id}
            onClick={() => handleGenreClick(genre.id)}
            style={{
              padding: '10px 20px',
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.1)',
              background: selectedGenre === genre.id ? 'var(--accent)' : 'rgba(255,255,255,0.05)',
              color: selectedGenre === genre.id ? 'white' : 'var(--text)',
              cursor: 'pointer',
              transition: 'all 0.3s',
              fontWeight: 600,
            }}
          >
            {genre.name}
          </button>
        ))}
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: '50px 0' }}>
          <div className="spinner"></div>
        </div>
      )}

      {error && (
        <div style={{ textAlign: 'center', padding: '50px 0', color: '#ff4444' }}>
          <h2>{error}</h2>
        </div>
      )}

      <div 
        id="genresGridContainer" 
        ref={gridRef}
        style={{
          display: (loading || error) ? 'none' : 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '20px'
        }}
      />
    </motion.div>
  );
};

export default GenresPage;
