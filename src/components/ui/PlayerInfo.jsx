import React from 'react';
import { useGameStore } from '../../store/gameStore';

const PlayerInfo = () => {
  const { 
    players,
    currentPlayer,
    totalPlayers
  } = useGameStore();

  return (
    <div className="player-info">
      <h3>Players</h3>
      {players.slice(0, totalPlayers).map((player, index) => (
        <div 
          key={index} 
          className={`player-item ${index === currentPlayer ? 'active' : ''}`}
          style={{
            padding: '5px 10px',
            margin: '2px 0',
            background: index === currentPlayer ? '#4CAF50' : 'rgba(0,0,0,0.3)',
            borderRadius: '5px',
            color: 'white'
          }}
        >
          <div>Player {index + 1}</div>
          <div>Dominoes: {player.dominoes?.length || 0}</div>
        </div>
      ))}
    </div>
  );
};

export default PlayerInfo;