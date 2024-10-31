import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BACKEND_URL from '../config';
import './FeaturedProducts.css';

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [wishlist, setWishlist] = useState([]);


  useEffect(() => {
    const groupProductsByCategory = (products) => {
      const grouped = {};
      products.forEach((product) => {
        const categoryId = product.category._id || product.category;
        if (!grouped[categoryId]) {
          grouped[categoryId] = {
            categoryName: product.category.categoryName || 'Unknown Category',
            products: [],
          };
        }
        grouped[categoryId].products.push(product);
      });
      return grouped;
    };
    fetchFeaturedProducts();
  }, []);


  const fetchFeaturedProducts = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/products/featured`);
      setFeaturedProducts(response.data);
    } catch (error) {
      console.error('Error fetching featured products:', error);
    }
  };

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/user/get-cart-wishlist`, {
          withCredentials: true,
        });
        setWishlist(response.data.wishlist.map((item) => item._id));
      } catch (error) {
        console.error('Failed to fetch wishlist:', error);
      }
    };

    fetchWishlist();
  }, []);

  // Toggle wishlist functionality
  const toggleWishlist = async (productId) => {
    const inWishlist = wishlist.includes(productId);

    try {
      const endpoint = inWishlist ? 'remove-from-wishlist' : 'add-to-wishlist';
      // Use POST method for both adding and removing from wishlist
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

  // Add or remove product from the cart
  const updateCart = async (productId, quantity) => {
    try {
      if (quantity < 0) return;

      const endpoint = quantity === 0 ? 'remove-from-cart' : 'add-to-cart';
      const method = 'post'; // Use POST method for both adding and removing

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


  return (
    <div>
    <h2>Featured Products</h2>
    <div className="featured-products">
      {featuredProducts.map((product) => (
        <div className="product-card" key={product._id}>
          <div className="product-image">
            <Link to={`/product/${product._id}`}>
              <img src={product.image[0]} alt={product.name} />
            </Link>
            <button
              className={`favorite-button ${wishlist.includes(product._id) ? 'favorited' : ''
                }`}
              onClick={() => toggleWishlist(product._id)}
            >
              <i className="fa fa-heart"></i>
            </button>
          </div>
          <div className="product-info">
            <Link to={`/product/${product._id}`}>
              <h3>{product.name}</h3>
            </Link>
            <p>${product.price.toFixed(2)}</p>
            <button onClick={() => updateCart(product._id)}>Add to Cart</button>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default FeaturedProducts;
