import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { StoreProvider, useStore } from './store/context';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ChatWidget } from './components/chat/ChatWidget';
import { Home } from './pages/Home';
import { ProductList } from './pages/ProductList';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Admin } from './pages/Admin';
import { Profile } from './pages/Profile';
import { MOCK_USER, MOCK_ADMIN } from './mockData';
import { Button } from './components/common/UI';

// Layout wrapper
const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <ChatWidget />
      <Footer />
    </div>
  );
};

// Simple Login Page for Demo
const Login = () => {
  const { dispatch } = useStore();
  const navigate = useNavigate();

  const handleLogin = (role: 'user' | 'admin') => {
    dispatch({ type: 'LOGIN', payload: role === 'admin' ? MOCK_ADMIN : MOCK_USER });
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-md w-full">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">Welcome Back</h2>
        <div className="space-y-4">
          <Button onClick={() => handleLogin('user')} className="w-full">Login as Customer</Button>
          <Button onClick={() => handleLogin('admin')} variant="outline" className="w-full">Login as Admin</Button>
        </div>
      </div>
    </div>
  );
};

const ProtectedRoute = ({ children, role }: { children: React.ReactElement, role?: string }) => {
  const { state } = useStore();
  if (!state.user) return <Navigate to="/login" replace />;
  if (role && state.user.role !== role) return <Navigate to="/" replace />;
  return children;
};

const App: React.FC = () => {
  return (
    <StoreProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="products" element={<ProductList />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="cart" element={<Cart />} />
            
            <Route path="checkout" element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            } />
            
            <Route path="profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />

            <Route path="admin" element={
              <ProtectedRoute role="admin">
                <Admin />
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </Router>
    </StoreProvider>
  );
};

export default App;