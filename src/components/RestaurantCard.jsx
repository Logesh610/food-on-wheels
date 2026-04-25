import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Heart } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { useToast } from '../context/ToastContext';

const RestaurantCard = ({ restaurant }) => {
  const { id, name, cuisine, rating, deliveryTime, priceForTwo, image, featured } = restaurant;
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToast } = useToast();
  const fav = isFavorite(id);

  const handleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(restaurant);
    addToast({
      message: fav ? `Removed ${name} from favorites` : `Added ${name} to favorites!`,
      type: fav ? 'info' : 'success',
    });
  };

  return (
    <Link to={`/restaurant/${id}`} className="block group">
      <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 card-hover">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

          {featured && (
            <div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider shadow-lg">
              Featured
            </div>
          )}

          {/* Favorite Button */}
          <button
            onClick={handleFavorite}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all active:scale-90 ${
              fav
                ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
                : 'bg-white/20 text-white hover:bg-red-500/80'
            }`}
            title={fav ? 'Remove from Favorites' : 'Add to Favorites'}
          >
            <Heart size={16} className={fav ? 'fill-current' : ''} />
          </button>

          {/* Rating Badge */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-2 py-1 rounded-lg text-white font-bold text-sm">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            <span>{rating}</span>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg line-clamp-1 group-hover:text-primary transition-colors mb-1">
            {name}
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-1">
            {cuisine}
          </p>
          <div className="flex items-center justify-between pt-3 border-t border-slate-50 dark:border-slate-800">
            <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-medium text-xs">
              <Clock size={14} />
              <span>{deliveryTime} mins</span>
            </div>
            <div className="text-slate-800 dark:text-slate-200 font-bold text-sm">
              ₹{priceForTwo} <span className="text-slate-400 font-normal text-xs">for two</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
