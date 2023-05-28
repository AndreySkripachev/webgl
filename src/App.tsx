import { FC, useEffect, useRef, useState } from 'react';

import styles from './App.module.css';

import { MainScene } from './lib/immersive/mainScene';
import { MainMenu } from './features/mainMenu/MainMenu';
import { GameStateContext, initialGameState } from './components/GameStateContext';
import { ExitGameButton } from './components/ExitGameButton/ExitGameButton';

/**
 * App component containing canvas with babylonjs scene.
 * Can be moved to a separate component.
 */
export const App: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scene = useRef<MainScene | null>(null);

  const [inGame, setInGame] = useState(initialGameState.inGame);

  const [square, setSquare] = useState(initialGameState.geometries.square);
  const [sphere, setSphere] = useState(initialGameState.geometries.sphere);

  const gameState: typeof initialGameState = {
    geometries: { sphere, square },
    inGame,
    setGeometries({ sphere: spCount, square: sqCount }: Partial<typeof initialGameState['geometries']> ) {
      if (typeof sqCount === 'number') {
        setSquare(sqCount);
      }

      if (typeof spCount === 'number') {
        setSphere(spCount);
      }
    },
    setInGame(val) {
      setInGame(val);
    },
  };

  useEffect(() => {
    if (canvasRef.current != null) {
      scene.current = new MainScene(canvasRef.current);
    }

    return () => scene.current?.erase();
  }, []);

  return (
    <GameStateContext.Provider value={gameState}>
      <div className={styles.root}>
        { inGame ? <ExitGameButton /> : <MainMenu />}
        <canvas
          className={styles.scene}
          ref={canvasRef}
        />
      </div>
    </GameStateContext.Provider>
  );
};
