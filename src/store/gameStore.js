import { create } from 'zustand';
import { 
  createDominoSet, 
  shuffleDominoes, 
  dealDominoes, 
  findHighestDouble,
  canPlayDomino as canPlay,
  playDomino as placeDomino,
  calculateScore,
  isGameBlocked,
  findWinner
} from '../utils/gameLogic';

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
  boneyard: [],
  gameRound: 1,
  scores: [],
  gameHistory: [],
  
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
  setBoneyard: (boneyard) => set({ boneyard }),
  setGameRound: (round) => set({ gameRound: round }),
  setScores: (scores) => set({ scores }),
  
  setShowSettings: (show) => set({ showSettings: show }),
  setShowExitConfirm: (show) => set({ showExitConfirm: show }),
  setShowResult: (show, data = null) => set({ showResult: show, resultData: data }),
  
  // Game logic functions
  canPlayDomino: (domino, board) => {
    return canPlay(domino, board || get().board);
  },
  
  // Game actions
  initializeGame: () => {
    const { totalPlayers } = get();
    const dominoSet = createDominoSet();
    const shuffledDominoes = shuffleDominoes(dominoSet);
    const { players, boneyard } = dealDominoes(shuffledDominoes, totalPlayers);
    
    // Find starting player (highest double)
    let startingPlayer = 0;
    let highestDouble = null;
    
    players.forEach((player, index) => {
      const playerHighest = findHighestDouble(player.dominoes);
      if (playerHighest && (!highestDouble || playerHighest.left > highestDouble.left)) {
        highestDouble = playerHighest;
        startingPlayer = index;
      }
    });
    
    // If no doubles, find highest domino
    if (!highestDouble) {
      let highestValue = -1;
      players.forEach((player, index) => {
        player.dominoes.forEach(domino => {
          const value = domino.left + domino.right;
          if (value > highestValue) {
            highestValue = value;
            startingPlayer = index;
          }
        });
      });
    }
    
    set({
      players,
      boneyard,
      currentPlayer: startingPlayer,
      board: [],
      gameHistory: []
    });
  },
  
  startGame: () => {
    const { initializeGame } = get();
    initializeGame();
    
    set({ 
      currentPage: 'game',
      gameState: 'playing',
      gameRound: 1,
      scores: Array(get().totalPlayers).fill(0)
    });
  },
  
  playDomino: (domino, dominoIndex) => {
    const { 
      players, 
      currentPlayer, 
      board, 
      boneyard,
      gameType,
      checkGameEnd,
      nextPlayer
    } = get();
    
    const currentPlayerData = players[currentPlayer];
    
    // Check if domino can be played
    if (!canPlay(domino, board)) {
      return false;
    }
    
    // Determine where to place the domino
    let newBoard;
    if (board.length === 0) {
      newBoard = [domino];
    } else {
      // For simplicity, try to place at the right end first
      const rightEnd = board[board.length - 1].right;
      const leftEnd = board[0].left;
      
      if (domino.left === rightEnd) {
        newBoard = [...board, domino];
      } else if (domino.right === rightEnd) {
        newBoard = [...board, { left: domino.right, right: domino.left, id: domino.id }];
      } else if (domino.right === leftEnd) {
        newBoard = [domino, ...board];
      } else if (domino.left === leftEnd) {
        newBoard = [{ left: domino.right, right: domino.left, id: domino.id }, ...board];
      } else {
        return false;
      }
    }
    
    // Remove domino from player's hand
    const newPlayers = [...players];
    newPlayers[currentPlayer] = {
      ...currentPlayerData,
      dominoes: currentPlayerData.dominoes.filter((_, index) => index !== dominoIndex)
    };
    
    // Add to game history
    const gameHistory = get().gameHistory;
    gameHistory.push({
      player: currentPlayer,
      domino,
      board: [...newBoard]
    });
    
    set({
      players: newPlayers,
      board: newBoard,
      gameHistory
    });
    
    // Check if game ends
    if (checkGameEnd()) {
      return true;
    }
    
    // Move to next player
    nextPlayer();
    return true;
  },
  
  drawFromBoneyard: () => {
    const { players, currentPlayer, boneyard, gameType } = get();
    
    if (gameType === 'block' || boneyard.length === 0) {
      return false;
    }
    
    const drawnDomino = boneyard[0];
    const newBoneyard = boneyard.slice(1);
    
    const newPlayers = [...players];
    newPlayers[currentPlayer] = {
      ...newPlayers[currentPlayer],
      dominoes: [...newPlayers[currentPlayer].dominoes, drawnDomino]
    };
    
    set({
      players: newPlayers,
      boneyard: newBoneyard
    });
    
    return true;
  },
  
  nextPlayer: () => {
    const { currentPlayer, totalPlayers, checkForValidMoves } = get();
    const nextPlayerIndex = (currentPlayer + 1) % totalPlayers;
    
    set({ currentPlayer: nextPlayerIndex });
    
    // Check if the new current player has valid moves
    checkForValidMoves();
  },
  
  checkForValidMoves: () => {
    const { players, currentPlayer, board, gameType, drawFromBoneyard, nextPlayer } = get();
    const currentPlayerData = players[currentPlayer];
    
    // Check if current player can play any domino
    const hasValidMove = currentPlayerData.dominoes.some(domino => 
      canPlay(domino, board)
    );
    
    if (!hasValidMove) {
      if (gameType === 'draw') {
        // Try to draw from boneyard
        if (drawFromBoneyard()) {
          // Check again after drawing
          const updatedPlayer = get().players[currentPlayer];
          const stillHasNoMoves = !updatedPlayer.dominoes.some(domino => 
            canPlay(domino, board)
          );
          
          if (stillHasNoMoves) {
            nextPlayer();
          }
        } else {
          // No more dominoes to draw, skip turn
          nextPlayer();
        }
      } else {
        // Block game, skip turn
        nextPlayer();
      }
    }
  },
  
  checkGameEnd: () => {
    const { players, currentPlayer, board, boneyard, endRound } = get();
    
    // Check if current player has no dominoes left
    if (players[currentPlayer].dominoes.length === 0) {
      endRound(currentPlayer);
      return true;
    }
    
    // Check if game is blocked
    if (isGameBlocked(players, boneyard, board)) {
      // Find player with lowest score
      const playerScores = players.map(player => calculateScore(player.dominoes));
      const lowestScore = Math.min(...playerScores);
      const winner = playerScores.indexOf(lowestScore);
      
      endRound(winner);
      return true;
    }
    
    return false;
  },
  
  endRound: (winner) => {
    const { players, scores, targetPoints, gameRound, endGame } = get();
    
    // Calculate round scores
    const roundScores = players.map(player => calculateScore(player.dominoes));
    const totalOpponentScore = roundScores.reduce((sum, score, index) => 
      index !== winner ? sum + score : sum, 0
    );
    
    // Update scores
    const newScores = [...scores];
    newScores[winner] += totalOpponentScore;
    
    set({ scores: newScores });
    
    // Check if game is won
    if (newScores[winner] >= targetPoints) {
      endGame(winner);
    } else {
      // Start new round
      set({ gameRound: gameRound + 1 });
      get().initializeGame();
    }
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
      boneyard: [],
      gameRound: 1,
      scores: [],
      gameHistory: [],
      showResult: false,
      resultData: null
    });
  }
}));