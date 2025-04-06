import { DetailsCard } from './elems/DetailsCard/DetailsCard';
import { ContactsCard } from './elems/ContactsCard/ContactsCard';
import { PhotosCard } from './elems/PhotosCard/PhotosCard';

import styles from './CompanyPage.module.css'
import { EditIcon, TrashIcon } from '../../shared/icons';
import { Button } from '../../shared/ui';

export const CompanyPage = () => {

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Eternal Rest Funeral Home</h2>
        <div className={styles.actions}>
          <Button variant='ghost'>
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
      
    </div>
  )
}