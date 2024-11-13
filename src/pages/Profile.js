import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BACKEND_URL from '../config';
import './style/Profile.css';



const Profile = () => {
  const [userData, setUserData] = useState({
    name: '',
    userName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
  });
  const [message, setMessage] = useState('');


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
  }
  , []);

  

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
    </div>
  );
};

export default Profile;
