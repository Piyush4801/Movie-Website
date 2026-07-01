import React, { useState } from 'react';
import { SUPPORTED_LANGUAGES, getPreferredLang, setPreferredLang } from '../../modules/language.js';

const SubtitleChips = ({ availableLangs }) => {
  const [activeLang, setActiveLang] = useState(getPreferredLang());

  const handleSelect = (code) => {
    setActiveLang(code);
    setPreferredLang(code);
    // Reload iframe logic could go here if we wanted it to be seamless,
    // but typically they select before clicking play.
  };

  return (
    <div>
      <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'white', marginBottom: '15px' }}>
        Audio & Subtitles
      </h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {availableLangs.map(code => {
          const langObj = SUPPORTED_LANGUAGES.find(l => l.code === code);
          if (!langObj) return null;
          const isActive = activeLang === code;

          return (
            <button
              key={code}
              onClick={() => handleSelect(code)}
              style={{
                background: isActive ? 'rgba(255, 122, 0, 0.2)' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${isActive ? '#FF7A00' : 'rgba(255,255,255,0.1)'}`,
                color: isActive ? '#FF7A00' : 'white',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseOver={(e) => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
              onMouseOut={(e) => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
            >
              <span>{langObj.flag}</span>
              {langObj.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default SubtitleChips;
