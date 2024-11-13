import React from 'react';
import './style/OrderItem.css';

const OrderItem = ({ item }) => {
    const { product, quantity, price } = item;

  return (
    <div className="order-item">
      <img
        src={product.image}
        alt={product.name}
      />
      <div className="item-details">
        <h3>{product.name}</h3>
        <p>Price: ${price.toFixed(2)}</p>
        <p>Quantity: {quantity}</p>
        <p>Subtotal: ${(price * quantity).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default OrderItem;
