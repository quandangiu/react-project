export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  description: string;
  isNew?: boolean;
  stock: number;
  sold?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  avatar: string;
  phone?: string;
  address?: string;
}

export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface Order {
  id: string;
  userId: string;
  date: string;
  total: number;
  status: OrderStatus;
  items: CartItem[];
  shippingAddress: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isAdmin: boolean;
}

export type Action =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: Partial<User> }
  // Admin Actions
  | { type: 'ADD_PRODUCT'; payload: Product }
  | { type: 'UPDATE_PRODUCT'; payload: Product }
  | { type: 'DELETE_PRODUCT'; payload: number }
  | { type: 'UPDATE_ORDER_STATUS'; payload: { orderId: string; status: OrderStatus } }
  // Chat Actions
  | { type: 'SEND_MESSAGE'; payload: Message };

export interface AppState {
  cart: CartItem[];
  user: User | null;
  products: Product[];
  orders: Order[];
  messages: Message[];
  isLoading: boolean;
}