// src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BACKEND_URL from '../config';
import './AuthForms.css';

const Login = ({ setLoggedInUser }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // React Router's navigate function

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BACKEND_URL}/auth/login`, formData);
      document.cookie = `jwt=${response.data.token}; path=/;`; // Store JWT in cookies
      setMessage('Login successful!');
      setLoggedInUser(response.data.user); // Pass user data to App state
      setTimeout(() => navigate('/'), 1000); // Redirect after 1 second
    } catch (error) {
      setErrors(error.response?.data.errors || {});
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <div className="error">{errors.email}</div>}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <div className="error">{errors.password}</div>}
        <button type="submit">Login</button>
        <a href="/forgot-password">Forgot Password?</a>
        {message && <div className="success-message">{message}</div>}
      </form>
    </div>
  );
};

export default Login;
