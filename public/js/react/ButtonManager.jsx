import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import ActionButtons from './ActionButtons.jsx';

const ButtonManager = () => {
  const [roots, setRoots] = useState([]);

  useEffect(() => {
    const scanForRoots = () => {
      const elements = Array.from(document.querySelectorAll('.react-action-buttons:not([data-rendered="true"])'));
      if (elements.length > 0) {
        setRoots(prev => {
          const newRoots = [...prev];
          let changed = false;
          elements.forEach(el => {
            // Mark as rendered so we don't process it again
            el.setAttribute('data-rendered', 'true');
            const encodedData = el.getAttribute('data-movie-data');
            const movieData = encodedData ? decodeURIComponent(encodedData) : null;
            const variant = el.getAttribute('data-variant') || 'card';
            if (movieData) {
              newRoots.push({ el, movieData, variant });
              changed = true;
            }
          });
          return changed ? newRoots : prev;
        });
      }
    };

    // Initial scan
    scanForRoots();

    // Observe body for dynamically added nodes (like when rendering rows)
    const observer = new MutationObserver((mutations) => {
      let shouldScan = false;
      for (const mutation of mutations) {
        if (mutation.addedNodes.length > 0) {
          shouldScan = true;
          break;
        }
      }
      if (shouldScan) scanForRoots();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {roots.map((rootObj, idx) => 
        createPortal(
          <ActionButtons movie={rootObj.movieData} variant={rootObj.variant} />,
          rootObj.el
        )
      )}
    </>
  );
};

export default ButtonManager;
