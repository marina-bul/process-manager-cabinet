import { useMemo, useRef, useState } from 'react';
import cn from 'clsx';

import styles from './Select.module.css';

import type { FC, RefObject } from 'react';
import { CheckIcon, ChevronIcon } from '../../icons';
import { useOnClickOutside } from '../../helpers/useOnClickOutside';

interface Option {
  label: string;
  value: string;
}
 
interface SelectProps {
  className?: string;
  options: Option[];
  multiple?: boolean;
  defaultSelected?: string[];
  checkboxOptions?: boolean;
  onChange: (selected: Option[]) => void;
}

export const Select: FC<SelectProps> = ({
  className,
  options,
  defaultSelected=[],
  onChange,
  checkboxOptions,
  multiple = checkboxOptions,
}) => {


  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(options.filter((o) => defaultSelected.includes(o.value)));

  const selectRef = useRef<HTMLDivElement>(null);
  
  useOnClickOutside(selectRef as RefObject<HTMLElement>, () => setOpen(false));

  const toggleOption = (option: Option) => {
    if (multiple) {
      if (selected.some((selOption) => selOption.value === option.value)) {
        setSelected(selected.filter((opt) => opt.value !== option.value));
        onChange(selected.filter((opt) => opt.value !== option.value));
      } else {
        setSelected([...selected, option])
        onChange([...selected, option]);
      }
    } else {
      setSelected([option])
      onChange([option]);
      setOpen(false);
    }
  };

  const triggerLabel = useMemo(() => {
    if (selected.length === 0) return 'Select option';

    const labels = selected.map((option) => option.label);

    return multiple ? labels.join(', ') : labels[0];
  }, [selected, multiple]) ;

  return (
    <div className={cn(styles.wrapper, className)} ref={selectRef}>
      <div
        className={cn(styles.trigger, { [styles.focused]: open })}
        tabIndex={0}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className={styles.value}>{triggerLabel}</span>
        <ChevronIcon className={cn(styles.arrow, { [styles.rotated]: open })} />
      </div>

      {open && (
        <ul className={styles.dropdown}>
          {options.map((opt) => {
            const isSelected = selected.some((selOption) => selOption.value === opt.value);
            return (
              <li
                key={opt.value}
                className={cn(styles.option, { [styles.selected]: isSelected })}
                onClick={() => toggleOption(opt)}
              >
                {checkboxOptions && (
                  <span className={styles.checkboxBox}>
                    <input type="checkbox" checked={isSelected} readOnly style={{ display: 'none' }} />
                    {isSelected && (<CheckIcon className={styles.checkboxCheck} />)}
                  </span>
                )}
                <span className={styles.optionLabel}>{opt.label}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}