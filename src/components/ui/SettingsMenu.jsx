import React from 'react';
import { useGameStore } from '../../store/gameStore';
import Button from './Button';

const SettingsMenu = () => {
  const {
    showSettings,
    soundEnabled,
    musicEnabled,
    setShowSettings,
    setSoundEnabled,
    setMusicEnabled,
    setShowExitConfirm
  } = useGameStore();

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  const toggleMusic = () => {
    setMusicEnabled(!musicEnabled);
  };

  const handleExit = () => {
    setShowExitConfirm(true);
    setShowSettings(false);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="settings-menu">
      <Button
        image="/assets/button_settings.png"
        onClick={toggleSettings}
        className="settings-button"
      />
      
      {showSettings && (
        <div className="options-menu">
          <Button
            image={soundEnabled ? "/assets/button_sound_on.png" : "/assets/button_sound_off.png"}
            onClick={toggleSound}
          />
          
          <Button
            image={musicEnabled ? "/assets/button_music_on.png" : "/assets/button_music_off.png"}
            onClick={toggleMusic}
          />
          
          <Button
            image="/assets/button_fullscreen.png"
            onClick={toggleFullscreen}
          />
          
          <Button
            image="/assets/button_exit.png"
            onClick={handleExit}
          />
        </div>
      )}
    </div>
  );
};

export default SettingsMenu;