import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BACKEND_URL from '../../config';
import './ManageProducts.css';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    image: [],
  });
  const [editingProductId, setEditingProductId] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/admin/products`, {
        withCredentials: true,
      });
      console.log('Products response:', response.data);
      const productsData = response.data.products || response.data || [];
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/admin/categories`, {
        withCredentials: true,
      });
      console.log('Categories response:', response.data);
      const categoriesData = response.data.categories || response.data || [];
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.value.split(',') });
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    try {
      if (editingProductId) {
        // Update product
        await axios.put(
          `${BACKEND_URL}/admin/products/${editingProductId}`,
          formData,
          { withCredentials: true }
        );
        setEditingProductId(null);
      } else {
        // Create product
        await axios.post(`${BACKEND_URL}/admin/products`, formData, {
          withCredentials: true,
        });
      }
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        image: [],
      });
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category ? product.category._id : '',
      stock: product.stock,
      image: product.image,
    });
    setEditingProductId(product._id);
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`${BACKEND_URL}/admin/products/${productId}`, {
        withCredentials: true,
      });
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="manage-products">
      <h2>Manage Products</h2>

      <form className="product-form" onSubmit={handleCreateOrUpdate}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
        ></textarea>
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleInputChange}
          required
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.categoryName}
            </option>
          ))}
        </select>
        <input
          type="number"
          name="stock"
          placeholder="Stock Quantity"
          value={formData.stock}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URLs (comma-separated)"
          value={formData.image}
          onChange={handleImageChange}
        />
        <button type="submit">
          {editingProductId ? 'Update Product' : 'Add Product'}
        </button>
        {editingProductId && (
          <button
            type="button"
            onClick={() => {
              setEditingProductId(null);
              setFormData({
                name: '',
                description: '',
                price: '',
                category: '',
                stock: '',
                image: [],
              });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <table className="products-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>{product.category?.categoryName || 'Uncategorized'}</td>
              <td>{product.stock}</td>
              <td>
                <button onClick={() => handleEdit(product)}>Edit</button>
                <button onClick={() => handleDelete(product._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProducts;
