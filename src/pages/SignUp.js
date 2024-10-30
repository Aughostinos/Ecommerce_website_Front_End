import React, { useState } from 'react';
import axios from 'axios';
import BACKEND_URL from '../config';
import './AuthForms.css';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    userName: '',
    email: '',
    password: '',
    phone: '',
    dateOfBirth: '',
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BACKEND_URL}/auth/register`, formData);
      setMessage('Account created successfully! Redirecting to login...');
      setErrors({});
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setErrors(error.response?.data.errors || {});
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <div className="error">{errors.name}</div>}

        <input
          type="text"
          name="userName"
          placeholder="Username"
          value={formData.userName}
          onChange={handleChange}
        />
        {errors.userName && <div className="error">{errors.userName}</div>}

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

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && <div className="error">{errors.phone}</div>}

        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
        />
        {errors.dateOfBirth && <div className="error">{errors.dateOfBirth}</div>}

        <button type="submit">Sign Up</button>
        <a href="/login">Already have an account? Log in</a>

        {message && <div className="success-message">{message}</div>}
      </form>
    </div>
  );
};

export default Signup;
