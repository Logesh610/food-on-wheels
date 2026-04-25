import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { UIProvider } from './context/UIContext';
import { ToastProvider } from './context/ToastContext';
import { FavoritesProvider } from './context/FavoritesContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load all pages for maximum performance
const Home          = lazy(() => import('./pages/Home'));
const RestaurantDetail = lazy(() => import('./pages/RestaurantDetail'));
const Cart          = lazy(() => import('./pages/Cart'));
const Favorites     = lazy(() => import('./pages/Favorites'));
const Profile       = lazy(() => import('./pages/Profile'));
const OrderHistory  = lazy(() => import('./pages/OrderHistory'));
const OrderTracking = lazy(() => import('./pages/OrderTracking'));
const Login         = lazy(() => import('./pages/Login'));
const NotFound      = lazy(() => import('./pages/NotFound'));
import ProtectedRoute from './components/ProtectedRoute';

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <p className="text-slate-400 font-medium text-sm animate-pulse">Loading...</p>
    </div>
  </div>
);

const AppContent = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {!isLoginPage && <Navbar />}
      <main className="flex-grow">
        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/"                      element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="/restaurant/:id"        element={<ProtectedRoute><RestaurantDetail /></ProtectedRoute>} />
              <Route path="/cart"                  element={<ProtectedRoute><Cart /></ProtectedRoute>} />
              <Route path="/favorites"             element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
              <Route path="/profile"              element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/orders"               element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />
              <Route path="/order-tracking/:orderId" element={<ProtectedRoute><OrderTracking /></ProtectedRoute>} />
              <Route path="/login"                element={<Login />} />
              <Route path="*"                     element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>
      {!isLoginPage && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <CartProvider>
          <FavoritesProvider>
            <UIProvider>
              <ToastProvider>
                <Router>
                  <AppContent />
                </Router>
              </ToastProvider>
            </UIProvider>
          </FavoritesProvider>
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;
