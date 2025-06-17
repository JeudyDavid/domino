export const GAME_STATES = {
  MENU: 'menu',
  PLAYING: 'playing',
  PAUSED: 'paused',
  ENDED: 'ended'
};

export const PAGES = {
  MAIN: 'main',
  OPTIONS: 'options',
  GAME: 'game'
};

export const GAME_TYPES = {
  BLOCK: 'block',
  DRAW: 'draw'
};

export const VIEWPORT = {
  LANDSCAPE: {
    WIDTH: 1280,
    HEIGHT: 768
  },
  PORTRAIT: {
    WIDTH: 768,
    HEIGHT: 1024
  }
};

export const DOMINO_COUNTS = {
  TOTAL: 28,
  PER_PLAYER: {
    2: 7,
    3: 6,
    4: 6
  }
};

export const SOUND_TYPES = {
  CLICK: 'soundButton',
  DOMINO_PICK: 'soundDominoPick',
  DOMINO_PLACE: ['soundDomino1', 'soundDomino2', 'soundDomino3'],
  POINT: 'soundPoint',
  ROUND: 'soundRound',
  WINNER: 'soundWinner',
  SHUFFLE_IN: 'soundShuffleIn',
  SHUFFLE_OUT: 'soundShuffleOut',
  RESULT: 'soundResult',
  ALERT: 'soundAlert'
};

export const MUSIC_TYPES = {
  MAIN: 'musicMain',
  GAME: 'musicGame'
};