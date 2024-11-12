// src/components/FeaturedProducts.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BACKEND_URL from '../config';
import ProductCard from './ProductCard';
import './style/FeaturedProducts.css';

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

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

  return (
    <div className="featured-products">
      <h2>Featured Products</h2>
      <div className="product-list">
        {featuredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
