import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { IoMicOutline } from 'react-icons/io5';
import VoiceWaveform from './VoiceWaveform.jsx';

const VoiceSearch = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTranscript = (transcript) => {
    if (!transcript) return;
    
    // Very simple NLP intent parser
    const lower = transcript.toLowerCase();
    
    // Check if it's a genre request ("show me horror movies")
    const genres = {
      'action': 28,
      'comedy': 35,
      'horror': 27,
      'funny': 35,
      'sci-fi': 878,
      'science fiction': 878,
      'romance': 10749,
      'romantic': 10749,
      'drama': 18
    };

    let genreMatch = null;
    for (const [key, id] of Object.entries(genres)) {
      if (lower.includes(key)) {
        genreMatch = id;
        break;
      }
    }

    if (genreMatch && window.fetchByGenre) {
      // Simulate clicking a genre filter or calling the API directly
      window.fetchByGenre(genreMatch, `Genre: ${genreMatch}`);
    } else {
      // Otherwise perform a standard text search
      // Assuming vanilla JS has a way to handle search input
      const searchInput = document.getElementById('searchInput');
      if (searchInput) {
        searchInput.value = transcript;
        // Trigger whatever event listener they have on search
        const event = new Event('input', { bubbles: true });
        searchInput.dispatchEvent(event);
      }
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'var(--text, white)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          padding: '8px',
          marginLeft: '8px',
          transition: 'color 0.2s, transform 0.2s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.color = '#00c3ff';
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.color = 'var(--text, white)';
          e.currentTarget.style.transform = 'scale(1)';
        }}
        title="Voice Search"
      >
        <IoMicOutline size={20} />
      </button>

      <AnimatePresence>
        {isModalOpen && (
          <VoiceWaveform 
            onClose={() => setIsModalOpen(false)} 
            onTranscript={handleTranscript}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default VoiceSearch;
