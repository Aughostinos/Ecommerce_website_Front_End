import { useState, useEffect } from 'react';
import axios from 'axios';
import BACKEND_URL from '../config';

const Profile = () => {
    const [user, setUser] = useState({ name: '', email: '' });

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BACKEND_URL}/users/me`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUser(response.data);
        };

        fetchProfile();
    }, []);

    return (
        <div>
            <h1>Your Profile</h1>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
        </div>
    );
};

export default Profile;
