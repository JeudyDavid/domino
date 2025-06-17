import React from 'react';
import useGameSounds from '../../hooks/useGameSounds';

const Button = ({ image, onClick, style, className = '', disabled = false, children }) => {
  const { click } = useGameSounds();
  
  const handleClick = () => {
    click();
    if (onClick) onClick();
  };

  return (
    <button
      className={`button ${className}`}
      onClick={handleClick}
      style={{
        background: 'none',
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'transform 0.1s ease',
        opacity: disabled ? 0.5 : 1,
        ...style
      }}
      disabled={disabled}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.target.style.transform = 'scale(1.05)';
        }
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'scale(1)';
      }}
    >
      {image ? <img src={image} alt="Button" style={{ width: '100%', height: '100%', objectFit: 'contain' }} /> : children}
    </button>
  );
};

export default Button;