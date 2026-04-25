import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search as SearchIcon, MapPin, Menu, X, Moon, Sun, History, User, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useUI } from '../context/UIContext';
import { searchRestaurants } from '../services/restaurantService';
import Button from './Button';
import SearchDropdown from './SearchDropdown';
import { AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { cartCount } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const { darkMode, toggleDarkMode, searchQuery, setSearchQuery, clearSearch } = useUI();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Debounced search logic
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.trim()) {
        setIsSearching(true);
        const results = await searchRestaurants(searchQuery);
        setSearchResults(results);
        setIsSearching(false);
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="glass-nav px-4 py-3 md:px-8">
      {/* ── Desktop Row ── */}
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="bg-primary p-2 rounded-lg">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-white fill-current">
              <path d="M12,2L4.5,20.29L5.21,21L12,18L18.79,21L19.5,20.29L12,2Z" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-secondary dark:text-white">
            Food <span className="text-primary">On Wheels</span>
          </span>
        </Link>


        {/* Search Bar */}
        <div className="hidden md:flex flex-grow max-w-sm mx-4 relative" ref={searchRef}>
          <input
            type="text"
            placeholder="Search restaurants or food..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl py-2.5 pl-10 pr-10 focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm dark:text-slate-200 dark:placeholder-slate-500"
          />
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          
          {searchQuery && (
            <button 
              onClick={(e) => { e.stopPropagation(); clearSearch(); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500 transition-colors p-1"
            >
              <X size={14} />
            </button>
          )}

          <AnimatePresence>
            {isSearchFocused && (
              <SearchDropdown
                isOpen={isSearchFocused}
                results={searchResults}
                query={searchQuery}
                isLoading={isSearching}
                onClose={() => setIsSearchFocused(false)}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Right-side Actions */}
        <div className="flex items-center gap-1 md:gap-2">

          {/* Dark Mode */}
          <button
            onClick={toggleDarkMode}
            className="p-2 text-slate-500 dark:text-slate-400 hover:text-primary transition-colors rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
            title={darkMode ? 'Light Mode' : 'Dark Mode'}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Favorites */}
          <Link
            to="/favorites"
            className="p-2 text-slate-500 dark:text-slate-400 hover:text-red-500 transition-colors rounded-xl hover:bg-red-50 dark:hover:bg-red-950/20"
            title="Favorites"
          >
            <Heart size={22} />
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative p-2 text-slate-500 dark:text-slate-400 hover:text-primary transition-colors rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-primary text-white text-[10px] font-extrabold w-5 h-5 flex items-center justify-center rounded-full ring-2 ring-white dark:ring-slate-900">
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </Link>

          {/* User Area (Desktop only) */}
          <div className="hidden md:flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <Link
                  to="/orders"
                  className="flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary transition-colors px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <History size={16} />
                  <span>Orders</span>
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl hover:ring-2 hover:ring-primary/20 transition-all text-sm font-bold text-slate-700 dark:text-slate-200"
                >
                  <User size={14} className="text-primary" />
                  <span className="max-w-[80px] truncate">{user.name}</span>
                </Link>
                <button
                  onClick={logout}
                  className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors uppercase tracking-wider px-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <Button variant="primary" size="sm" onClick={() => navigate('/login')}>
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Dropdown ── */}
      {isMenuOpen && (
        <div className="md:hidden mt-3 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
          {/* Mobile Search */}
          <div className="relative mb-2">
            <input
              type="text"
              placeholder="Search restaurants or food..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl py-2.5 pl-10 pr-10 outline-none text-sm dark:text-slate-200"
            />
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            
            {searchQuery && (
              <button 
                onClick={(e) => { e.stopPropagation(); clearSearch(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500 transition-colors p-1"
              >
                <X size={14} />
              </button>
            )}
            
            <AnimatePresence>
              {isSearchFocused && (
                <SearchDropdown
                  isOpen={isSearchFocused}
                  results={searchResults}
                  query={searchQuery}
                  isLoading={isSearching}
                  onClose={() => setIsSearchFocused(false)}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Nav Links */}
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="px-3 py-3 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
            Home
          </Link>
          <Link to="/cart" onClick={() => setIsMenuOpen(false)} className="px-3 py-3 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors flex items-center justify-between">
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">{cartCount}</span>
            )}
          </Link>
          <Link to="/favorites" onClick={() => setIsMenuOpen(false)} className="px-3 py-3 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
            My Favorites
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/orders" onClick={() => setIsMenuOpen(false)} className="px-3 py-3 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                My Orders
              </Link>
              <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="px-3 py-3 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                My Profile
              </Link>
              <button
                onClick={() => { logout(); setIsMenuOpen(false); }}
                className="px-3 py-3 text-left text-red-500 font-medium hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" onClick={() => setIsMenuOpen(false)} className="px-3 py-3 text-primary font-bold hover:bg-primary/5 rounded-xl transition-colors">
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
