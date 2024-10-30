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
import axios from 'axios';
import BACKEND_URL from './config';
import './App.css';

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

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
      }
    };
  
    fetchUserData();
  }, []);

  return (
    <Router>
      <Navbar loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:id" element={<CategoryPage />} />
        <Route path="/login" element={<Login setLoggedInUser={setLoggedInUser} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={loggedInUser ? <CheckoutPage /> : <Navigate to="/login" />} />
        <Route
          path="/order-confirmation/:id"
          element={loggedInUser ? <OrderConfirmationPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={loggedInUser ? <Profile /> : <Navigate to="/login" />}
        />
         <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
