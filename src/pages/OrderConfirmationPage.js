import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BACKEND_URL from '../config';

const OrderConfirmationPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/order/${id}`, {
          withCredentials: true,
        });
        setOrder(response.data.order);
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };

    fetchOrder();
  }, [id]);

  if (!order) return <p>Loading...</p>;

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
    </div>
  );
};

export default OrderConfirmationPage;
