import React from 'react';
import SubtitleChips from './SubtitleChips.jsx';
import { getAvailableLanguages } from '../../modules/language.js';

const MovieInfoCard = ({ media }) => {
  const rating = media.vote_average ? media.vote_average.toFixed(1) : 'NR';
  const releaseDate = media.release_date || media.first_air_date || 'Unknown';
  
  // Use getAvailableLanguages to format the supported languages
  const availableLangs = getAvailableLanguages(media);

  return (
    <div style={{ padding: '30px 40px', flex: 1, overflowY: 'auto' }}>
      
      {/* Information Grid */}
      <div style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.05)',
        borderRadius: '16px',
        padding: '24px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        
        <InfoItem icon="⭐" title="Rating" value={`${rating}/10`} />
        <InfoItem icon="📅" title="Release" value={releaseDate} />
        <InfoItem icon="🌎" title="Languages" value={`${availableLangs.length} Available`} />
        <InfoItem icon="🎥" title="Quality" value="1080p / 4K" />
        <InfoItem icon="🔊" title="Audio" value="Dolby Atmos" />
        <InfoItem icon="💬" title="Subtitles" value="Multi-Language" />
        
      </div>

      <SubtitleChips availableLangs={availableLangs} />

    </div>
  );
};

const InfoItem = ({ icon, title, value }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '10px', borderRadius: '12px', transition: 'background 0.2s', cursor: 'pointer' }}
       onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
       onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
  >
    <span style={{ fontSize: '24px' }}>{icon}</span>
    <div>
      <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', fontWeight: 600, marginBottom: '4px' }}>{title}</div>
      <div style={{ fontSize: '14px', color: 'white', fontWeight: 700 }}>{value}</div>
    </div>
  </div>
);

export default MovieInfoCard;
