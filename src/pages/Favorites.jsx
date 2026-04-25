import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import RestaurantCard from '../components/RestaurantCard';
import { Heart, Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { motion } from 'framer-motion';

const Favorites = () => {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="mb-8 flex justify-center">
          <div className="w-48 h-48 bg-red-50 dark:bg-red-950/20 rounded-full flex items-center justify-center relative">
            <Heart size={80} className="text-red-200 dark:text-red-900/40" />
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }} 
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute"
            >
              <Heart size={40} className="text-red-500 fill-current" />
            </motion.div>
          </div>
        </div>
        <h2 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 mb-2">No favorites yet</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm mx-auto">
          Save your favorite restaurants to find them easily next time.
        </p>
        <Link to="/">
          <Button variant="primary">DISCOVER RESTAURANTS</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:px-8">
      <div className="flex items-center gap-4 mb-10">
        <div className="bg-red-500/10 p-3 rounded-2xl text-red-500">
          <Heart size={28} className="fill-current" />
        </div>
        <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight">Your <span className="text-red-500">Favorites</span></h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {favorites.map((res, idx) => (
          <motion.div
            key={res.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <RestaurantCard restaurant={res} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
