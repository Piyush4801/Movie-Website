import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getRecommendationsForMood } from './MoodRecommendationEngine.js';
import { imgUrl } from '../modules/api.js';
import { openPlayer } from '../modules/player.js';

const MoodResult = ({ moodData, onClose, onScanAgain }) => {
  const [recommendations, setRecommendations] = useState(null);

  useEffect(() => {
    const fetchRecs = async () => {
      const data = await getRecommendationsForMood(moodData.mood);
      setRecommendations(data);
    };
    fetchRecs();
  }, [moodData.mood]);

  const handleCardClick = (movie) => {
    // We can call the vanilla JS function to open the existing player!
    openPlayer(movie);
    onClose(); // Optional: close scanner when movie starts playing
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ color: 'white' }}
    >
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '32px', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <span>{moodToEmoji(moodData.mood)}</span> {moodData.mood} Detected
        </h2>
        
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
          <div style={{ 
            height: '8px', 
            width: '200px', 
            background: 'rgba(255,255,255,0.1)', 
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${moodData.confidence}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              style={{ height: '100%', background: 'var(--accent, #FF5A00)' }} 
            />
          </div>
          <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>{moodData.confidence}% Confidence</span>
        </div>

        {recommendations && (
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
            {recommendations.description}
          </p>
        )}
      </div>

      {!recommendations ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div className="spinner" style={{ margin: '0 auto' }}></div>
          <p style={{ marginTop: '10px', color: 'rgba(255,255,255,0.5)' }}>Finding perfect movies for you...</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
          gap: '16px'
        }}>
          {recommendations.movies.map((m, i) => {
            const rating = m.vote_average ? m.vote_average.toFixed(1) : null;
            return (
              <motion.div 
                key={m.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="hcard" 
                onClick={() => handleCardClick(m)}
                style={{ cursor: 'pointer' }}
              >
                <div className="hcard-img-wrap">
                  <img src={imgUrl(m.poster_path, 'w342')} alt={m.title || m.name || ''} />
                  <div className="hcard-play-overlay">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3"/>
                    </svg>
                  </div>
                </div>
                <div className="hcard-title">{m.title || m.name || ''}</div>
                <div className="hcard-sub">
                  {rating && (
                    <>
                      <span className="hstar" style={{ color: '#FFD700' }}>★</span> 
                      <span style={{ fontWeight: 600, color: '#fff' }}>{rating}</span>
                      <span style={{ fontSize: '10px', marginRight: '4px' }}>/10</span>
                    </>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Action Buttons */}
      {recommendations && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '40px' }}>
          <button
            onClick={onScanAgain}
            style={{
              padding: '12px 24px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              color: 'white',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
          >
            Scan Again
          </button>
          <button
            onClick={onClose}
            style={{
              padding: '12px 24px',
              backgroundColor: 'var(--accent, #FF5A00)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 4px 15px var(--accent-glow, rgba(255, 90, 0, 0.4))',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            Close
          </button>
        </div>
      )}
    </motion.div>
  );
};

const moodToEmoji = (mood) => {
  switch (mood) {
    case 'Happy': return '😊';
    case 'Sad': return '😢';
    case 'Angry': return '😡';
    case 'Surprised': return '😲';
    case 'Fear': return '😱';
    case 'Tired': return '😴';
    default: return '😐';
  }
};

export default MoodResult;
