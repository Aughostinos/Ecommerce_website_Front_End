import React from 'react';
import './Testimonials.css';

const Testimonials = () => {
  return (
    <div className="testimonials">
      <h2>What Our Customers Say</h2>
      <div className="testimonials-slider">
        <div className="testimonial">
          <p>"Amazing products and fast delivery!"</p>
          <span>- John Doe</span>
        </div>
        <div className="testimonial">
          <p>"The quality is outstanding."</p>
          <span>- Jane Smith</span>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
