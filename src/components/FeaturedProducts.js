import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BACKEND_URL from '../config';
import './FeaturedProducts.css';

const FeaturedProducts = () => {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [wishlist, setWishlist] = useState([]);

  // Fetch featured products
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/products/featured`);
        setFeaturedProducts(response.data);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      }
    };

    fetchFeaturedProducts();
  }, []);

  // Fetch cart and wishlist data
  useEffect(() => {
    const fetchCartAndWishlist = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/user/get-cart-wishlist`, {
          withCredentials: true,
        });
        const cartItems = response.data.cart;
        const wishlistItems = response.data.wishlist;

        // Initialize cart state
        const initialCart = {};
        cartItems.forEach((item) => {
          initialCart[item.product._id] = item.quantity;
        });
        setCart(initialCart);

        // Initialize wishlist state
        setWishlist(wishlistItems.map((item) => item._id));
      } catch (error) {
        console.error('Failed to fetch cart and wishlist:', error);
      }
    };

    fetchCartAndWishlist();
  }, []);

  // Toggle wishlist functionality
  const toggleWishlist = async (productId) => {
    const inWishlist = wishlist.includes(productId);

    try {
      const endpoint = inWishlist ? 'remove-from-wishlist' : 'add-to-wishlist';
      await axios.post(
        `${BACKEND_URL}/user/${endpoint}`,
        { productId },
        { withCredentials: true }
      );

      // Update wishlist state
      setWishlist((prev) =>
        inWishlist ? prev.filter((id) => id !== productId) : [...prev, productId]
      );
      console.log('Wishlist updated successfully');
    } catch (error) {
      console.error('Error updating wishlist:', error);
    }
  };

  // Update cart quantity
  const updateCart = async (productId, quantity) => {
    try {
      if (quantity < 0) return;

      const endpoint = quantity === 0 ? 'remove-from-cart' : 'add-to-cart';
      const method = 'post';

      await axios({
        method: method,
        url: `${BACKEND_URL}/user/${endpoint}`,
        data: { productId },
        withCredentials: true,
      });

      setCart((prev) => {
        const updatedCart = { ...prev };

        if (quantity === 0) {
          delete updatedCart[productId];
        } else {
          updatedCart[productId] = quantity;
        }

        return updatedCart;
      });

      console.log('Cart updated successfully');
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  // Navigate to product details page
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="featured-products">
      <h2>Featured Products</h2>
      <div className="product-list">
        {featuredProducts.map((product) => {
          const inWishlist = wishlist.includes(product._id);
          const productQuantity = cart[product._id] || 0;

          return (
            <div key={product._id} className="product-card">
              <img
                src={product.image[0] || 'default-image-url.jpg'}
                alt={product.name}
                onClick={() => handleProductClick(product._id)}
              />
              <h2>{product.name}</h2>
              <p>${product.price}</p>
              <div className="product-actions">
                <button
                  className={`wishlist-button ${inWishlist ? 'filled' : 'outlined'}`}
                  onClick={() => toggleWishlist(product._id)}
                >
                  {inWishlist ? '❤️' : '🤍'}
                </button>
                <div className="cart-controls">
                  <button
                    onClick={() => updateCart(product._id, productQuantity - 1)}
                    disabled={productQuantity <= 1}
                  >
                    ➖
                  </button>
                  <span>{productQuantity}</span>
                  <button
                    onClick={() => updateCart(product._id, productQuantity + 1)}
                  >
                    ➕
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedProducts;
