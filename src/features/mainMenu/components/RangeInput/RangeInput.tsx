import { ChangeEvent, FC, memo, useState } from 'react';

import style from './style.module.css';

interface Props {

  /** Minimal input value. */
  readonly min: number;

  /** Maximum input value. */
  readonly max: number;

  /** Initial input value. */
  readonly value: number;

  /** On change. */
  readonly onChange: (n: number) => void;

  /** Step. */
  readonly step?: number;
}

const RangeInputComponent: FC<Props> = ({ max, min, onChange, value, step = 1 }) => {

  const hangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
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
