import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BACKEND_URL from '../config';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/category/get-categories`)
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  return (
    <ul>
      {categories.map(category => (
        <li key={category._id}><a href={`/category/${category._id}`}>{category.categoryName}</a></li>
      ))}
    </ul>
  );
};

export default Categories;
