import { FC, useState } from 'react';
import cn from 'clsx';

import { Button, CardWrapper } from 'shared/ui';
import { AddPhotoIcon, TrashIcon } from 'shared/icons';
import CompanyStore from 'shared/stores/CompanyStore';

import styles from './PhotosCard.module.css';
import { observer } from 'mobx-react-lite';

export const PhotosCard = observer(() => {

  const { photos } = CompanyStore;

  return (
    <CardWrapper 
      title='Photos' 
      mainAction={
        <Button variant='outline' size='small' className={styles.btn}>
          <AddPhotoIcon className={styles.btnIcon} />
          Add
        </Button>
      }
    >
      <div className={styles.gallery}>
        {photos.map((photo) => (
          <div className={styles.photoContainer} key={photo.name}>
            <img src={photo.filepath} alt="company photo" width={144} height={108} />
            <Button size='square' className={styles.removeBtn}>
              <TrashIcon />
            </Button> 
          </div>   
        ))}
      </div>
      
    </CardWrapper>           
  )
})