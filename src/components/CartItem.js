import React from 'react';
import '../pages/style/CartPage.css';

const CartItem = ({ item, handleQuantityChange, handleRemoveItem }) => {
    const { product, quantity } = item;

    if (!product) {
        return null;
    }

    const productImage = product.image?.[0];

    return (
        <div className="cart-item">
            <img src={productImage} alt={product.name} />
            <div className="item-details">
                <h3>{product.name}</h3>
                <p>Price: ${product.price}</p>
                <div className="quantity-controls">
                    <button
                        onClick={() => handleQuantityChange(product._id, quantity - 1)}
                        disabled={quantity === 1}
                    >
                        ➖
                    </button>
                    <span>{quantity}</span>
                    <button
                        onClick={() => handleQuantityChange(product._id, quantity + 1)}
                    >
                        ➕
                    </button>
                </div>
                <button onClick={() => handleRemoveItem(product._id)}>Remove</button>
            </div>
        </div>
    );
};

export default CartItem;
