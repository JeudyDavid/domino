import { useGameStore } from '../store/gameStore';
import useSound from './useSound';

const useGameSounds = () => {
  const { soundEnabled, musicEnabled } = useGameStore();
  
  const { play: playClick } = useSound('/assets/sounds/sound_click.ogg');
  const { play: playDominoPick } = useSound('/assets/sounds/sound_domino_pick.ogg');
  const { play: playDomino1 } = useSound('/assets/sounds/sound_domino1.ogg');
  const { play: playDomino2 } = useSound('/assets/sounds/sound_domino2.ogg');
  const { play: playDomino3 } = useSound('/assets/sounds/sound_domino3.ogg');
  const { play: playPoint } = useSound('/assets/sounds/sound_point.ogg');
  const { play: playRound } = useSound('/assets/sounds/sound_round.ogg');
  const { play: playWinner } = useSound('/assets/sounds/sound_winner.ogg');
  const { play: playResult } = useSound('/assets/sounds/sound_result.ogg');
  const { play: playAlert } = useSound('/assets/sounds/sound_alert.ogg');
  const { play: playShuffleIn } = useSound('/assets/sounds/sound_shuffle_in.ogg');
  const { play: playShuffleOut } = useSound('/assets/sounds/sound_shuffle_out.ogg');
  
  const { play: playMainMusic, stop: stopMainMusic } = useSound('/assets/sounds/music_main.ogg', { loop: true, volume: 0.3 });
  const { play: playGameMusic, stop: stopGameMusic } = useSound('/assets/sounds/music_game.ogg', { loop: true, volume: 0.3 });

  const sounds = {
    click: () => soundEnabled && playClick(),
    dominoPick: () => soundEnabled && playDominoPick(),
    dominoPlace: () => {
      if (!soundEnabled) return;
      const sounds = [playDomino1, playDomino2, playDomino3];
      const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
      randomSound();
    },
    point: () => soundEnabled && playPoint(),
    round: () => soundEnabled && playRound(),
    winner: () => soundEnabled && playWinner(),
    result: () => soundEnabled && playResult(),
    alert: () => soundEnabled && playAlert(),
    shuffleIn: () => soundEnabled && playShuffleIn(),
    shuffleOut: () => soundEnabled && playShuffleOut(),
    startMainMusic: () => musicEnabled && playMainMusic(),
    stopMainMusic: () => stopMainMusic(),
    startGameMusic: () => musicEnabled && playGameMusic(),
    stopGameMusic: () => stopGameMusic()
  };

  return sounds;
};

export default useGameSounds;