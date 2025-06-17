import { create } from 'zustand';

export const useGameStore = create((set, get) => ({
  // Game state
  currentPage: 'main',
  gameState: 'menu', // menu, playing, paused, ended
  
  // Game settings
  totalPlayers: 2,
  targetPoints: 100,
  gameType: 'block', // block, draw
  currentTheme: 0,
  
  // Audio settings
  soundEnabled: true,
  musicEnabled: true,
  soundMuted: false,
  musicMuted: false,
  
  // Viewport
  viewport: {
    isLandscape: true,
    width: 1280,
    height: 768
  },
  
  // Game data
  players: [],
  currentPlayer: 0,
  dominoes: [],
  board: [],
  gameRound: 1,
  scores: [],
  
  // UI state
  showSettings: false,
  showExitConfirm: false,
  showResult: false,
  resultData: null,
  
  // Actions
  setCurrentPage: (page) => set({ currentPage: page }),
  setGameState: (state) => set({ gameState: state }),
  
  setTotalPlayers: (count) => set({ totalPlayers: count }),
  setTargetPoints: (points) => set({ targetPoints: points }),
  setGameType: (type) => set({ gameType: type }),
  setCurrentTheme: (theme) => set({ currentTheme: theme }),
  
  setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),
  setMusicEnabled: (enabled) => set({ musicEnabled: enabled }),
  setSoundMuted: (muted) => set({ soundMuted: muted }),
  setMusicMuted: (muted) => set({ musicMuted: muted }),
  
  setViewport: (viewport) => set((state) => ({ 
    viewport: { ...state.viewport, ...viewport } 
  })),
  
  setPlayers: (players) => set({ players }),
  setCurrentPlayer: (player) => set({ currentPlayer: player }),
  setDominoes: (dominoes) => set({ dominoes }),
  setBoard: (board) => set({ board }),
  setGameRound: (round) => set({ gameRound: round }),
  setScores: (scores) => set({ scores }),
  
  setShowSettings: (show) => set({ showSettings: show }),
  setShowExitConfirm: (show) => set({ showExitConfirm: show }),
  setShowResult: (show, data = null) => set({ showResult: show, resultData: data }),
  
  // Game actions
  startGame: () => {
    set({ 
      currentPage: 'game',
      gameState: 'playing',
      gameRound: 1,
      scores: Array(get().totalPlayers).fill(0)
    });
  },
  
  endGame: (winner) => {
    set({ 
      gameState: 'ended',
      showResult: true,
      resultData: { winner }
    });
  },
  
  resetGame: () => {
    set({
      currentPage: 'main',
      gameState: 'menu',
      players: [],
      currentPlayer: 0,
      dominoes: [],
      board: [],
      gameRound: 1,
      scores: [],
      showResult: false,
      resultData: null
    });
  }
}));