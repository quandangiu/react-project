import React, { useState } from 'react';
import { useStore } from '../store/context';
import { Button, Input, SectionTitle, Badge } from '../components/common/UI';
import { User, Package, Settings, LogOut, MapPin, Phone, Mail, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Order } from '../types';

export const Profile: React.FC = () => {
  const { state, dispatch } = useStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'info' | 'orders'>('info');

  if (!state.user) {
      navigate('/login');
      return null;
  }

  const userOrders = state.orders.filter(o => o.userId === state.user?.id);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-24 min-h-screen">
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
              <div className="relative inline-block mb-4">
                 <img src={state.user.avatar} className="w-24 h-24 rounded-full object-cover border-4 border-gray-50" alt="Avatar" />
                 <div className="absolute bottom-0 right-0 p-1.5 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <h2 className="text-xl font-bold text-gray-900">{state.user.name}</h2>
              <p className="text-gray-500 text-sm mb-6">{state.user.email}</p>
              
              <div className="space-y-2 text-left">
                 <button 
                   onClick={() => setActiveTab('info')}
                   className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'info' ? 'bg-primary-50 text-primary-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                 >
                    <User size={18} /> Personal Info
                 </button>
                 <button 
                   onClick={() => setActiveTab('orders')}
                   className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'orders' ? 'bg-primary-50 text-primary-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                 >
                    <Package size={18} /> My Orders
                 </button>
                 <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors">
                    <Settings size={18} /> Settings
                 </button>
                 <div className="pt-4 border-t border-gray-100 mt-4">
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors font-medium">
                        <LogOut size={18} /> Logout
                    </button>
                 </div>
              </div>
           </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
           {activeTab === 'info' && (
             <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 animate-fade-in">
                <SectionTitle title="Personal Information" subtitle="Manage your account details" />
                <form className="space-y-6 max-w-2xl">
                   <div className="grid grid-cols-2 gap-6">
                      <Input label="Full Name" defaultValue={state.user.name} icon={<User size={18} />} />
                      <Input label="Phone Number" defaultValue={state.user.phone || ''} icon={<Phone size={18} />} />
                   </div>
                   <Input label="Email Address" defaultValue={state.user.email} icon={<Mail size={18} />} disabled />
                   <Input label="Shipping Address" defaultValue={state.user.address || ''} icon={<MapPin size={18} />} />
                   <div className="pt-4">
                      <Button>Save Changes</Button>
                   </div>
                </form>
             </div>
           )}

           {activeTab === 'orders' && (
             <div className="space-y-6 animate-fade-in">
                <SectionTitle title="Order History" subtitle={`You have ${userOrders.length} orders`} />
                {userOrders.length > 0 ? (
                    userOrders.map(order => (
                        <div key={order.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 border-b border-gray-50 pb-4 gap-4">
                                <div>
                                    <div className="flex items-center gap-3">
                                        <h3 className="font-bold text-gray-900">Order #{order.id}</h3>
                                        <Badge variant={
                                            order.status === 'Delivered' ? 'green' : 
                                            order.status === 'Cancelled' ? 'red' : 'blue'
                                        }>{order.status}</Badge>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">Placed on {order.date}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-500">Total Amount</p>
                                    <p className="text-xl font-bold text-primary-600">${order.total}</p>
                                </div>
                            </div>

                            {/* Tracking Timeline */}
                            <div className="mb-8 relative">
                                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 rounded-full"></div>
                                <div 
                                    className="absolute top-1/2 left-0 h-1 bg-green-500 -translate-y-1/2 rounded-full transition-all duration-500"
                                    style={{ width: order.status === 'Delivered' ? '100%' : order.status === 'Shipped' ? '66%' : order.status === 'Processing' ? '33%' : '0%' }}
                                ></div>
                                <div className="relative flex justify-between">
                                    {['Pending', 'Processing', 'Shipped', 'Delivered'].map((step, idx) => {
                                        const isCompleted = ['Pending', 'Processing', 'Shipped', 'Delivered'].indexOf(order.status) >= idx;
                                        return (
                                            <div key={step} className="flex flex-col items-center gap-2">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 border-4 transition-colors ${isCompleted ? 'bg-green-500 border-green-100 text-white' : 'bg-white border-gray-100 text-gray-300'}`}>
                                                    <CheckCircle size={14} fill={isCompleted ? "currentColor" : "none"} />
                                                </div>
                                                <span className={`text-xs font-medium ${isCompleted ? 'text-green-600' : 'text-gray-400'}`}>{step}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="space-y-4">
                                {order.items.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                                        <img src={item.image} className="w-16 h-16 rounded-lg object-cover" alt={item.name} />
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-gray-900 text-sm line-clamp-1">{item.name}</h4>
                                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                        <span className="font-medium text-gray-900">${item.price}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
                        <Package size={48} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-gray-900 font-medium">No orders yet</h3>
                        <Button className="mt-4" onClick={() => navigate('/products')}>Start Shopping</Button>
                    </div>
                )}
             </div>
           )}
        </div>
      </div>
    </div>
  );
};