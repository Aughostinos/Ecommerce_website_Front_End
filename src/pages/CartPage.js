import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BACKEND_URL from '../config';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/user/get-cart-wishlist`, {
          withCredentials: true,
        });
        setCartItems(response.data.cart);
        console.log('Cart Items:', response.data.cart);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCart();
  }, []);

  const handleQuantityChange = async (productId, quantity) => {
    try {
      await axios.put(
        `${BACKEND_URL}/user/update-cart-item`,
        { productId, quantity },
        { withCredentials: true }
      );
      // Update cartItems state
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.product._id === productId ? { ...item, quantity } : item
        )
      );
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      await axios.delete(`${BACKEND_URL}/user/remove-from-cart`, {
        data: { productId },
        withCredentials: true,
      });
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.product._id !== productId)
      );
    } catch (error) {
      console.error('Error removing cart item:', error);
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => {
            if (!item.product) {
              // Skip items without a valid product
              return null;
            }

            const productImage = item.product.image?.[0] || '/path/to/default-image.jpg';

            return (
              <div key={item.product._id} className="cart-item">
                <img src={productImage} alt={item.product.name} />
                <div className="item-details">
                  <h3>{item.product.name}</h3>
                  <p>Price: ${item.product.price}</p>
                  <div className="quantity-controls">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.product._id, item.quantity - 1)
                      }
                      disabled={item.quantity === 1}
                    >
                      ➖
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.product._id, item.quantity + 1)
                      }
                    >
                      ➕
                    </button>
                  </div>
                  <button onClick={() => handleRemoveItem(item.product._id)}>
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
          <button onClick={handleCheckout}>Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
