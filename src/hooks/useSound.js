import { useState, useEffect, useRef } from 'react';
import { useGameStore } from '../store/gameStore';

const useSound = (src, options = {}) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const { soundEnabled, soundMuted } = useGameStore();

  useEffect(() => {
    if (!src) return;

    const audio = new Audio(src);
    audio.volume = options.volume || 1;
    audio.loop = options.loop || false;
    
    audioRef.current = audio;
    setSound(audio);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [src, options.volume, options.loop]);

  const play = () => {
    if (sound && soundEnabled && !soundMuted) {
      sound.currentTime = 0;
      sound.play().catch(console.error);
      setIsPlaying(true);
    }
  };

  const stop = () => {
    if (sound) {
      sound.pause();
      sound.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const pause = () => {
    if (sound) {
      sound.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    if (sound) {
      const handleEnded = () => setIsPlaying(false);
      sound.addEventListener('ended', handleEnded);
      return () => sound.removeEventListener('ended', handleEnded);
    }
  }, [sound]);

  return { play, stop, pause, isPlaying };
};

export default useSound;