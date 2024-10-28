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
import './App.css';

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Check if user is logged in by checking the JWT cookie
  useEffect(() => {
    const jwt = document.cookie.split('; ').find((row) => row.startsWith('jwt='));
    if (jwt) {
      // Simulate fetching user details (replace with API call if necessary)
      setLoggedInUser({ name: 'John Doe' }); // Replace with real user data
    }
  }, []);

  return (
    <Router>
      <Navbar loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setLoggedInUser={setLoggedInUser} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/profile"
          element={loggedInUser ? <Profile /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
