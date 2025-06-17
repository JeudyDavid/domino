import React from 'react';
import { useGameStore } from '../../store/gameStore';

const GameInstructions = () => {
  const { currentPlayer, players, board } = useGameStore();
  
  const currentPlayerData = players[currentPlayer];
  const hasPlayableDomino = currentPlayerData?.dominoes?.some(domino => 
    useGameStore.getState().canPlayDomino(domino, board)
  );

  const getInstructionText = () => {
    if (board.length === 0) {
      return "Click or drag your domino to the board area to start the game";
    }
    
    if (hasPlayableDomino) {
      return "Click or drag a highlighted domino to play it";
    }
    
    return "No playable dominoes - click Pass to skip your turn";
  };

  return (
    <div style={{
      position: 'absolute',
      bottom: '80px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '20px',
      fontSize: '16px',
      textAlign: 'center',
      zIndex: 15,
      border: '2px solid #FFC107',
      maxWidth: '400px'
    }}>
      {getInstructionText()}
    </div>
  );
};

export default GameInstructions;