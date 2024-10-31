import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import BACKEND_URL from './config';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/user/profile`, {
          withCredentials: true,
        });
        setLoggedInUser(response.data.user);
      } catch (error) {
        setLoggedInUser(null);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </UserContext.Provider>
  );
};
