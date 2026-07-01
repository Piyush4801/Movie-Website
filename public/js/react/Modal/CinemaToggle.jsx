import React from 'react';
import { motion } from 'framer-motion';

const CinemaToggle = ({ isCinemaMode, setIsCinemaMode }) => {
  return (
    <div 
      onClick={() => setIsCinemaMode(!isCinemaMode)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        cursor: 'pointer',
        padding: '8px 16px',
        borderRadius: '24px',
        background: 'rgba(255, 255, 255, 0.05)',
        border: `1px solid ${isCinemaMode ? 'rgba(255, 122, 0, 0.4)' : 'rgba(255, 255, 255, 0.1)'}`,
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(10px)',
        boxShadow: isCinemaMode ? '0 0 15px rgba(255,122,0,0.3)' : '0 4px 15px rgba(0,0,0,0.2)'
      }}
    >
      <span style={{ 
        color: 'white', 
        fontSize: '13px', 
        fontWeight: 700,
        letterSpacing: '1px'
      }}>
        🎬 CINEMA MODE
      </span>
      <span style={{
        color: isCinemaMode ? '#FF7A00' : '#888',
        fontSize: '11px',
        fontWeight: 800,
        marginLeft: '4px',
        width: '28px',
        textAlign: 'right'
      }}>
        [ {isCinemaMode ? 'ON' : 'OFF'} ]
      </span>
      <div style={{
        width: '44px',
        height: '24px',
        borderRadius: '12px',
        background: isCinemaMode ? 'rgba(255, 122, 0, 0.2)' : 'rgba(255,255,255,0.1)',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        padding: '0 3px',
        transition: 'background 0.3s',
      }}>
        <motion.div
          initial={false}
          animate={{ x: isCinemaMode ? 20 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          style={{
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            background: isCinemaMode ? '#FF7A00' : '#888',
            boxShadow: '0 2px 5px rgba(0,0,0,0.3)'
          }}
        />
      </div>
    </div>
  );
};
export default CinemaToggle;
