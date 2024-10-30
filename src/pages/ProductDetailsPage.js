import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BACKEND_URL from '../config';
import './ProductDetailsPage.css';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [inCart, setInCart] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        // Fetch product details
        const productResponse = await axios.get(`${BACKEND_URL}/products/get-product/${id}`);
        setProduct(productResponse.data);

        // Fetch cart and wishlist status
        const statusResponse = await axios.get(`${BACKEND_URL}/user/get-cart-wishlist`, {
          withCredentials: true,
        });

        setInCart(statusResponse.data.cart.some((item) => item._id === id));
        setInWishlist(statusResponse.data.wishlist.some((item) => item._id === id));

        // Fetch product reviews
        const reviewsResponse = await axios.get(`${BACKEND_URL}/products/${id}/reviews`, {
          withCredentials: true,
        });
        setReviews(reviewsResponse.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
        navigate('/404');
      }
    };

    fetchProductData();
  }, [id, navigate]);

  const handleCartToggle = async () => {
    try {
      const endpoint = inCart ? 'remove-from-cart' : 'add-to-cart';
      const method = inCart ? 'delete' : 'post';

      await axios({
        method,
        url: `${BACKEND_URL}/user/${endpoint}`,
        data: { productId: id },
        withCredentials: true,
      });
      setInCart(!inCart);
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const handleWishlistToggle = async () => {
    try {
      const endpoint = inWishlist ? 'remove-from-wishlist' : 'add-to-wishlist';
      const method = inWishlist ? 'delete' : 'post';

      await axios({
        method,
        url: `${BACKEND_URL}/user/${endpoint}`,
        data: { productId: id },
        withCredentials: true,
      });
      setInWishlist(!inWishlist);
    } catch (error) {
      console.error('Error updating wishlist:', error);
    }
  };

  const handleImageChange = (index) => {
    setCurrentImageIndex(index);
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-details">
      <div className="product-images">
        <div className="main-image">
          <img src={product.image[currentImageIndex]} alt={product.name} />
        </div>
        <div className="thumbnail-images">
          {product.image.map((imgUrl, index) => (
            <img
              key={index}
              src={imgUrl}
              alt={`${product.name} ${index + 1}`}
              className={currentImageIndex === index ? 'active' : ''}
              onClick={() => handleImageChange(index)}
            />
          ))}
        </div>
      </div>

      <div className="product-info">
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p className="price">Price: ${product.price}</p>

        <div className="cart-controls">
          <button onClick={() => setQuantity(quantity - 1)} disabled={quantity === 1}>
            ➖
          </button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)}>➕</button>
        </div>

        <button onClick={handleCartToggle}>
          {inCart ? 'Remove from Cart' : 'Add to Cart'}
        </button>

        <button
          className={`wishlist-button ${inWishlist ? 'filled' : 'outlined'}`}
          onClick={handleWishlistToggle}
        >
          {inWishlist ? '❤️' : '🤍'}
        </button>

        <div className="reviews">
          <h2>User Reviews</h2>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review._id} className="review">
                <p><strong>{review.userId?.name || 'Anonymous'}</strong></p>
                <p>{review.comment}</p>
                <p>Rating: {review.rating}/5</p>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>

        {/* I'll add a form here to submit a new review */}
      </div>
    </div>
  );
};

export default ProductDetailsPage;
