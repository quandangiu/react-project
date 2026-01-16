import React from 'react';
import { useStore } from '../store/context';
import { Button } from '../components/common/UI';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export const Cart: React.FC = () => {
  const { state, dispatch } = useStore();
  const navigate = useNavigate();

  const subtotal = state.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  if (state.cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Trash2 className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Button onClick={() => navigate('/products')}>Start Shopping</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items */}
        <div className="flex-1 space-y-4">
          <AnimatePresence>
            {state.cart.map(item => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="flex gap-6 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm"
              >
                <div className="w-24 h-24 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                   <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{item.name}</h3>
                        <p className="text-gray-500 text-sm">{item.category}</p>
                      </div>
                      <button 
                        onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                   </div>

                   <div className="flex justify-between items-end">
                      <div className="flex items-center border border-gray-200 rounded-lg">
                        <button 
                          className="px-3 py-1 hover:bg-gray-50"
                          onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity - 1 } })}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                         <button 
                          className="px-3 py-1 hover:bg-gray-50"
                          onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity + 1 } })}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <p className="font-bold text-lg text-primary-600">${(item.price * item.quantity).toFixed(2)}</p>
                   </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Summary */}
        <div className="lg:w-96">
           <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-lg sticky top-28">
              <h3 className="font-bold text-gray-900 text-xl mb-6">Order Summary</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-gray-900 text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-3">
                 <input type="text" placeholder="Promo code" className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                 <Button className="w-full justify-between group" onClick={() => navigate('/checkout')}>
                    Checkout <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                 </Button>
                 <p className="text-xs text-center text-gray-400 mt-4">Secure Checkout - SSL Encrypted</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};