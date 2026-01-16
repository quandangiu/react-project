import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AppState, Action, AuthResponse } from '../types';
import { db } from '../mockData';

const initialState: AppState = {
  cart: [],
  user: null,
  isAuthenticated: false,
  products: [],
  orders: [],
  messages: [],
  isLoading: true,
};

const StoreContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
  actions: {
    login: (email: string, pass: string) => Promise<void>;
    register: (data: any) => Promise<void>;
    logout: () => void;
  }
}>({ 
  state: initialState, 
  dispatch: () => null,
  actions: {
    login: async () => {},
    register: async () => {},
    logout: () => {}
  }
});

const storeReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'INIT_APP':
      return {
        ...state,
        products: db.getProducts(),
        orders: db.getOrders(),
        messages: db.getMessages(),
        isLoading: false
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    // AUTH
    case 'LOGIN_SUCCESS':
      return { 
        ...state, 
        user: action.payload.user, 
        isAuthenticated: true,
        isLoading: false 
      };
    case 'LOGOUT':
      return { 
        ...state, 
        user: null, 
        isAuthenticated: false,
        cart: [] // Clear cart on logout
      };
    case 'UPDATE_USER':
      return { 
        ...state, 
        user: state.user ? { ...state.user, ...action.payload } : null 
      };

    // CART
    case 'ADD_TO_CART': {
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { ...state, cart: [...state.cart, { ...action.payload, quantity: 1 }] };
    }
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter(item => item.id !== action.payload) };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(1, action.payload.quantity) }
            : item
        ),
      };
    case 'CLEAR_CART':
      return { ...state, cart: [] };

    // ADMIN
    case 'ADD_PRODUCT': {
      const newP = db.addProduct(action.payload);
      return { ...state, products: [newP, ...state.products] };
    }
    case 'UPDATE_PRODUCT': {
      db.updateProduct(action.payload);
      return { 
        ...state, 
        products: state.products.map(p => p.id === action.payload.id ? action.payload : p) 
      };
    }
    case 'DELETE_PRODUCT': {
      db.deleteProduct(action.payload);
      return { ...state, products: state.products.filter(p => p.id !== action.payload) };
    }
    case 'UPDATE_ORDER_STATUS': {
      db.updateOrderStatus(action.payload.orderId, action.payload.status);
      return {
        ...state,
        orders: state.orders.map(o => 
          o.id === action.payload.orderId ? { ...o, status: action.payload.status } : o
        )
      };
    }

    // ORDER
    case 'PLACE_ORDER': {
      db.createOrder(action.payload);
      return {
        ...state,
        orders: [action.payload, ...state.orders],
        cart: []
      };
    }

    // CHAT
    case 'SEND_MESSAGE': {
      db.addMessage(action.payload);
      return { ...state, messages: [...state.messages, action.payload] };
    }

    default:
      return state;
  }
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  // Initialize App Data
  useEffect(() => {
    // Simulate Network Latency for realism
    const init = async () => {
      await new Promise(r => setTimeout(r, 500));
      dispatch({ type: 'INIT_APP' });

      // Check for persisted session
      const session = localStorage.getItem('session');
      if (session) {
        const { user } = JSON.parse(session);
        dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token: 'mock-jwt' } });
      }
    };
    init();
  }, []);

  // Persist Cart
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  // Auth Actions Wrappers
  const actions = {
    login: async (email: string, pass: string) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      await new Promise(r => setTimeout(r, 800)); // Network delay
      try {
        const user = db.login(email, pass);
        const token = 'mock-jwt-token-' + Date.now();
        localStorage.setItem('session', JSON.stringify({ user, token }));
        dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } });
      } catch (e: any) {
        dispatch({ type: 'SET_LOADING', payload: false });
        throw new Error(e.message);
      }
    },
    register: async (data: any) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      await new Promise(r => setTimeout(r, 800));
      try {
        const user = db.register(data);
        const token = 'mock-jwt-token-' + Date.now();
        localStorage.setItem('session', JSON.stringify({ user, token }));
        dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } });
      } catch (e: any) {
        dispatch({ type: 'SET_LOADING', payload: false });
        throw new Error(e.message);
      }
    },
    logout: () => {
      localStorage.removeItem('session');
      dispatch({ type: 'LOGOUT' });
    }
  };

  return (
    <StoreContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);