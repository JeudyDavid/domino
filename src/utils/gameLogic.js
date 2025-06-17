// Domino game logic utilities

export const createDominoSet = () => {
  const dominoes = [];
  for (let i = 0; i <= 6; i++) {
    for (let j = i; j <= 6; j++) {
      dominoes.push({ left: i, right: j, id: `${i}-${j}` });
    }
  }
  return dominoes;
};

export const shuffleDominoes = (dominoes) => {
  const shuffled = [...dominoes];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const dealDominoes = (dominoes, playerCount) => {
  const dominoesPerPlayer = playerCount === 2 ? 7 : 6;
  const players = [];
  
  for (let i = 0; i < playerCount; i++) {
    players.push({
      id: i,
      dominoes: dominoes.slice(i * dominoesPerPlayer, (i + 1) * dominoesPerPlayer),
      score: 0
    });
  }
  
  const boneyard = dominoes.slice(playerCount * dominoesPerPlayer);
  return { players, boneyard };
};

export const findHighestDouble = (dominoes) => {
  const doubles = dominoes.filter(d => d.left === d.right);
  if (doubles.length === 0) return null;
  return doubles.reduce((highest, current) => 
    current.left > highest.left ? current : highest
  );
};

export const canPlayDomino = (domino, board) => {
  if (board.length === 0) return true;
  
  const leftEnd = board[0].left;
  const rightEnd = board[board.length - 1].right;
  
  return domino.left === leftEnd || domino.right === leftEnd ||
         domino.left === rightEnd || domino.right === rightEnd;
};

export const playDomino = (domino, board, position) => {
  const newBoard = [...board];
  
  if (position === 'left') {
    if (domino.right === board[0].left) {
      newBoard.unshift(domino);
    } else {
      newBoard.unshift({ left: domino.right, right: domino.left, id: domino.id });
    }
  } else {
    if (domino.left === board[board.length - 1].right) {
      newBoard.push(domino);
    } else {
      newBoard.push({ left: domino.right, right: domino.left, id: domino.id });
    }
  }
  
  return newBoard;
};

export const calculateScore = (dominoes) => {
  return dominoes.reduce((total, domino) => total + domino.left + domino.right, 0);
};

export const isGameBlocked = (players, boneyard, board) => {
  if (boneyard.length > 0) return false;
  
  return players.every(player => 
    player.dominoes.every(domino => !canPlayDomino(domino, board))
  );
};

export const findWinner = (players, targetScore) => {
  return players.find(player => player.score >= targetScore);
};