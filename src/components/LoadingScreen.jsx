import React from 'react';

const LoadingScreen = ({ progress }) => {
  return (
    <div className="loader">
      <img src="/assets/loader.png" alt="Loading..." />
      <br />
      <span>{Math.round(progress)}%</span>
    </div>
  );
};

export default LoadingScreen;