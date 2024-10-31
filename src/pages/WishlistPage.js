import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BACKEND_URL from '../config';
import { useNavigate } from 'react-router-dom';
import './WishlistPage.css';

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/user/get-cart-wishlist`, {
          withCredentials: true,
        });
        setWishlistItems(response.data.wishlist);
      } catch (error) {
        console.error('Failed to fetch wishlist:', error);
      }
    };

    fetchWishlist();
  }, []);

  const handleRemoveFromWishlist = async (productId) => {
    try {
      await axios.post(
        `${BACKEND_URL}/user/remove-from-wishlist`,
        { productId },
        { withCredentials: true }
      );
      setWishlistItems((prevItems) =>
        prevItems.filter((item) => item._id !== productId)
      );
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      await axios.post(
        `${BACKEND_URL}/user/add-to-cart`,
        { productId },
        { withCredentials: true }
      );
      console.log('Product added to cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="wishlist-page">
      <h2>Your Wishlist</h2>
      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="wishlist-items">
          {wishlistItems.map((item) => (
            <div key={item._id} className="wishlist-item">
              <img
                src={item.image[0] || '/images/default-product.jpg'}
                alt={item.name}
                onClick={() => handleProductClick(item._id)}
              />
              <div className="item-details">
                <h3>{item.name}</h3>
                <p>Price: ${item.price}</p>
                <button onClick={() => handleAddToCart(item._id)}>Add to Cart</button>
                <button onClick={() => handleRemoveFromWishlist(item._id)}>
                  Remove from Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
