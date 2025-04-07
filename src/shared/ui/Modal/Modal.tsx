import { FC, PropsWithChildren, RefObject, useRef } from 'react';
import { createPortal } from 'react-dom';

import { useOnClickOutside } from '../../helpers/useOnClickOutside';

import styles from './Modal.module.css';

interface ModalProps extends PropsWithChildren {
  title: string;
  onClose: () => void;
}


export const Modal: FC<ModalProps> = ({ title, children, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(modalRef as RefObject<HTMLElement>, onClose);

  return createPortal(
    <div className={styles.modalBackground}>
      <div className={styles.modalContent} ref={modalRef}>
        <h2 className={styles.modalTitle}>{title}</h2>
        <div className={styles.modalBody}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};


