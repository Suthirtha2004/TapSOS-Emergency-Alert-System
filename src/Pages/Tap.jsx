import React, { useState } from 'react';
import Header from '../Components/Header';
import '../Components/UI/Tap.css';

const Tap = () => {
  const [pressed, setPressed] = useState(false);

  return (
    <div className="tap-page">
      <Header />
      <div className="sos-container">
        <button
          className={`sos-button${pressed ? ' pressed' : ''}`}
          onMouseDown={() => setPressed(true)}
          onMouseUp={() => setPressed(false)}
          onMouseLeave={() => setPressed(false)}
          onTouchStart={() => setPressed(true)}
          onTouchEnd={() => setPressed(false)}
        >
          SOS
        </button>
      </div>
    </div>
  );
};

export default Tap;
