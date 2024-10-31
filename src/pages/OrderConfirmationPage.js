import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BACKEND_URL from '../config';
import './OrderConfirmationPage.css';

const OrderConfirmationPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the order details
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/order/${id}`, {
          withCredentials: true,
        });
        setOrder(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order details:', error);
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  if (loading) {
    return <p>Loading order details...</p>;
  }

  if (!order) {
    return <p>Order not found.</p>;
  }


  return (
    <div className="order-confirmation">
      <h2>Order Confirmed!</h2>
      <p>Thank you for your purchase. Your order ID is {order._id}.</p>
      <h3>Order Details:</h3>
      <ul>
        {order.orderItems.map((item) => (
          <li key={item.product}>
            {item.quantity} x {item.product.name} - ${item.price * item.quantity}
          </li>
        ))}
      </ul>
      <p>Total Price: ${order.totalPrice.toFixed(2)}</p>
      <p>
        Please prepare the payment of ${order.totalPrice.toFixed(2)} in cash upon delivery.
      </p>
      <div className="confirmation-buttons">
        <button onClick={() => navigate('/')}>Back to Home</button>
        <button onClick={() => navigate('/order-history')}>View Order History</button>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
