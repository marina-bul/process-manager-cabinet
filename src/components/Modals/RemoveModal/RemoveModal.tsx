import { Button, Modal } from 'shared/ui';

import styles from './RemoveModal.module.css'

import type { FC } from 'react';

interface RemoveModalProps {
  onRemove: () => void;
  onModalClose: () => void;
}

export const RemoveModal: FC<RemoveModalProps> = ({ onRemove, onModalClose }) => {

  const handleRemove = () => {
    onRemove();
    onModalClose()
  }

  return (
    <Modal title="Remove the Organization?" onClose={onModalClose}>
      <p className={styles.text}>
        Are you sure you want to remove this Organozation?
      </p>

      <div className={styles.modalActions}>
        <Button 
          variant='outline' 
          className={styles.modalBtn} 
          onClick={onModalClose}
        >
          Cancel
        </Button>
        <Button className={styles.modalBtn} onClick={handleRemove}>
          Yes, remove
        </Button>
      </div>
    </Modal>
  )

}