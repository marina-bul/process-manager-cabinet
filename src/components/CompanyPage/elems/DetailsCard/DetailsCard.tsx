import { FC, useState } from 'react';
import cn from 'clsx';

import { Input, Select, Button, CardWrapper } from 'shared/ui';
import { EditIcon } from 'shared/icons';
import CompanyStore from 'shared/stores/CompanyStore';
import { CompanyInfo } from 'types/general';

import styles from './DetailsCard.module.css'
import { observer } from 'mobx-react-lite';
// import { CompanyInfo } from '../../../../types/general';

// interface DetailsCardProps {
//   companyInfo: CompanyInfo | null
// }

export const DetailsCard: FC = observer(() => {
  const [isEditing, setIsEditing] = useState(false);

  const { companyInfo } = CompanyStore;

  const options = [
    { label: "Sole Proprietorship", value: "Sole Proprietorship" },
    { label: "Partnership", value: "Partnership" },
    { label: "Limited Liability Company", value: "Limited Liability Company" }
  ];

  const optionsCompany = [
    { label: "Funeral Home", value: "funeral_home" },
    { label: "Logistics services", value: "logistics_services" },
    { label: "Burial care Contractor", value: "burial_care_contractor" }
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
          <Input value={companyInfo?.contract.no} onChange={(e) => console.log(e.target.value)} />
        ) : (
          <span>{companyInfo?.contract.no} / {companyInfo?.contract.issue_date}</span>
        )}
      </div>
      <div className={cn(styles.row, {[styles.editingMode]: isEditing})}>
        <span className={styles.rowName}>Business entity:</span> 
        {isEditing ? (
          <Select 
            options={options} 
            defaultSelected={companyInfo?.businessEntity ? [companyInfo?.businessEntity] : []} 
            onChange={(selected) => console.log(selected[0].value)}
          />
        ) : (
          <span>{companyInfo?.businessEntity}</span>
        )}
      </div>
      <div className={cn(styles.row, {[styles.editingMode]: isEditing})}>
        <span className={styles.rowName}>Company type:</span> 
        {isEditing ? (
          <Select 
            options={optionsCompany} 
            defaultSelected={companyInfo?.type} 
            checkboxOptions 
            onChange={(selected) => console.log(selected[0].value)} />
        ) : (
          <span>{companyInfo?.type}</span>
        )}
      </div>
    </CardWrapper>           
  )
})