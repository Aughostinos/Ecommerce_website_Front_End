import React from 'react';
import { Link } from 'react-router-dom';
import './style/NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/"><button>Go back to Home</button></Link>
    </div>
  );
};

export default NotFound;
