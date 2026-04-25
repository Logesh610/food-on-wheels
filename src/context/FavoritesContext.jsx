import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('food_on_wheels_favorites');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('food_on_wheels_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (restaurant) => {
    setFavorites(prev => {
      const exists = prev.find(r => r.id === restaurant.id);
      return exists
        ? prev.filter(r => r.id !== restaurant.id)
        : [...prev, restaurant];
    });
  };

  const isFavorite = (id) => favorites.some(r => r.id === id);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
