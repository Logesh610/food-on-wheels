import React from 'react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { Plus, Check, ShoppingCart } from 'lucide-react';
import Button from './Button';
import { motion, AnimatePresence } from 'framer-motion';

const FoodCard = ({ item, restaurantId, isHighlighted }) => {
  const { addToCart, cartItems } = useCart();
  const { addToast } = useToast();
  
  const inCart = cartItems.find(i => i.id === item.id);

  const handleAddToCart = () => {
    addToCart(item, restaurantId);
    addToast({
      message: `${item.name} added to cart!`,
      type: 'cart',
    });
  };

  return (
    <motion.div 
      layout
      id={`dish-${item.id}`}
      className={`bg-white dark:bg-slate-900 p-6 rounded-3xl border transition-all duration-500 overflow-hidden ${
        isHighlighted 
          ? 'border-primary ring-4 ring-primary/10 shadow-2xl shadow-primary/20 scale-[1.02] z-10' 
          : 'border-slate-100 dark:border-slate-800'
      } flex justify-between items-center group hover:border-primary/20 hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-black/20`}
    >
      <div className="flex-1 pr-6">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-4 h-4 border-2 border-green-600 flex items-center justify-center p-0.5 rounded-sm">
            <div className="w-full h-full bg-green-600 rounded-full"></div>
          </div>
          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Bestseller</span>
        </div>
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1">{item.name}</h3>
        <p className="text-slate-800 dark:text-slate-200 font-bold mb-3">₹{item.price}</p>
        <p className="text-slate-400 dark:text-slate-500 text-sm leading-relaxed max-w-lg">{item.description}</p>
      </div>
      
      <div className="relative flex-shrink-0">
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden shadow-lg">
          <img 
            src={item.image} 
            alt={item.name} 
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-full px-4">
          <AnimatePresence mode='wait'>
            {inCart ? (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white dark:bg-slate-800 border border-primary/20 shadow-xl rounded-xl py-2 px-3 flex items-center justify-between text-primary font-bold"
              >
                <button 
                  className="text-lg px-2 hover:bg-primary/5 rounded"
                  onClick={handleAddToCart}
                >
                  <Plus size={16} />
                </button>
                <span className="text-sm mx-2">{inCart.quantity}</span>
                <div className="text-green-500 px-2">
                  <Check size={16} />
                </div>
              </motion.div>
            ) : (
              <Button 
                className="w-full shadow-xl" 
                size="sm" 
                onClick={handleAddToCart}
              >
                ADD
              </Button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default FoodCard;
