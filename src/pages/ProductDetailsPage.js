// src/pages/ProductDetailsPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BACKEND_URL from '../config';
import './style/ProductDetailsPage.css';

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

        // Fetch cart and wishlist data
        const statusResponse = await axios.get(`${BACKEND_URL}/user/get-cart-wishlist`, {
          withCredentials: true,
        });

        const cartItems = statusResponse.data.cart;
        const wishlistItems = statusResponse.data.wishlist;

        // Check if product is in cart
        const isInCart = cartItems.some((item) => item.product._id === id);
        setInCart(isInCart);

        // Check if product is in wishlist
        const isInWishlist = wishlistItems.some((item) => item._id === id);
        setInWishlist(isInWishlist);

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

  // Handle adding/removing product from cart
  const handleCartToggle = async () => {
    try {
      if (inCart) {
        // Remove from cart
        await axios.post(
          `${BACKEND_URL}/user/remove-from-cart`,
          { productId: id },
          { withCredentials: true }
        );
        setInCart(false);
      } else {
        // Add to cart with specified quantity
        await axios.post(
          `${BACKEND_URL}/user/add-to-cart`,
          { productId: id, quantity },
          { withCredentials: true }
        );
        setInCart(true);
      }
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  // Handle adding/removing product from wishlist
  const handleWishlistToggle = async () => {
    try {
      const endpoint = inWishlist ? 'remove-from-wishlist' : 'add-to-wishlist';
      // Use POST method for both actions
      await axios.post(
        `${BACKEND_URL}/user/${endpoint}`,
        { productId: id },
        { withCredentials: true }
      );

      setInWishlist(!inWishlist);
    } catch (error) {
      console.error('Error updating wishlist:', error);
    }
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.image.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.image.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-details">
      <div className="product-images">
        {/* Carousel */}
        <div className="carousel">
          <button className="carousel-control prev" onClick={handlePrevImage}>
            ❮
          </button>
          <img src={product.image[currentImageIndex]} alt={product.name} />
          <button className="carousel-control next" onClick={handleNextImage}>
            ❯
          </button>
        </div>
        {/* Thumbnail Images */}
        <div className="thumbnail-images">
          {product.image.map((imgUrl, index) => (
            <img
              key={index}
              src={imgUrl}
              alt={`${product.name} ${index + 1}`}
              className={currentImageIndex === index ? 'active' : ''}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
      </div>

      <div className="product-info">
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p className="price">Price: ${product.price}</p>

        <div className="cart-controls">
          <button
            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            disabled={quantity === 1}
          >
            ➖
          </button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity((prev) => prev + 1)}>➕</button>
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
                <p>
                  <strong>{review.userId?.name || 'Anonymous'}</strong>
                </p>
                <p>{review.comment}</p>
                <p>Rating: {review.rating}/5</p>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default ProductDetailsPage;
