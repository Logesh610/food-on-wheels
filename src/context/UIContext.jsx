import React, { createContext, useContext, useState, useEffect } from 'react';

const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [address, setAddress] = useState(() => {
    return localStorage.getItem('food_on_wheels_address') || 'Mumbai';
  });

  const [searchQuery, setSearchQuery] = useState(() => {
    return localStorage.getItem('food_on_wheels_search_query') || '';
  });

  useEffect(() => {
    localStorage.setItem('food_on_wheels_search_query', searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('food_on_wheels_theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('food_on_wheels_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('food_on_wheels_theme', 'light');
      }
      return next;
    });
  };

  const updateAddress = (newAddress) => {
    setAddress(newAddress);
    localStorage.setItem('food_on_wheels_address', newAddress);
  };

  const clearSearch = () => setSearchQuery('');

  return (
    <UIContext.Provider value={{ 
      darkMode, 
      toggleDarkMode, 
      address, 
      updateAddress, 
      searchQuery, 
      setSearchQuery,
      clearSearch
    }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => useContext(UIContext);
