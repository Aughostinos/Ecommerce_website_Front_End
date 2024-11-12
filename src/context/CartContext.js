import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import BACKEND_URL from '../config';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/user/get-cart-wishlist`, {
          withCredentials: true,
        });
        const cartItems = response.data.cart || [];
        const initialCart = {};
        cartItems.forEach((item) => {
          initialCart[item.product._id] = {
            product: item.product,
            quantity: item.quantity,
          };
        });
        setCart(initialCart);
      } catch (error) {
        console.error('Failed to fetch cart:', error);
      }
    };

    fetchCart();
  }, [cart]);

  const updateCart = async (productId, quantity) => {
    try {
      if (quantity < 1) {
        // Remove from cart
        await axios.post(
          `${BACKEND_URL}/user/remove-from-cart`,
          { productId },
          { withCredentials: true }
        );
        setCart((prev) => {
          const updatedCart = { ...prev };
          delete updatedCart[productId];
          return updatedCart;
        });
      } else {
        // Update cart item
        await axios.post(
          `${BACKEND_URL}/user/add-to-cart`,
          { productId, quantity },
          { withCredentials: true }
        );
        setCart((prev) => ({
          ...prev,
          [productId]: {
            ...prev[productId],
            quantity,
          },
        }));
      }
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, setCart, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
