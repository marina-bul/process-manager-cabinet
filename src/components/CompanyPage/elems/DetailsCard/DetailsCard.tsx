import { useState } from 'react';
import cn from 'clsx';

import { Input, Select, Button, CardWrapper } from '../../../../shared/ui';
import { EditIcon } from '../../../../shared/icons';

import styles from './DetailsCard.module.css'

export const DetailsCard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [agreement, setAgreement] = useState('1624/2-24');
  const [date] = useState('03.12.2024');
  const [entity, setEntity] = useState('Partnership');
  const [type, setType] = useState('Funeral Home, Logistics services');

  const options = [
    { label: "Sole Proprietorship", value: "Sole Proprietorship" },
    { label: "Partnership", value: "Partnership" },
    { label: "Limited Liability Company", value: "Limited Liability Company" }
  ];

  const optionsCompany = [
    { label: "Funeral Home", value: "Funeral Home" },
    { label: "Logistics services", value: "Logistics services" },
    { label: "Burial care Contractor", value: "Burial care Contractor" }
  ];

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);
  const handleSave = () => setIsEditing(false);

  return (
    <CardWrapper 
      title='Company Details' 
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
        <span className={styles.rowName}>Agreement:</span> 
        {isEditing ? (
          <Input value={agreement} onChange={(e) => setAgreement(e.target.value)} />
        ) : (
          <span>{agreement} / {date}</span>
        )}
      </div>
      <div className={cn(styles.row, {[styles.editingMode]: isEditing})}>
        <span className={styles.rowName}>Business entity:</span> 
        {isEditing ? (
          <Select options={options} onChange={(selected) => setEntity(selected[0])} />
        ) : (
          <span>{entity}</span>
        )}
      </div>
      <div className={cn(styles.row, {[styles.editingMode]: isEditing})}>
        <span className={styles.rowName}>Company type:</span> 
        {isEditing ? (
          <Select options={optionsCompany} checkboxOptions onChange={(selected) => setType(selected[0])} />
        ) : (
          <span>{type}</span>
        )}
      </div>
    </CardWrapper>           
  )
}