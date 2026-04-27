import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Utensils, Store, ArrowRight, TrendingUp, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getAllMenuItems } from '../services/restaurantService';

const SearchDropdown = ({ isOpen, results, query, isLoading, onClose }) => {
  const navigate = useNavigate();
  const allItems = useMemo(() => getAllMenuItems(), []);

  if (!isOpen) return null;

  // Helper to highlight matching text
  const highlightText = (text, highlight) => {
    if (!highlight.trim()) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => 
          part.toLowerCase() === highlight.toLowerCase() 
            ? <span key={i} className="text-primary font-black">{part}</span> 
            : part
        )}
      </span>
    );
  };

  // Grouping results for better UX
  const restaurantResults = results.filter(r => r.name.toLowerCase().includes(query.toLowerCase()));
  
  // Extracting dishes that match the query OR showing all if empty
  const dishResults = query.trim() 
    ? [] 
    : allItems.slice(0, 8); // Show first 8 items when focus is empty

  if (query.trim()) {
    results.forEach(restaurant => {
      restaurant.menu.forEach(item => {
        if (item.name.toLowerCase().includes(query.toLowerCase())) {
          dishResults.push({ ...item, restaurantId: restaurant.id, restaurantName: restaurant.name });
        }
      });
    });
  }

  const handleResultClick = (restaurantId, dishId = null) => {
    const path = dishId 
      ? `/restaurant/${restaurantId}?dish=${dishId}` 
      : `/restaurant/${restaurantId}`;
    navigate(path);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.98 }}
      className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 z-[100] overflow-hidden max-h-[70vh] flex flex-col"
    >
      <div className="overflow-y-auto custom-scrollbar p-2">
        {isLoading ? (
          <div className="p-8 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            <p className="text-sm text-slate-400 font-medium italic">Searching cravings...</p>
          </div>
        ) : (query.trim() && restaurantResults.length === 0 && dishResults.length === 0) ? (
          <div className="p-10 text-center">
            {/* ... keeping the invalid menu item UI ... */}
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-50 dark:bg-red-950/20 rounded-full mb-4 text-red-500">
               <X size={32} />
            </div>
            <h3 className="text-slate-800 dark:text-slate-100 font-black text-lg mb-1">Invalid menu item</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">We couldn't find any results for "{query}"</p>
            
            <div className="border-t border-slate-100 dark:border-slate-800 pt-6 text-left">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 px-2">Try these instead</h4>
              <div className="flex flex-wrap gap-2">
                {['Burgers', 'Pizza', 'Butter Chicken', 'Sushi', 'Desserts', 'Biriyani'].map(item => (
                  <button
                    key={item}
                    onClick={() => handleResultClick('r1')} // Generic redirection for demonstration
                    className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800 hover:bg-primary hover:text-white rounded-2xl text-xs font-bold text-slate-600 dark:text-slate-300 transition-all border border-slate-100 dark:border-slate-700"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-slate-50 dark:divide-slate-800">
            {/* Restaurants Section */}
            {restaurantResults.length > 0 && (
              <div className="py-2">
                <div className="px-4 py-2">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Store size={12} className="text-primary" /> Restaurants
                  </h3>
                </div>
                {restaurantResults.slice(0, 4).map(restaurant => (
                  <button
                    key={restaurant.id}
                    onClick={() => handleResultClick(restaurant.id)}
                    className="w-full flex items-center gap-4 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group text-left"
                  >
                    <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-slate-100 dark:border-slate-800">
                      <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm truncate">
                        {highlightText(restaurant.name, query)}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{restaurant.cuisine}</p>
                    </div>
                    <ArrowRight size={14} className="text-slate-300 group-hover:text-primary transition-colors group-hover:translate-x-1" />
                  </button>
                ))}
              </div>
            )}

            {/* Dishes Section */}
            {dishResults.length > 0 && (
              <div className="py-2">
                <div className="px-4 py-2 flex items-center justify-between">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                    {query.trim() ? <Utensils size={12} className="text-primary" /> : <TrendingUp size={12} className="text-primary" />}
                    {query.trim() ? 'Dishes' : 'Available Menu Items'}
                  </h3>
                </div>
                {dishResults.slice(0, 8).map(dish => (
                  <button
                    key={`${dish.id}-${dish.restaurantId}`}
                    onClick={() => handleResultClick(dish.restaurantId, dish.id)}
                    className="w-full flex items-center gap-4 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group text-left"
                  >
                    <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800">
                      <img src={dish.image} alt={dish.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm truncate">
                          {highlightText(dish.name, query)}
                        </h4>
                        <span className="text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded italic">₹{dish.price}</span>
                      </div>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate flex items-center gap-1">
                        from <span className="font-bold text-slate-500 underline underline-offset-2">{dish.restaurantName}</span>
                      </p>
                    </div>
                    <ArrowRight size={14} className="text-slate-300 group-hover:text-primary transition-colors group-hover:translate-x-1" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      
      {query.trim() && (restaurantResults.length > 0 || dishResults.length > 0) && (
        <button 
          onClick={() => navigate(`/search?q=${query.trim()}`)}
          className="p-4 bg-slate-50 dark:bg-slate-800/80 text-center text-xs font-bold text-primary hover:bg-primary hover:text-white transition-all transition-colors border-t border-slate-100 dark:border-slate-800 group"
        >
          View all results for "{query.trim()}"
        </button>
      )}
    </motion.div>
  );
};

export default SearchDropdown;
