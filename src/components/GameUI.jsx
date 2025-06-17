import React from 'react';
import { useGameStore } from '../store/gameStore';
import SettingsMenu from './ui/SettingsMenu';
import ExitConfirmModal from './ui/ExitConfirmModal';
import ResultModal from './ui/ResultModal';
import PlayerInfo from './ui/PlayerInfo';
import ScoreDisplay from './ui/ScoreDisplay';
import GameStatus from './ui/GameStatus';
import GameInstructions from './ui/GameInstructions';

const GameUI = () => {
  const { 
    showExitConfirm, 
    showResult,
    currentPlayer,
    players,
    board,
    boneyard,
    gameType,
    drawFromBoneyard,
    nextPlayer,
    canPlayDomino
  } = useGameStore();

  const currentPlayerData = players[currentPlayer];
  const hasPlayableDomino = currentPlayerData?.dominoes?.some(domino => 
    canPlayDomino(domino, board)
  );

  const handlePass = () => {
    if (gameType === 'draw' && boneyard.length > 0 && !hasPlayableDomino) {
      drawFromBoneyard();
    } else {
      nextPlayer();
    }
  };

  const getPassButtonText = () => {
    if (gameType === 'draw' && boneyard.length > 0 && !hasPlayableDomino) {
      return 'Draw';
    }
    return 'Pass';
  };

  const shouldShowPassButton = () => {
    return !hasPlayableDomino || (gameType === 'draw' && boneyard.length > 0);
  };

  return (
    <>
      {/* Game Status */}
      <GameStatus />

      {/* Player Info */}
      <PlayerInfo />

      {/* Score Display */}
      <ScoreDisplay />

      {/* Game Instructions */}
      <GameInstructions />

      {/* Game Controls */}
      {shouldShowPassButton() && (
        <div className="game-controls">
          <button 
            className="pass-button"
            onClick={handlePass}
          >
            {getPassButtonText()}
          </button>
        </div>
      )}

      {/* Settings Menu */}
      <SettingsMenu />

      {/* Modals */}
      {showExitConfirm && <ExitConfirmModal />}
      {showResult && <ResultModal />}
    </>
  );
};

export default GameUI;