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
  password?: string; // Only for internal mock DB logic, never exposed to UI in real app
  joinedAt: string;
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
  paymentMethod: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isAdmin: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export type Action =
  | { type: 'INIT_APP' }
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOGIN_SUCCESS'; payload: AuthResponse }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: Partial<User> }
  | { type: 'SET_LOADING'; payload: boolean }
  // Admin Actions
  | { type: 'ADD_PRODUCT'; payload: Product }
  | { type: 'UPDATE_PRODUCT'; payload: Product }
  | { type: 'DELETE_PRODUCT'; payload: number }
  | { type: 'UPDATE_ORDER_STATUS'; payload: { orderId: string; status: OrderStatus } }
  | { type: 'PLACE_ORDER'; payload: Order }
  // Chat Actions
  | { type: 'SEND_MESSAGE'; payload: Message };

export interface AppState {
  cart: CartItem[];
  user: User | null;
  isAuthenticated: boolean;
  products: Product[];
  orders: Order[];
  messages: Message[];
  isLoading: boolean;
}