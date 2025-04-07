import { FC, useState } from 'react';
import { observer } from 'mobx-react-lite';
import cn from 'clsx';

import CompanyStore from 'shared/stores/CompanyStore';
import { Input, Button, CardWrapper } from 'shared/ui';
import { EditIcon } from 'shared/icons';

import styles from './ContactsCard.module.css';
// import { ContactInfo } from '../../../../types/general';


export const ContactsCard: FC = observer(( ) => {

  const { contacts } = CompanyStore

  const [ isEditing, setIsEditing ] = useState(false);

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);

  const handleSave = () => {
    console.log('save contacts: ')
    setIsEditing(false)
  };

  const handleUpdateContacts = (fieldName: string, newVal: string) => {
    console.log(fieldName, newVal);
    
  }

  return (
    <CardWrapper 
      title='Contacts' 
      mainAction={
        <Button variant='outline' size='small' className={styles.btn} onClick={handleEdit}>
          <EditIcon className={styles.btnIcon} />
          Edit
        </Button>
      }
      isEditing={isEditing}
      onCancel={handleCancel}
      onSave={handleSave}
    >
      <div className={cn(styles.row, {[styles.editingMode]: isEditing})}>
        <span className={styles.rowName}>Responsible person:</span> 
        {isEditing ? (
          <Input 
            value={`${contacts?.firstname} ${contacts?.lastname}`} 
            onChange={(e) => handleUpdateContacts('contactName', e.target.value)} 
          />
        ) : (
          <span>{`${contacts?.firstname} ${contacts?.lastname}`}</span>
        )}
      </div>
      <div className={cn(styles.row, {[styles.editingMode]: isEditing})}>
        <span className={styles.rowName}>Phone number:</span> 
        {isEditing ? (
          <Input 
            value={contacts?.phone} 
            type='tel' 
            numOnly 
            onChange={(e) => handleUpdateContacts('phone', e.target.value)}  />
        ) : (
          <span>{contacts?.phone}</span>
        )}
      </div>
      <div className={cn(styles.row, {[styles.editingMode]: isEditing})}>
        <span className={styles.rowName}>E-mail:</span> 
        {isEditing ? (
          <Input 
            value={contacts?.email} 
            onChange={(e) => handleUpdateContacts('email', e.target.value)}  />
        ) : (
          <span>{contacts?.email}</span>
        )}
      </div>
    </CardWrapper>           
  )
})