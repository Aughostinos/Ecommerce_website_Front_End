import { useState, useEffect } from 'react';
import axios from 'axios';
import BACKEND_URL from '../config';

const useWishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/user/get-cart-wishlist`, {
          withCredentials: true,
        });
        const wishlistItems = response.data.wishlist || [];
        setWishlist(wishlistItems.map((item) => item._id));
      } catch (error) {
        console.error('Failed to fetch wishlist:', error);
      }
    };

    fetchWishlist();
  }, []);

  const toggleWishlist = async (productId) => {
    const inWishlist = wishlist.includes(productId);

    try {
      const endpoint = inWishlist ? 'remove-from-wishlist' : 'add-to-wishlist';
      await axios.post(
        `${BACKEND_URL}/user/${endpoint}`,
        { productId },
        { withCredentials: true }
      );

      setWishlist((prev) =>
        inWishlist ? prev.filter((id) => id !== productId) : [...prev, productId]
      );
    } catch (error) {
      console.error('Error updating wishlist:', error);
    }
  };

  return { wishlist, toggleWishlist };
};

export default useWishlist;
