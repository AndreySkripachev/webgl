import { FC, useContext, useEffect, useRef, useState } from 'react';

import styles from './App.module.css';

import { MainScene } from './lib/immersive/mainScene';
import { MainMenu } from './features/mainMenu/MainMenu';
import { GameStateContext, initialGameState } from './components/GameStateContext';

/**
 * App component containing canvas with babylonjs scene.
 * Can be moved to a separate component.
 */
export const App: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scene = useRef<MainScene | null>(null);

  const [inGame, setInGame] = useState(initialGameState.inGame);
  const [geometries, setGeometries] = useState(initialGameState.geometries);

  const gameState: typeof initialGameState = {
    geometries,
    inGame,
    setGeometries,
    setInGame,
  };

  useEffect(() => {
    if (canvasRef.current != null) {
      scene.current = new MainScene(canvasRef.current);
    }

    return () => scene.current?.erase();
  }, []);

  useEffect(() => {
    
  }, [inGame]);

  return (
    <GameStateContext.Provider value={gameState}>
      <div className={styles.root}>
        <MainMenu />
        {/* <canvas
          className={styles.scene}
          ref={canvasRef}
        /> */}
      </div>
    </GameStateContext.Provider>
  );
};
