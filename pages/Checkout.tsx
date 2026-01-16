import React, { useState } from 'react';
import { Button, Input } from '../components/common/UI';
import { useStore } from '../store/context';
import { Check, CreditCard, MapPin, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Checkout: React.FC = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useStore();
  const navigate = useNavigate();

  const total = state.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0) * 1.08;

  const handleNext = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(step + 1);
    }, 1000);
  };

  const handlePlaceOrder = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      dispatch({ type: 'CLEAR_CART' });
      alert('Order Placed Successfully!');
      navigate('/');
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      {/* Stepper */}
      <div className="flex items-center justify-center mb-12">
        {[
          { id: 1, label: 'Shipping', icon: <MapPin size={18} /> },
          { id: 2, label: 'Payment', icon: <CreditCard size={18} /> },
          { id: 3, label: 'Review', icon: <Check size={18} /> }
        ].map((s, idx) => (
          <div key={s.id} className="flex items-center">
             <div className={`flex flex-col items-center relative z-10`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${step >= s.id ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {s.icon}
                </div>
                <span className="text-xs font-medium mt-2 text-gray-600">{s.label}</span>
             </div>
             {idx < 2 && (
               <div className={`w-24 h-1 -mt-6 mx-2 transition-all ${step > s.id ? 'bg-primary-600' : 'bg-gray-200'}`}></div>
             )}
          </div>
        ))}
      </div>

      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-gray-100">
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
             <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
             <div className="grid grid-cols-2 gap-6">
                <Input label="First Name" placeholder="John" />
                <Input label="Last Name" placeholder="Doe" />
             </div>
             <Input label="Email Address" type="email" placeholder="john@example.com" />
             <Input label="Street Address" placeholder="123 Main St" />
             <div className="grid grid-cols-3 gap-6">
                <Input label="City" placeholder="New York" />
                <Input label="State" placeholder="NY" />
                <Input label="Zip Code" placeholder="10001" />
             </div>
             <div className="flex justify-end pt-6">
               <Button onClick={handleNext} isLoading={loading}>Continue to Payment</Button>
             </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="border-2 border-primary-600 bg-blue-50 p-4 rounded-xl text-center cursor-pointer">
                 <p className="font-bold text-primary-700">Credit Card</p>
              </div>
              <div className="border border-gray-200 p-4 rounded-xl text-center cursor-pointer hover:border-gray-400">
                 <p className="font-medium">PayPal</p>
              </div>
              <div className="border border-gray-200 p-4 rounded-xl text-center cursor-pointer hover:border-gray-400">
                 <p className="font-medium">Apple Pay</p>
              </div>
            </div>

            <Input label="Card Number" placeholder="0000 0000 0000 0000" icon={<CreditCard size={18} />} />
            <div className="grid grid-cols-2 gap-6">
               <Input label="Expiry Date" placeholder="MM/YY" />
               <Input label="CVC" placeholder="123" />
            </div>
            <div className="flex justify-between pt-6">
               <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
               <Button onClick={handleNext} isLoading={loading}>Review Order</Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
             <h2 className="text-2xl font-bold mb-6">Review Order</h2>
             <div className="bg-gray-50 p-6 rounded-2xl mb-6">
               {state.cart.map(item => (
                 <div key={item.id} className="flex justify-between mb-2 text-sm">
                   <span className="text-gray-600">{item.name} x {item.quantity}</span>
                   <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                 </div>
               ))}
               <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between font-bold text-lg">
                 <span>Total</span>
                 <span>${total.toFixed(2)}</span>
               </div>
             </div>
             <div className="flex justify-between pt-6">
               <Button variant="ghost" onClick={() => setStep(2)}>Back</Button>
               <Button onClick={handlePlaceOrder} isLoading={loading} className="w-48">Place Order</Button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};