import React from 'react';
import { Group } from 'react-konva';
import DominoTile from './DominoTile';
import { useGameStore } from '../store/gameStore';
import useGameSounds from '../hooks/useGameSounds';

const PlayerHand = ({ player, isCurrentPlayer, position = 'bottom' }) => {
  const { playDomino, canPlayDomino, board } = useGameStore();
  const { dominoPick, dominoPlace } = useGameSounds();
  
  const handleDominoClick = (e, domino) => {
    if (!isCurrentPlayer) return;
    
    const dominoIndex = player.dominoes.findIndex(d => d.id === domino.id);
    if (dominoIndex === -1) return;
    
    if (canPlayDomino(domino, board)) {
      dominoPick();
      setTimeout(() => {
        if (playDomino(domino, dominoIndex)) {
          dominoPlace();
        }
      }, 100);
    }
  };

  const handleDragStart = (e, domino) => {
    if (!isCurrentPlayer) return;
    dominoPick();
  };

  const handleDragEnd = (e, domino) => {
    if (!isCurrentPlayer) return;
    
    const stage = e.target.getStage();
    const pointerPosition = stage.getPointerPosition();
    
    // Check if dropped in board area (center of screen)
    const boardArea = {
      x: 200,
      y: 200,
      width: 880,
      height: 368
    };
    
    if (
      pointerPosition.x >= boardArea.x &&
      pointerPosition.x <= boardArea.x + boardArea.width &&
      pointerPosition.y >= boardArea.y &&
      pointerPosition.y <= boardArea.y + boardArea.height
    ) {
      const dominoIndex = player.dominoes.findIndex(d => d.id === domino.id);
      if (dominoIndex !== -1 && canPlayDomino(domino, board)) {
        if (playDomino(domino, dominoIndex)) {
          dominoPlace();
        }
      }
    }
  };

  const getHandPosition = () => {
    const handPositions = {
      bottom: { x: 640, y: 650, rotation: 0, spacing: 70 },
      top: { x: 640, y: 50, rotation: 180, spacing: -70 },
      left: { x: 50, y: 384, rotation: 90, spacing: 70 },
      right: { x: 1230, y: 384, rotation: -90, spacing: -70 }
    };
    return handPositions[position] || handPositions.bottom;
  };

  const handPos = getHandPosition();
  const dominoes = player.dominoes || [];

  return (
    <Group>
      {dominoes.map((domino, index) => {
        const isPlayable = isCurrentPlayer && canPlayDomino(domino, board);
        const xOffset = position === 'bottom' || position === 'top' 
          ? index * handPos.spacing - (dominoes.length - 1) * handPos.spacing / 2
          : 0;
        const yOffset = position === 'left' || position === 'right'
          ? index * handPos.spacing - (dominoes.length - 1) * handPos.spacing / 2
          : 0;

        return (
          <DominoTile
            key={`${domino.id}-${index}`}
            domino={domino}
            x={handPos.x + xOffset}
            y={handPos.y + yOffset}
            rotation={handPos.rotation}
            scale={0.8}
            onClick={handleDominoClick}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            isDraggable={isCurrentPlayer}
            isPlayable={isPlayable}
            isHighlighted={isCurrentPlayer && isPlayable}
          />
        );
      })}
    </Group>
  );
};

export default PlayerHand;