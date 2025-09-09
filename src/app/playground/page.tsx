"use client";

import { useState, useEffect } from 'react';
import styles from './playground.module.css';

export default function Playground() {
  const [helicopterPos, setHelicopterPos] = useState({ x: 50, y: 50 });
  const [netPos, setNetPos] = useState({ x: 200 });
  const [bombs, setBombs] = useState<Array<{x: number, y: number}>>([]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [settings, setSettings] = useState({
    bombSpeed: 5,
    bombFrequency: 0.02,
    netWidth: 100,
    helicopterSpeed: 2
  });

  useEffect(() => {
    const gameLoop = setInterval(() => {
      // Move helicopter
      setHelicopterPos(prev => ({
        ...prev,
        x: prev.x + 2 > window.innerWidth ? 0 : prev.x + 2
      }));

      // Drop bombs randomly
      if (Math.random() < 0.02) {
        setBombs(prev => [...prev, { x: helicopterPos.x, y: helicopterPos.y }]);
      }

      // Move bombs and check collisions
      setBombs(prev => {
        const newBombs = prev.filter(bomb => {
          // Check if bomb hit the net
          if (bomb.y > window.innerHeight - 150 && bomb.y < window.innerHeight - 90) {
            if (Math.abs(bomb.x - netPos.x) < settings.netWidth / 2) {
              setScore(s => s + 10);
              return false;
            }
          }
          
          // Check if bomb hit the village
          if (bomb.y > window.innerHeight - 50) {
            setGameOver(true);
            return false;
          }
          
          return bomb.y < window.innerHeight;
        }).map(bomb => ({ ...bomb, y: bomb.y + settings.bombSpeed }));
        
        return newBombs;
      });
    }, 50);

    return () => clearInterval(gameLoop);
  }, [helicopterPos]);

  const handleKeyDown = (e: KeyboardEvent) => {
    switch(e.key) {
      case 'ArrowLeft':
        setNetPos(prev => ({ x: Math.max(0, prev.x - 20) }));
        break;
      case 'ArrowRight':
        setNetPos(prev => ({ x: Math.min(window.innerWidth - 100, prev.x + 20) }));
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={styles.playground} tabIndex={0}>
      <div className={styles.gameInfo}>
        <div className={styles.score}>Score: {score}</div>
        {gameOver && (
          <div className={styles.gameOver}>
            <h2>Game Over!</h2>
            <p>Final Score: {score}</p>
            <button onClick={() => window.location.reload()}>Play Again</button>
          </div>
        )}
      </div>
      <div 
        className={styles.helicopter}
        style={{ left: helicopterPos.x, top: helicopterPos.y }}
      >
        🚁
      </div>
      {bombs.map((bomb, index) => (
        <div
          key={index}
          className={styles.bomb}
          style={{ left: bomb.x, top: bomb.y }}
        >
          💣
        </div>
      ))}
      <div className={styles.village}>
        🏠🏠🏠
      </div>
      <div 
        className={styles.net}
        style={{ left: netPos.x }}
      >
        🕸️
      </div>
    </div>
  );
}