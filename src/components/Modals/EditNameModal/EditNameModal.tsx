import { useCallback, useState } from 'react';
import { Button, Input, Modal } from 'shared/ui';

import styles from './EditNameModal.module.css'

import type { FC } from 'react';
import type { CompanyInfo } from 'types/general';

interface EditNameModalProps {
  companyName: string;
  onEditName: (data: Partial<CompanyInfo>) => void;
  onModalClose: () => void;
}

export const EditNameModal: FC<EditNameModalProps> = ({ companyName, onEditName, onModalClose }) => {
  const [ currentName, setCurrentName ] = useState(companyName);

  const handleEditName = useCallback(() => {
    const newInfo: Partial<CompanyInfo> = { name: currentName, shortName: currentName };
    onEditName(newInfo);
    onModalClose();
  }, [currentName, onEditName, onModalClose])

  return (
    <Modal title="Specify the Organization's name" onClose={onModalClose}>
      <Input 
        value={currentName} 
        className={styles.input} 
        onChange={(e) => setCurrentName(e.target.value)} 
      />

      <div className={styles.modalActions}>
        <Button 
          variant='outline' 
          className={styles.modalBtn} 
          onClick={onModalClose}
        >
          Cancel
        </Button>
        <Button className={styles.modalBtn} onClick={handleEditName}>
          Save changes
        </Button>
      </div>
    </Modal>
  )

}