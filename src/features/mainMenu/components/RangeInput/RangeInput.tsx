import { ChangeEvent, FC, memo, useState } from 'react';

import style from './style.module.css';

interface Props {

  /** Minimal input value. */
  readonly min: number;

  /** Maximum input value. */
  readonly max: number;

  /** Initial input value. */
  readonly initialValue?: number;

  /** Step. */
  readonly step?: number;

  /** The event occurs when the value of. */
  readonly onChange: (value: number) => void;
}

const RangeInputComponent: FC<Props> = ({ max, min, onChange, initialValue = min, step = 1 }) => {

  const [value, setValue] = useState(initialValue)

  const hangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);

    setValue(newValue);
    onChange(newValue);
  }

  return (
    <>
      <span className={style.value}>{value}</span>
      <input
        type="range"
        value={value}
        onChange={hangeChange}
        min={min}
        max={max}
        step={step}
      />
    </>
  );
}

export const RangeInput = memo(RangeInputComponent);
