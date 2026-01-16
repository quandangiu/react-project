import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, X, LogOut } from 'lucide-react';
import { useStore } from '../../store/context';
import { Button } from '../common/UI';

export const Header: React.FC = () => {
  const { state, dispatch } = useStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const cartCount = state.cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white font-bold text-xl group-hover:bg-primary-700 transition-colors">
              L
            </div>
            <span className={`font-bold text-xl tracking-tight ${isScrolled ? 'text-gray-900' : 'text-gray-900'}`}>
              LuxeMarket
            </span>
          </Link>

          {/* Desktop Navigation & Search */}
          <div className="hidden md:flex flex-1 items-center max-w-2xl mx-12">
            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="Search for products..." 
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-gray-100 border-none focus:ring-2 focus:ring-primary-500 transition-all"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/products" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">Shop</Link>
            
            <Link to="/cart" className="relative group">
              <div className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <ShoppingBag className="w-6 h-6 text-gray-700 group-hover:text-primary-600" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 w-5 h-5 bg-secondary-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">
                    {cartCount}
                  </span>
                )}
              </div>
            </Link>

            {state.user ? (
              <div className="relative group cursor-pointer">
                <div className="flex items-center gap-2">
                  <img src={state.user.avatar} alt="User" className="w-8 h-8 rounded-full border border-gray-200" />
                  <span className="font-medium text-sm hidden lg:block">{state.user.name}</span>
                </div>
                {/* Dropdown */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top-right">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Profile</Link>
                  <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Dashboard</Link>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                    <LogOut size={14} /> Logout
                  </button>
                </div>
              </div>
            ) : (
              <Button size="sm" onClick={() => navigate('/login')}>Login</Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-xl p-4 flex flex-col gap-4 animate-slide-up">
           <input 
              type="text" 
              placeholder="Search..." 
              className="w-full pl-4 pr-4 py-2 rounded-lg bg-gray-100 border-none"
            />
            <Link to="/products" className="font-medium text-gray-900 py-2 border-b border-gray-50">All Products</Link>
            <Link to="/cart" className="font-medium text-gray-900 py-2 border-b border-gray-50 flex justify-between">
              Cart <span className="bg-secondary-500 text-white text-xs px-2 py-1 rounded-full">{cartCount}</span>
            </Link>
            {state.user ? (
              <>
                 <Link to="/profile" className="font-medium text-gray-900 py-2">Profile</Link>
                 <button onClick={handleLogout} className="text-red-600 font-medium py-2 text-left">Logout</button>
              </>
            ) : (
              <Button onClick={() => navigate('/login')} className="w-full mt-2">Login / Sign Up</Button>
            )}
        </div>
      )}
    </header>
  );
};