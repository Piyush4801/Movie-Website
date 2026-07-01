import React, { useState, useEffect } from 'react';
import { fetchRecommendations, imgUrl } from '../../modules/api.js';

const RecommendationSidebar = ({ media }) => {
  const [recs, setRecs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecs = async () => {
      setLoading(true);
      const type = media.title ? 'movie' : 'tv';
      const data = await fetchRecommendations(media.id, type);
      setRecs(data.slice(0, 10)); // Top 10 recs
      setLoading(false);
    };
    loadRecs();
  }, [media.id]);

  const handleRecClick = (m) => {
    // Dispatch event to re-open modal with new movie
    window.dispatchEvent(new CustomEvent('openReactModal', { detail: m }));
  };

  return (
    <div style={{
      flex: 1,
      minWidth: '300px',
      maxWidth: '400px',
      background: 'rgba(10, 10, 15, 0.6)',
      borderLeft: '1px solid rgba(255,255,255,0.05)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      backdropFilter: 'blur(10px)'
    }}>
      <div style={{ padding: '25px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'white', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#FF7A00' }}>❤️</span> Recommended For You
        </h3>
      </div>
      
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {loading ? (
          <div style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>Loading...</div>
        ) : (
          recs.map(m => (
            <RecCard key={m.id} movie={m} onClick={() => handleRecClick(m)} />
          ))
        )}
      </div>
    </div>
  );
};

const RecCard = ({ movie, onClick }) => {
  const poster = imgUrl(movie.poster_path, 'w300');
  const title = movie.title || movie.name;
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'NR';
  const year = (movie.release_date || movie.first_air_date || '').substring(0,4);

  return (
    <div 
      onClick={onClick}
      style={{
        display: 'flex',
        gap: '15px',
        padding: '10px',
        borderRadius: '12px',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.02)',
        cursor: 'pointer',
        transition: 'all 0.2s',
        alignItems: 'center'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <img 
        src={poster} 
        alt={title} 
        style={{ width: '60px', height: '90px', objectFit: 'cover', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.5)' }} 
      />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '14px', fontWeight: 700, color: 'white', marginBottom: '6px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {title}
        </div>
        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', display: 'flex', gap: '10px', alignItems: 'center' }}>
          <span style={{ color: '#FF7A00', fontWeight: 600 }}>★ {rating}</span>
          <span>{year}</span>
        </div>
      </div>
      <button style={{
        width: '32px', height: '32px', borderRadius: '16px', background: 'rgba(255,255,255,0.1)', border: 'none',
        color: 'white', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
      }}>
        +
      </button>
    </div>
  );
};

export default RecommendationSidebar;
