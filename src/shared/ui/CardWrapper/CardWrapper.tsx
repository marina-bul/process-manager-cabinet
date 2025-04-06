import { CheckIcon, CloseIcon } from '../../icons';
import { Button } from '../Button/Button';

import styles from './CardWrapper.module.css'

import type { FC, PropsWithChildren, ReactNode } from "react";

interface CardWrapperProps extends PropsWithChildren {
  title: string;
  isEditing?: boolean;
  mainAction: ReactNode;
  onCancel?: () => void;
  onSave?: () => void;
}

export const CardWrapper: FC<CardWrapperProps> = ({ children, title, isEditing, mainAction, onCancel, onSave }) => {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h3>{title}</h3>
        {isEditing ? (
          <div className={styles.actions}>
            <Button variant='outline' size='small' className={styles.btn} onClick={onSave}>
              <CheckIcon className={styles.btnIcon} />
              Save changes
            </Button>
            <Button variant='outline' size='small' className={styles.btn} onClick={onCancel}>
              <CloseIcon className={styles.btnIcon} />
              Cancel
            </Button>

          </div>
          ) : (
            <>{mainAction}</>
        )}
      </div>
      <>{children}</>
    </section>
  )
}