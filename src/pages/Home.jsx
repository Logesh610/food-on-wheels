import React, { useState, useEffect, useRef } from 'react';
import { getRestaurants, getCategories } from '../services/restaurantService';
import RestaurantCard from '../components/RestaurantCard';
import useDebounce from '../hooks/useDebounce';
import { Search, Star, IndianRupee, Sparkles, Clock, Filter, ChevronRight, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { useUI } from '../context/UIContext';

const OFFERS = [
  { code: 'WELCOME50', title: '₹50 OFF',  subtitle: 'On your first order',      gradient: 'from-orange-500 to-red-500',    emoji: '🎉' },
  { code: 'FEAST20',   title: '20% OFF',  subtitle: 'On orders above ₹500',    gradient: 'from-purple-500 to-blue-500',   emoji: '🍽️' },
  { code: 'SAVE100',   title: '₹100 OFF', subtitle: 'On orders above ₹800',    gradient: 'from-green-500 to-teal-500',    emoji: '💸' },
];

const SORT_OPTIONS = [
  { id: 'relevance', label: 'Relevance' },
  { id: 'rating',    label: 'Rating' },
  { id: 'delivery',  label: 'Delivery Time' },
  { id: 'price_low', label: 'Price: Low to High' },
  { id: 'price_hi',  label: 'Price: High to Low' },
];

const Home = () => {
  const { searchQuery, clearSearch } = useUI();
  const [restaurants, setRestaurants] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);
  const [sortBy, setSortBy] = useState('relevance');
  const [isVegOnly, setIsVegOnly] = useState(false);
  const [offerIdx, setOfferIdx] = useState(0);
  const categories = getCategories();
  const debouncedSearch = useDebounce(searchQuery, 400);

  // Auto-rotate offer banners
  useEffect(() => {
    const t = setInterval(() => setOfferIdx(i => (i + 1) % OFFERS.length), 4000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    getRestaurants().then(data => { setRestaurants(data); setFiltered(data); setLoading(false); });
  }, []);

  useEffect(() => {
    let result = [...restaurants];
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.cuisine.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q)
      );
    }
    if (activeCategory) {
      result = result.filter(r => 
        r.category === activeCategory || 
        r.cuisine.toLowerCase().includes(activeCategory.toLowerCase()) ||
        r.menu.some(m => m.name.toLowerCase().includes(activeCategory.toLowerCase()))
      );
    }
    if (isVegOnly)      result = result.filter(r => r.isVeg);
    if (sortBy === 'rating')    result.sort((a, b) => b.rating - a.rating);
    if (sortBy === 'delivery')  result.sort((a, b) => parseInt(a.deliveryTime) - parseInt(b.deliveryTime));
    if (sortBy === 'price_low') result.sort((a, b) => a.priceForTwo - b.priceForTwo);
    if (sortBy === 'price_hi')  result.sort((a, b) => b.priceForTwo - a.priceForTwo);
    setFiltered(result);
  }, [debouncedSearch, activeCategory, sortBy, isVegOnly, restaurants]);

  const clearFilters = () => { clearSearch(); setActiveCategory(null); setSortBy('relevance'); setIsVegOnly(false); };
  const hasFilters = searchQuery || activeCategory || sortBy !== 'relevance' || isVegOnly;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8">

      {/* ── Hero ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative rounded-[2.5rem] overflow-hidden my-8 premium-gradient shadow-2xl shadow-primary/20"
      >
        <div className="relative z-10 px-8 md:px-16 py-14 md:py-20 max-w-xl text-white">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
          >
            <Sparkles size={12} /> Fastest Delivery in Chennai
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black mb-4 leading-[1.05] tracking-tight">
            Order your <span className="text-yellow-300">Joy.</span>
          </h1>
          <p className="text-white/75 text-lg mb-0 font-medium">
            From your favourite restaurants — delivered hot & fresh.
          </p>
        </div>
        {/* Decorative circles */}
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="absolute -right-24 -bottom-24 w-96 h-96 border-[50px] border-white/5 rounded-full pointer-events-none" />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-6 translate-x-20 hidden md:block pointer-events-none" />
      </motion.div>

      {/* ── Offer Banners ── */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Tag size={20} className="text-primary" /> Best Offers
          </h2>
        </div>
        <div className="flex gap-5 overflow-x-auto pb-2 no-scrollbar">
          {OFFERS.map((offer, i) => (
            <motion.div
              key={offer.code}
              whileHover={{ scale: 1.03, y: -3 }}
              className={`flex-shrink-0 w-72 bg-gradient-to-br ${offer.gradient} rounded-3xl p-6 text-white cursor-pointer shadow-lg`}
            >
              <div className="text-4xl mb-3">{offer.emoji}</div>
              <p className="text-3xl font-black mb-1">{offer.title}</p>
              <p className="text-white/80 text-sm font-medium mb-4">{offer.subtitle}</p>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-bold">
                Use: <span className="font-black">{offer.code}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="mb-12">
        <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-6">What are you craving?</h2>
        <div className="flex gap-4 overflow-x-auto pb-3 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(activeCategory === cat.name ? null : cat.name)}
              className={`flex-shrink-0 flex flex-col items-center gap-3 transition-all ${activeCategory === cat.name ? 'scale-105' : ''}`}
            >
              <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-3xl shadow-md transition-all duration-300 ${
                activeCategory === cat.name
                  ? 'bg-primary shadow-primary/30 rotate-3 scale-105'
                  : 'bg-white dark:bg-slate-900 hover:shadow-xl hover:-translate-y-1'
              }`}>
                {cat.icon}
              </div>
              <span className={`text-[11px] font-black uppercase tracking-wider ${activeCategory === cat.name ? 'text-primary' : 'text-slate-400 dark:text-slate-500'}`}>
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* ── Featured ── */}
      {!hasFilters && (
        <section className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100">🔥 Featured</h2>
            <Link to="/" className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
              See all <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.filter(r => r.featured).map((res, idx) => (
              <motion.div key={res.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.08 }}>
                <RestaurantCard restaurant={res} />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ── Filters & Listing ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
            {hasFilters ? `Results (${filtered.length})` : 'All Restaurants'}
          </h2>
          <p className="text-slate-400 text-sm mt-0.5">
            {filtered.length} restaurants near you
          </p>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          {/* Veg Toggle */}
          <button
            onClick={() => setIsVegOnly(!isVegOnly)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border-2 text-sm font-bold transition-all ${
              isVegOnly ? 'bg-green-600 border-green-600 text-white' : 'border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-950/20'
            }`}
          >
            <span className={`w-3 h-3 rounded-full border-2 border-green-600 flex items-center justify-center ${isVegOnly ? 'bg-white' : ''}`}>
              {isVegOnly && <span className="w-1.5 h-1.5 bg-green-600 rounded-full block"></span>}
            </span>
            Pure Veg
          </button>

          {/* Sort */}
          <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl">
            {SORT_OPTIONS.slice(0, 3).map(opt => (
              <button
                key={opt.id}
                onClick={() => setSortBy(opt.id)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  sortBy === opt.id ? 'bg-white dark:bg-slate-700 text-primary shadow-sm' : 'text-slate-500'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {hasFilters && (
            <button onClick={clearFilters} className="text-xs font-bold text-red-500 hover:underline px-2">
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* ── Restaurant Grid ── */}
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16"
          >
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden animate-pulse">
                <div className="h-48 bg-slate-200 dark:bg-slate-800"></div>
                <div className="p-4 space-y-3">
                  <div className="h-5 bg-slate-200 dark:bg-slate-800 w-3/4 rounded-lg"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 w-1/2 rounded-lg"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 w-2/3 rounded-lg"></div>
                </div>
              </div>
            ))}
          </motion.div>
        ) : filtered.length === 0 ? (
          <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-center py-28 bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-100 dark:border-slate-800 mb-16"
          >
            <div className="text-8xl mb-6">🔍</div>
            <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">No results found</h3>
            <p className="text-slate-500 max-w-xs mx-auto mb-8">Try a different search or remove some filters.</p>
            <Button variant="outline" onClick={clearFilters}>Clear all filters</Button>
          </motion.div>
        ) : (
          <motion.div key="results" layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16"
          >
            {filtered.map((res, idx) => (
              <motion.div key={res.id} layout initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.04 }}>
                <RestaurantCard restaurant={res} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
