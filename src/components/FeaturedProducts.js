import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BACKEND_URL from '../config';
import './FeaturedProducts.css';

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);

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
    fetchFavorites();
  }, []);


  const fetchFeaturedProducts = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/products/featured`);
      setFeaturedProducts(response.data);
    } catch (error) {
      console.error('Error fetching featured products:', error);
    }
  };

  const fetchFavorites = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/user/favorites`, {
        withCredentials: true,
      });
      setFavorites(response.data.favorites);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const toggleFavorite = async (productId) => {
    try {
      if (favorites.includes(productId)) {
        // Remove from favorites
        await axios.delete(`${BACKEND_URL}/user/favorites/${productId}`, {
          withCredentials: true,
        });
        setFavorites(favorites.filter((id) => id !== productId));
      } else {
        // Add to favorites
        await axios.post(
          `${BACKEND_URL}/user/favorites`,
          { productId },
          { withCredentials: true }
        );
        setFavorites([...favorites, productId]);
      }
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };

  const addToCart = async (productId) => {
    try {
      await axios.post(
        `${BACKEND_URL}/cart`,
        { productId, quantity: 1 },
        { withCredentials: true }
      );
    } catch (error) {
      console.error('Error adding to cart:', error);
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
              className={`favorite-button ${favorites.includes(product._id) ? 'favorited' : ''
                }`}
              onClick={() => toggleFavorite(product._id)}
            >
              <i className="fa fa-heart"></i>
            </button>
          </div>
          <div className="product-info">
            <Link to={`/product/${product._id}`}>
              <h3>{product.name}</h3>
            </Link>
            <p>${product.price.toFixed(2)}</p>
            <button onClick={() => addToCart(product._id)}>Add to Cart</button>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default FeaturedProducts;
