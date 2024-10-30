import React, { useState } from 'react';
import axios from 'axios';
import BACKEND_URL from '../config';

const AddProductForm = () => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
  });
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare form data
      const formData = new FormData();
      Object.keys(productData).forEach((key) => {
        formData.append(key, productData[key]);
      });

      // Append images
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
      }

      await axios.post(`${BACKEND_URL}/products/add-product`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      setMessage('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
      setMessage('Failed to add product.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Product</h2>

      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={productData.name}
        onChange={handleInputChange}
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={productData.description}
        onChange={handleInputChange}
        required
      ></textarea>

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={productData.price}
        onChange={handleInputChange}
        required
      />

      <input
        type="text"
        name="category"
        placeholder="Category ID"
        value={productData.category}
        onChange={handleInputChange}
        required
      />

      <input
        type="number"
        name="stock"
        placeholder="Stock"
        value={productData.stock}
        onChange={handleInputChange}
        required
      />

      <input
        type="file"
        name="images"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        required
      />

      <button type="submit">Add Product</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default AddProductForm;
