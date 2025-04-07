import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import CompanyStore from 'shared/stores/CompanyStore';
import { Modal } from 'shared/ui/Modal/Modal';
import { Button } from 'shared/ui';
import { EditIcon, TrashIcon } from 'shared/icons';

import { DetailsCard } from './elems/DetailsCard/DetailsCard';
import { ContactsCard } from './elems/ContactsCard/ContactsCard';
import { PhotosCard } from './elems/PhotosCard/PhotosCard';

import styles from './CompanyPage.module.css'


const Title = observer(() => (
  <h2 className={styles.title}>{CompanyStore.companyName}</h2>
));

export const CompanyPage = () => {

  const {
    getStoreInfo,
    deleteCompanyAction, 
  } = CompanyStore

  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    getStoreInfo();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title />
        <div className={styles.actions}>
          <Button variant='ghost' onClick={() => setModalOpen(true)}>
            <EditIcon />
          </Button>
          <Button variant='ghost' className={styles.removeBtn} onClick={deleteCompanyAction}>
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