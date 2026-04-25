import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Package, Clock, ChevronRight, ShoppingBag, CheckCircle2, Bike, AlertCircle, RotateCcw } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { motion, AnimatePresence } from 'framer-motion';

const STATUS_CONFIG = {
  placed:    { label: 'Order Placed',     color: 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400',   icon: Package      },
  confirmed: { label: 'Confirmed',        color: 'bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400', icon: CheckCircle2 },
  preparing: { label: 'Preparing',        color: 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400', icon: Clock        },
  pickup:    { label: 'Out for Delivery', color: 'bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400', icon: Bike   },
  delivered: { label: 'Delivered',        color: 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400',  icon: CheckCircle2 },
  cancelled: { label: 'Cancelled',        color: 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400',          icon: AlertCircle  },
};

const PAYMENT_LABELS = { upi: 'UPI', card: 'Card', cod: 'Cash' };

const OrderHistory = () => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    const savedOrders = localStorage.getItem(`orders_${user?.email}`);
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    } else {
      const mockOrders = [
        {
          id: 'ORD-5521',
          date: '2024-04-18T18:30:00Z',
          restaurant: 'The Burger Club',
          total: 450,
          status: 'delivered',
          paymentMethod: 'upi',
          address: '123, Marine Drive, Mumbai',
          items: ['Zesty Beast Burger x2', 'Peri Peri Fries x1'],
        },
        {
          id: 'ORD-4492',
          date: '2024-04-15T13:00:00Z',
          restaurant: 'Pasta La Vista',
          total: 845,
          status: 'delivered',
          paymentMethod: 'card',
          address: '123, Marine Drive, Mumbai',
          items: ['Penne Arrabbiata x1', 'Margherita Pizza x1'],
        },
        {
          id: 'ORD-3389',
          date: '2024-04-10T20:00:00Z',
          restaurant: 'Spicy Tadka',
          total: 598,
          status: 'delivered',
          paymentMethod: 'cod',
          address: '123, Marine Drive, Mumbai',
          items: ['Butter Chicken x1', 'Garlic Naan x3'],
        },
      ];
      setOrders(mockOrders);
    }
  }, [user]);

  const handleReorder = (order) => {
    addToast({ message: `Added ${order.restaurant} items to cart!`, type: 'cart' });
    navigate('/cart');
  };

  if (orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <div className="mb-8 inline-flex items-center justify-center w-40 h-40 bg-slate-100 dark:bg-slate-800 rounded-full">
          <ShoppingBag size={64} className="text-slate-300 dark:text-slate-600" />
        </div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">No orders yet</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8">You haven't placed any orders. Time to change that!</p>
        <Link to="/"><Button variant="primary" size="lg">BROWSE RESTAURANTS</Button></Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:px-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <div className="bg-primary/10 p-3 rounded-2xl text-primary">
          <ShoppingBag size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
            Your <span className="text-primary">Orders</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{orders.length} orders placed</p>
        </div>
      </div>

      {/* Order Cards */}
      <div className="space-y-5">
        {orders.map((order, idx) => {
          const config = STATUS_CONFIG[order.status] || STATUS_CONFIG.delivered;
          const StatusIcon = config.icon;
          const isExpanded = expandedOrder === order.id;
          const isActive = !['delivered', 'cancelled'].includes(order.status);

          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Order Header */}
              <div className="p-6 md:p-7">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-5">
                  <div>
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="font-bold text-xl text-slate-800 dark:text-slate-100">{order.restaurant}</h3>
                      <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${config.color}`}>
                        <StatusIcon size={11} />
                        {config.label}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2 flex-wrap">
                      <Clock size={13} />
                      {new Date(order.date).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}
                      {' '}at{' '}
                      {new Date(order.date).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                      <span className="mx-1 text-slate-200 dark:text-slate-700">|</span>
                      {order.id}
                      {order.paymentMethod && (
                        <>
                          <span className="mx-1 text-slate-200 dark:text-slate-700">|</span>
                          {PAYMENT_LABELS[order.paymentMethod] || order.paymentMethod}
                        </>
                      )}
                    </p>
                  </div>
                  <div className="text-left md:text-right flex-shrink-0">
                    <p className="text-2xl font-black text-slate-800 dark:text-slate-100">₹{order.total}</p>
                    <p className="text-xs text-slate-400 font-medium">{order.items?.length || 0} item(s)</p>
                  </div>
                </div>

                {/* Items Preview */}
                <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 mb-5">
                  <AnimatePresence>
                    <ul className="space-y-1.5">
                      {(isExpanded ? order.items : order.items?.slice(0, 2))?.map((item, i) => (
                        <li key={i} className="text-sm font-medium text-slate-600 dark:text-slate-300 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </AnimatePresence>
                  {(order.items?.length || 0) > 2 && (
                    <button
                      onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                      className="text-xs text-primary font-bold mt-2 hover:underline"
                    >
                      {isExpanded ? 'Show less' : `+${order.items.length - 2} more items`}
                    </button>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleReorder(order)}
                    className="flex items-center gap-2"
                  >
                    <RotateCcw size={14} />
                    Reorder
                  </Button>

                  {isActive ? (
                    <Link to={`/order-tracking/${order.id}`} state={{ order }}>
                      <Button variant="primary" size="sm" className="flex items-center gap-2">
                        <Bike size={14} />
                        Track Order
                      </Button>
                    </Link>
                  ) : (
                    <Link to={`/restaurant/${order.restaurantId || 'r1'}`}>
                      <Button variant="ghost" size="sm" className="flex items-center gap-2 text-slate-500">
                        View Restaurant
                        <ChevronRight size={14} />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderHistory;
