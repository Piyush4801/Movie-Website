import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MovieHero from './MovieHero.jsx';
import MovieInfoCard from './MovieInfoCard.jsx';
import RecommendationSidebar from './RecommendationSidebar.jsx';
import CinemaToggle from './CinemaToggle.jsx';
import VideoControls from './VideoControls.jsx';

const MoviePlayerModal = ({ media, onClose }) => {
  const [isCinemaMode, setIsCinemaMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Handle ESC
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999999 }}>
      {isCinemaMode && (
        <style>
          {`
            .topbar { display: none !important; }
            #aiSidebarBtn { display: none !important; }
          `}
        </style>
      )}

      <style>
        {`
          .premium-modal {
            width: 92vw;
            max-width: 1600px;
            height: 90vh;
            max-height: 900px;
          }
          .premium-modal.cinema-mode {
            width: 100vw !important;
            max-width: 100vw !important;
            height: 100vh !important;
            max-height: 100vh !important;
          }
          @media (max-width: 1024px) {
            .premium-modal {
              width: 95vw;
              height: 90vh;
            }
          }
          @media (max-width: 768px) {
            .premium-modal {
              width: 100vw;
              max-width: 100vw;
              height: 100vh;
              max-height: 100vh;
              border-radius: 0 !important;
              flex-direction: column;
            }
          }
        `}
      </style>
      
      {/* Dark Overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, background: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(18px)' }}
      />
      
      <motion.div
        className={`premium-modal ${isCinemaMode ? 'cinema-mode' : ''}`}
        initial={{ opacity: 0, scale: 0.9, x: '-50%', y: '-50%' }}
        animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
        exit={{ opacity: 0, scale: 0.95, x: '-50%', y: '-50%' }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          background: isCinemaMode ? '#000' : 'rgba(21, 21, 21, 0.8)',
          backdropFilter: isCinemaMode ? 'none' : 'blur(30px)',
          borderRadius: isCinemaMode ? '0' : '24px',
          border: isCinemaMode ? 'none' : '1px solid rgba(255,255,255,0.08)',
          boxShadow: isCinemaMode ? 'none' : '0 20px 50px rgba(0,0,0,0.5)',
          display: 'flex',
          overflow: 'hidden'
        }}
      >
        {/* Left Side (Player, Hero, Info) */}
        <div style={{ 
            flex: isCinemaMode ? 3 : 2, 
            display: 'flex', 
            flexDirection: 'column', 
            height: '100%', 
            position: 'relative', 
            overflowY: isCinemaMode ? 'hidden' : 'auto' 
          }}>
          
          <MovieHero media={media} isCinemaMode={isCinemaMode} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
          
          {!isCinemaMode && <MovieInfoCard media={media} />}
          
          {isCinemaMode && <VideoControls />}

        </div>

        {/* Right Side (Recommendations) */}
        <RecommendationSidebar media={media} />

        {/* Top Controls */}
        <div style={{ position: 'absolute', top: '20px', left: '20px', right: '20px', display: 'flex', justifyContent: 'space-between', zIndex: 100 }}>
          <CinemaToggle isCinemaMode={isCinemaMode} setIsCinemaMode={setIsCinemaMode} />
          
          <motion.button 
            whileHover={{ background: 'rgba(255,0,0,0.8)', color: 'white', borderColor: 'rgba(255,0,0,1)' }}
            onClick={onClose}
            style={{ 
              background: 'rgba(255,0,0,0.1)', border: '1px solid rgba(255,0,0,0.3)', color: '#ff4444', 
              borderRadius: '24px', padding: '8px 20px', fontWeight: 700, cursor: 'pointer', backdropFilter: 'blur(10px)',
              display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 15px rgba(255,0,0,0.2)', transition: 'all 0.3s'
            }}
          >
            <span style={{ fontSize: '18px', fontWeight: 300 }}>✕</span> Exit
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
export default MoviePlayerModal;
