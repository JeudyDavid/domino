import React from 'react';
import { Group } from 'react-konva';
import DominoTile from './DominoTile';
import PlayerHand from './PlayerHand';
import { useGameStore } from '../store/gameStore';

const GameBoard = () => {
  const { board, players, currentPlayer, totalPlayers } = useGameStore();

  const renderBoardDominoes = () => {
    if (!board || board.length === 0) return null;

    const centerX = 640;
    const centerY = 384;
    const tileSpacing = 65;

    return board.map((domino, index) => {
      // Calculate position based on board layout
      let x = centerX + (index - board.length / 2) * tileSpacing;
      let y = centerY;
      let rotation = 0;

      // Adjust for board wrapping (simplified layout)
      if (index > 0 && board.length > 8) {
        const row = Math.floor(index / 8);
        const col = index % 8;
        x = centerX - 4 * tileSpacing + col * tileSpacing;
        y = centerY + row * 130;
      }

      return (
        <DominoTile
          key={`board-${domino.id}-${index}`}
          domino={domino}
          x={x}
          y={y}
          rotation={rotation}
          scale={1}
        />
      );
    });
  };

  const renderPlayerHands = () => {
    const positions = ['bottom', 'left', 'top', 'right'];
    
    return players.map((player, index) => {
      if (index >= totalPlayers) return null;
      
      const position = positions[index] || 'bottom';
      const isCurrentPlayerTurn = index === currentPlayer;

      return (
        <PlayerHand
          key={`player-${index}`}
          player={player}
          isCurrentPlayer={isCurrentPlayerTurn}
          position={position}
        />
      );
    });
  };

  return (
    <Group>
      {/* Board area background */}
      <Group>
        {renderBoardDominoes()}
      </Group>
      
      {/* Player hands */}
      <Group>
        {renderPlayerHands()}
      </Group>
    </Group>
  );
};

export default GameBoard;