import { FC, memo } from 'react';

import { MainMenuForm } from './components/MainMenuForm';
import style from './style.module.css';

const MainMenuComponent: FC = () => (
  <div className={style.mainMenuPage}>
    <div className={style.mainMenu}>
      <h1 className={style.mainMenuHeader}>%GAME_NAME%</h1>
      <MainMenuForm />
    </div>
  </div>
);

export const MainMenu = memo(MainMenuComponent);
