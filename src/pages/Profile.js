import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BACKEND_URL from '../config';
import { useNavigate } from 'react-router-dom';
import './Profile.css';



const Profile = () => {
  const [userData, setUserData] = useState({
    name: '',
    userName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
  });
  const [message, setMessage] = useState('');
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/auth/user`, {
          withCredentials: true,
        });
        const { user } = response.data;
        setUserData({
          name: user.name || '',
          userName: user.userName || '',
          email: user.email || '',
          phone: user.phone || '',
          dateOfBirth: user.dateOfBirth ? user.dateOfBirth.split('T')[0] : '',
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();


    const fetchUserOrders = async () => {
        try {
          const response = await axios.get(`${BACKEND_URL}/order/my-orders`, {
            withCredentials: true,
          });
          setOrders(response.data.orders);
        } catch (error) {
          console.error('Error fetching user orders:', error);
        }
      };
  
      fetchUserOrders();
    }, []);

  

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${BACKEND_URL}/user/update-profile`,
        userData,
        { withCredentials: true }
      );
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="profile-page">
      <h2>My Profile</h2>
      <form className="profile-form" onSubmit={handleSaveChanges}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={userData.name}
          onChange={handleChange}
        />

        <label>Username</label>
        <input
          type="text"
          name="userName"
          value={userData.userName}
          onChange={handleChange}
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
        />

        <label>Phone</label>
        <input
          type="text"
          name="phone"
          value={userData.phone}
          onChange={handleChange}
        />

        <label>Date of Birth</label>
        <input
          type="date"
          name="dateOfBirth"
          value={userData.dateOfBirth}
          onChange={handleChange}
        />

        <button type="submit">Save Changes</button>
      </form>
      {message && <div className="profile-message">{message}</div>}
      <h2>Order History</h2>
      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <div className="order-history">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <h3>Order ID: {order._id}</h3>
              <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>Total: ${order.totalPrice.toFixed(2)}</p>
              <p>Status: {order.status}</p>
              <button onClick={() => navigate(`/order/${order._id}`)}>
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
