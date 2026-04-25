import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Navigation, Check } from 'lucide-react';
import { useUI } from '../context/UIContext';
import Button from './Button';

const LocationModal = ({ isOpen, onClose }) => {
  const { address, updateAddress } = useUI();
  const [tempAddress, setTempAddress] = useState(address);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    if (!tempAddress.trim()) return;
    setIsSaving(true);
    
    // Simulate a small delay for a "premium" feel
    setTimeout(() => {
      updateAddress(tempAddress);
      setIsSaving(false);
      onClose();
    }, 600);
  };

  const handleDetectLocation = () => {
    if (navigator.geolocation) {
      // For a real app, you'd use a reverse geocoding API here.
      // For now, we'll simulate the detection.
      setTempAddress('Detecting...');
      setTimeout(() => {
        setTempAddress('Bandra, Mumbai');
      }, 1500);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl z-[101] overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2.5 rounded-2xl">
                    <MapPin className="text-primary" size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Set Location</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Order from restaurants near you</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-400"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <input
                    autoFocus
                    type="text"
                    value={tempAddress}
                    onChange={(e) => setTempAddress(e.target.value)}
                    placeholder="Enter your delivery address..."
                    className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-2xl py-4 pl-12 pr-4 focus:border-primary/30 focus:ring-4 focus:ring-primary/5 outline-none transition-all text-slate-700 dark:text-slate-200"
                    onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                  />
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                </div>

                <button
                  onClick={handleDetectLocation}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-primary/50 hover:text-primary transition-all text-sm font-medium"
                >
                  <Navigation size={16} />
                  Detect My Location
                </button>
              </div>

              <div className="mt-8 flex gap-3">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={onClose}
                  className="rounded-2xl py-3.5"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  fullWidth
                  onClick={handleSave}
                  disabled={!tempAddress.trim() || isSaving}
                  className="rounded-2xl py-3.5 shadow-lg shadow-primary/20"
                >
                  {isSaving ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <div className="flex items-center gap-2">
                      <Check size={18} />
                      Save Address
                    </div>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LocationModal;
