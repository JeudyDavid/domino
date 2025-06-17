import React from 'react';
import { useGameStore } from '../store/gameStore';

const GameBoard = () => {
  const { board, dominoes } = useGameStore();

  // This is a simplified game board component
  // In a full implementation, this would render the domino tiles
  // using Konva or canvas for the game board area
  
  return (
    <div style={{
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      width: '600px',
      height: '400px',
      background: 'rgba(0, 0, 0, 0.3)',
      border: '2px solid white',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '24px'
    }}>
      Game Board Area
      <br />
      (Domino tiles will be rendered here)
    </div>
  );
};

export default GameBoard;