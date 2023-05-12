import { FC, memo, useState, useEffect } from 'react';

import { RangeInput } from '../RangeInput';

const MAX_OBJECT_COUNT = 5;
const MIN_OBJECT_COUNT = 0;

const MainMenuFormComponent: FC = () => {
  const [balls, setBalls] = useState(MIN_OBJECT_COUNT);
  const [squares, setSquares] = useState(MIN_OBJECT_COUNT);

  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    setIsEmpty([balls, squares].every(e => e === 0));
  },[balls, squares]);

  return (
    <form>
      <div>
        Balls:
        <RangeInput
          max={MAX_OBJECT_COUNT}
          min={MIN_OBJECT_COUNT}
          onChange={setBalls}
        />
      </div>
      <div>
        Squares:
        <RangeInput
          max={MAX_OBJECT_COUNT}
          min={MIN_OBJECT_COUNT}
          onChange={setSquares}
        />
      </div>
      {[balls, squares].every(e => e === 0) && <div>Please choose </div>}
    </form>
  )
}

export const MainMenuForm = memo(MainMenuFormComponent);
