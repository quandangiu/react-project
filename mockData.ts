import { Product, User, Order, Message } from './types';

// Helper to generate products
const generateProducts = (count: number): Product[] => {
  const categories = ['Electronics', 'Fashion', 'Home', 'Accessories', 'Beauty'];
  const products: Product[] = [];
  
  for (let i = 1; i <= count; i++) {
    const cat = categories[Math.floor(Math.random() * categories.length)];
    const price = Math.floor(Math.random() * 500) + 20;
    
    products.push({
      id: i,
      name: `${cat} Premium Item ${i} - Limited Edition`,
      price: price,
      originalPrice: Math.random() > 0.5 ? price + 50 : undefined,
      rating: Number((3.5 + Math.random() * 1.5).toFixed(1)),
      reviews: Math.floor(Math.random() * 500),
      image: `https://picsum.photos/400/400?random=${i}`,
      category: cat,
      description: "Experience premium quality with this meticulously crafted item. Designed for durability and style, it fits perfectly into your modern lifestyle.",
      isNew: Math.random() > 0.8,
      stock: Math.floor(Math.random() * 50),
      sold: Math.floor(Math.random() * 1000)
    });
  }
  return products;
};

export const MOCK_PRODUCTS: Product[] = generateProducts(50);

export const MOCK_USER: User = {
  id: 'u1',
  name: 'Alex Johnson',
  email: 'alex.j@example.com',
  role: 'user',
  avatar: 'https://i.pravatar.cc/150?u=u1',
  phone: '+1 234 567 890',
  address: '123 Main St, New York, NY'
};

export const MOCK_ADMIN: User = {
  id: 'a1',
  name: 'Admin User',
  email: 'admin@luxemarket.com',
  role: 'admin',
  avatar: 'https://i.pravatar.cc/150?u=a1'
};

export const MOCK_ORDERS: Order[] = [
  { 
    id: 'ORD-7782', 
    userId: 'u1', 
    date: '2023-10-15', 
    total: 348, 
    status: 'Delivered', 
    items: [
      { ...MOCK_PRODUCTS[0], quantity: 1 }
    ],
    shippingAddress: '123 Main St, NY'
  },
  { 
    id: 'ORD-9921', 
    userId: 'u1', 
    date: '2023-11-20', 
    total: 120, 
    status: 'Processing', 
    items: [
      { ...MOCK_PRODUCTS[2], quantity: 2 }
    ],
    shippingAddress: '123 Main St, NY'
  },
];

export const MOCK_MESSAGES: Message[] = [
  { id: 'm1', senderId: 'system', text: 'Hello! How can we help you today?', timestamp: new Date(Date.now() - 100000).toISOString(), isAdmin: true },
];