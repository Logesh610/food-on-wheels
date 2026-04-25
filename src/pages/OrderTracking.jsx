import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Clock, Package, Bike, Home, Phone, MapPin, Star } from 'lucide-react';
import Button from '../components/Button';

const STAGES = [
  { id: 'placed',    label: 'Order Placed',        icon: CheckCircle2, description: 'We"ve received your order.',            color: 'text-blue-500',   bg: 'bg-blue-500'   },
  { id: 'confirmed', label: 'Restaurant Confirmed', icon: Package,      description: 'The restaurant has confirmed.',         color: 'text-purple-500', bg: 'bg-purple-500' },
  { id: 'preparing', label: 'Preparing Your Food',  icon: Clock,        description: 'The chef is cooking your meal.',        color: 'text-amber-500',  bg: 'bg-amber-500'  },
  { id: 'pickup',    label: 'Out for Delivery',     icon: Bike,         description: 'Your rider is on the way!',             color: 'text-primary',    bg: 'bg-primary'    },
  { id: 'delivered', label: 'Delivered!',           icon: Home,         description: 'Enjoy your meal 😋',                   color: 'text-green-500',  bg: 'bg-green-500'  },
];

const STAGE_IDS = STAGES.map(s => s.id);

const OrderTracking = () => {
  const { orderId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const order = state?.order;

  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [eta, setEta] = useState(38);
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(0);

  // Simulate order progression
  useEffect(() => {
    if (currentStageIdx >= STAGE_IDS.length - 1) return;
    const delays = [3000, 5000, 8000, 12000];
    const timer = setTimeout(() => {
      setCurrentStageIdx(prev => Math.min(prev + 1, STAGE_IDS.length - 1));
      setEta(prev => Math.max(0, prev - Math.floor(Math.random() * 10 + 5)));
    }, delays[currentStageIdx] || 5000);
    return () => clearTimeout(timer);
  }, [currentStageIdx]);

  useEffect(() => {
    if (currentStageIdx === STAGE_IDS.length - 1) {
      const t = setTimeout(() => setShowRating(true), 1500);
      return () => clearTimeout(t);
    }
  }, [currentStageIdx]);

  const isDelivered = currentStageIdx === STAGE_IDS.length - 1;
  const CurrentStage = STAGES[currentStageIdx];

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 md:px-8">
      {/* Header */}
      <div className="text-center mb-10">
        <motion.div
          key={currentStageIdx}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`w-24 h-24 rounded-full mx-auto mb-5 flex items-center justify-center ${isDelivered ? 'bg-green-100 dark:bg-green-950/30' : 'bg-primary/10'}`}
        >
          {isDelivered ? (
            <CheckCircle2 size={48} className="text-green-500" />
          ) : (
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <CurrentStage.icon size={48} className={CurrentStage.color} />
            </motion.div>
          )}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.h1
            key={currentStageIdx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-1"
          >
            {CurrentStage.label}
          </motion.h1>
        </AnimatePresence>
        <p className="text-slate-500 dark:text-slate-400 font-medium">{CurrentStage.description}</p>

        {!isDelivered && (
          <div className="mt-5 inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-primary/30">
            <Clock size={18} />
            Arriving in ~{eta} mins
          </div>
        )}
      </div>

      {/* Progress Stepper */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-8 mb-6">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-slate-100 dark:bg-slate-800"></div>
          <motion.div
            className="absolute left-6 top-8 w-0.5 bg-primary origin-top"
            initial={{ height: 0 }}
            animate={{ height: `${(currentStageIdx / (STAGES.length - 1)) * 100}%` }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />

          <div className="space-y-8">
            {STAGES.map((stage, idx) => {
              const isDone    = idx <= currentStageIdx;
              const isActive  = idx === currentStageIdx;
              return (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-5 relative"
                >
                  {/* Circle */}
                  <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                    isDone ? `${stage.bg} text-white shadow-lg` : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                  } ${isActive ? 'ring-4 ring-primary/20 scale-110' : ''}`}>
                    {isActive && !isDelivered ? (
                      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}>
                        <stage.icon size={22} />
                      </motion.div>
                    ) : (
                      <stage.icon size={22} />
                    )}
                  </div>

                  <div className={`transition-all duration-300 ${isDone ? 'opacity-100' : 'opacity-40'}`}>
                    <p className={`font-bold text-sm ${isDone ? 'text-slate-800 dark:text-slate-100' : 'text-slate-400'}`}>
                      {stage.label}
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">{stage.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Order Details Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-6 mb-6 space-y-4">
        <h2 className="font-bold text-slate-800 dark:text-slate-100 mb-4">Order Summary</h2>
        <div className="flex items-start gap-3 text-sm">
          <MapPin size={16} className="text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-bold text-slate-700 dark:text-slate-300">Delivering to</p>
            <p className="text-slate-500 dark:text-slate-400">{order?.address || '123, Marine Drive, Mumbai'}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Package size={16} className="text-primary flex-shrink-0" />
          <div>
            <p className="font-bold text-slate-700 dark:text-slate-300">Order ID: <span className="text-primary">{orderId}</span></p>
            <p className="text-slate-500 dark:text-slate-400">{order?.items?.slice(0, 2).join(', ')}{(order?.items?.length || 0) > 2 ? ` +${order.items.length - 2} more` : ''}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Phone size={16} className="text-primary flex-shrink-0" />
          <div>
            <p className="font-bold text-slate-700 dark:text-slate-300">Delivery Partner</p>
            <p className="text-slate-500 dark:text-slate-400">Raj Kumar • +91 98765 43210</p>
          </div>
        </div>
      </div>

      {/* Rating Modal */}
      <AnimatePresence>
        {showRating && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-primary/20 p-8 mb-6 text-center"
          >
            <div className="text-4xl mb-3">🎉</div>
            <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-2">Delivered! How was it?</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-5">Rate your experience to help others find great food</p>
            <div className="flex justify-center gap-3 mb-5">
              {[1, 2, 3, 4, 5].map(star => (
                <button key={star} onClick={() => setRating(star)}>
                  <Star
                    size={36}
                    className={`transition-colors ${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200 dark:text-slate-700'}`}
                  />
                </button>
              ))}
            </div>
            <Button variant="primary" className="w-full" onClick={() => navigate('/orders')}>
              {rating > 0 ? `Submit ${rating}★ Rating` : 'Skip & View Orders'}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Link to="/" className="flex-1">
          <Button variant="outline" className="w-full">Back to Home</Button>
        </Link>
        <Link to="/orders" className="flex-1">
          <Button variant="primary" className="w-full">View All Orders</Button>
        </Link>
      </div>
    </div>
  );
};

export default OrderTracking;
