import React from 'react';
import { useGameStore } from '../store/gameStore';
import Button from './ui/Button';

const MainMenu = () => {
  const { viewport, setCurrentPage } = useGameStore();

  const handlePlayClick = () => {
    setCurrentPage('options');
  };

  const buttonStyle = viewport.isLandscape 
    ? { 
        position: 'absolute',
        left: '50%',
        top: '75%',
        transform: 'translate(-50%, -50%)',
        width: '200px',
        height: '60px'
      }
    : {
        position: 'absolute',
        left: '50%',
        top: '73%',
        transform: 'translate(-50%, -50%)',
        width: '200px',
        height: '60px'
      };

  return (
    <>
      <Button
        image="/assets/button_play.png"
        onClick={handlePlayClick}
        style={buttonStyle}
      />
    </>
  );
};

export default MainMenu;