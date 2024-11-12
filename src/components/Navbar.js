// src/components/Navbar.js
import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BACKEND_URL from '../config';
import './style/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const { cart } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);

  const cartItemCount = Object.values(cart).reduce((total, item) => total + item.quantity, 0);
  const wishlistItemCount = wishlist.length;

  const [categories, setCategories] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileCategories, setShowMobileCategories] = useState(false);
  const isAdmin = user && user.role === 'admin';

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
    setUser(null);
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
        <div className="logo">
          <Link to="/">
            <img src="/images/Logo.png" alt="E-Shop" className="logo-image" />
          </Link>
        </div>
      </div>

      {/* Desktop Menu */}
      <ul className="nav-menu">
        <li><Link to="/">Home</Link></li>
        <li className="dropdown">
          <span className="dropdown-toggle">Categories ▼</span>
          <ul className="dropdown-menu">
            <li><Link to="/products/">All Products</Link></li>
            {categories.map((category) => (
              <li key={category._id}>
                <Link to={`/category/${category._id}`}>{category.categoryName}</Link>
              </li>
            ))}
          </ul>
        </li>
        <li><Link to="/about-us">About Us</Link></li>
        <li><Link to="/contact-us">Contact Us</Link></li>
        {isAdmin && (
          <li>
            <Link to="/admin" className="admin-link">
              Admin Panel
            </Link>
          </li>
        )}
      </ul>

      {/* Mobile Menu Toggle */}
      <div className="mobile-menu-toggle" onClick={handleMobileMenuToggle}>
        ☰
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <ul className="mobile-nav-menu">
          <li><Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link></li>
          <li>
            <span onClick={() => setShowMobileCategories(!showMobileCategories)}>Categories ▼</span>
            {showMobileCategories && (
              <ul className="dropdown-content">
                {categories.map((category) => (
                  <li key={category._id}>
                    <Link
                      to={`/category/${category._id}`}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setShowMobileCategories(false);
                      }}
                    >
                      {category.categoryName}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
          <li><Link to="/about-us" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link></li>
          <li><Link to="/contact-us" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</Link></li>
          {user ? (
            <>
              <li><Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>Profile</Link></li>
              <li><Link to="/order-history" onClick={() => setIsMobileMenuOpen(false)}>Order History</Link></li>
              <li><button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}>Logout</button></li>
            </>
          ) : (
            <li><Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>Sign In / Sign Up</Link></li>
          )}
        </ul>
      )}

      <div className="navbar-right">
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

        <Link to="/wishlist" className="wishlist-icon">
          ❤️<span className="wishlist-count">{wishlistItemCount}</span>
        </Link>

        <button
          className="theme-toggle"
          onClick={() =>
            document.documentElement.setAttribute(
              'data-theme',
              document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light'
            )
          }
        >
          🌙
        </button>

        <Link to="/cart" className="cart-icon">
          🛒<span className="cart-count">{cartItemCount}</span>
        </Link>

        {user ? (
          <div
            className="user-menu-container"
            onMouseEnter={() => setShowUserMenu(true)}
            onMouseLeave={() => setShowUserMenu(false)}
          >
            <div className="user-info">
              <span className="user-name">{user.name}</span>
              <img src="/images/user-icon.png" alt="User Icon" className="user-icon-image" />
            </div>
            {showUserMenu && (
              <div className="user-dropdown-menu">
                <Link to="/profile">Profile</Link>
                <Link to="/order-history">Order History</Link>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
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
