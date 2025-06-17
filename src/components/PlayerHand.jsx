import React from 'react';
import { Group } from 'react-konva';
import DominoTile from './DominoTile';
import { useGameStore } from '../store/gameStore';

const PlayerHand = ({ player, isCurrentPlayer, position = 'bottom' }) => {
  const { playDomino, canPlayDomino, board } = useGameStore();
  
  const handleDominoClick = (domino, index) => {
    if (isCurrentPlayer && canPlayDomino(domino, board)) {
      playDomino(domino, index);
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
            onClick={() => handleDominoClick(domino, index)}
            isPlayable={isPlayable}
            isHighlighted={isCurrentPlayer && isPlayable}
          />
        );
      })}
    </Group>
  );
};

export default PlayerHand;