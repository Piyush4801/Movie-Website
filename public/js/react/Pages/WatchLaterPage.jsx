import React, { useEffect, useRef } from 'react';
import { useSharedStorage } from '../useSharedStorage.js';
import { renderRow } from '../../modules/render.js';
import { motion } from 'framer-motion';

const WatchLaterPage = () => {
  const [watchLater] = useSharedStorage('cinestream_watchlater', []);
  const gridRef = useRef(null);

  useEffect(() => {
    if (gridRef.current && watchLater.length > 0) {
      renderRow('watchLaterGridContainer', watchLater);
    }
  }, [watchLater]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h1 style={{ color: 'white', marginBottom: '30px', fontSize: '32px' }}>Watch Later</h1>
      
      {watchLater.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '100px 0', color: 'var(--muted)' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>Your list is empty</h2>
          <p>Click the bookmark icon on any movie to save it for later.</p>
        </div>
      ) : (
        <div 
          id="watchLaterGridContainer" 
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '20px'
          }}
        />
      )}
    </motion.div>
  );
};

export default WatchLaterPage;
