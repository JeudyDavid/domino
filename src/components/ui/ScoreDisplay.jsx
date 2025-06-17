import React from 'react';
import { useGameStore } from '../../store/gameStore';

const ScoreDisplay = () => {
  const { 
    scores,
    targetPoints,
    totalPlayers
  } = useGameStore();

  return (
    <div className="score-display">
      <h3>Scores (Target: {targetPoints})</h3>
      {scores.slice(0, totalPlayers).map((score, index) => (
        <div 
          key={index}
          className="score-item"
          style={{
            padding: '5px 10px',
            margin: '2px 0',
            background: 'rgba(0,0,0,0.3)',
            borderRadius: '5px',
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <span>Player {index + 1}:</span>
          <span style={{ fontWeight: 'bold' }}>{score}</span>
        </div>
      ))}
    </div>
  );
};

export default ScoreDisplay;