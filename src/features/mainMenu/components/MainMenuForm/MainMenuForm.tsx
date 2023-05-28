import { FC, memo, useState, useEffect, ChangeEvent, useContext, useCallback } from 'react';

import { GameGeometry, GameStateContext } from 'src/components/GameStateContext';

import { RangeInput } from '../RangeInput';

const MAX_OBJECT_COUNT = 5;
const MIN_OBJECT_COUNT = 0;

const MainMenuFormComponent: FC = () => {

  const { geometries, setGeometries, setInGame } = useContext(GameStateContext);

  const [isEmpty, setIsEmpty] = useState(false);

  const handleSubmit = () => {
    if (!isEmpty) {
      setInGame(true);
    }
  };

  const updateGeometry = useCallback((geometry: GameGeometry) =>
    (count: number) => {
      setGeometries({
        ...geometries,
        [geometry]: count,
      });
    }
  , []);

  useEffect(() => {
    setIsEmpty([geometries.sphere, geometries.square].every(e => e === 0));
  }, [geometries]);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        Spheres:
        <RangeInput
          max={MAX_OBJECT_COUNT}
          min={MIN_OBJECT_COUNT}
          onChange={updateGeometry('sphere')}
        />
      </div>
      <div>
        Squares:
        <RangeInput
          max={MAX_OBJECT_COUNT}
          min={MIN_OBJECT_COUNT}
          onChange={updateGeometry('square')}
        />
      </div>
      {isEmpty && <div>Please select at least one item of at least one type</div>}
      <button
        disabled={isEmpty}
      >Play!</button>
    </form>
  )
};

export const MainMenuForm = memo(MainMenuFormComponent);
