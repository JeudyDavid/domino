import React from 'react';
import { useGameStore } from '../../store/gameStore';
import Button from './Button';

const ExitConfirmModal = () => {
  const { setShowExitConfirm, resetGame } = useGameStore();

  const handleConfirm = () => {
    resetGame();
    setShowExitConfirm(false);
  };

  const handleCancel = () => {
    setShowExitConfirm(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Exit Game</h2>
        <p>Are you sure you want to exit the game?</p>
        
        <div style={{ 
          display: 'flex', 
          gap: '20px', 
          justifyContent: 'center',
          marginTop: '20px'
        }}>
          <Button
            image="/assets/button_confirm.png"
            onClick={handleConfirm}
            style={{ width: '120px', height: '40px' }}
          />
          <Button
            image="/assets/button_cancel.png"
            onClick={handleCancel}
            style={{ width: '120px', height: '40px' }}
          />
        </div>
      </div>
    </div>
  );
};

export default ExitConfirmModal;