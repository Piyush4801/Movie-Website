import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CountdownTimer = ({ duration = 5, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft === 0) {
      onComplete();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onComplete]);

  return (
    <div style={{
      position: 'absolute',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px'
    }}>
      <div style={{
        color: 'white',
        fontWeight: 600,
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: '8px 24px',
        borderRadius: '20px',
        fontSize: '14px',
        textTransform: 'uppercase',
        letterSpacing: '1px'
      }}>
        Analyzing your facial expression...
      </div>
      <div style={{
        position: 'relative',
        width: '60px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={timeLeft}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              fontSize: '36px',
              fontWeight: 800,
              color: 'var(--accent, #FF5A00)',
              textShadow: '0 0 10px rgba(0,0,0,0.8)'
            }}
          >
            {timeLeft}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CountdownTimer;
