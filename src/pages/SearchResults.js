// src/pages/SearchResults.js
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import BACKEND_URL from '../config';
import './style/SearchResults.css';

const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query');

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/products/search?query=${encodeURIComponent(query)}`);
        setProducts(response.data.products || []);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  return (
    <div className="search-results-page">
      <h2>Search Results for "{query}"</h2>
      {products.length > 0 ? (
        <div className="search-product-list">
          {products.map((product) => (
            <div key={product._id} className="search-product-card">
              <Link to={`/product/${product._id}`}>
                <img src={product.image[0]} alt={product.name} />
              </Link>
              <div className="product-info">
                <Link to={`/product/${product._id}`}>
                  <h3>{product.name}</h3>
                </Link>
                <p>${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default SearchResults;
