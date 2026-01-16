import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AppState, Action, Product, CartItem } from '../types';
import { MOCK_PRODUCTS, MOCK_ORDERS, MOCK_MESSAGES } from '../mockData';

const initialState: AppState = {
  cart: [],
  user: null,
  products: MOCK_PRODUCTS,
  orders: MOCK_ORDERS,
  messages: MOCK_MESSAGES,
  isLoading: false,
};

const StoreContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

const storeReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    // CART ACTIONS
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

    // AUTH & USER ACTIONS
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'UPDATE_USER':
      return { ...state, user: state.user ? { ...state.user, ...action.payload } : null };

    // ADMIN - PRODUCT ACTIONS
    case 'ADD_PRODUCT':
      return { ...state, products: [action.payload, ...state.products] };
    case 'UPDATE_PRODUCT':
      return { 
        ...state, 
        products: state.products.map(p => p.id === action.payload.id ? action.payload : p) 
      };
    case 'DELETE_PRODUCT':
      return { ...state, products: state.products.filter(p => p.id !== action.payload) };

    // ADMIN - ORDER ACTIONS
    case 'UPDATE_ORDER_STATUS':
      return {
        ...state,
        orders: state.orders.map(o => 
          o.id === action.payload.orderId ? { ...o, status: action.payload.status } : o
        )
      };

    // CHAT ACTIONS
    case 'SEND_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };

    default:
      return state;
  }
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  // Persistence logic (Simplified)
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedUser = localStorage.getItem('user');
    
    // In real app, we would dispatch actions to hydrate state here
    // For this demo, we rely on the component mounting and local state logic
    // or we could modify initial state.
    // However, to keep it simple and clean, we will just persist CART
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);