import React from 'react';
import { useGameStore } from '../store/gameStore';
import Button from './ui/Button';
import OptionSelector from './ui/OptionSelector';

const GameOptions = () => {
  const {
    viewport,
    totalPlayers,
    targetPoints,
    gameType,
    currentTheme,
    setTotalPlayers,
    setTargetPoints,
    setGameType,
    setCurrentTheme,
    setCurrentPage,
    startGame
  } = useGameStore();

  const gameTypes = ['Block', 'Draw'];
  const pointOptions = [50, 100, 150, 200, 250];
  const playerOptions = [2, 3, 4];
  const themeOptions = [0, 1, 2, 3, 4]; // Theme indices

  const handleBack = () => {
    setCurrentPage('main');
  };

  const handleStart = () => {
    startGame();
  };

  const containerStyle = viewport.isLandscape
    ? {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'rgba(0, 112, 236, 0.9)',
        border: '2px solid white',
        borderRadius: '10px',
        padding: '30px',
        color: 'white',
        textAlign: 'center',
        minWidth: '400px'
      }
    : {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'rgba(0, 112, 236, 0.9)',
        border: '2px solid white',
        borderRadius: '10px',
        padding: '20px',
        color: 'white',
        textAlign: 'center',
        minWidth: '300px'
      };

  return (
    <div style={containerStyle}>
      <h2 style={{ fontSize: '40px', marginBottom: '30px' }}>Game Options</h2>
      
      <OptionSelector
        label="Game Type"
        options={gameTypes}
        selectedIndex={gameTypes.indexOf(gameType)}
        onSelect={(index) => setGameType(gameTypes[index].toLowerCase())}
      />
      
      <OptionSelector
        label="Target Points"
        options={pointOptions}
        selectedIndex={pointOptions.indexOf(targetPoints)}
        onSelect={(index) => setTargetPoints(pointOptions[index])}
      />
      
      <OptionSelector
        label="Players"
        options={playerOptions}
        selectedIndex={playerOptions.indexOf(totalPlayers)}
        onSelect={(index) => setTotalPlayers(playerOptions[index])}
      />
      
      <OptionSelector
        label="Theme"
        options={themeOptions.map(i => `Theme ${i + 1}`)}
        selectedIndex={currentTheme}
        onSelect={setCurrentTheme}
      />
      
      <div style={{ 
        display: 'flex', 
        gap: '20px', 
        justifyContent: 'center',
        marginTop: '30px'
      }}>
        <Button
          image="/assets/button_cancel.png"
          onClick={handleBack}
          style={{ width: '120px', height: '40px' }}
        />
        <Button
          image="/assets/button_start.png"
          onClick={handleStart}
          style={{ width: '120px', height: '40px' }}
        />
      </div>
    </div>
  );
};

export default GameOptions;