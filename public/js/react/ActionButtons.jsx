import React from 'react';
import { motion } from 'framer-motion';
import { IoHeartOutline, IoHeart, IoTimeOutline, IoTime } from 'react-icons/io5';
import { useSharedStorage } from './useSharedStorage.js';

const ActionButtons = ({ movie, variant = 'card' }) => {
  const [favorites, setFavorites] = useSharedStorage('cinestream_favorites', []);
  const [watchLater, setWatchLater] = useSharedStorage('cinestream_watchlater', []);

  // Ensure movie is parsed if passed as string (from dataset)
  const movieData = typeof movie === 'string' ? JSON.parse(movie) : movie;
  if (!movieData || !movieData.id) return null;

  const isFavorite = favorites.some(m => m.id === movieData.id);
  const isWatchLater = watchLater.some(m => m.id === movieData.id);

  const toggleFavorite = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (isFavorite) {
      setFavorites(favorites.filter(m => m.id !== movieData.id));
    } else {
      setFavorites([...favorites, movieData]);
    }
  };

  const toggleWatchLater = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (isWatchLater) {
      setWatchLater(watchLater.filter(m => m.id !== movieData.id));
    } else {
      setWatchLater([...watchLater, movieData]);
    }
  };

  const buttonStyle = {
    background: 'rgba(0, 0, 0, 0.5)',
    border: 'none',
    borderRadius: '50%',
    width: variant === 'modal' ? '40px' : '32px',
    height: variant === 'modal' ? '40px' : '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: 'white',
    backdropFilter: 'blur(4px)',
    transition: 'all 0.2s',
  };

  return (
    <div style={{
      display: 'flex', 
      gap: '8px', 
      position: variant === 'card' ? 'absolute' : 'relative',
      top: variant === 'card' ? '8px' : 'auto',
      right: variant === 'card' ? '8px' : 'auto',
      zIndex: 10,
    }}>
      <motion.button
        onClick={toggleFavorite}
        style={buttonStyle}
        whileHover={{ scale: 1.1, background: 'rgba(0, 0, 0, 0.7)' }}
        whileTap={{ scale: 0.9 }}
        title="Add to Favorites"
      >
        {isFavorite ? <IoHeart size={variant === 'modal' ? 24 : 18} color="#ff3366" /> : <IoHeartOutline size={variant === 'modal' ? 24 : 18} />}
      </motion.button>
      
      <motion.button
        onClick={toggleWatchLater}
        style={buttonStyle}
        whileHover={{ scale: 1.1, background: 'rgba(0, 0, 0, 0.7)' }}
        whileTap={{ scale: 0.9 }}
        title="Watch Later"
      >
        {isWatchLater ? <IoTime size={variant === 'modal' ? 24 : 18} color="#00c3ff" /> : <IoTimeOutline size={variant === 'modal' ? 24 : 18} />}
      </motion.button>
    </div>
  );
};

export default ActionButtons;
