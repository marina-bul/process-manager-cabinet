import { useState } from 'react';
import cn from 'clsx';

import { Input, Button, CardWrapper } from '../../../../shared/ui';
import { EditIcon } from '../../../../shared/icons';

import styles from './ContactsCard.module.css'

export const ContactsCard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [contactName, setContactName] = useState('David Rosenberg');
  const [phone, setPhone] = useState('+1 702 555 2345');
  const [email, setEmail] = useState('david_rosenberg88@gmail.com');

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);
  const handleSave = () => setIsEditing(false);

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
          <Input value={contactName} onChange={(e) => setContactName(e.target.value)} />
        ) : (
          <span>{contactName}</span>
        )}
      </div>
      <div className={cn(styles.row, {[styles.editingMode]: isEditing})}>
        <span className={styles.rowName}>Phone number:</span> 
        {isEditing ? (
          <Input value={phone} type='phone' onChange={(e) => setPhone(e.target.value)} />
        ) : (
          <span>{phone}</span>
        )}
      </div>
      <div className={cn(styles.row, {[styles.editingMode]: isEditing})}>
        <span className={styles.rowName}>E-mail:</span> 
        {isEditing ? (
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        ) : (
          <span>{email}</span>
        )}
      </div>
    </CardWrapper>           
  )
}