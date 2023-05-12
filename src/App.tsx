import { FC, useEffect, useRef } from 'react';

import styles from './App.module.css';

import { MainScene } from './lib/immersive/mainScene';
import { MainMenuPage } from './features/mainMenu/MainMenuPage';

/**
 * App component containing canvas with babylonjs scene.
 * Can be moved to a separate component.
 */
export const App: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scene = useRef<MainScene | null>(null);

  useEffect(() => {
    if (canvasRef.current != null) {
      scene.current = new MainScene(canvasRef.current);
    }

    return () => scene.current?.erase();
  }, []);

  return (
    <div className={styles.root}>
      <MainMenuPage/>
      {/* <canvas
        className={styles.scene}
        ref={canvasRef}
      /> */}
    </div>
  );
};
