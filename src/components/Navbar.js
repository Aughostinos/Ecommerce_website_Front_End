// Navbar.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BACKEND_URL from '../config';
import './Navbar.css';

const Navbar = ({ loggedInUser, setLoggedInUser }) => {
  const navigate = useNavigate();
  const [cartItemCount, setCartItemCount] = useState(0);
  const [categories, setCategories] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [wishlistItemCount, setWishlistItemCount] = useState(0);

  // Fetch cart item count
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/user/get-cart-wishlist`, {
          withCredentials: true,
        });
        const cartItems = response.data.cart || [];
        const wishlistItems = response.data.wishlist || [];
        const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
        setCartItemCount(cartCount);
        setWishlistItemCount(wishlistItems.length);
      } catch (error) {
        console.error('Failed to fetch counts:', error);
      }
    };

    if (loggedInUser) {
      fetchCounts();
    }
  }, [loggedInUser]);

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

  const handleSearchIconClick = () => {
    setShowSearch(!showSearch);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchQuery}`);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className='logo'>
        <Link to="/">
          <img src="/images/Logo.png" alt="E-Shop" className="logo" />
        </Link>
        </div>
      </div>

      {/* Desktop Menu */}
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

      {/* Mobile Menu Toggle */}
      <div className="mobile-menu-toggle" onClick={handleMobileMenuToggle}>
        ☰
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <ul className="mobile-nav-menu">
          <li><Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link></li>
          <li className="dropdown">
            <span>Categories ▼</span>
            <ul className="dropdown-content">
              {categories.map((category) => (
                <li key={category._id}>
                  <Link to={`/category/${category._id}`} onClick={() => setIsMobileMenuOpen(false)}>
                    {category.categoryName}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li><Link to="/about-us" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link></li>
          <li><Link to="/contact-us" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</Link></li>
          {loggedInUser ? (
            <>
              <li><Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>Profile</Link></li>
              <li><Link to="/order-history" onClick={() => setIsMobileMenuOpen(false)}>Order History</Link></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <li><Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>Sign In / Sign Up</Link></li>
          )}
        </ul>
      )}

      <div className="navbar-right">
        
        <Link to="/wishlist" className="wishlist-icon">
          ❤️<span className="wishlist-count">{wishlistItemCount}</span>
        </Link>

        <div className="search-container">
          <button className="search-icon" onClick={handleSearchIconClick}>
            🔍
          </button>
          {showSearch && (
            <form onSubmit={handleSearchSubmit} className="search-form">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          )}
        </div>
        <button
          className="theme-toggle"
          onClick={() => document.documentElement.setAttribute(
            'data-theme',
            document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light'
          )}
        >
          🌙
        </button>

        {/* Cart Icon as a Link */}
        <Link to="/cart" className="cart-icon">
          🛒<span className="cart-count">{cartItemCount}</span>
        </Link>

        {loggedInUser ? (
          <div className="user-info">
            <span className="user-name">{loggedInUser.name}</span>
            <img src="/images/user-icon.png" alt="User Icon" className="user-icon" />
            <div className="dropdown">
              <Link to="/profile">Profile</Link>
              <Link to="/order-history">Order History</Link>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        ) : (
          <div className="auth-links">
            <Link to="/login">Sign In</Link> / <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
