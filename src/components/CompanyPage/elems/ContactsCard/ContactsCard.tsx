import { useCallback, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import cn from 'clsx';

import CompanyStore from 'shared/stores/CompanyStore';
import { 
  formatPhone, 
  validateEmail, 
  validatePhone 
} from 'shared/helpers/formatFuncs';
import { Input, Button, CardWrapper } from 'shared/ui';
import { EditIcon } from 'shared/icons';

import styles from './ContactsCard.module.css';

import type { FC } from 'react';
import type { ContactInfo } from 'types/general';



export const ContactsCard: FC = observer(( ) => {

  const { contacts, updateContactsAction } = CompanyStore;

  const [ isEditing, setIsEditing ] = useState(false);
  const [ changedContacts, setChangedContacts ] = useState<Partial<ContactInfo> | null>();

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);

  const handleSave = useCallback(() => {
    if(!changedContacts) return 

    const updated = { ...changedContacts };

    if (updated.phone) {
      if (!validatePhone(updated.phone)) {
        throw new Error('Wrong phone number'); 
      }
    }

    if (updated.email) {
      if (!validateEmail(updated.email)) {
        throw new Error('Wrong email');
      }
    }

    updateContactsAction(updated);
    setIsEditing(false);
    setChangedContacts(null);
  }, [changedContacts, updateContactsAction]);

  const handleUpdateContacts = (fieldName: keyof ContactInfo, newVal: string) => {
    if (fieldName === 'firstname') {
      const [firstname, lastname] = newVal.split(' ');
      setChangedContacts(prev => ({
        ...prev,
        firstname: firstname || '',
        lastname: lastname || '',
      }));
      return;
    }

    setChangedContacts(prev => ({
      ...prev,
      [fieldName]: newVal
    }));
  };

  const fullName = useMemo(() => {

    if(!contacts) return '';

    return `${contacts.firstname} ${contacts.lastname}`

  }, [contacts])

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
            value={fullName} 
            onChange={(e) => handleUpdateContacts('firstname', e.target.value)} 
          />
        ) : (
          <span>{fullName}</span>
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
          <span>{contacts?.phone ? formatPhone(contacts.phone) : ''}</span>
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