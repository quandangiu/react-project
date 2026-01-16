import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Truck, ShieldCheck, Clock, RefreshCw, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/context';
import { ProductCard } from '../components/product/ProductCard';
import { Button, SectionTitle, Badge } from '../components/common/UI';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useStore();
  
  const featuredProducts = state.products.slice(0, 4);
  const flashSaleProducts = state.products.slice(5, 9);

  return (
    <div className="space-y-24 pb-20">
      
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center bg-gray-50 overflow-hidden rounded-b-[3rem]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-5"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-200/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 mix-blend-multiply"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-primary-600 font-semibold text-sm mb-6 shadow-sm border border-primary-100">
              <span className="w-2 h-2 rounded-full bg-primary-600 animate-pulse"></span>
              New Collection 2024
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-[1.1] mb-6">
              The Future of <br/><span className="text-primary-600">Shopping</span> is Here.
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed">
              Explore our curated selection of premium electronics, fashion, and lifestyle products with same-day delivery.
            </p>
            <div className="flex gap-4">
              <Button size="lg" onClick={() => navigate('/products')}>
                Shop Now <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate('/products')}>
                View Catalog
              </Button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
             <img 
                src="https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Hero Product" 
                className="w-full h-auto object-cover rounded-3xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700"
             />
             <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-slide-up">
               <div className="bg-green-100 p-2 rounded-full text-green-600"><ShieldCheck size={24} /></div>
               <div>
                 <p className="text-xs text-gray-500">Official Warranty</p>
                 <p className="font-bold text-gray-900">2 Years</p>
               </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Features Strip */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
          {[
            { icon: <Truck size={32} />, title: "Free Shipping", desc: "On orders over $150" },
            { icon: <ShieldCheck size={32} />, title: "Secure Payment", desc: "100% protected" },
            { icon: <Clock size={32} />, title: "24/7 Support", desc: "Dedicated support" },
            { icon: <RefreshCw size={32} />, title: "Free Returns", desc: "Within 30 days" },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center gap-3 group">
              <div className="text-primary-600 group-hover:scale-110 transition-transform">{item.icon}</div>
              <div>
                <h4 className="font-bold text-gray-900">{item.title}</h4>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4">
        <SectionTitle title="Shop by Category" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {['Electronics', 'Fashion', 'Home', 'Accessories', 'Beauty', 'Sports'].map((cat, idx) => (
            <div 
              key={idx} 
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-primary-200 transition-all cursor-pointer flex flex-col items-center gap-3 group"
              onClick={() => navigate('/products')}
            >
              <div className="w-16 h-16 rounded-full bg-gray-50 group-hover:bg-primary-50 flex items-center justify-center transition-colors">
                 <img src={`https://picsum.photos/100/100?random=${idx+50}`} className="w-12 h-12 rounded-full object-cover mix-blend-multiply" alt={cat} />
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">{cat}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Flash Sale */}
      <section className="bg-gradient-to-r from-red-50 to-orange-50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
            <div>
               <div className="flex items-center gap-2 mb-2 text-red-500 font-bold tracking-wider uppercase text-sm">
                 <Zap size={18} className="fill-current" /> Flash Sale
               </div>
               <h2 className="text-3xl font-bold text-gray-900">Ends in <span className="text-red-600">05:23:45</span></h2>
            </div>
            <Button variant="outline" onClick={() => navigate('/products')}>See All Deals</Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {flashSaleProducts.map(product => (
              <ProductCard key={product.id} product={{...product, originalPrice: product.price * 1.5}} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
         <SectionTitle title="Featured Products" subtitle="Hand-picked items just for you" />
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
         </div>
      </section>

       {/* Banner CTA */}
       <section className="container mx-auto px-4">
        <div className="bg-gray-900 rounded-3xl overflow-hidden relative p-12 text-center md:text-left">
          <div className="relative z-10 max-w-2xl">
            <Badge variant="blue">Limited Time Offer</Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-4 mb-6">Enhance Your Tech Experience</h2>
            <p className="text-gray-300 text-lg mb-8">Upgrade to the latest generation of devices with up to 40% off on selected items this week.</p>
            <Button variant="primary" size="lg" className="bg-white text-gray-900 hover:bg-gray-100 hover:text-primary-600">
              Check Flash Sales
            </Button>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
            alt="Tech" 
            className="absolute top-0 right-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
          />
        </div>
       </section>
    </div>
  );
};