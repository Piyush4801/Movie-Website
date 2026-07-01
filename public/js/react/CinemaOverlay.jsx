import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

const CinemaOverlay = ({ isActive, onClose }) => {
  useEffect(() => {
    if (isActive) {
      document.body.classList.add('cinema-mode-active');
      document.body.style.overflow = 'hidden';
      localStorage.setItem('cinemaModePreference', 'true');
    } else {
      document.body.classList.remove('cinema-mode-active');
      document.body.style.overflow = '';
    }
    
    const handleKeyDown = (e) => {
      if (!isActive) return;
      if (e.key === 'Escape') {
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(() => {});
        }
        onClose();
      }
      if (e.key === ' ' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('cinema-mode-active');
      document.body.style.overflow = '';
      localStorage.setItem('cinemaModePreference', 'false');
    };
  }, [isActive, onClose]);

  if (!isActive) return null;

  return createPortal(
    <>
      <style>
        {`
          body.cinema-mode-active .modal-info {
            display: none !important;
          }
          body.cinema-mode-active .modal-left {
            width: 100% !important;
            max-width: 100% !important;
            border-radius: 0 !important;
            flex: 3 !important;
          }
          body.cinema-mode-active .modal-right {
            flex: 1 !important;
            background: rgba(10, 10, 15, 0.95) !important;
            backdrop-filter: blur(20px) !important;
            border-left: 1px solid rgba(255,255,255,0.05) !important;
            z-index: 9999999;
          }
          body.cinema-mode-active .modal {
            max-width: 100vw !important;
            height: 100vh !important;
            width: 100vw !important;
            max-height: 100vh !important;
            border-radius: 0 !important;
            top: 0 !important;
            left: 0 !important;
            transform: none !important;
            background: transparent !important;
            box-shadow: none !important;
            backdrop-filter: none !important;
          }
          body.cinema-mode-active .topbar {
            display: none !important;
          }
          body.cinema-mode-active #aiSidebarBtn {
            display: none !important;
          }
          body.cinema-mode-active .modal-player {
            border-radius: 0 !important;
            max-height: 100vh !important;
            height: calc(100vh - 16vh) !important; 
            aspect-ratio: auto !important;
            margin: auto 0 !important;
          }
        `}
      </style>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 999998, // Below the iframe if we adjust its z-index, but above background
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
      {/* Ambient Cinema Lighting */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80%',
        height: '80%',
        background: 'radial-gradient(ellipse at center, rgba(0, 195, 255, 0.15) 0%, transparent 70%)',
        filter: 'blur(60px)',
        zIndex: 1
      }} />

      {/* Projector Light Beam from Top */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          top: '-10%',
          left: '50%',
          transform: 'translateX(-50%) perspective(500px) rotateX(60deg)',
          width: '100vw',
          height: '100vh',
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.1) 0%, transparent 100%)',
          clipPath: 'polygon(45% 0, 55% 0, 100% 100%, 0 100%)',
          zIndex: 1
        }}
      />

      {/* Floating Dust Particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            y: '100vh',
            x: `${Math.random() * 100}vw`,
            opacity: Math.random() * 0.5 + 0.2
          }}
          animate={{
            y: '-10vh',
            x: `${Math.random() * 100}vw`,
          }}
          transition={{
            repeat: Infinity,
            duration: Math.random() * 10 + 10,
            ease: 'linear'
          }}
          style={{
            position: 'absolute',
            width: `${Math.random() * 4 + 1}px`,
            height: `${Math.random() * 4 + 1}px`,
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            borderRadius: '50%',
            filter: 'blur(1px)',
            zIndex: 2
          }}
        />
      ))}
      {/* Floating Exit Button */}
      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        whileHover={{ background: 'rgba(255,0,0,0.8)', color: 'white', borderColor: 'rgba(255,0,0,1)' }}
        onClick={() => {
          if (document.fullscreenElement) {
            document.exitFullscreen().catch(() => {});
          }
          onClose();
        }}
        style={{
          position: 'fixed', top: '20px', right: '30px', zIndex: 1000000,
          background: 'rgba(255,0,0,0.1)', border: '1px solid rgba(255,0,0,0.3)',
          borderRadius: '24px', padding: '8px 20px', color: '#ff4444', cursor: 'pointer',
          backdropFilter: 'blur(10px)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px',
          boxShadow: '0 4px 15px rgba(255,0,0,0.2)', transition: 'all 0.3s',
          pointerEvents: 'auto'
        }}
      >
        <span style={{ fontSize: '18px', fontWeight: 300 }}>✕</span> Exit Cinema
      </motion.button>
      
      {/* Floating Indicator */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ delay: 0.3 }}
        style={{
          position: 'fixed', top: '25px', left: '30px', zIndex: 1000000,
          color: 'rgba(255, 140, 0, 0.9)', fontSize: '12px', letterSpacing: '2px', fontWeight: 700,
          display: 'flex', alignItems: 'center', gap: '10px'
        }}
      >
        <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#ff8c00', boxShadow: '0 0 10px #ff8c00' }}></span>
        CINEMA MODE ON
      </motion.div>

      {/* Cinematic Black Bars */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: '8vh' }}
        exit={{ height: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{ position: 'fixed', top: 0, left: 0, width: '100vw', background: 'black', zIndex: 999999 }}
      />
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: '8vh' }}
        exit={{ height: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{ position: 'fixed', bottom: 0, left: 0, width: '100vw', background: 'black', zIndex: 999999 }}
      />

      </motion.div>
    </>,
    document.body
  );
};

export default CinemaOverlay;
