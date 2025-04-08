import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import CompanyStore from 'shared/stores/CompanyStore';
import { Button } from 'shared/ui';
import { EditIcon, TrashIcon } from 'shared/icons';
import { EditNameModal, RemoveModal } from 'components/Modals';

import { DetailsCard } from './elems/DetailsCard/DetailsCard';
import { ContactsCard } from './elems/ContactsCard/ContactsCard';
import { PhotosCard } from './elems/PhotosCard/PhotosCard';

import styles from './CompanyPage.module.css'


const Header = observer(() => {

  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false)

  const { companyName, deleteCompanyAction, updateCompanyAction } = CompanyStore

  return (
    <>
      <div className={styles.header}>
        <h2 className={styles.title}>{companyName}</h2>
        <div className={styles.actions}>
          <Button variant='ghost' onClick={() => setIsEditModalOpen(true)}>
            <EditIcon />
          </Button>
          <Button variant='ghost' className={styles.removeBtn} onClick={() => setIsRemoveModalOpen(true)}>
            <TrashIcon />
          </Button>
        </div>
      </div>

      {isEditModalOpen && (
        <EditNameModal 
          companyName={companyName} 
          onEditName={updateCompanyAction} 
          onModalClose={() => setIsEditModalOpen(false)} 
        />
      )}

      {isRemoveModalOpen && (
        <RemoveModal 
          onRemove={deleteCompanyAction} 
          onModalClose={() => setIsRemoveModalOpen(false)} 
        />
      )}
    </>

  )
});

export const CompanyPage = () => {

  useEffect(() => {
    CompanyStore.getStoreInfo();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.content}>
        <DetailsCard />
        <ContactsCard />
        <PhotosCard />
      </div>
      <div className={styles.footer} />
    
    </div>
  )
}