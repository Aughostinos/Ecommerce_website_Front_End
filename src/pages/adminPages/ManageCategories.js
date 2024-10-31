import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BACKEND_URL from '../../config';
import './ManageCategories.css';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    categoryName: '',
    description: '',
  });
  const [editingCategoryId, setEditingCategoryId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/admin/categories`, {
        withCredentials: true,
      });
      console.log('Categories response:', response.data);
  
      const categoriesData = Array.isArray(response.data)
        ? response.data
        : response.data.categories || [];
  
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]);
    }
  };

  const handleInputChange = (e) => {
    const updatedFormData = { ...formData, [e.target.name]: e.target.value };
    console.log('Updated formData:', updatedFormData);
    setFormData(updatedFormData);
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    try {
      if (editingCategoryId) {
        // Update category
        await axios.put(
          `${BACKEND_URL}/admin/categories/${editingCategoryId}`,
          formData,
          { withCredentials: true }
        );
        setEditingCategoryId(null);
      } else {
        // Create category
        console.log('FormData being sent:', formData);
        await axios.post(`${BACKEND_URL}/admin/categories`, formData, {
          withCredentials: true,
        });
      }
      setFormData({
        categoryName: '',
        description: '',
      });
      fetchCategories();
    } catch (error) {
      console.error('Error saving category:', error);
      if (error.response) {
        console.error('Server responded with:', error.response.data);
      }
    }
  };

  const handleEdit = (category) => {
    setFormData({
      categoryName: category.categoryName,
      description: category.description,
    });
    setEditingCategoryId(category._id);
  };

  const handleDelete = async (categoryId) => {
    try {
      await axios.delete(`${BACKEND_URL}/admin/categories/${categoryId}`, {
        withCredentials: true,
      });
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <div className="manage-categories">
      <h2>Manage Categories</h2>

      <form className="category-form" onSubmit={handleCreateOrUpdate}>
        <input
          type="text"
          name="categoryName"
          placeholder="Category Name"
          value={formData.categoryName}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
        ></textarea>
        <button type="submit">
          {editingCategoryId ? 'Update Category' : 'Add Category'}
        </button>
        {editingCategoryId && (
          <button
            type="button"
            onClick={() => {
              setEditingCategoryId(null);
              setFormData({ categoryName: '', description: '' });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <table className="categories-table">
        <thead>
          <tr>
            <th>Category Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category._id}>
              <td>{category.categoryName}</td>
              <td>{category.description}</td>
              <td>
                <button onClick={() => handleEdit(category)}>Edit</button>
                <button onClick={() => handleDelete(category._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCategories;
