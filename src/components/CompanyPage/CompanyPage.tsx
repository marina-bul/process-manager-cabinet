import { DetailsCard } from './elems/DetailsCard/DetailsCard';
import { ContactsCard } from './elems/ContactsCard/ContactsCard';
import { PhotosCard } from './elems/PhotosCard/PhotosCard';

import styles from './CompanyPage.module.css'
import { EditIcon, TrashIcon } from '../../shared/icons';
import { Button } from '../../shared/ui';
import { useState } from 'react';
import { Modal } from '../../shared/ui/Modal/Modal';

export const CompanyPage = () => {

  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Eternal Rest Funeral Home</h2>
        <div className={styles.actions}>
          <Button variant='ghost' onClick={() => setModalOpen(true)}>
            <EditIcon />
          </Button>
          <Button variant='ghost' className={styles.removeBtn}>
            <TrashIcon />
          </Button>
        </div>
      </div>
      <div className={styles.content}>
        <DetailsCard />
        <ContactsCard />
        <PhotosCard />
      </div>
      <div className={styles.footer} />

      {modalOpen && (
        <Modal title="Specify the Organization's name" onClose={() => setModalOpen(false)}>
          <span>Eternal Rest Funeral Home</span>
          <div className={styles.modalActions}>
            <Button variant='outline' className={styles.modalBtn}>Cancel</Button>
            <Button className={styles.modalBtn}>Save changes</Button>
          </div>
        </Modal>
      )}
      
    </div>
  )
}