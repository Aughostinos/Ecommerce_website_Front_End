// src/pages/ResetPassword.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BACKEND_URL from '../config';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BACKEND_URL}/auth/reset-password`, { password });
      setMessage('Password reset successfully!');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setMessage('Failed to reset password. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Reset Password</h2>
      <input
        type="password"
        name="password"
        placeholder="Enter your new password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Reset Password</button>
      {message && <div>{message}</div>}
    </form>
  );
};

export default ResetPassword;
