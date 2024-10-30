import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BACKEND_URL from '../config';
import './Navbar.css';

const Navbar = ({ loggedInUser, setLoggedInUser }) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/category/get-categories`);
        const validCategories = response.data.filter((cat) => cat.categoryName);
        setCategories(validCategories);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleLogout = () => {
    document.cookie = 'jwt=; Max-Age=0; path=/;';
    setLoggedInUser(null);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <img src="/images/logo.png" alt="E-Shop Logo" className="logo" />
        </Link>
      </div>

      <ul className="nav-menu">
        <li><Link to="/">Home</Link></li>
        <li className="dropdown">
          <span>Categories ▼</span>
          <ul className="dropdown-content">
            {categories.map((category) => (
              <li key={category._id}>
                <Link to={`/category/${category._id}`}>{category.categoryName}</Link>
              </li>
            ))}
          </ul>
        </li>
        <li><Link to="/about-us">About Us</Link></li>
        <li><Link to="/contact-us">Contact Us</Link></li>
      </ul>

      <div className="navbar-right">
        <button 
          className="theme-toggle"
          onClick={() => document.documentElement.setAttribute(
            'data-theme',
            document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light'
          )}
        >
          🌙
        </button>

        {loggedInUser ? (
          <div className="user-info">
            <span className="user-name">{loggedInUser.name}</span>
            <img src="/images/user-icon.png" alt="User Icon" className="user-icon" />
            <div className="dropdown">
              <Link to="/profile">Profile</Link>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        ) : (
          <div className="auth-links">
            <Link to="/login">Sign In</Link> / <Link to="/signup">Sign Up</Link>
          </div>
        )}

        <div className="cart-icon">
          🛒<span className="cart-count">3</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
