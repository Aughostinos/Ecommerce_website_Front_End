import React, { useState } from 'react';
import axios from 'axios';
import BACKEND_URL from '../config';
import { useNavigate } from 'react-router-dom';
import './style/CheckoutPage.css';

const CheckoutPage = () => {
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const [paymentMethod] = useState('Cash on Delivery');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    try {
      // Fetch cart items
      const cartResponse = await axios.get(`${BACKEND_URL}/user/get-cart-wishlist`, {
        withCredentials: true,
      });
      const cartItems = cartResponse.data.cart;

      // Prepare order items
      const orderItems = cartItems.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      }));

      // Create order on backend
      const orderResponse = await axios.post(
        `${BACKEND_URL}/order/create-order`,
        {
          orderItems,
          shippingAddress,
          paymentMethod,
        },
        { withCredentials: true }
      );

      const order = orderResponse.data.order;

      // Redirect to order confirmation page
      navigate(`/order-confirmation/${order._id}`);
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      <div className="shipping-form">
        <h3>Shipping Address</h3>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={shippingAddress.fullName}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={shippingAddress.address}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={shippingAddress.city}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="postalCode"
          placeholder="Postal Code"
          value={shippingAddress.postalCode}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={shippingAddress.country}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="payment-method">
        <h3>Payment Method</h3>
        <p>Cash on Delivery</p>
      </div>
      <button onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
};

export default CheckoutPage;
