import { createContext } from 'react';
import { Setters } from 'src/utils/types/setters';

/** Geometries used in game. */
export type GameGeometry = 'sphere' | 'square';

/** Game state. */
interface GameState {

  /** Geometries on the board. */
  readonly geometries: Record<GameGeometry, number>;

  /** Whether is player in game. */
  readonly inGame: boolean;
}

export type GameContext =
  GameState &
  Setters<GameState> &
  {
    setGeometries(v: Partial<typeof initialGameState['geometries']>): void;
  };

export const initialGameState: GameContext = {
  geometries: {
    sphere: 0,
    square: 0,
  },
  inGame: false,
  setGeometries() {},
  setInGame() {},
};

export const GameStateContext = createContext<GameContext>(initialGameState);
