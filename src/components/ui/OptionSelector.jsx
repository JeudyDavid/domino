import React from 'react';
import Button from './Button';

const OptionSelector = ({ label, options, selectedIndex, onSelect }) => {
  const handlePrevious = () => {
    const newIndex = selectedIndex > 0 ? selectedIndex - 1 : options.length - 1;
    onSelect(newIndex);
  };

  const handleNext = () => {
    const newIndex = selectedIndex < options.length - 1 ? selectedIndex + 1 : 0;
    onSelect(newIndex);
  };

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      gap: '20px',
      marginBottom: '20px'
    }}>
      <Button
        image="/assets/button_arrow_left.png"
        onClick={handlePrevious}
        style={{ width: '40px', height: '40px' }}
      />
      
      <div style={{ 
        minWidth: '200px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '18px', marginBottom: '5px' }}>{label}</div>
        <div style={{ 
          fontSize: '24px', 
          color: '#27C610',
          background: 'rgba(0, 0, 0, 0.3)',
          padding: '8px 16px',
          borderRadius: '5px'
        }}>
          {options[selectedIndex]}
        </div>
      </div>
      
      <Button
        image="/assets/button_arrow_right.png"
        onClick={handleNext}
        style={{ width: '40px', height: '40px' }}
      />
    </div>
  );
};

export default OptionSelector;