import React from 'react';
import { useGameStore } from '../../store/gameStore';

const GameStatus = () => {
  const { 
    currentPlayer,
    gameRound,
    players,
    board,
    boneyard,
    gameType
  } = useGameStore();

  const currentPlayerData = players[currentPlayer];
  const dominoesLeft = currentPlayerData?.dominoes?.length || 0;

  return (
    <div className="game-status">
      <div className="status-main">
        Round {gameRound} - Player {currentPlayer + 1}'s Turn
      </div>
      <div className="status-details">
        <span>Dominoes: {dominoesLeft}</span>
        <span>Board: {board.length}</span>
        {gameType === 'draw' && <span>Boneyard: {boneyard.length}</span>}
      </div>
    </div>
  );
};

export default GameStatus;