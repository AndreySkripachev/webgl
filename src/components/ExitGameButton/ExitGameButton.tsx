import { FC, memo, useContext } from 'react';

import { GameStateContext } from '../GameStateContext';

import style from './style.module.css';

const ExitGameButtonComponent: FC = () => {
  const { setInGame } = useContext(GameStateContext);

  const handleExit = () => {
    setInGame(false);
  }

  return (
    <button
      type="button"
      onClick={handleExit}
      className={style.button}
    >
        Go to the Main Menu
    </button>
  );
};

export const ExitGameButton = memo(ExitGameButtonComponent);
