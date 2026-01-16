import React, { useState } from 'react';
import { useStore } from '../store/context';
import { Button, Input } from '../components/common/UI';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const { actions, state } = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic Validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!isLogin && formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      if (isLogin) {
        await actions.login(formData.email, formData.password);
      } else {
        await actions.register({
          name: formData.name,
          email: formData.email,
          password: formData.password
        });
      }
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="px-8 pt-8 pb-6 text-center">
          <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">L</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-gray-500">
            {isLogin ? 'Enter your credentials to access your account' : 'Join LuxeMarket today for exclusive deals'}
          </p>
        </div>

        {/* Error Alert */}
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="px-8"
            >
              <div className="bg-red-50 text-red-600 p-3 rounded-xl flex items-center gap-2 text-sm border border-red-100">
                <AlertCircle size={16} />
                {error}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Input 
                  name="name"
                  label="Full Name" 
                  placeholder="John Doe" 
                  icon={<User size={18} />} 
                  value={formData.name}
                  onChange={handleChange}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <Input 
            name="email"
            type="email" 
            label="Email Address" 
            placeholder="you@example.com" 
            icon={<Mail size={18} />} 
            value={formData.email}
            onChange={handleChange}
          />

          <Input 
            name="password"
            type="password" 
            label="Password" 
            placeholder="••••••••" 
            icon={<Lock size={18} />} 
            value={formData.password}
            onChange={handleChange}
          />

          <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Input 
                  name="confirmPassword"
                  type="password" 
                  label="Confirm Password" 
                  placeholder="••••••••" 
                  icon={<Lock size={18} />} 
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {isLogin && (
            <div className="flex justify-end">
              <button type="button" className="text-sm font-medium text-primary-600 hover:text-primary-700">
                Forgot password?
              </button>
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full justify-center" 
            size="lg"
            isLoading={state.isLoading}
          >
            {isLogin ? 'Sign In' : 'Create Account'} <ArrowRight size={18} className="ml-2" />
          </Button>
        </form>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-6 text-center border-t border-gray-100">
          <p className="text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button 
              onClick={() => { setIsLogin(!isLogin); setError(''); }}
              className="font-bold text-primary-600 hover:text-primary-700 transition-colors"
            >
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};