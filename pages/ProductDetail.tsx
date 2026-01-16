import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store/context';
import { Button, Badge } from '../components/common/UI';
import { Star, Minus, Plus, Truck, ArrowLeft, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useStore();
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('desc');
  
  const product = state.products.find(p => p.id === Number(id));

  useEffect(() => {
    window.scrollTo(0,0);
  }, [id]);

  if (!product) return <div className="text-center py-20">Product not found</div>;

  const handleAddToCart = () => {
    // We add 'qty' times
    for(let i=0; i<qty; i++) {
        dispatch({ type: 'ADD_TO_CART', payload: product });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <button onClick={() => navigate(-1)} className="flex items-center text-gray-500 hover:text-primary-600 mb-8 transition-colors">
        <ArrowLeft size={20} className="mr-2" /> Back
      </button>

      <div className="grid lg:grid-cols-2 gap-12 bg-white rounded-3xl p-6 lg:p-10 shadow-sm border border-gray-100">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden relative group">
             <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
             <button className="absolute top-4 right-4 p-3 bg-white/80 backdrop-blur rounded-full text-gray-500 hover:text-red-500 hover:bg-white transition-all shadow-sm">
               <Heart size={20} />
             </button>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className={`aspect-square rounded-xl overflow-hidden cursor-pointer border-2 ${i === 0 ? 'border-primary-500' : 'border-transparent'}`}>
                <img src={product.image} className="w-full h-full object-cover" alt="" />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <Badge variant="blue">{product.category}</Badge>
              {product.stock < 5 && <Badge variant="red">Low Stock</Badge>}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center text-yellow-400">
                <Star className="fill-current w-5 h-5" />
                <span className="text-gray-900 font-bold ml-1">{product.rating}</span>
              </div>
              <span className="text-gray-400">|</span>
              <span className="text-gray-500">{product.reviews} reviews</span>
            </div>
          </div>

          <div className="flex items-end gap-4 mb-8">
             <span className="text-4xl font-bold text-primary-600">${product.price}</span>
             {product.originalPrice && (
               <span className="text-xl text-gray-400 line-through mb-1">${product.originalPrice}</span>
             )}
          </div>

          <p className="text-gray-600 leading-relaxed mb-8">
            {product.description}
          </p>

          <div className="space-y-6 mt-auto">
            <div className="flex items-center gap-6">
               <div className="flex items-center border border-gray-200 rounded-xl">
                 <button 
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="p-3 hover:bg-gray-50 text-gray-600"
                 >
                   <Minus size={18} />
                 </button>
                 <span className="w-12 text-center font-bold text-lg">{qty}</span>
                 <button 
                   onClick={() => setQty(qty + 1)}
                   className="p-3 hover:bg-gray-50 text-gray-600"
                  >
                   <Plus size={18} />
                 </button>
               </div>
               <span className="text-sm text-gray-500">
                  Only <span className="text-orange-500 font-bold">{product.stock} items</span> left!
               </span>
            </div>

            <div className="flex gap-4">
              <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                Add to Cart - ${(product.price * qty).toFixed(2)}
              </Button>
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-500 bg-gray-50 p-4 rounded-xl border border-gray-100">
               <Truck size={20} className="text-primary-600" />
               Free shipping on orders over $150. delivered in 3-5 days.
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-16">
        <div className="flex border-b border-gray-200 mb-8">
          {['Description', 'Reviews', 'Shipping'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`px-8 py-4 font-medium text-lg border-b-2 transition-colors ${
                activeTab === tab.toLowerCase() 
                  ? 'border-primary-600 text-primary-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        
        <motion.div 
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-2xl border border-gray-100 text-gray-600"
        >
          {activeTab === 'desc' && (
             <p>This is a placeholder for the extended product description. It typically contains more technical specs, materials used, and care instructions. {product.description}</p>
          )}
          {activeTab === 'reviews' && (
             <div className="space-y-4">
                <div className="flex items-center gap-2">
                   <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                   <div>
                      <p className="font-bold text-gray-900">John Doe</p>
                      <div className="flex text-yellow-400 text-xs"><Star size={12} fill="currentColor" /> <Star size={12} fill="currentColor" /> <Star size={12} fill="currentColor" /> <Star size={12} fill="currentColor" /> <Star size={12} fill="currentColor" /></div>
                   </div>
                </div>
                <p>Absolutely love this product! The quality is outstanding.</p>
             </div>
          )}
          {activeTab === 'shipping' && (
             <p>We ship worldwide via UPS, FedEx, and DHL. Processing time is 1-2 business days.</p>
          )}
        </motion.div>
      </div>
    </div>
  );
};