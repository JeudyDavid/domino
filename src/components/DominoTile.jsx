import React, { useState } from 'react';
import { Group, Image as KonvaImage } from 'react-konva';
import { useGameStore } from '../store/gameStore';
import { themes } from '../utils/themes';
import useImage from '../hooks/useImage';

const DominoTile = ({ 
  domino, 
  x, 
  y, 
  rotation = 0, 
  scale = 1, 
  onClick, 
  isHighlighted = false,
  isPlayable = false,
  isDraggable = false,
  onDragStart,
  onDragEnd
}) => {
  const { currentTheme } = useGameStore();
  const theme = themes[currentTheme];
  const [isDragging, setIsDragging] = useState(false);
  
  // Load domino images
  const [dominoFrontImage] = useImage(theme.bg.front);
  const [dominoBackImage] = useImage(theme.bg.back);
  const [highlightImage] = useImage(theme.highlight.image);
  const [shadowImage] = useImage(theme.shadow.image);
  const [numbersImage] = useImage(theme.numbers.image);
  
  const tileWidth = 60 * scale;
  const tileHeight = 120 * scale;
  
  // Calculate sprite positions for numbers
  const getNumberSpritePosition = (number) => {
    const spriteSize = 32; // Assuming each number sprite is 32x32
    return {
      x: number * spriteSize,
      y: 0,
      width: spriteSize,
      height: spriteSize
    };
  };

  const handleDragStart = (e) => {
    if (!isDraggable) return;
    setIsDragging(true);
    if (onDragStart) onDragStart(e, domino);
  };

  const handleDragEnd = (e) => {
    if (!isDraggable) return;
    setIsDragging(false);
    if (onDragEnd) onDragEnd(e, domino);
  };

  const handleClick = (e) => {
    if (onClick && !isDragging) {
      onClick(e, domino);
    }
  };

  return (
    <Group
      x={x}
      y={y}
      rotation={rotation}
      scaleX={scale}
      scaleY={scale}
      draggable={isDraggable && isPlayable}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
      onTap={handleClick}
      opacity={isDragging ? 0.7 : 1}
    >
      {/* Shadow */}
      {shadowImage && (
        <KonvaImage
          image={shadowImage}
          x={2}
          y={2}
          width={tileWidth}
          height={tileHeight}
          opacity={0.5}
        />
      )}
      
      {/* Main domino background */}
      {dominoFrontImage && (
        <KonvaImage
          image={dominoFrontImage}
          width={tileWidth}
          height={tileHeight}
        />
      )}
      
      {/* Highlight overlay for playable dominoes */}
      {isHighlighted && highlightImage && (
        <KonvaImage
          image={highlightImage}
          width={tileWidth}
          height={tileHeight}
          opacity={0.8}
        />
      )}
      
      {/* Playable border effect */}
      {isPlayable && (
        <Group>
          <KonvaImage
            image={highlightImage}
            width={tileWidth}
            height={tileHeight}
            opacity={0.3}
          />
        </Group>
      )}
      
      {/* Numbers using sprite sheet */}
      {numbersImage && (
        <Group>
          {/* Top number */}
          <KonvaImage
            image={numbersImage}
            x={tileWidth / 2 - 16}
            y={tileHeight / 4 - 16}
            width={32}
            height={32}
            crop={getNumberSpritePosition(domino.left)}
          />
          
          {/* Bottom number */}
          <KonvaImage
            image={numbersImage}
            x={tileWidth / 2 - 16}
            y={(tileHeight * 3) / 4 - 16}
            width={32}
            height={32}
            crop={getNumberSpritePosition(domino.right)}
          />
        </Group>
      )}
    </Group>
  );
};

export default DominoTile;