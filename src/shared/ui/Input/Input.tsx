import { useState } from 'react';
import cn from 'clsx';

import styles from './Input.module.css';

import type { ChangeEvent, FC, InputHTMLAttributes } from 'react';


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  numOnly?: boolean;
}

export const Input:FC<InputProps> = ({ 
  value, 
  numOnly, 
  onChange, 
  className, 
  ...restProps 
}) => {

    const [currentValue, setCurrentValue] = useState(value)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const editedValue = numOnly ? e.target.value.replace(/\D/g, '') : e.target.value
      
      setCurrentValue(editedValue);

      if(onChange) onChange(e);
      
    };
    
    return (
      <input
        className={cn(styles.input, className)}
        value={currentValue} 
        onChange={handleChange}
        {...restProps}
      />
    )
}