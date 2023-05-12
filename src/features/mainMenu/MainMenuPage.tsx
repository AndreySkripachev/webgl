import { FC, memo } from 'react';

import { MainMenuForm } from './components/MainMenuForm';
import style from './style.module.css';

const MainMenuPageComponent: FC = () => (
  <div className={style.mainMenu}>
    <h1>%GAME_NAME%</h1>
    <MainMenuForm />
  </div>
);

export const MainMenuPage = memo(MainMenuPageComponent);
