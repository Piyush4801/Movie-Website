import React, { useRef } from 'react';
import { imgUrl } from '../../modules/api.js';
import { buildEmbedUrl, getPreferredLang } from '../../modules/language.js';
import ActionButtons from '../ActionButtons.jsx';

const MovieHero = ({ media, isCinemaMode, isPlaying, setIsPlaying }) => {
  const iframeRef = useRef(null);

  const backdrop = imgUrl(media.backdrop_path, 'original');
  const title = media.title || media.name;
  const year = (media.release_date || media.first_air_date || '').substring(0,4);
  const rating = media.vote_average ? media.vote_average.toFixed(1) : 'NR';

  // Build the embed URL based on movie/tv type
  const type = media.title ? 'movie' : 'tv';
  const embedUrl = buildEmbedUrl(media, getPreferredLang(), 1, 1);

  return (
    <div style={{ 
      width: '100%', 
      height: isCinemaMode ? '100%' : '55vh',
      position: 'relative',
      background: '#000',
      flexShrink: 0,
      transition: 'height 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
    }}>
      {!isPlaying && !isCinemaMode ? (
        <>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${backdrop})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.6
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(21,21,21,1) 0%, transparent 100%)'
          }} />
          
          <div style={{ position: 'absolute', bottom: '40px', left: '40px', zIndex: 10 }}>
            <h1 style={{ fontSize: '48px', fontWeight: 800, margin: '0 0 10px 0', textShadow: '0 2px 10px rgba(0,0,0,0.8)', color: 'white' }}>
              {title}
            </h1>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '20px', fontSize: '15px', fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>
              <span style={{ color: '#FF7A00', textShadow: '0 0 10px rgba(255,122,0,0.5)' }}>★ {rating}</span>
              <span>{year}</span>
              <span style={{ border: '1px solid rgba(255,255,255,0.3)', padding: '2px 8px', borderRadius: '4px', fontSize: '12px' }}>HD</span>
              {media.adult ? <span style={{ border: '1px solid #ff4444', color: '#ff4444', padding: '2px 8px', borderRadius: '4px', fontSize: '12px' }}>18+</span> : <span style={{ border: '1px solid rgba(255,255,255,0.3)', padding: '2px 8px', borderRadius: '4px', fontSize: '12px' }}>PG-13</span>}
            </div>
            
            <p style={{ maxWidth: '600px', fontSize: '15px', lineHeight: '1.6', color: 'rgba(255,255,255,0.7)', marginBottom: '30px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {media.overview}
            </p>

            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              <button 
                onClick={() => setIsPlaying(true)}
                style={{
                  background: 'linear-gradient(135deg, #FF7A00, #ff5500)', border: 'none', padding: '14px 35px', borderRadius: '30px',
                  color: 'white', fontWeight: 800, fontSize: '16px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer',
                  boxShadow: '0 8px 25px rgba(255, 122, 0, 0.4)', transition: 'transform 0.2s', textTransform: 'uppercase', letterSpacing: '1px'
                }}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                Watch Now
              </button>
              
              <ActionButtons movie={media} variant="modal" />
            </div>
          </div>
        </>
      ) : (
        <iframe 
          ref={iframeRef}
          src={embedUrl}
          allowFullScreen
          style={{ width: '100%', height: '100%', border: 'none' }}
        />
      )}
    </div>
  );
};
export default MovieHero;
