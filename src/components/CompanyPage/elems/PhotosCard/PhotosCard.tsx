// import { useState } from 'react';
// import cn from 'clsx';

import { Button, CardWrapper } from '../../../../shared/ui';
import { EditIcon, TrashIcon } from '../../../../shared/icons';

import styles from './PhotosCard.module.css'

export const PhotosCard = () => {

  return (
    <CardWrapper 
      title='Photos' 
      mainAction={
        <Button variant='outline' size='small' className={styles.btn}>
          <EditIcon className={styles.btnIcon} />
          Add
        </Button>
      }
    >
      <div className={styles.gallery}>
        <div className={styles.photoContainer}>
          <img src='/image1.png' alt="company photo" width={144} height={108} />
          <Button size='square' className={styles.removeBtn}>
            <TrashIcon />
          </Button> 
        </div>

        <div className={styles.photoContainer}>
          <img src='/image2.png' alt="company photo" width={144} height={108} />
          <Button size='square' className={styles.removeBtn}>
            <TrashIcon />
          </Button> 
        </div>
      </div>
      
    </CardWrapper>           
  )
}