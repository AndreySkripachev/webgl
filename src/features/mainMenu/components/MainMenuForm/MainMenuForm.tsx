import { FC, memo, useState, useEffect, useContext, useCallback, FormEvent } from 'react';

import { GameGeometry, GameStateContext } from 'src/components/GameStateContext';

import { RangeInput } from '../RangeInput';

const MAX_OBJECT_COUNT = 5;
const MIN_OBJECT_COUNT = 0;

const MainMenuFormComponent: FC = () => {

  const context = useContext(GameStateContext);

  const [isEmpty, setIsEmpty] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!isEmpty) {
      context.setInGame(true);
    }
  };

  const updateGeometry = useCallback((geometry: GameGeometry) =>
    (count: number) => {
      // debugger;
      context.setGeometries({
        [geometry]: count,
      });
    }
  , []);

  useEffect(() => {
    setIsEmpty([context.geometries.sphere, context.geometries.square].every(e => e === 0));
  }, [context.geometries]);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        Spheres:
        <RangeInput
          max={MAX_OBJECT_COUNT}
          min={MIN_OBJECT_COUNT}
          value={context.geometries.sphere}
          onChange={updateGeometry('sphere')}
        />
      </div>
      <div>
        Squares:
        <RangeInput
          max={MAX_OBJECT_COUNT}
          min={MIN_OBJECT_COUNT}
          onChange={updateGeometry('square')}
          value={context.geometries.square}
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
