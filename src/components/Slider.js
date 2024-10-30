import React, { useEffect, useState } from 'react';
import './Slider.css';

const slides = [
  { id: 1, image: '/images/slide1.jpg', text: 'Discover Our Latest Collection' },
  { id: 2, image: '/images/slide2.jpg', text: 'Flash Sale is Live!' },
  { id: 3, image: '/images/slide3.jpg', text: 'Don’t Miss Out on Discounts!' }
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="slider">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`slide ${index === currentSlide ? 'active' : ''}`}
        >
          <img src={slide.image} alt={`Slide ${slide.id}`} />
          <div className="slide-content">
            <h2>{slide.text}</h2>
            <button className="shop-now-btn">Shop Now</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
