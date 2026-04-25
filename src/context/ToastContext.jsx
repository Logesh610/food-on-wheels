import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X, ShoppingCart } from 'lucide-react';

const ToastContext = createContext();

const ICONS = {
  success: <CheckCircle2 size={20} className="text-green-500 flex-shrink-0" />,
  error:   <AlertCircle  size={20} className="text-red-500 flex-shrink-0" />,
  info:    <Info         size={20} className="text-blue-500 flex-shrink-0" />,
  cart:    <ShoppingCart size={20} className="text-primary flex-shrink-0" />,
};

const BG = {
  success: 'border-l-4 border-green-500',
  error:   'border-l-4 border-red-500',
  info:    'border-l-4 border-blue-500',
  cart:    'border-l-4 border-primary',
};

let idCounter = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ message, type = 'info', duration = 3000 }) => {
    const id = ++idCounter;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}

      {/* Toast Portal */}
      <div className="fixed top-20 right-4 z-[9999] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 80, scale: 0.9 }}
              animate={{ opacity: 1, x: 0,  scale: 1   }}
              exit={{    opacity: 0, x: 80, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className={`pointer-events-auto bg-white dark:bg-slate-800 rounded-2xl shadow-2xl shadow-slate-200/80 dark:shadow-black/40 ${BG[toast.type]} flex items-start gap-3 p-4`}
            >
              {ICONS[toast.type]}
              <p className="flex-1 text-sm font-medium text-slate-700 dark:text-slate-200 leading-snug">
                {toast.message}
              </p>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-300 hover:text-slate-500 dark:text-slate-600 dark:hover:text-slate-400 transition-colors"
              >
                <X size={16} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
