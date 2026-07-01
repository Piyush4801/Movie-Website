import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import CameraScanner from './CameraScanner.jsx';
import MoodResult from './MoodResult.jsx';
import { applyMoodTheme } from './MoodThemeManager.js';

const MoodScannerModal = ({ onClose }) => {
  const [scanState, setScanState] = useState('requesting'); // requesting, scanning, analyzing, result
  const [moodData, setMoodData] = useState(null);

  const handleScanComplete = (result) => {
    if (result) {
      setMoodData(result);
      applyMoodTheme(result.mood);
      setScanState('result');
    } else {
      // Fallback if no face detected
      setMoodData({ mood: 'Neutral', confidence: 0 });
      applyMoodTheme('Neutral');
      setScanState('result');
    }
  };

  const handleScanAgain = () => {
    setMoodData(null);
    setScanState('requesting');
  };

  // Handle Escape key
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const modalContent = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(10, 10, 15, 0.85)',
        backdropFilter: 'blur(15px)',
        WebkitBackdropFilter: 'blur(15px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <motion.div
        initial={{ y: 50, scale: 0.9, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 20, scale: 0.95, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '700px',
          height: '500px',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(0, 195, 255, 0.8)',
          borderRadius: '24px',
          boxShadow: '0 0 30px rgba(0, 195, 255, 0.4), 0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 24px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 600, color: 'white' }}>
            🤖 AI Mood Scanner
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
          >
            <IoClose size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
          {(scanState === 'requesting' || scanState === 'scanning' || scanState === 'analyzing') && (
            <CameraScanner 
              scanState={scanState} 
              setScanState={setScanState}
              onScanComplete={handleScanComplete} 
            />
          )}
          {scanState === 'result' && moodData && (
            <MoodResult 
              moodData={moodData} 
              onClose={onClose} 
              onScanAgain={handleScanAgain}
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );

  return createPortal(modalContent, document.body);
};

export default MoodScannerModal;
