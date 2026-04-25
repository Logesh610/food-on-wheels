import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../components/Button';
import { Mail, Lock, User, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgot, setIsForgot] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', newPassword: '' });
  const [errors, setErrors] = useState({});
  const { user, login, signup, resetPassword, isAuthenticated } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = new URLSearchParams(location.search).get('redirect') || '/';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, navigate, redirectPath]);

  const validate = () => {
    const newErrors = {};
    if (!isLogin && !isForgot && !formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (isForgot) {
      if (!formData.newPassword) {
        newErrors.newPassword = 'New password is required';
      } else if (formData.newPassword.length < 6) {
        newErrors.newPassword = 'Must be at least 6 characters';
      }
    } else {
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      let result;
      if (isForgot) {
        result = await resetPassword(formData.email, formData.newPassword);
      } else if (isLogin) {
        result = await login(formData.email, formData.password);
      } else {
        result = await signup(formData.name, formData.email, formData.password);
      }

      if (result.success) {
        addToast({ 
          message: isForgot ? 'Password updated! Please login.' : (isLogin ? 'Welcome back!' : 'Account created!'), 
          type: 'success' 
        });
        if (isForgot) {
          setIsForgot(false);
          setIsLogin(true);
        } else {
          navigate(redirectPath);
        }
      } else {
        addToast({ message: result.message, type: 'error' });
      }
    } else {
      addToast({ message: 'Please fix the errors in the form.', type: 'error' });
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-20 bg-slate-50 dark:bg-slate-950">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden ring-1 ring-slate-100 dark:ring-slate-800"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16"></div>
        
        <div className="relative z-10">
          <div className="flex justify-center mb-8">
            <div className="bg-primary p-3 rounded-2xl shadow-lg shadow-primary/20">
              <svg viewBox="0 0 24 24" className="w-8 h-8 text-white fill-current">
                <path d="M12,2L4.5,20.29L5.21,21L12,18L18.79,21L19.5,20.29L12,2Z" />
              </svg>
            </div>
          </div>

          <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100 text-center mb-2">
            {isForgot ? 'Reset Password' : (isLogin ? 'Welcome Back' : 'Create Account')}
          </h2>
          <p className="text-slate-500 text-center mb-10 font-medium">
            {isForgot ? 'Enter your email to set a new password' : (isLogin ? 'Login to continue your food journey' : 'Join the "Food On Wheels" family')}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && !isForgot && (
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Full Name"
                  className={`w-full bg-slate-50 dark:bg-slate-800 border-2 rounded-2xl py-4 pl-12 pr-4 outline-none transition-all ${
                    errors.name ? 'border-red-500 bg-red-50 dark:bg-red-950/20' : 'border-transparent focus:border-primary/20 bg-slate-50 dark:bg-slate-800'
                  }`}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <User className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.name ? 'text-red-500' : 'text-slate-400'}`} size={20} />
                {errors.name && <p className="text-xs text-red-500 mt-1 ml-4 font-bold">{errors.name}</p>}
              </div>
            )}
            
            <div className="relative">
              <input 
                type="email" 
                placeholder="Email Address"
                className={`w-full bg-slate-50 dark:bg-slate-800 border-2 rounded-2xl py-4 pl-12 pr-4 outline-none transition-all ${
                  errors.email ? 'border-red-500 bg-red-50 dark:bg-red-950/20' : 'border-transparent focus:border-primary/20 bg-slate-50 dark:bg-slate-800'
                }`}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.email ? 'text-red-500' : 'text-slate-400'}`} size={20} />
              {errors.email && <p className="text-xs text-red-500 mt-1 ml-4 font-bold">{errors.email}</p>}
            </div>

            {isForgot ? (
              <div className="relative">
                <input 
                  type="password" 
                  placeholder="New Password"
                  className={`w-full bg-slate-50 dark:bg-slate-800 border-2 rounded-2xl py-4 pl-12 pr-4 outline-none transition-all ${
                    errors.newPassword ? 'border-red-500 bg-red-50 dark:bg-red-950/20' : 'border-transparent focus:border-primary/20 bg-slate-50 dark:bg-slate-800'
                  }`}
                  value={formData.newPassword}
                  onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                />
                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.newPassword ? 'text-red-500' : 'text-slate-400'}`} size={20} />
                {errors.newPassword && <p className="text-xs text-red-500 mt-1 ml-4 font-bold">{errors.newPassword}</p>}
              </div>
            ) : (
              <div className="relative">
                <input 
                  type="password" 
                  placeholder="Password"
                  className={`w-full bg-slate-50 dark:bg-slate-800 border-2 rounded-2xl py-4 pl-12 pr-4 outline-none transition-all ${
                    errors.password ? 'border-red-500 bg-red-50 dark:bg-red-950/20' : 'border-transparent focus:border-primary/20 bg-slate-50 dark:bg-slate-800'
                  }`}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.password ? 'text-red-500' : 'text-slate-400'}`} size={20} />
                {errors.password && <p className="text-xs text-red-500 mt-1 ml-4 font-bold">{errors.password}</p>}
              </div>
            )}

            {isLogin && !isForgot && (
              <div className="text-right">
                <button 
                  type="button"
                  onClick={() => { setIsForgot(true); setErrors({}); }}
                  className="text-sm text-slate-400 hover:text-primary font-bold transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            <Button variant="primary" size="lg" type="submit" className="w-full py-4 text-lg shadow-xl mt-4">
              {isForgot ? 'RESET PASSWORD' : (isLogin ? 'LOG IN' : 'SIGN UP')}
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </form>

          <div className="mt-8 text-center pt-8 border-t border-slate-100 dark:border-slate-800">
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              {isForgot ? (
                <button onClick={() => { setIsForgot(false); setIsLogin(true); setErrors({}); }} className="text-primary font-bold hover:underline">
                  Back to Login
                </button>
              ) : (
                <>
                  {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                  <button 
                    onClick={() => { setIsLogin(!isLogin); setErrors({}); }}
                    className="text-primary font-bold hover:underline"
                  >
                    {isLogin ? 'Sign Up' : 'Log In'}
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
