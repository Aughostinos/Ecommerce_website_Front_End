import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BACKEND_URL from '../config';
import './CategoryPage.css';

const CategoryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [wishlist, setWishlist] = useState([]);

  // Fetch products by category
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/products/get-products-by-category/${id}`);
        setProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, [id]);

  // Toggle wishlist functionality
  const toggleWishlist = async (productId) => {
    const inWishlist = wishlist.includes(productId);

    try {
      const endpoint = inWishlist ? 'remove-from-wishlist' : 'add-to-wishlist';
      await axios({
        method: inWishlist ? 'delete' : 'post',
        url: `${BACKEND_URL}/user/${endpoint}`,
        data: { productId },
        withCredentials: true,
      });

      // Update wishlist state
      setWishlist((prev) =>
        inWishlist ? prev.filter((id) => id !== productId) : [...prev, productId]
      );
      console.log('Wishlist updated successfully');
    } catch (error) {
      console.error('Error updating wishlist:', error);
    }
  };

  // Add or remove product from the cart
  const updateCart = async (productId, quantity) => {
    try {
      if (quantity < 0) return;

      const endpoint = quantity === 0 ? 'remove-from-cart' : 'add-to-cart';
      const method = quantity === 0 ? 'delete' : 'post';

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
    <div className="category-page">
      <h1>Products</h1>
      <div className="product-list">
        {products.map((product) => (
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
                className={`wishlist-button ${wishlist.includes(product._id) ? 'active' : ''}`}
                onClick={() => toggleWishlist(product._id)}
              >
                ❤️
              </button>
              <div className="cart-controls">
                <button
                  onClick={() => updateCart(product._id, (cart[product._id] || 1) - 1)}
                  disabled={!(cart[product._id] > 0)}
                >
                  ➖
                </button>
                <span>{cart[product._id] || 0}</span>
                <button onClick={() => updateCart(product._id, (cart[product._id] || 0) + 1)}>
                  ➕
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
