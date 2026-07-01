import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import CountdownTimer from './CountdownTimer.jsx';
import { detectMoodFromVideo } from './FaceDetectionService.js';

const CameraScanner = ({ scanState, setScanState, onScanComplete }) => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [cameraReady, setCameraReady] = useState(false);
  const collectedResults = useRef([]);
  const requestRef = useRef(null);

  useEffect(() => {
    let active = true;

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
        if (!active) {
          stream.getTracks().forEach(t => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play();
            setScanState('scanning');
            setCameraReady(true);
          };
        }
      } catch (err) {
        console.error("Camera error:", err);
        if (active) onScanComplete(null);
      }
    };

    startCamera();

    return () => {
      active = false;
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [setScanState, onScanComplete]);

  // Continuous analysis loop
  useEffect(() => {
    if (cameraReady && scanState === 'scanning') {
      const analyzeFrame = async () => {
        if (videoRef.current && videoRef.current.readyState >= 2) {
          const result = await detectMoodFromVideo(videoRef.current);
          if (result) {
            collectedResults.current.push(result);
          }
        }
        requestRef.current = requestAnimationFrame(analyzeFrame);
      };
      requestRef.current = requestAnimationFrame(analyzeFrame);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [cameraReady, scanState]);

  const handleCountdownComplete = () => {
    setScanState('analyzing');
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop()); // Stop camera immediately
    }

    // Aggregate results
    if (collectedResults.current.length > 0) {
      const counts = {};
      const avgConfidence = {};
      
      collectedResults.current.forEach(r => {
        counts[r.mood] = (counts[r.mood] || 0) + 1;
        avgConfidence[r.mood] = (avgConfidence[r.mood] || 0) + r.confidence;
      });

      let maxMood = 'Neutral';
      let maxCount = 0;
      for (const mood in counts) {
        if (counts[mood] > maxCount) {
          maxCount = counts[mood];
          maxMood = mood;
        }
      }

      const finalConfidence = Math.round(avgConfidence[maxMood] / maxCount);
      onScanComplete({ mood: maxMood, confidence: finalConfidence });
    } else {
      onScanComplete(null); // Fallback
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '600px', margin: '0 auto', aspectRatio: '4/3', borderRadius: '16px', overflow: 'hidden', backgroundColor: '#000', boxShadow: '0 0 40px rgba(0,0,0,0.8)' }}>
      
      <video
        ref={videoRef}
        playsInline
        muted
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: 'scaleX(-1)'
        }}
      />

      {/* Overlay UI */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        
        {scanState === 'requesting' && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.6)' }}>
            <div style={{ color: 'white', padding: '10px 20px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.2)' }}>
              Requesting Camera Access...
            </div>
          </div>
        )}

        {(scanState === 'scanning' || scanState === 'analyzing') && (
          <>
            {/* Corner Brackets */}
            <div style={{ position: 'absolute', top: '10%', left: '10%', width: '40px', height: '40px', borderTop: '3px solid var(--accent, #FF5A00)', borderLeft: '3px solid var(--accent, #FF5A00)' }} />
            <div style={{ position: 'absolute', top: '10%', right: '10%', width: '40px', height: '40px', borderTop: '3px solid var(--accent, #FF5A00)', borderRight: '3px solid var(--accent, #FF5A00)' }} />
            <div style={{ position: 'absolute', bottom: '10%', left: '10%', width: '40px', height: '40px', borderBottom: '3px solid var(--accent, #FF5A00)', borderLeft: '3px solid var(--accent, #FF5A00)' }} />
            <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '40px', height: '40px', borderBottom: '3px solid var(--accent, #FF5A00)', borderRight: '3px solid var(--accent, #FF5A00)' }} />
            
            {/* Pulsing Glow around Face Area */}
            <motion.div
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ repeat: Infinity, duration: 2 }}
              style={{
                position: 'absolute',
                top: '10%', left: '10%', right: '10%', bottom: '10%',
                boxShadow: 'inset 0 0 30px var(--accent-glow, rgba(255,90,0,0.4))'
              }}
            />

            {/* Rotating Scanner Ring */}
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                style={{
                  width: '240px',
                  height: '240px',
                  border: '2px dashed rgba(255, 255, 255, 0.3)',
                  borderRadius: '50%',
                  position: 'absolute'
                }}
              />
            </div>

            {/* Scanning Laser */}
            <motion.div
              initial={{ top: '10%' }}
              animate={{ top: '90%' }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", repeatType: "reverse" }}
              style={{
                position: 'absolute',
                left: '10%',
                right: '10%',
                height: '2px',
                backgroundColor: 'var(--accent, #FF5A00)',
                boxShadow: '0 0 15px 3px var(--accent-glow, rgba(255,90,0,0.6))',
                zIndex: 10
              }}
            />
          </>
        )}

        {/* Countdown Timer */}
        {cameraReady && scanState === 'scanning' && (
          <CountdownTimer duration={5} onComplete={handleCountdownComplete} />
        )}
      </div>
    </div>
  );
};

export default CameraScanner;
