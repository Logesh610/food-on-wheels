import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRestaurantById } from '../services/restaurantService';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useToast } from '../context/ToastContext';
import FoodCard from '../components/FoodCard';
import { Star, Clock, ChevronRight, Share2, Heart, MapPin, Tag, Bike, Filter } from 'lucide-react';
import Button from '../components/Button';
import { motion, AnimatePresence } from 'framer-motion';

const RestaurantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToast } = useToast();

  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [vegOnly, setVegOnly] = useState(false);
  const [activeMenuCategory, setActiveMenuCategory] = useState(null);

  const fav = restaurant ? isFavorite(restaurant.id) : false;

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const data = await getRestaurantById(id);
      if (!data) { navigate('/404'); return; }
      setRestaurant(data);
      setLoading(false);

      // Handle deep linking to a specific dish
      const params = new URLSearchParams(window.location.search);
      const dishId = params.get('dish');
      if (dishId && data.menu) {
        const dish = data.menu.find(d => d.id === dishId);
        if (dish) {
          // Auto-select category
          setActiveMenuCategory(dish.category);
          
          // Scroll with a small delay to ensure rendering
          setTimeout(() => {
            const element = document.getElementById(`dish-${dishId}`);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }, 500);
        }
      }
    };
    fetch();
  }, [id, navigate]);

  // Group menu items by category
  const menuCategories = useMemo(() => {
    if (!restaurant) return {};
    let items = restaurant.menu;
    if (vegOnly) items = items.filter(i => i.isVeg);
    return items.reduce((acc, item) => {
      const cat = item.category || 'Other';
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(item);
      return acc;
    }, {});
  }, [restaurant, vegOnly]);

  const categoryNames = Object.keys(menuCategories);

  const handleFavorite = () => {
    toggleFavorite(restaurant);
    addToast({
      message: fav ? `Removed ${restaurant.name} from favorites` : `Added ${restaurant.name} to favorites!`,
      type: fav ? 'info' : 'success',
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    addToast({ message: 'Link copied to clipboard!', type: 'success' });
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 space-y-6 animate-pulse">
        <div className="h-48 bg-slate-200 dark:bg-slate-800 rounded-3xl"></div>
        <div className="h-8 bg-slate-200 dark:bg-slate-800 w-1/3 rounded-xl"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-800 w-1/2 rounded-xl"></div>
        <div className="grid gap-4">
          {[1,2,3].map(i => <div key={i} className="h-32 bg-slate-200 dark:bg-slate-800 rounded-3xl"></div>)}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:px-8">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-slate-400 mb-6 font-medium">
        <button onClick={() => navigate('/')} className="hover:text-primary transition-colors">Home</button>
        <ChevronRight size={12} />
        <span className="text-slate-600 dark:text-slate-300">{restaurant.name}</span>
      </div>

      {/* Restaurant Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-800 mb-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between gap-6 relative z-10">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-slate-100 mb-2 tracking-tight">
              {restaurant.name}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium mb-5">{restaurant.cuisine}</p>

            <div className="flex flex-wrap gap-3 text-sm font-bold mb-5">
              <div className="flex items-center gap-2 text-green-600 bg-green-50 dark:bg-green-950/20 px-3 py-2 rounded-xl">
                <Star size={16} className="fill-green-600" />
                <span>{restaurant.rating}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-xl">
                <Clock size={14} />
                <span>{restaurant.deliveryTime} mins</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-xl">
                <span className="text-base">₹</span>
                <span>{restaurant.priceForTwo} for two</span>
              </div>
              <div className="flex items-center gap-2 text-blue-600 bg-blue-50 dark:bg-blue-950/20 px-3 py-2 rounded-xl">
                <Bike size={14} />
                <span>Free delivery</span>
              </div>
            </div>

            {/* Offers */}
            {restaurant.offers && restaurant.offers.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {restaurant.offers.map((offer, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs font-bold text-primary bg-primary/5 border border-primary/10 px-3 py-1.5 rounded-full">
                    <Tag size={12} />
                    {offer}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex md:flex-col gap-3 flex-shrink-0">
            <button
              onClick={handleFavorite}
              className={`p-3 rounded-2xl transition-all active:scale-90 ${
                fav ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-red-500'
              }`}
            >
              <Heart size={20} className={fav ? 'fill-current' : ''} />
            </button>
            <button
              onClick={handleShare}
              className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl text-slate-500 hover:text-blue-500 transition-colors"
            >
              <Share2 size={20} />
            </button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -translate-y-20 translate-x-20 pointer-events-none"></div>
      </div>

      {/* Delivery Info */}
      <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl flex items-center gap-4 mb-8 border border-slate-100 dark:border-slate-800">
        <MapPin size={18} className="text-primary flex-shrink-0" />
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
          Delivering to <span className="text-slate-800 dark:text-slate-100 font-bold">Mumbai West</span> • Outlet: Bandra
        </p>
      </div>

      {/* ── Menu Section ── */}
      <div className="flex flex-col md:flex-row gap-8">

        {/* Left: Category Nav (sticky) */}
        <aside className="md:w-48 flex-shrink-0">
          <div className="sticky top-24 space-y-3">
            <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Menu</h3>
            {categoryNames.map(cat => (
              <button
                key={cat}
                onClick={() => {
                  setActiveMenuCategory(cat);
                  document.getElementById(`menu-${cat}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className={`block w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeMenuCategory === cat
                    ? 'bg-primary text-white font-bold shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {cat}
                <span className="text-xs ml-1 opacity-60">({menuCategories[cat].length})</span>
              </button>
            ))}

            {/* Veg toggle */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setVegOnly(!vegOnly)}
                className={`flex items-center gap-2 w-full px-3 py-2 rounded-xl text-sm font-bold transition-all ${
                  vegOnly ? 'bg-green-600 text-white' : 'text-green-600 hover:bg-green-50 dark:hover:bg-green-950/20'
                }`}
              >
                <span className={`w-3 h-3 rounded-sm border-2 border-current flex items-center justify-center`}>
                  {vegOnly && <span className="w-1.5 h-1.5 bg-current rounded-full block"></span>}
                </span>
                Veg Only
              </button>
            </div>
          </div>
        </aside>

        {/* Right: Menu Items */}
        <div className="flex-1 space-y-10">
          {categoryNames.map(cat => (
            <section key={cat} id={`menu-${cat}`} className="scroll-mt-28">
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100 dark:border-slate-800">
                <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-3">
                  {cat}
                  <span className="text-xs font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">
                    {menuCategories[cat].length}
                  </span>
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-5">
                {menuCategories[cat].map(item => (
                  <FoodCard 
                    key={item.id} 
                    item={item} 
                    restaurantId={restaurant.id} 
                    isHighlighted={new URLSearchParams(window.location.search).get('dish') === item.id}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* Floating Cart (Mobile) */}
      <AnimatePresence>
        {cartItems.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-4 right-4 z-50 md:hidden"
          >
            <button
              onClick={() => navigate('/cart')}
              className="w-full premium-gradient text-white rounded-2xl py-4 px-6 font-bold shadow-2xl shadow-primary/40 flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span className="bg-white/20 px-2.5 py-0.5 rounded-lg text-sm">{cartItems.length} ITEMS</span>
                <span>₹{cartItems.reduce((a, b) => a + b.price * b.quantity, 0)}</span>
              </div>
              <div className="flex items-center gap-1">
                VIEW CART <ChevronRight size={18} />
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RestaurantDetail;
