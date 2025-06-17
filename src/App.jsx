import React, { useState, useEffect } from 'react';
import GameCanvas from './components/GameCanvas';
import MainMenu from './components/MainMenu';
import GameOptions from './components/GameOptions';
import GameUI from './components/GameUI';
import LoadingScreen from './components/LoadingScreen';
import { useGameStore } from './store/gameStore';
import { preloadAssets } from './utils/assetLoader';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const { currentPage, viewport } = useGameStore();

  useEffect(() => {
    const loadAssets = async () => {
      try {
        await preloadAssets((progress) => {
          setLoadingProgress(progress);
        });
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load assets:', error);
        setIsLoading(false);
      }
    };

    loadAssets();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const isLandscape = window.innerWidth > window.innerHeight;
      useGameStore.getState().setViewport({ isLandscape });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  if (isLoading) {
    return <LoadingScreen progress={loadingProgress} />;
  }

  return (
    <div className="game-container">
      <div className="canvas-container">
        <GameCanvas />
        <div className="ui-overlay">
          {currentPage === 'main' && <MainMenu />}
          {currentPage === 'options' && <GameOptions />}
          {currentPage === 'game' && <GameUI />}
        </div>
      </div>
    </div>
  );
}

export default App;