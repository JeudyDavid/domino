import React, { useRef, useEffect } from 'react';
import { Stage, Layer, Image as KonvaImage } from 'react-konva';
import { useGameStore } from '../store/gameStore';
import GameBoard from './GameBoard';
import useImage from '../hooks/useImage';

const GameCanvas = () => {
  const stageRef = useRef();
  const { viewport, currentPage } = useGameStore();
  
  const [backgroundImage] = useImage(
    viewport.isLandscape ? '/assets/background.png' : '/assets/background_p.png'
  );
  
  const [logoImage] = useImage(
    viewport.isLandscape ? '/assets/logo.png' : '/assets/logo_p.png'
  );

  const stageWidth = viewport.isLandscape ? 1280 : 768;
  const stageHeight = viewport.isLandscape ? 768 : 1024;

  useEffect(() => {
    const handleResize = () => {
      if (stageRef.current) {
        const container = stageRef.current.container();
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;
        
        const scale = Math.min(
          containerWidth / stageWidth,
          containerHeight / stageHeight
        );
        
        stageRef.current.width(stageWidth * scale);
        stageRef.current.height(stageHeight * scale);
        stageRef.current.scale({ x: scale, y: scale });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, [stageWidth, stageHeight]);

  return (
    <Stage
      ref={stageRef}
      width={stageWidth}
      height={stageHeight}
      style={{ 
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}
    >
      <Layer>
        {/* Background */}
        {backgroundImage && (
          <KonvaImage
            image={backgroundImage}
            width={stageWidth}
            height={stageHeight}
          />
        )}
        
        {/* Logo - only show on main menu */}
        {currentPage === 'main' && logoImage && (
          <KonvaImage
            image={logoImage}
            x={stageWidth / 2 - logoImage.width / 2}
            y={viewport.isLandscape ? 100 : 150}
          />
        )}
        
        {/* Game Board - only show during game */}
        {currentPage === 'game' && <GameBoard />}
      </Layer>
    </Stage>
  );
};

export default GameCanvas;