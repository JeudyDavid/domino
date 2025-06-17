import React from 'react';
import { Group, Rect, Text } from 'react-konva';
import DominoTile from './DominoTile';
import PlayerHand from './PlayerHand';
import { useGameStore } from '../store/gameStore';

const GameBoard = () => {
  const { board, players, currentPlayer, totalPlayers } = useGameStore();

  const renderBoardArea = () => {
    return (
      <Group>
        {/* Board background area */}
        <Rect
          x={200}
          y={200}
          width={880}
          height={368}
          fill="rgba(0, 0, 0, 0.1)"
          stroke="rgba(255, 255, 255, 0.3)"
          strokeWidth={2}
          cornerRadius={10}
        />
        
        {/* Drop zone indicator */}
        {board.length === 0 && (
          <Text
            x={640}
            y={384}
            text="Drop your first domino here"
            fontSize={20}
            fill="rgba(255, 255, 255, 0.7)"
            align="center"
            offsetX={100}
            offsetY={10}
          />
        )}
      </Group>
    );
  };

  const renderBoardDominoes = () => {
    if (!board || board.length === 0) return null;

    const centerX = 640;
    const centerY = 384;
    const tileSpacing = 65;
    const maxPerRow = 10;

    return board.map((domino, index) => {
      // Calculate position based on board layout
      let x, y, rotation = 0;
      
      if (board.length <= maxPerRow) {
        // Single row layout
        x = centerX + (index - board.length / 2) * tileSpacing;
        y = centerY;
      } else {
        // Multi-row layout
        const row = Math.floor(index / maxPerRow);
        const col = index % maxPerRow;
        const rowOffset = row % 2 === 0 ? 0 : tileSpacing / 2; // Stagger alternate rows
        
        x = centerX - (maxPerRow / 2) * tileSpacing + col * tileSpacing + rowOffset;
        y = centerY + (row - 1) * 80;
        
        // Rotate dominoes in alternate rows for better fit
        if (row % 2 === 1) {
          rotation = 90;
        }
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
      {/* Board area */}
      {renderBoardArea()}
      
      {/* Board dominoes */}
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