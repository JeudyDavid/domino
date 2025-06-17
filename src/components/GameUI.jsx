import React from 'react';
import { useGameStore } from '../store/gameStore';
import SettingsMenu from './ui/SettingsMenu';
import ExitConfirmModal from './ui/ExitConfirmModal';
import ResultModal from './ui/ResultModal';
import GameBoard from './GameBoard';

const GameUI = () => {
  const { 
    showExitConfirm, 
    showResult,
    currentPlayer,
    players,
    scores,
    gameRound
  } = useGameStore();

  return (
    <>
      {/* Game Status */}
      <div className="game-status">
        Round {gameRound} - Player {currentPlayer + 1}'s Turn
      </div>

      {/* Player Info */}
      <div className="player-info">
        <div>Current Player: {currentPlayer + 1}</div>
        <div>Dominoes: {players[currentPlayer]?.dominoes?.length || 0}</div>
      </div>

      {/* Score Display */}
      <div className="score-display">
        {scores.map((score, index) => (
          <div key={index}>
            Player {index + 1}: {score}
          </div>
        ))}
      </div>

      {/* Game Board */}
      <GameBoard />

      {/* Settings Menu */}
      <SettingsMenu />

      {/* Modals */}
      {showExitConfirm && <ExitConfirmModal />}
      {showResult && <ResultModal />}
    </>
  );
};

export default GameUI;