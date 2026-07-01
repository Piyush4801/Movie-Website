import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import MoviePlayerModal from './Modal/MoviePlayerModal.jsx';

const ModalRoot = () => {
  const [activeMedia, setActiveMedia] = useState(null);

  useEffect(() => {
    const handleOpenModal = (e) => {
      setActiveMedia(e.detail);
    };

    window.addEventListener('openReactModal', handleOpenModal);
    return () => window.removeEventListener('openReactModal', handleOpenModal);
  }, []);

  const handleClose = () => {
    setActiveMedia(null);
  };

  return (
    <AnimatePresence>
      {activeMedia && (
        <MoviePlayerModal 
          media={activeMedia} 
          onClose={handleClose} 
        />
      )}
    </AnimatePresence>
  );
};

export default ModalRoot;
