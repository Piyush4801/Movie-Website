import React from 'react';
import { motion } from 'framer-motion';
import { IoMoonOutline, IoSunnyOutline } from 'react-icons/io5';
import { useTheme } from './ThemeContext.jsx';

const NavbarThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      style={{
        background: 'transparent',
        border: 'none',
        color: 'var(--text, white)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        padding: '8px',
        marginLeft: '12px',
        position: 'relative',
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        overflow: 'hidden'
      }}
      title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
    >
      <motion.div
        initial={false}
        animate={{
          y: isDark ? 0 : -30,
          opacity: isDark ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: 'backInOut' }}
        style={{ position: 'absolute' }}
      >
        <IoMoonOutline size={20} />
      </motion.div>

      <motion.div
        initial={false}
        animate={{
          y: isDark ? 30 : 0,
          opacity: isDark ? 0 : 1
        }}
        transition={{ duration: 0.3, ease: 'backInOut' }}
        style={{ position: 'absolute' }}
      >
        <IoSunnyOutline size={22} color="#f59e0b" />
      </motion.div>
    </button>
  );
};

export default NavbarThemeToggle;
