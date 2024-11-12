import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import './style/ProductCard.css';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { updateCart } = useContext(CartContext);
  const { wishlist, toggleWishlist } = useContext(WishlistContext);

  // Local state for quantity
  const [quantity, setQuantity] = useState(1);

  const inWishlist = wishlist.includes(product._id);

  const handleProductClick = () => {
    navigate(`/product/${product._id}`);
  };

  const handleAddToCart = () => {
    updateCart(product._id, quantity);
  };

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  return (
    <div className="product-card">
      <img
        src={product.image?.[0] || 'default-image-url.jpg'}
        alt={product.name}
        onClick={handleProductClick}
      />
      <h2>{product.name}</h2>
      <p>${product.price}</p>
      <div className="product-actions">
        <button
          className={`wishlist-button ${inWishlist ? 'filled' : 'outlined'}`}
          onClick={() => toggleWishlist(product._id)}
        >
          {inWishlist ? '❤️' : '🤍'}
        </button>
        <div className="quantity-controls">
          <button onClick={decrementQuantity} disabled={quantity <= 1}>
            ➖
          </button>
          <span>{quantity}</span>
          <button onClick={incrementQuantity}>
            ➕
          </button>
        </div>
        <button className="add-to-cart-button" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
