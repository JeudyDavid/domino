import React from 'react';
import { Rect, Group, Circle } from 'react-konva';
import { useGameStore } from '../store/gameStore';
import { themes } from '../utils/themes';

const DominoTile = ({ 
  domino, 
  x, 
  y, 
  rotation = 0, 
  scale = 1, 
  onClick, 
  isHighlighted = false,
  isPlayable = false 
}) => {
  const { currentTheme } = useGameStore();
  const theme = themes[currentTheme];
  
  const tileWidth = 60 * scale;
  const tileHeight = 120 * scale;
  const dotRadius = 4 * scale;
  
  // Dot positions for each number (0-6)
  const dotPatterns = {
    0: [],
    1: [[0, 0]],
    2: [[-0.3, -0.3], [0.3, 0.3]],
    3: [[-0.3, -0.3], [0, 0], [0.3, 0.3]],
    4: [[-0.3, -0.3], [0.3, -0.3], [-0.3, 0.3], [0.3, 0.3]],
    5: [[-0.3, -0.3], [0.3, -0.3], [0, 0], [-0.3, 0.3], [0.3, 0.3]],
    6: [[-0.3, -0.3], [0.3, -0.3], [-0.3, 0], [0.3, 0], [-0.3, 0.3], [0.3, 0.3]]
  };

  const renderDots = (number, offsetY) => {
    const pattern = dotPatterns[number] || [];
    return pattern.map((pos, index) => (
      <Circle
        key={index}
        x={pos[0] * 15 * scale}
        y={offsetY + pos[1] * 15 * scale}
        radius={dotRadius}
        fill="#000"
      />
    ));
  };

  return (
    <Group
      x={x}
      y={y}
      rotation={rotation}
      scaleX={scale}
      scaleY={scale}
      onClick={onClick}
      onTap={onClick}
    >
      {/* Shadow */}
      <Rect
        x={2}
        y={2}
        width={tileWidth}
        height={tileHeight}
        fill="rgba(0, 0, 0, 0.3)"
        cornerRadius={8}
      />
      
      {/* Main tile background */}
      <Rect
        width={tileWidth}
        height={tileHeight}
        fill={isHighlighted ? "#FFD700" : "#F5F5DC"}
        stroke={isPlayable ? "#00FF00" : "#8B4513"}
        strokeWidth={isPlayable ? 3 : 2}
        cornerRadius={8}
      />
      
      {/* Divider line */}
      <Rect
        y={tileHeight / 2 - 1}
        width={tileWidth}
        height={2}
        fill="#8B4513"
      />
      
      {/* Top half dots */}
      <Group x={tileWidth / 2} y={tileHeight / 4}>
        {renderDots(domino.left, 0)}
      </Group>
      
      {/* Bottom half dots */}
      <Group x={tileWidth / 2} y={(tileHeight * 3) / 4}>
        {renderDots(domino.right, 0)}
      </Group>
    </Group>
  );
};

export default DominoTile;