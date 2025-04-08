import cn from 'clsx';

import styles from './Button.module.css'

import type { FC, PropsWithChildren, ButtonHTMLAttributes } from "react";

interface ButtonProps extends PropsWithChildren, ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: 'filled' | 'outline' | 'ghost';
  size?: 'primary' | 'small' | 'square';
  isActive?: boolean;
}

export const Button: FC<ButtonProps> = ({ 
    className, 
    children, 
    variant='filled', 
    size='primary', 
    isActive,
    ...restProps 
  }) => {
    
  return (
    <button 
      className={cn(styles.button, styles[variant], styles[size], {[styles.active]: isActive}, className)} 
      {...restProps}
    >
      {children}
    </button>
  )
}