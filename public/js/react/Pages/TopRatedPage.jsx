import React, { useEffect, useRef, useState } from 'react';
import { renderRow } from '../../modules/render.js';
import { motion } from 'framer-motion';

const TMDB_KEY = '852b496a6ab5e48324fac3a942903058';

const TopRatedPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);
  const gridRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    
    const loadTopRated = async () => {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${TMDB_KEY}&language=en-US&page=1`);
        if (!res.ok) throw new Error('API Error');
        const data = await res.json();
        if (isMounted) {
          setMovies(data.results);
        }
      } catch (e) {
        if (isMounted) setError('⚠ Unable to load movies.');
        console.error(e);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    
    loadTopRated();
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    if (!loading && !error && movies.length > 0 && gridRef.current) {
      renderRow('topRatedGridContainer', movies);
    }
  }, [loading, error, movies]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h1 style={{ color: 'white', marginBottom: '30px', fontSize: '32px' }}>Top Rated Movies</h1>
      
      {loading && (
        <div style={{ textAlign: 'center', padding: '100px 0' }}>
          <div className="spinner"></div>
        </div>
      )}

      {error && (
        <div style={{ textAlign: 'center', padding: '100px 0', color: '#ff4444' }}>
          <h2>{error}</h2>
          <button 
            onClick={() => window.location.reload()}
            style={{ padding: '10px 20px', marginTop: '15px', background: 'var(--accent)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
          >
            Retry
          </button>
        </div>
      )}

      <div 
        id="topRatedGridContainer" 
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

export default TopRatedPage;
