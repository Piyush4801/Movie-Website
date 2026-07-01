import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import CinemaOverlay from './CinemaOverlay.jsx';

const CinemaMode = () => {
  const [isCinemaMode, setIsCinemaMode] = useState(false);
  const [rootElement, setRootElement] = useState(null);

  useEffect(() => {
    // We check periodically in case the modal HTML is destroyed/recreated by Vanilla JS
    const checkRoot = () => {
      const el = document.getElementById('cinema-mode-button-root');
      if (el && el !== rootElement) {
        setRootElement(el);
      }
    };
    
    checkRoot();
    const interval = setInterval(checkRoot, 500);

    const savedPreference = localStorage.getItem('cinemaModePreference');
    if (savedPreference === 'true') {
      // setIsCinemaMode(true); // Auto-enable if preferred? 
      // The user asked to "Remember user's preference", so if it's true, we could auto-activate it.
    }

    return () => clearInterval(interval);
  }, [rootElement]);

  const toggleCinemaMode = () => {
    setIsCinemaMode(prev => !prev);
  };

  const button = (
    <div 
      onClick={toggleCinemaMode}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        cursor: 'pointer',
        padding: '8px 16px',
        borderRadius: '24px',
        background: 'rgba(255, 255, 255, 0.05)',
        border: `1px solid ${isCinemaMode ? 'rgba(255, 140, 0, 0.4)' : 'rgba(255, 255, 255, 0.1)'}`,
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(10px)'
      }}
    >
      <span style={{ 
        color: 'white', 
        fontSize: '12px', 
        fontWeight: 700,
        letterSpacing: '1px'
      }}>
        🎬 CINEMA MODE
      </span>
      <span style={{
        color: isCinemaMode ? '#ff8c00' : '#888',
        fontSize: '11px',
        fontWeight: 700,
        marginLeft: '4px',
        width: '28px',
        textAlign: 'right'
      }}>
        [ {isCinemaMode ? 'ON' : 'OFF'} ]
      </span>
      <div style={{
        width: '40px',
        height: '22px',
        borderRadius: '11px',
        background: isCinemaMode ? 'rgba(255, 140, 0, 0.2)' : 'rgba(255,255,255,0.1)',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        padding: '0 3px',
        transition: 'background 0.3s',
        boxShadow: isCinemaMode ? '0 0 10px rgba(255,140,0,0.3)' : 'none'
      }}>
        <motion.div
          initial={false}
          animate={{ x: isCinemaMode ? 18 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          style={{
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            background: isCinemaMode ? '#ff8c00' : '#888',
            boxShadow: '0 2px 5px rgba(0,0,0,0.3)'
          }}
        />
      </div>
    </div>
  );

  return (
    <>
      {rootElement && createPortal(button, rootElement)}
      <AnimatePresence>
        {isCinemaMode && <CinemaOverlay isActive={isCinemaMode} onClose={() => setIsCinemaMode(false)} />}
      </AnimatePresence>
    </>
  );
};

export default CinemaMode;
