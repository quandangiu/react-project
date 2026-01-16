import { Product, User, Order, Message } from './types';

// --- INITIAL SEED DATA (Only used if LocalStorage is empty) ---
const SEED_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
    price: 348,
    originalPrice: 399,
    rating: 4.8,
    reviews: 1250,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=500&q=80",
    category: "Electronics",
    description: "Industry-leading noise cancellation optimized to you. Magnificent Sound, engineered to perfection.",
    stock: 45,
    sold: 200,
    isNew: true
  },
  {
    id: 2,
    name: "MacBook Air M2 13-inch 256GB",
    price: 1099,
    originalPrice: 1199,
    rating: 4.9,
    reviews: 850,
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=500&q=80",
    category: "Electronics",
    description: "Supercharged by M2 chip. 13.6-inch Liquid Retina display. Up to 18 hours of battery life.",
    stock: 20,
    sold: 150
  },
  {
    id: 3,
    name: "Premium Leather Weekend Bag",
    price: 185,
    rating: 4.6,
    reviews: 120,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80",
    category: "Fashion",
    description: "Handcrafted from full-grain leather. Perfect for short trips and gym visits.",
    stock: 15,
    sold: 45
  },
  {
    id: 4,
    name: "Smart Home Security Camera System",
    price: 249,
    originalPrice: 299,
    rating: 4.5,
    reviews: 340,
    image: "https://images.unsplash.com/photo-1558002038-10914cba6b97?auto=format&fit=crop&w=500&q=80",
    category: "Home",
    description: "2K Resolution, 365-day battery life, AI detection, and weather resistance.",
    stock: 50,
    sold: 120
  },
  {
    id: 5,
    name: "Minimalist Automatic Watch",
    price: 159,
    rating: 4.7,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=500&q=80",
    category: "Accessories",
    description: "Japanese automatic movement, sapphire crystal glass, genuine leather strap.",
    stock: 30,
    sold: 60
  },
  {
    id: 6,
    name: "Organic Vitamin C Serum",
    price: 35,
    rating: 4.4,
    reviews: 450,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=500&q=80",
    category: "Beauty",
    description: "Brightens skin tone and reduces signs of aging. 100% vegan and cruelty-free.",
    stock: 100,
    sold: 800
  },
  {
    id: 7,
    name: "Ergonomic Office Chair",
    price: 299,
    originalPrice: 450,
    rating: 4.6,
    reviews: 210,
    image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&w=500&q=80",
    category: "Home",
    description: "Designed for all-day comfort with lumbar support and breathable mesh.",
    stock: 10,
    sold: 95
  },
  {
    id: 8,
    name: "Running Shoes - Speed Pro",
    price: 120,
    rating: 4.8,
    reviews: 560,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80",
    category: "Sports",
    description: "Lightweight, responsive cushioning for your fastest runs yet.",
    stock: 60,
    sold: 300,
    isNew: true
  }
];

// Seed Admin for testing (User still needs to Register for normal flow)
const SEED_ADMIN: User = {
  id: 'admin-01',
  name: 'System Admin',
  email: 'admin@luxe.com',
  password: 'admin', // Simple password for demo
  role: 'admin',
  avatar: 'https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff',
  joinedAt: new Date().toISOString()
};

const SEED_MESSAGES: Message[] = [
  { id: 'm1', senderId: 'system', text: 'Hello! Welcome to LuxeMarket support.', timestamp: new Date(Date.now() - 100000).toISOString(), isAdmin: true },
];

// --- MOCK DATABASE SERVICE ---

class MockDatabase {
  private get<T>(key: string, defaultValue: T): T {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  }

  private set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  init() {
    if (!localStorage.getItem('products')) {
      this.set('products', SEED_PRODUCTS);
    }
    if (!localStorage.getItem('users')) {
      this.set('users', [SEED_ADMIN]);
    }
    if (!localStorage.getItem('orders')) {
      this.set('orders', []);
    }
    if (!localStorage.getItem('messages')) {
      this.set('messages', SEED_MESSAGES);
    }
  }

  // --- PRODUCT OPS ---
  getProducts(): Product[] {
    return this.get<Product[]>('products', []);
  }

  addProduct(product: Product): Product {
    const products = this.getProducts();
    const newProduct = { ...product, id: Date.now() };
    products.unshift(newProduct);
    this.set('products', products);
    return newProduct;
  }

  updateProduct(product: Product): Product {
    const products = this.getProducts().map(p => p.id === product.id ? product : p);
    this.set('products', products);
    return product;
  }

  deleteProduct(id: number) {
    const products = this.getProducts().filter(p => p.id !== id);
    this.set('products', products);
  }

  // --- USER OPS ---
  getUsers(): User[] {
    return this.get<User[]>('users', []);
  }

  register(userData: Omit<User, 'id' | 'role' | 'avatar' | 'joinedAt'>): User {
    const users = this.getUsers();
    if (users.find(u => u.email === userData.email)) {
      throw new Error('Email already exists');
    }
    const newUser: User = {
      ...userData,
      id: `user-${Date.now()}`,
      role: 'user',
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=random`,
      joinedAt: new Date().toISOString()
    };
    users.push(newUser);
    this.set('users', users);
    return newUser;
  }

  login(email: string, password: string): User {
    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Invalid email or password');
    }
    // Return user without password
    const { password: _, ...safeUser } = user;
    return safeUser as User;
  }

  updateUser(id: string, updates: Partial<User>): User {
    const users = this.getUsers();
    const index = users.findIndex(u => u.id === id);
    if (index === -1) throw new Error('User not found');
    
    users[index] = { ...users[index], ...updates };
    this.set('users', users);
    
    const { password: _, ...safeUser } = users[index];
    return safeUser as User;
  }

  // --- ORDER OPS ---
  getOrders(): Order[] {
    return this.get<Order[]>('orders', []);
  }

  createOrder(order: Order): Order {
    const orders = this.getOrders();
    orders.unshift(order);
    this.set('orders', orders);
    return order;
  }

  updateOrderStatus(orderId: string, status: string) {
    const orders = this.getOrders().map(o => o.id === orderId ? { ...o, status: status } : o);
    this.set('orders', orders);
  }

  // --- CHAT OPS ---
  getMessages(): Message[] {
    return this.get<Message[]>('messages', []);
  }

  addMessage(message: Message) {
    const msgs = this.getMessages();
    msgs.push(message);
    this.set('messages', msgs);
  }
}

export const db = new MockDatabase();
db.init(); // Ensure DB is seeded on load