import { useState, useEffect } from 'react';

// Custom hook for synchronized local storage state across multiple components
export function useSharedStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    // Listen for custom event to sync state across same window
    const handleStorageChange = (e) => {
      try {
        const item = window.localStorage.getItem(key);
        setValue(item ? JSON.parse(item) : initialValue);
      } catch (error) {
        console.error(error);
      }
    };

    window.addEventListener(`local-storage-${key}`, handleStorageChange);
    // Also listen to actual storage event for multi-tab sync
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener(`local-storage-${key}`, handleStorageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key, initialValue]);

  const setStoredValue = (newValue) => {
    try {
      const valueToStore = newValue instanceof Function ? newValue(value) : newValue;
      setValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      window.dispatchEvent(new Event(`local-storage-${key}`));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [value, setStoredValue];
}
