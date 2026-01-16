import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, LogOut, User as UserIcon } from 'lucide-react';
import { useStore } from '../../store/context';
import { Button } from '../common/UI';

export const Header: React.FC = () => {
  const { state, actions } = useStore();
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
    actions.logout();
    navigate('/');
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white font-bold text-xl group-hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/20">
              L
            </div>
            <span className={`font-bold text-xl tracking-tight ${isScrolled ? 'text-gray-900' : 'text-gray-900'}`}>
              LuxeMarket
            </span>
          </Link>

          {/* Desktop Navigation & Search */}
          <div className="hidden md:flex flex-1 items-center max-w-2xl mx-12">
            <div className="relative w-full group">
              <input 
                type="text" 
                placeholder="Search for luxury items..." 
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-gray-100 border-2 border-transparent focus:bg-white focus:border-primary-500 focus:ring-0 transition-all outline-none"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-primary-500 transition-colors" />
            </div>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/products" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">Collection</Link>
            
            <Link to="/cart" className="relative group">
              <div className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <ShoppingBag className="w-6 h-6 text-gray-700 group-hover:text-primary-600" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondary-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                    {cartCount}
                  </span>
                )}
              </div>
            </Link>

            {state.isAuthenticated && state.user ? (
              <div className="relative group cursor-pointer z-50">
                <div className="flex items-center gap-3 py-1 px-2 hover:bg-gray-50 rounded-full transition-colors">
                  <img src={state.user.avatar} alt="User" className="w-9 h-9 rounded-full border-2 border-gray-200" />
                  <div className="flex flex-col hidden lg:flex">
                     <span className="font-semibold text-sm leading-none text-gray-900">{state.user.name}</span>
                     <span className="text-xs text-gray-500">{state.user.role === 'admin' ? 'Administrator' : 'Member'}</span>
                  </div>
                </div>
                {/* Dropdown */}
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top-right scale-95 group-hover:scale-100">
                  <div className="px-4 py-2 border-b border-gray-50 mb-2">
                     <p className="text-sm font-medium text-gray-900">Signed in as</p>
                     <p className="text-sm text-gray-500 truncate">{state.user.email}</p>
                  </div>
                  <Link to="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600">
                     <UserIcon size={16} /> My Profile
                  </Link>
                  {state.user.role === 'admin' && (
                     <Link to="/admin" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg> 
                        Dashboard
                     </Link>
                  )}
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 mt-2 border-t border-gray-50 pt-2">
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Button size="sm" onClick={() => navigate('/login')}>Sign In</Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="text-gray-900" /> : <Menu className="text-gray-900" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-xl p-4 flex flex-col gap-4 animate-slide-up">
           <div className="relative">
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-100 border-none focus:ring-2 focus:ring-primary-500"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
           </div>
            <Link to="/products" className="font-medium text-gray-900 py-2 border-b border-gray-50">Collections</Link>
            <Link to="/cart" className="font-medium text-gray-900 py-2 border-b border-gray-50 flex justify-between">
              Shopping Cart <span className="bg-secondary-500 text-white text-xs px-2 py-1 rounded-full">{cartCount}</span>
            </Link>
            {state.user ? (
              <>
                 <Link to="/profile" className="font-medium text-gray-900 py-2 flex items-center gap-2"><UserIcon size={18} /> My Profile</Link>
                 {state.user.role === 'admin' && <Link to="/admin" className="font-medium text-gray-900 py-2">Admin Dashboard</Link>}
                 <button onClick={handleLogout} className="text-red-600 font-medium py-2 text-left flex items-center gap-2"><LogOut size={18} /> Sign Out</button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-4 mt-2">
                 <Button variant="outline" onClick={() => navigate('/login')}>Login</Button>
                 <Button onClick={() => navigate('/login')}>Sign Up</Button>
              </div>
            )}
        </div>
      )}
    </header>
  );
};