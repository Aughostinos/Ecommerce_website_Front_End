import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BACKEND_URL from '../config';
import ProductCard from '../components/ProductCard';
import './style/CategoryPage.css';

const CategoryPage = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);

  // Fetch products by category
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/products/get-products-by-category/${id}`
        );
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, [id]);

  return (
    <div className="category-page">
      <h1>Products</h1>
      <div className="product-list">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
