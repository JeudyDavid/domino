import React from 'react';

const Button = ({ image, onClick, style, className = '', disabled = false }) => {
  return (
    <button
      className={`button ${className}`}
      onClick={onClick}
      style={style}
      disabled={disabled}
    >
      <img src={image} alt="Button" />
    </button>
  );
};

export default Button;