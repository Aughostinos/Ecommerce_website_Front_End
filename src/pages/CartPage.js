// src/pages/CartPage.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import CartItem from '../components/CartItem';
import './style/CartPage.css';

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, updateCart } = useContext(CartContext);

  const cartItems = Object.values(cart);

  const handleQuantityChange = (productId, quantity) => {
    updateCart(productId, quantity);
  };

  const handleRemoveItem = (productId) => {
    updateCart(productId, 0);
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <CartItem
              key={item.product._id}
              item={item}
              handleQuantityChange={handleQuantityChange}
              handleRemoveItem={handleRemoveItem}
            />
          ))}
          <button onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
