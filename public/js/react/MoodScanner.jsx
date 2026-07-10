import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MoodScannerModal from './MoodScannerModal.jsx';

const MoodScanner = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  React.useEffect(() => {
    const handleOpen = () => {
      setIsModalOpen(true);
    };
    window.addEventListener('open-mood-scanner', handleOpen);
    return () => window.removeEventListener('open-mood-scanner', handleOpen);
  }, []);

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255, 90, 0, 0.6)' }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsModalOpen(true)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'linear-gradient(135deg, rgba(255,90,0,0.8), rgba(200,50,0,0.8))',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer',
          outline: 'none',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
          transition: 'background 0.3s ease'
        }}
      >
        <span style={{ fontSize: '18px' }}>😊</span>
        Scan My Mood
      </motion.button>

      <AnimatePresence>
        {isModalOpen && (
          <MoodScannerModal onClose={() => setIsModalOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default MoodScanner;
