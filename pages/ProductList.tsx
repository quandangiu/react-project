import React, { useState, useMemo } from 'react';
import { useStore } from '../store/context';
import { ProductCard } from '../components/product/ProductCard';
import { SlidersHorizontal, ChevronDown, Search } from 'lucide-react';
import { Button } from '../components/common/UI';

export const ProductList: React.FC = () => {
  const { state } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<number>(2000);
  const [sortBy, setSortBy] = useState<string>('newest');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', ...Array.from(new Set(state.products.map(p => p.category)))];

  const filteredProducts = useMemo(() => {
    let result = state.products;

    if (searchQuery) {
      result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    result = result.filter(p => p.price <= priceRange);

    if (sortBy === 'price-asc') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [state.products, selectedCategory, priceRange, sortBy, searchQuery]);

  return (
    <div className="container mx-auto px-4 py-8 pt-24 min-h-screen">
      {/* Header */}
      <div className="flex flex-col gap-6 mb-10">
        <div>
           <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
           <p className="text-gray-500 mt-1">Discover our premium collection</p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between gap-4">
           {/* Search */}
           <div className="relative w-full max-w-md">
             <input 
               type="text" 
               placeholder="Search products..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
             />
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
           </div>

           <div className="flex items-center gap-4">
             <div className="relative group">
               <button className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl hover:border-primary-500 transition-colors">
                 <span className="text-sm font-medium">Sort by: {sortBy}</span>
                 <ChevronDown size={16} />
               </button>
               <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-1 hidden group-hover:block z-20">
                 <button onClick={() => setSortBy('newest')} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 text-gray-700">Newest</button>
                 <button onClick={() => setSortBy('price-asc')} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 text-gray-700">Price: Low to High</button>
                 <button onClick={() => setSortBy('price-desc')} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 text-gray-700">Price: High to Low</button>
               </div>
             </div>
           </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Sidebar Filters */}
        <div className="lg:w-64 space-y-8 flex-shrink-0">
           {/* Categories */}
           <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
             <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
               <SlidersHorizontal size={18} /> Filters
             </h3>
             <div className="space-y-3">
               <p className="font-semibold text-sm text-gray-700">Category</p>
               {categories.map(cat => (
                 <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                   <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${selectedCategory === cat ? 'bg-primary-600 border-primary-600' : 'border-gray-300 bg-white'}`}>
                      {selectedCategory === cat && <div className="w-2 h-2 bg-white rounded-full" />}
                   </div>
                   <input 
                      type="radio" 
                      name="category" 
                      className="hidden" 
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(cat)} 
                   />
                   <span className={`${selectedCategory === cat ? 'text-primary-600 font-medium' : 'text-gray-600'} group-hover:text-primary-600 transition-colors`}>{cat}</span>
                 </label>
               ))}
             </div>
           </div>

           {/* Price Range */}
           <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <p className="font-semibold text-sm text-gray-700 mb-4">Max Price: ${priceRange}</p>
              <input 
                type="range" 
                min="0" 
                max="2000" 
                step="50"
                value={priceRange} 
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>$0</span>
                <span>$2000+</span>
              </div>
           </div>
           
           <Button variant="outline" className="w-full" onClick={() => {setSelectedCategory('All'); setPriceRange(2000); setSearchQuery('');}}>
             Reset Filters
           </Button>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 border-dashed">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={32} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-900">No products found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
              <button 
                onClick={() => {setSelectedCategory('All'); setPriceRange(2000); setSearchQuery('');}}
                className="mt-4 text-primary-600 font-medium hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};