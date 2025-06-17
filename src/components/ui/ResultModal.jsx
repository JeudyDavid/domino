import React from 'react';
import { useGameStore } from '../../store/gameStore';
import Button from './Button';

const ResultModal = () => {
  const { resultData, setShowResult, resetGame } = useGameStore();

  const handleContinue = () => {
    resetGame();
    setShowResult(false);
  };

  const handleShare = (platform) => {
    const text = `I just won a game of Bèl Jwèt Dominoes!`;
    const url = window.location.href;
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`);
        break;
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Game Over!</h2>
        <p style={{ color: '#FFFF00', fontSize: '75px' }}>
          Player {resultData?.winner + 1} Wins!
        </p>
        
        <div style={{ marginBottom: '20px' }}>
          <p style={{ fontSize: '25px' }}>Share your victory:</p>
          <div style={{ 
            display: 'flex', 
            gap: '15px', 
            justifyContent: 'center',
            marginTop: '15px'
          }}>
            <Button
              image="/assets/button_facebook.png"
              onClick={() => handleShare('facebook')}
              style={{ width: '50px', height: '50px' }}
            />
            <Button
              image="/assets/button_twitter.png"
              onClick={() => handleShare('twitter')}
              style={{ width: '50px', height: '50px' }}
            />
            <Button
              image="/assets/button_whatsapp.png"
              onClick={() => handleShare('whatsapp')}
              style={{ width: '50px', height: '50px' }}
            />
          </div>
        </div>
        
        <Button
          image="/assets/button_continue.png"
          onClick={handleContinue}
          style={{ width: '150px', height: '50px' }}
        />
      </div>
    </div>
  );
};

export default ResultModal;