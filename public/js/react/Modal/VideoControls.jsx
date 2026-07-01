import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const VideoControls = () => {
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    let timeout;
    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setShowControls(false), 3000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {showControls && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute',
            bottom: '30px', 
            left: '50%',    
            transform: 'translateX(-50%)',
            width: '95%',
            background: 'rgba(10, 10, 15, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '16px',
            padding: '16px 24px',
            zIndex: 1000000,
            display: 'flex',
            alignItems: 'center',
            gap: '25px',
            color: 'white',
            pointerEvents: 'auto',
            boxShadow: '0 20px 50px rgba(0,0,0,0.8)'
          }}
        >
          {/* Play/Pause */}
          <svg style={{cursor:'pointer'}} width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          
          {/* 10 Sec Back */}
          <svg style={{cursor:'pointer'}} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 11l19-9-9 19-2-8-8-2z"></path></svg>
          
          {/* 10 Sec Forward */}
          <svg style={{cursor:'pointer'}} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11l-19-9 9 19 2-8 8-2z"></path></svg>

          {/* Volume Slider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor:'pointer' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
            <div style={{ width: '60px', height: '4px', background: 'rgba(255,255,255,0.3)', borderRadius: '2px' }}><div style={{ width: '70%', height: '100%', background: 'white', borderRadius: '2px' }}></div></div>
          </div>

          {/* Current Time */}
          <span style={{ fontSize: '14px', fontWeight: 600 }}>00:00</span>

          {/* Progress Bar (Full Width) */}
          <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.2)', borderRadius: '3px', position: 'relative', cursor:'pointer' }}>
            <div style={{ width: '30%', height: '100%', background: '#FF7A00', borderRadius: '3px' }}></div>
            <div style={{ position: 'absolute', left: '30%', top: '50%', transform: 'translate(-50%, -50%)', width: '14px', height: '14px', background: 'white', borderRadius: '50%', boxShadow: '0 0 8px rgba(0,0,0,0.5)' }}></div>
          </div>

          {/* Remaining Time */}
          <span style={{ fontSize: '14px', fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>-1:53:42</span>

          {/* Playback Speed */}
          <span style={{ fontSize: '14px', fontWeight: 800, cursor:'pointer' }}>1x</span>

          {/* Subtitle */}
          <svg style={{cursor:'pointer'}} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>

          {/* Audio */}
          <svg style={{cursor:'pointer'}} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon></svg>

          {/* Quality */}
          <span style={{ fontSize: '14px', fontWeight: 800, cursor:'pointer', color: '#FF7A00' }}>1080p</span>

          {/* Settings */}
          <svg style={{cursor:'pointer'}} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>

          {/* Picture in Picture */}
          <svg style={{cursor:'pointer'}} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><rect x="12" y="12" width="7" height="5" rx="1"></rect></svg>

          {/* Fullscreen */}
          <svg style={{cursor:'pointer'}} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VideoControls;
