import React, { useEffect, useState } from 'react';
import './style/FlashSale.css';

const FlashSale = () => {
  const [timeLeft, setTimeLeft] = useState(3600);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time
  const formatTime = (seconds) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <div className="flash-sale">
      <h2>Flash Sale</h2>
      <h3>Coming Soon</h3>
      <div className="countdown-timer">Sale ends in: {formatTime(timeLeft)}</div>
      <div className="flash-products">
        {/* products will be here for future implementation*/}
      </div>
    </div>
  );
};

export default FlashSale;
