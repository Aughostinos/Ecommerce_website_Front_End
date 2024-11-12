import React from 'react';
import { Link } from 'react-router-dom';
import './style/AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h2>Admin Panel</h2>
      <div className="admin-sections">
        <Link to="/admin/users">Manage Users</Link>
        <Link to="/admin/categories">Manage Categories</Link>
        <Link to="/admin/products">Manage Products</Link>
        <Link to="/admin/orders">Manage Orders</Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
