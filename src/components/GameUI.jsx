import React from 'react';
import { useGameStore } from '../store/gameStore';
import SettingsMenu from './ui/SettingsMenu';
import ExitConfirmModal from './ui/ExitConfirmModal';
import ResultModal from './ui/ResultModal';
import PlayerInfo from './ui/PlayerInfo';
import ScoreDisplay from './ui/ScoreDisplay';
import GameStatus from './ui/GameStatus';

const GameUI = () => {
  const { 
    showExitConfirm, 
    showResult,
    currentPlayer,
    players,
    scores,
    gameRound,
    board,
    boneyard,
    gameType,
    drawFromBoneyard,
    nextPlayer
  } = useGameStore();

  const handlePass = () => {
    if (gameType === 'draw' && boneyard.length > 0) {
      drawFromBoneyard();
    } else {
      nextPlayer();
    }
  };

  return (
    <>
      {/* Game Status */}
      <GameStatus />

      {/* Player Info */}
      <PlayerInfo />

      {/* Score Display */}
      <ScoreDisplay />

      {/* Game Controls */}
      <div className="game-controls">
        <button 
          className="pass-button"
          onClick={handlePass}
          style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            padding: '10px 20px',
            background: '#FF6B6B',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          {gameType === 'draw' && boneyard.length > 0 ? 'Draw' : 'Pass'}
        </button>
      </div>

      {/* Settings Menu */}
      <SettingsMenu />

      {/* Modals */}
      {showExitConfirm && <ExitConfirmModal />}
      {showResult && <ResultModal />}
    </>
  );
};

export default GameUI;