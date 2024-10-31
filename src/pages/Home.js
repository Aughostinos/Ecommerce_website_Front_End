import React from 'react';
import Slider from '../components/Slider';
import FeaturedProducts from '../components/FeaturedProducts';
import FlashSale from '../components/FlashSale';
import Testimonials from '../components/Testimonials';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <Slider />
      <FlashSale />
      <FeaturedProducts />
      <Testimonials />
    </div>
  );
};

export default Home;
