import { useState } from 'react';
import cn from 'clsx';

import styles from './Select.module.css';

import type { FC } from 'react';

interface Option {
  label: string;
  value: string;
}
 
interface SelectProps {
  className?: string;
  options: Option[];
  multiple?: boolean;
  selected?: string[];
  checkboxOptions?: boolean;
  onChange: (selected: string[]) => void;
}

export const Select: FC<SelectProps> = ({
  className,
  options,
  selected=[],
  onChange,
  checkboxOptions,
  multiple = checkboxOptions,
}) => {
  const [open, setOpen] = useState(false);

  const toggleOption = (value: string) => {
    if (multiple) {
      if (selected.includes(value)) {
        onChange(selected.filter((v) => v !== value));
      } else {
        onChange([...selected, value]);
      }
    } else {
      onChange([value]);
      setOpen(false);
    }
  };

  const getDisplayValue = () => {
    if (selected.length === 0) return 'Select option';
    const labels = options.filter((o) => selected.includes(o.value)).map((o) => o.label);
    return multiple ? labels.join(', ') : labels[0];
  };

  return (
    <div className={cn(styles.wrapper, className)}>
      <div
        className={`${styles.input} ${open ? styles.focused : ''}`}
        tabIndex={0}
        onClick={() => setOpen((prev) => !prev)}
        // onBlur={() => setTimeout(() => setOpen(false), 100)}
      >
        <span className={styles.value}>{getDisplayValue()}</span>
        <svg
          className={`${styles.arrow} ${open ? styles.rotated : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {open && (
        <ul className={styles.dropdown}>
          {options.map((opt) => {
            const isSelected = selected.includes(opt.value);
            return (
              <li
                key={opt.value}
                className={`${styles.option} ${isSelected ? styles.selected : ''}`}
                onClick={() => toggleOption(opt.value)}
              >
                {checkboxOptions && (
                  <span className={styles.checkboxBox}>
                    <input type="checkbox" checked={isSelected} readOnly style={{ display: 'none' }} />
                    {isSelected && (<span className={styles.checkboxCheck}>V</span>)}
                  </span>
                )}
                <span>{opt.label}</span>

              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}