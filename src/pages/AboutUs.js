import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us-page">
      <div className="about-us-header">
        <h1>About Us</h1>
        <p>Welcome to E-Shop, your number one source for all things fashion.</p>
      </div>
      <div className="about-us-content">
        <h2>Our Story</h2>
        <p>
          Founded in 2023, E-Shop has come a long way from its beginnings.
          When we first started out, our passion for providing the best products
          drove us to start our own business.
        </p>
        <h2>Our Mission</h2>
        <p>
          Our mission is to provide high-quality products at affordable prices.
          We aim to offer our customers a variety of the latest products.
        </p>
        <h2>Why Choose Us</h2>
        <ul>
          <li>Wide range of products</li>
          <li>Competitive prices</li>
          <li>Excellent customer service</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutUs;
