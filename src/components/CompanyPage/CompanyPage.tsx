import { DetailsCard } from './elems/DetailsCard/DetailsCard';

import styles from './CompanyPage.module.css'



export const CompanyPage = () => {

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Eternal Rest Funeral Home</h2>
        <div className={styles.actions}>
          actions
        </div>
      </div>
      <div className={styles.content}>
        <DetailsCard />
      </div>
      
    </div>
  )
}