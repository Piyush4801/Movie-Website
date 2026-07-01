const defaultTheme = {
  '--accent': '#E50914',
  '--accent2': '#B81D24',
  '--accent-glow': 'rgba(229, 9, 20, 0.45)'
};

const moodThemes = {
  Happy: {
    '--accent': '#FF9900',
    '--accent2': '#FF5A00',
    '--accent-glow': 'rgba(255, 153, 0, 0.45)'
  },
  Sad: {
    '--accent': '#007BFF',
    '--accent2': '#0056b3',
    '--accent-glow': 'rgba(0, 123, 255, 0.45)'
  },
  Angry: {
    '--accent': '#FF3333',
    '--accent2': '#CC0000',
    '--accent-glow': 'rgba(255, 51, 51, 0.45)'
  },
  Surprised: {
    '--accent': '#9933FF',
    '--accent2': '#6600CC',
    '--accent-glow': 'rgba(153, 51, 255, 0.45)'
  },
  Fear: { // Horror
    '--accent': '#8B0000',
    '--accent2': '#5C0000',
    '--accent-glow': 'rgba(139, 0, 0, 0.45)'
  },
  Tired: { // Romantic / Relaxing
    '--accent': '#FF69B4',
    '--accent2': '#C71585',
    '--accent-glow': 'rgba(255, 105, 180, 0.45)'
  },
  Neutral: defaultTheme
};

export const applyMoodTheme = (mood) => {
  const theme = moodThemes[mood] || defaultTheme;
  const root = document.documentElement;
  
  // Apply with a slight delay or CSS transition in the parent 
  // (We can assume the CSS variables transition if set in CSS, otherwise it's instant)
  // Let's add a global CSS transition to these variables if possible, 
  // but since they are custom properties, we just set them.
  
  Object.keys(theme).forEach((key) => {
    root.style.setProperty(key, theme[key]);
  });
};
