import { useState } from 'react';
import { observer } from 'mobx-react-lite';

import CompanyStore from 'shared/stores/CompanyStore';
import { UploadModal } from 'components/Modals';
import { Button, CardWrapper } from 'shared/ui';
import { AddPhotoIcon, TrashIcon } from 'shared/icons';

import styles from './PhotosCard.module.css';

export const PhotosCard = observer(() => {

  const { photos, deletePhotoAction, uploadPhotoAction } = CompanyStore;
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)

  return (
    <CardWrapper 
      title='Photos' 
      mainAction={
        <Button variant='outline' size='small' className={styles.btn} onClick={() => setIsUploadModalOpen(true)}>
          <AddPhotoIcon className={styles.btnIcon} />
          Add
        </Button>
      }
    >
      <div className={styles.gallery}>
        {photos.length > 0 && photos.map((photo) => (
          <div className={styles.photoContainer} key={photo.name}>
            <img src={photo.filepath} alt="company photo" width={144} height={108} />
            <Button size='square' className={styles.removeBtn} onClick={() => deletePhotoAction(photo.name)}>
              <TrashIcon />
            </Button> 
          </div>   
        ))}

        {photos.length === 0 && (
          <p>The company does not have any photos yet. You can add the first one</p>
        )}
      </div>
      
      {isUploadModalOpen && (
        <UploadModal 
          onUpload={uploadPhotoAction}
          onModalClose={() => setIsUploadModalOpen(false)} 
        />
      )}
    </CardWrapper>           
  )
})