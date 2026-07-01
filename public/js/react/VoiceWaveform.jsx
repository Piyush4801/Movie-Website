import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose, IoMicOutline } from 'react-icons/io5';

const VoiceWaveform = ({ onClose, onTranscript }) => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(true);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Setup Speech Recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setTranscript("Voice search is not supported in this browser.");
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      let currentTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        currentTranscript += event.results[i][0].transcript;
      }
      setTranscript(currentTranscript);
    };

    recognition.onend = () => {
      setIsListening(false);
      // Wait a moment before processing the final transcript
      setTimeout(() => {
        onTranscript(transcript);
        onClose();
      }, 1500);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
      setTranscript("Could not hear you clearly. Please try again.");
    };

    recognition.start();
    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [onClose, onTranscript]);

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
      }}
    >
      <motion.div
        initial={{ y: 50, scale: 0.9, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 20, scale: 0.95, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '500px',
          height: '350px',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '32px',
          boxShadow: '0 0 40px rgba(0, 195, 255, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: '40px'
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          <IoClose size={20} />
        </button>

        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: isListening ? 'rgba(0, 195, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '30px',
          position: 'relative'
        }}>
          {isListening && (
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                backgroundColor: 'rgba(0, 195, 255, 0.4)'
              }}
            />
          )}
          <IoMicOutline size={40} color={isListening ? '#00c3ff' : 'white'} style={{ position: 'relative', zIndex: 2 }} />
        </div>

        <h3 style={{ color: 'white', fontSize: '24px', fontWeight: 600, textAlign: 'center', minHeight: '60px' }}>
          {transcript || (isListening ? "Listening..." : "Processing...")}
        </h3>

        {/* Waveform Animation (Simulated) */}
        {isListening && (
          <div style={{ display: 'flex', gap: '4px', marginTop: '20px', height: '40px', alignItems: 'center' }}>
            {[...Array(9)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ height: ['10px', `${Math.random() * 30 + 10}px`, '10px'] }}
                transition={{ repeat: Infinity, duration: Math.random() * 0.5 + 0.5, ease: "easeInOut" }}
                style={{
                  width: '4px',
                  backgroundColor: '#00c3ff',
                  borderRadius: '2px'
                }}
              />
            ))}
          </div>
        )}

      </motion.div>
    </motion.div>
  );

  return createPortal(modalContent, document.body);
};

export default VoiceWaveform;
