import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Profile from './pages/Profile';
import Home from './pages/Home';
import { UserProvider, UserContext } from './context/UserContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import AllProducts from './pages/AllProducts';
import CategoryPage from './pages/CategoryPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import NotFound from './pages/NotFound';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import OrderDetails from './pages/OrderDetails';
import WishlistPage from './pages/WishlistPage';
import AdminDashboard from './pages/adminPages/AdminDashboard';
import ManageUsers from './pages/adminPages/ManageUsers';
import ManageProducts from './pages/adminPages/ManageProducts';
import ManageOrders from './pages/adminPages/ManageOrders';
import ManageCategories from './pages/adminPages/ManageCategories';
import SearchResults from './pages/SearchResults';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import OrderHistory from './pages/OrderHistory';
import Footer from './components/Footer';
import './App.css';

const App = () => {
  return (
    <Router>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </Router>
  );
};

const AppContent = () => {
  const { user } = useContext(UserContext);
  const isAdmin = user && user.role === 'admin';

  return (
    <CartProvider>
      <WishlistProvider>
        <div className="app-container">
          <Navbar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products/" element={<AllProducts />} />
              <Route path="/category/:id" element={<CategoryPage />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/product/:id" element={<ProductDetailsPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/order/:id" element={<OrderDetails />} />
              <Route path="/search" element={<SearchResults />} />
              <Route
                path="/checkout"
                element={user ? <CheckoutPage /> : <Navigate to="/login" replace />}
              />
              <Route
                path="/order-confirmation/:id"
                element={user ? <OrderConfirmationPage /> : <Navigate to="/login" replace />}
              />
              <Route
                path="/order-history"
                element={user ? <OrderHistory /> : <Navigate to="/login" replace />}
              />
              <Route
                path="/profile"
                element={user ? <Profile /> : <Navigate to="/login" replace />}
              />
              <Route
                path="/wishlist"
                element={user ? <WishlistPage /> : <Navigate to="/login" replace />}
              />
              {isAdmin && (
                <>
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/users" element={<ManageUsers />} />
                  <Route path="/admin/products" element={<ManageProducts />} />
                  <Route path="/admin/orders" element={<ManageOrders />} />
                  <Route path="/admin/categories" element={<ManageCategories />} />
                </>
              )}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </WishlistProvider>
    </CartProvider>
  );
};

export default App;
