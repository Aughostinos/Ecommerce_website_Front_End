// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Profile from './pages/Profile';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import NotFound from './pages/NotFound';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
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
import axios from 'axios';
import BACKEND_URL from './config';
import './App.css';

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const isAdmin = loggedInUser && loggedInUser.role === 'admin';

  // Check if user is logged in by checking the JWT cookie
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/auth/user`, {
          withCredentials: true,
        });
        setLoggedInUser(response.data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoggedInUser(null);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Router>
      <Navbar loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:id" element={<CategoryPage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/login" element={<Login setLoggedInUser={setLoggedInUser} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route
            path="/checkout"
            element={loggedInUser ? <CheckoutPage /> : <Navigate to="/login" replace />}
          />
          <Route path="/search" element={<SearchResults />} />
          <Route
            path="/order-confirmation/:id"
            element={loggedInUser ? <OrderConfirmationPage /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/order-history"
            element={loggedInUser ? <OrderHistory /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/profile"
            element={loggedInUser ? <Profile /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/wishlist"
            element={loggedInUser ? <WishlistPage /> : <Navigate to="/login" replace />}
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
    </Router>
  );
};

export default App;
