import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BACKEND_URL from '../config';
import { UserContext } from '../context/UserContext';
import OrderItem from '../components/OrderItem';
import '../pages/style/OrderDetails.css';

const OrderDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useContext(UserContext);
    const [order, setOrder] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/order/${id}`, {
                    withCredentials: true,
                });
                setOrder(response.data);
            } catch (err) {
                console.error('Error fetching order details:', err);
                setError(
                    err.response?.data?.message || 'Failed to load order details.'
                );
            }
        };

        if (user) {
            fetchOrderDetails();
        } else {
            setError('Please log in to view your order details.');
        }
    }, [id, user]);

    if (error) {
        return <p>{error}</p>;
    }

    if (!order) {
        return <p>Loading order details...</p>;
    }

    return (
        <div className="order-details">
            <h1>Order Details</h1>
            <p>
                <strong>Order ID:</strong> {order._id}
            </p>
            <p>
                <strong>Order Date:</strong>{' '}
                {new Date(order.createdAt).toLocaleDateString()}
            </p>
            <h2>Shipping Address</h2>
            <p>{order.shippingAddress.address}</p>
            <p>
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
            </p>
            <p>{order.shippingAddress.country}</p>
            <h2>Payment Method</h2>
            <p>{order.paymentMethod}</p>
            <h2>Order Items</h2>
            <div className="order-items">
                {order.orderItems.map((item) => (
                    <OrderItem key={item.product._id} item={item} />
                ))}
            </div>
            <h2>Order Summary</h2>
            <div className="order-summary">
                <p>
                    <strong>Items Price:</strong> ${order.itemsPrice.toFixed(2)}
                </p>
                <p>
                    <strong>Shipping Price:</strong> ${order.shippingPrice.toFixed(2)}
                </p>
                <p>
                    <strong>Tax Price:</strong> ${order.taxPrice.toFixed(2)}
                </p>
                <p>
                    <strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}
                </p>
            </div>
            <h2>Order Status</h2>
            <p>{order.status}</p>

            <div className="navi-buttons">
                <button onClick={() => navigate('/')}>Back to Home</button>
                <button onClick={() => navigate('/order-history')}>View Order History</button>
            </div>
        </div>
    );

};

export default OrderDetails;
