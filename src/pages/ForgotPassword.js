import React, { useState } from 'react';
import axios from 'axios';
import BACKEND_URL from '../config';
import './style/ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BACKEND_URL}/auth/forgot-password`, { email });
      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setMessage('Failed to send password reset link. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='.forgot-password-container'>
      <h2>Forgot Password</h2>
      <input 
        type="email"
        name="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Send Reset Link</button>
      {message && <div>{message}</div>}
    </form>
  );
};

export default ForgotPassword;
