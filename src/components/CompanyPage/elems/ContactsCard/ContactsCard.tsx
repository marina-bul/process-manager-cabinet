import { useState } from 'react';
import cn from 'clsx';

import { Input, Button, CardWrapper } from '../../../../shared/ui';
import { EditIcon } from '../../../../shared/icons';

import styles from './ContactsCard.module.css';

interface ContactsFormSchema {
  contactName: string;
  phone: string;
  email: string
}

const initialContact = {
  contactName: 'David Rosenberg',
  phone: '+1 702 555 2345',
  email: 'david_rosenberg88@gmail.com'
}

export const ContactsCard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [contactsData, setContactsData] = useState<ContactsFormSchema>(initialContact)

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);

  const handleSave = () => {
    console.log('save contacts: ', contactsData)
    setIsEditing(false)
  };

  const handleUpdateContacts = (fieldName: keyof ContactsFormSchema, newVal: string) => {
    setContactsData((prev) => ({...prev, [fieldName]: newVal}))
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
            value={contactsData.contactName} 
            onChange={(e) => handleUpdateContacts('contactName', e.target.value)} 
          />
        ) : (
          <span>{contactsData.contactName}</span>
        )}
      </div>
      <div className={cn(styles.row, {[styles.editingMode]: isEditing})}>
        <span className={styles.rowName}>Phone number:</span> 
        {isEditing ? (
          <Input 
            value={contactsData.phone} 
            type='tel' 
            numOnly 
            onChange={(e) => handleUpdateContacts('phone', e.target.value)}  />
        ) : (
          <span>{contactsData.phone}</span>
        )}
      </div>
      <div className={cn(styles.row, {[styles.editingMode]: isEditing})}>
        <span className={styles.rowName}>E-mail:</span> 
        {isEditing ? (
          <Input 
            value={contactsData.email} 
            onChange={(e) => handleUpdateContacts('email', e.target.value)}  />
        ) : (
          <span>{contactsData.email}</span>
        )}
      </div>
    </CardWrapper>           
  )
}