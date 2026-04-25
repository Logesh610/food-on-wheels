import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useNavigate, Link } from 'react-router-dom';
import {
  Trash2, Plus, Minus, ShoppingBag, ArrowLeft, ShieldCheck,
  MapPin, Tag, ChevronRight, Bike, Clock, Wallet, CreditCard,
  Smartphone, CheckCircle2
} from 'lucide-react';
import Button from '../components/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { validateCoupon } from '../services/restaurantService';

const ADDRESSES = [
  { id: 'a1', label: 'Home',   address: '123, Luxury Heights, Marine Drive, Mumbai - 400001', default: true },
  { id: 'a2', label: 'Work',   address: '10th Fl, WeWork BKC, Bandra Kurla Complex - 400051', default: false },
  { id: 'a3', label: 'Other',  address: '45, Koregaon Park, Pune - 411001', default: false },
];

const PAYMENT_METHODS = [
  { id: 'upi',  icon: Smartphone, label: 'UPI / GPay / PhonePe' },
  { id: 'card', icon: CreditCard,  label: 'Credit / Debit Card' },
  { id: 'cod',  icon: Wallet,      label: 'Cash on Delivery' },
];

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [selectedAddress, setSelectedAddress] = useState('a1');
  const [showAddresses, setShowAddresses] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const deliveryFee = cartItems.length > 0 ? 40 : 0;
  const platformFee = cartItems.length > 0 ? 5 : 0;
  const GST = Math.round(cartTotal * 0.05);
  const discount = appliedCoupon?.discount || 0;
  const totalAmount = cartTotal + deliveryFee + platformFee + GST - discount;

  const handleApplyCoupon = () => {
    setCouponError('');
    if (!couponCode.trim()) return;
    const result = validateCoupon(couponCode, cartTotal);
    if (result.valid) {
      setAppliedCoupon({ code: couponCode.toUpperCase(), discount: result.discount, message: result.message });
      addToast({ message: `Coupon applied! You save ₹${result.discount}`, type: 'success' });
    } else {
      setCouponError(result.message);
      addToast({ message: result.message, type: 'error' });
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError('');
    addToast({ message: 'Coupon removed', type: 'info' });
  };

  const handlePlaceOrder = async () => {
    if (!isAuthenticated) { navigate('/login?redirect=cart'); return; }
    setIsPlacingOrder(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 1500));

    const order = {
      id: `ORD-${Math.floor(Math.random() * 9000) + 1000}`,
      date: new Date().toISOString(),
      restaurant: cartItems[0]?.name || 'Restaurant',
      restaurantName: cartItems[0]?.name,
      items: cartItems.map(i => `${i.name} x${i.quantity}`),
      total: totalAmount,
      status: 'placed',
      address: ADDRESSES.find(a => a.id === selectedAddress)?.address,
      paymentMethod,
    };

    // Save to localStorage
    const existingOrders = JSON.parse(localStorage.getItem(`orders_${user?.email}`) || '[]');
    localStorage.setItem(`orders_${user?.email}`, JSON.stringify([order, ...existingOrders]));

    clearCart();
    setIsPlacingOrder(false);
    navigate(`/order-tracking/${order.id}`, { state: { order } });
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="mb-8 flex justify-center">
          <div className="w-64 h-64 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center relative overflow-hidden">
            <ShoppingBag size={80} className="text-slate-300 dark:text-slate-600 relative z-10" />
            <div className="absolute inset-0 bg-primary/5 animate-pulse"></div>
          </div>
        </div>
        <h2 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 mb-2">Your cart is empty</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm mx-auto">
          Explore top restaurants and find something delicious!
        </p>
        <Link to="/"><Button variant="primary" size="lg">SEE RESTAURANTS NEAR YOU</Button></Link>
      </div>
    );
  }

  const currentAddress = ADDRESSES.find(a => a.id === selectedAddress);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate(-1)} className="p-2 bg-white dark:bg-slate-900 rounded-full shadow-sm hover:text-primary transition-colors">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
            C<span className="text-primary">art</span>
          </h1>
          <span className="text-slate-400 font-medium">({cartItems.length} items)</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Left Column ── */}
          <div className="lg:col-span-2 space-y-5">

            {/* Delivery Address */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
              <button
                className="w-full p-6 flex items-start gap-4 text-left"
                onClick={() => setShowAddresses(!showAddresses)}
              >
                <div className="p-3 bg-primary/10 rounded-xl text-primary flex-shrink-0">
                  <MapPin size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-slate-800 dark:text-slate-100">Delivery to</h3>
                    <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{currentAddress?.label}</span>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1">{currentAddress?.address}</p>
                </div>
                <ChevronRight size={20} className={`text-slate-400 transition-transform flex-shrink-0 mt-2 ${showAddresses ? 'rotate-90' : ''}`} />
              </button>

              <AnimatePresence>
                {showAddresses && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden border-t border-slate-100 dark:border-slate-800"
                  >
                    {ADDRESSES.map(addr => (
                      <label key={addr.id} className={`flex items-start gap-4 p-5 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${selectedAddress === addr.id ? 'bg-primary/5 dark:bg-primary/10' : ''}`}>
                        <input
                          type="radio"
                          className="mt-1 accent-primary"
                          checked={selectedAddress === addr.id}
                          onChange={() => { setSelectedAddress(addr.id); setShowAddresses(false); }}
                        />
                        <div>
                          <p className="font-bold text-slate-700 dark:text-slate-200 text-sm">{addr.label}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{addr.address}</p>
                        </div>
                      </label>
                    ))}
                    <div className="p-4 border-t border-slate-100 dark:border-slate-800">
                      <button className="text-primary text-sm font-bold hover:underline flex items-center gap-1">
                        <Plus size={14} /> Add new address
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Delivery Info */}
            <div className="flex gap-4">
              <div className="flex-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-4 flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-950/30 rounded-xl text-green-600">
                  <Bike size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Estimated Delivery</p>
                  <p className="font-bold text-slate-800 dark:text-slate-100 text-sm">30–40 mins</p>
                </div>
              </div>
              <div className="flex-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-4 flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-950/30 rounded-xl text-blue-600">
                  <Clock size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Order placed at</p>
                  <p className="font-bold text-slate-800 dark:text-slate-100 text-sm">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              </div>
            </div>

            {/* Cart Items */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
              <div className="p-5 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center">
                <h2 className="font-bold text-slate-800 dark:text-slate-100">Order Items</h2>
                <button onClick={clearCart} className="text-xs font-bold text-red-500 hover:underline uppercase">
                  Clear All
                </button>
              </div>
              <div className="divide-y divide-slate-50 dark:divide-slate-800">
                <AnimatePresence>
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="p-5 flex items-center gap-5"
                    >
                      <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm mb-0.5 truncate">{item.name}</h4>
                        <p className="text-slate-500 dark:text-slate-400 text-xs mb-2">₹{item.price} each</p>
                        <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 h-9 w-28 rounded-xl border border-slate-100 dark:border-slate-700 justify-center">
                          <button onClick={() => updateQuantity(item.id, -1)} className="px-2 text-slate-500 hover:text-primary transition-colors h-full">
                            <Minus size={14} />
                          </button>
                          <span className="font-bold text-slate-800 dark:text-slate-100 w-4 text-center text-sm">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="px-2 text-slate-500 hover:text-primary transition-colors h-full">
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-3">
                        <p className="font-bold text-slate-800 dark:text-slate-100">₹{item.price * item.quantity}</p>
                        <button onClick={() => removeFromCart(item.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Coupon */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-5">
              <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                <Tag size={18} className="text-primary" /> Promo Code
              </h3>
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-2xl p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={20} className="text-green-600" />
                    <div>
                      <p className="font-bold text-green-700 dark:text-green-400 text-sm">{appliedCoupon.code}</p>
                      <p className="text-xs text-green-600 dark:text-green-500">{appliedCoupon.message} — Saving ₹{appliedCoupon.discount}</p>
                    </div>
                  </div>
                  <button onClick={handleRemoveCoupon} className="text-xs text-red-500 font-bold hover:underline">Remove</button>
                </div>
              ) : (
                <div>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={e => setCouponCode(e.target.value.toUpperCase())}
                      onKeyDown={e => e.key === 'Enter' && handleApplyCoupon()}
                      placeholder="Enter promo code (try WELCOME50)"
                      className="flex-1 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-primary/30 rounded-2xl py-3 px-4 outline-none text-sm dark:text-slate-200 font-medium transition-all"
                    />
                    <Button variant="outline" onClick={handleApplyCoupon}>Apply</Button>
                  </div>
                  {couponError && <p className="text-xs text-red-500 mt-2 font-bold ml-1">{couponError}</p>}
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {['WELCOME50','FEAST20','SAVE100'].map(c => (
                      <button key={c} onClick={() => setCouponCode(c)} className="text-xs font-bold text-primary border border-primary/20 bg-primary/5 px-3 py-1.5 rounded-xl hover:bg-primary/10 transition-colors">
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Payment Method */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-5">
              <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                <CreditCard size={18} className="text-primary" /> Payment Method
              </h3>
              <div className="space-y-3">
                {PAYMENT_METHODS.map(method => (
                  <label key={method.id} className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer border-2 transition-all ${paymentMethod === method.id ? 'border-primary bg-primary/5 dark:bg-primary/10' : 'border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700'}`}>
                    <input type="radio" className="accent-primary" checked={paymentMethod === method.id} onChange={() => setPaymentMethod(method.id)} />
                    <method.icon size={20} className={paymentMethod === method.id ? 'text-primary' : 'text-slate-400'} />
                    <span className={`font-semibold text-sm ${paymentMethod === method.id ? 'text-primary' : 'text-slate-600 dark:text-slate-400'}`}>{method.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right Column — Bill Summary ── */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 sticky top-24 space-y-0">
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6">Bill Summary</h2>

              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-slate-500 dark:text-slate-400 text-sm">
                  <span>Item Total ({cartItems.reduce((a,i) => a+i.quantity,0)} items)</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-slate-500 dark:text-slate-400 text-sm">
                  <span>Delivery Fee</span>
                  <span>₹{deliveryFee}</span>
                </div>
                <div className="flex justify-between text-slate-500 dark:text-slate-400 text-sm">
                  <span>Platform Fee</span>
                  <span>₹{platformFee}</span>
                </div>
                <div className="flex justify-between text-slate-500 dark:text-slate-400 text-sm">
                  <span>GST (5%)</span>
                  <span>₹{GST}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600 text-sm font-bold">
                    <span>Promo Discount ({appliedCoupon?.code})</span>
                    <span>- ₹{discount}</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t-2 border-slate-50 dark:border-slate-800 mb-6">
                <div className="flex justify-between text-lg font-black text-slate-800 dark:text-slate-100">
                  <span>TO PAY</span>
                  <span className="text-primary">₹{Math.max(0, totalAmount)}</span>
                </div>
                {discount > 0 && (
                  <p className="text-green-600 text-xs font-bold mt-1">You save ₹{discount} on this order 🎉</p>
                )}
              </div>

              <Button
                variant="primary"
                size="lg"
                className="w-full py-4 text-base shadow-xl"
                onClick={handlePlaceOrder}
                disabled={isPlacingOrder}
              >
                {isPlacingOrder ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Placing Order...
                  </span>
                ) : (
                  `PLACE ORDER — ₹${Math.max(0, totalAmount)}`
                )}
              </Button>

              <p className="text-[10px] text-slate-400 dark:text-slate-600 text-center mt-4 font-medium leading-relaxed">
                By placing this order you agree to our Terms & Conditions.
              </p>

              <div className="mt-4 flex items-center gap-2 justify-center text-green-600">
                <ShieldCheck size={16} />
                <span className="text-xs font-bold">100% Safe & Secure Payments</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
