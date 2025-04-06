import { useState } from 'react';
import cn from 'clsx';

import styles from './Input.module.css';

import type { ChangeEvent, FC, InputHTMLAttributes } from 'react';


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
}



export const Input:FC<InputProps> = ({ value, onChange, className, ...restProps }) => {
  
    const [currentValue, setCurrentValue] = useState(value)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setCurrentValue(e.target.value);

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