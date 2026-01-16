import React, { useState } from 'react';
import { useStore } from '../store/context';
import { Button, Input, Badge, Modal } from '../components/common/UI';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Package, DollarSign, Users, TrendingUp, Edit, Trash2, Plus, Search, CheckCircle } from 'lucide-react';
import { Product, OrderStatus } from '../types';

export const Admin: React.FC = () => {
  const { state, dispatch } = useStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders'>('overview');
  
  // Product Form State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);

  // Stats
  const totalRevenue = state.orders.reduce((acc, order) => acc + order.total, 0);
  const totalOrders = state.orders.length;
  
  const chartData = [
    { name: 'Mon', sales: 4000 },
    { name: 'Tue', sales: 3000 },
    { name: 'Wed', sales: 2000 },
    { name: 'Thu', sales: 2780 },
    { name: 'Fri', sales: 1890 },
    { name: 'Sat', sales: 2390 },
    { name: 'Sun', sales: 3490 },
  ];

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    if (editingProduct.id) {
       dispatch({ type: 'UPDATE_PRODUCT', payload: editingProduct as Product });
    } else {
       const newProduct = {
           ...editingProduct,
           id: Date.now(),
           rating: 0,
           reviews: 0,
           sold: 0,
           image: 'https://picsum.photos/400/400' // Placeholder
       } as Product;
       dispatch({ type: 'ADD_PRODUCT', payload: newProduct });
    }
    setIsProductModalOpen(false);
    setEditingProduct(null);
  };

  const deleteProduct = (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
        dispatch({ type: 'DELETE_PRODUCT', payload: id });
    }
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
      dispatch({ type: 'UPDATE_ORDER_STATUS', payload: { orderId, status } });
  };

  return (
    <div className="container mx-auto px-4 py-24 min-h-screen bg-gray-50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
           <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
           <p className="text-gray-500">Manage your store efficiently</p>
        </div>
        <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-100">
           {['overview', 'products', 'orders'].map(tab => (
               <button
                 key={tab}
                 onClick={() => setActiveTab(tab as any)}
                 className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                     activeTab === tab ? 'bg-primary-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'
                 }`}
               >
                 {tab.charAt(0).toUpperCase() + tab.slice(1)}
               </button>
           ))}
        </div>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-8 animate-fade-in">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                { title: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: <DollarSign className="text-green-600" />, bg: 'bg-green-100' },
                { title: 'Total Orders', value: totalOrders, icon: <Package className="text-blue-600" />, bg: 'bg-blue-100' },
                { title: 'Active Users', value: '3,890', icon: <Users className="text-purple-600" />, bg: 'bg-purple-100' },
                { title: 'Growth', value: '+12.5%', icon: <TrendingUp className="text-orange-600" />, bg: 'bg-orange-100' },
                ].map((stat, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${stat.bg}`}>{stat.icon}</div>
                    <div>
                    <p className="text-sm text-gray-500">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                </div>
                ))}
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-6">Weekly Sales Overview</h3>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                        <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                        <Tooltip 
                            cursor={{fill: '#F3F4F6'}}
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                        />
                        <Bar dataKey="sales" fill="#2563EB" radius={[4, 4, 0, 0]} barSize={40} />
                    </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
      )}

      {activeTab === 'products' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in">
           <div className="p-6 border-b border-gray-100 flex justify-between items-center">
             <div className="relative w-64">
                <input type="text" placeholder="Search products..." className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm" />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
             </div>
             <Button onClick={() => { setEditingProduct({}); setIsProductModalOpen(true); }}>
                <Plus size={16} className="mr-2" /> Add Product
             </Button>
           </div>
           <div className="overflow-x-auto">
             <table className="w-full text-left text-sm">
               <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
                 <tr>
                   <th className="p-4">Product</th>
                   <th className="p-4">Category</th>
                   <th className="p-4">Price</th>
                   <th className="p-4">Stock</th>
                   <th className="p-4 text-right">Actions</th>
                 </tr>
               </thead>
               <tbody>
                 {state.products.map(product => (
                   <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                     <td className="p-4 flex items-center gap-3">
                       <img src={product.image} className="w-10 h-10 rounded-lg object-cover bg-gray-100" alt="" />
                       <span className="font-medium text-gray-900 truncate max-w-xs">{product.name}</span>
                     </td>
                     <td className="p-4 text-gray-500">{product.category}</td>
                     <td className="p-4 font-medium">${product.price}</td>
                     <td className="p-4">
                       <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.stock > 10 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                         {product.stock} in stock
                       </span>
                     </td>
                     <td className="p-4 text-right">
                       <button onClick={() => { setEditingProduct(product); setIsProductModalOpen(true); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg mr-2"><Edit size={16} /></button>
                       <button onClick={() => deleteProduct(product.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in">
           <div className="overflow-x-auto">
             <table className="w-full text-left text-sm">
               <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
                 <tr>
                   <th className="p-4">Order ID</th>
                   <th className="p-4">Date</th>
                   <th className="p-4">Customer</th>
                   <th className="p-4">Total</th>
                   <th className="p-4">Status</th>
                   <th className="p-4 text-right">Actions</th>
                 </tr>
               </thead>
               <tbody>
                 {state.orders.map(order => (
                   <tr key={order.id} className="border-b border-gray-50">
                     <td className="p-4 font-mono font-medium text-gray-900">{order.id}</td>
                     <td className="p-4 text-gray-500">{order.date}</td>
                     <td className="p-4 text-gray-900 font-medium">User {order.userId}</td>
                     <td className="p-4 font-bold text-gray-900">${order.total}</td>
                     <td className="p-4">
                       <Badge variant={
                           order.status === 'Delivered' ? 'green' : 
                           order.status === 'Cancelled' ? 'red' : 
                           order.status === 'Shipped' ? 'blue' : 'orange'
                       }>
                           {order.status}
                       </Badge>
                     </td>
                     <td className="p-4 text-right">
                        <select 
                           value={order.status} 
                           onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                           className="text-xs border-gray-200 rounded-lg py-1 pl-2 pr-6"
                        >
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>
      )}

      {/* Product Modal */}
      <Modal 
        isOpen={isProductModalOpen} 
        onClose={() => setIsProductModalOpen(false)}
        title={editingProduct?.id ? "Edit Product" : "Add New Product"}
      >
        <form onSubmit={handleSaveProduct} className="space-y-4">
            <Input 
                label="Product Name" 
                value={editingProduct?.name || ''} 
                onChange={e => setEditingProduct({...editingProduct, name: e.target.value})}
                required 
            />
            <div className="grid grid-cols-2 gap-4">
                <Input 
                    label="Price ($)" 
                    type="number" 
                    value={editingProduct?.price || ''} 
                    onChange={e => setEditingProduct({...editingProduct, price: Number(e.target.value)})}
                    required 
                />
                <Input 
                    label="Stock" 
                    type="number" 
                    value={editingProduct?.stock || ''} 
                    onChange={e => setEditingProduct({...editingProduct, stock: Number(e.target.value)})}
                    required 
                />
            </div>
            <Input 
                label="Category" 
                value={editingProduct?.category || ''} 
                onChange={e => setEditingProduct({...editingProduct, category: e.target.value})}
                required 
            />
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                    className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-primary-500 outline-none" 
                    rows={3}
                    value={editingProduct?.description || ''}
                    onChange={e => setEditingProduct({...editingProduct, description: e.target.value})}
                ></textarea>
            </div>
            <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="ghost" onClick={() => setIsProductModalOpen(false)}>Cancel</Button>
                <Button type="submit">{editingProduct?.id ? 'Save Changes' : 'Create Product'}</Button>
            </div>
        </form>
      </Modal>
    </div>
  );
};