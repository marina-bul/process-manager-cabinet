import { FC, useCallback, useMemo, useState } from 'react';
import cn from 'clsx';

import { Input, Select, Button, CardWrapper } from 'shared/ui';
import { EditIcon } from 'shared/icons';
import CompanyStore from 'shared/stores/CompanyStore';
import { CompanyInfo, ContractInfo } from 'types/general';

import styles from './DetailsCard.module.css'
import { observer } from 'mobx-react-lite';
import { dateFormatter } from 'shared/helpers/formatFuncs';

type DetailsSchema = Pick<CompanyInfo, 'businessEntity'|'type'>

const entities = [
  { label: "Sole Proprietorship", value: "Sole Proprietorship" },
  { label: "Partnership", value: "Partnership" },
  { label: "Limited Liability Company", value: "Limited Liability Company" }
];

const types = [
  { label: "Funeral Home", value: "funeral_home" },
  { label: "Logistics services", value: "logistics_services" },
  { label: "Burial care Contractor", value: "burial_care_contractor" }
];

export const DetailsCard: FC = observer(() => {

  const [isEditing, setIsEditing] = useState(false);
  const [ changedDetails, setChangedDetails ] = useState<Partial<DetailsSchema> | null>();
  const [ changedContract, setChangedContract ] = useState<Partial<ContractInfo> | null>();

  const { companyInfo, updateCompanyAction } = CompanyStore;

  const labelsForTypes = useMemo(() => {
    if(!companyInfo) return '';

    return companyInfo.type
      .map(value => types.find(item => item.value === value)?.label)
      .filter(Boolean)
      .join(', ');
  }, [companyInfo])

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);

  const handleSave = useCallback(() => {
    if(!changedDetails && !changedContract) return 

    const updated: Partial<CompanyInfo> = {...changedDetails};

    if(changedContract) updated.contract = {...changedContract};
    if(updated.contract?.issue_date) {
      updated.contract.issue_date = dateFormatter.toISO(updated.contract?.issue_date)
    }

    updateCompanyAction(updated);
    setIsEditing(false);
    setChangedDetails(null);
    setChangedContract(null);

  }, [changedDetails, changedContract, updateCompanyAction]);

  const handleUpdateDetails = (fieldName: keyof DetailsSchema, newVal: string | string[]) => {
    setChangedDetails(prev => ({
          ...prev,
          [fieldName]: newVal
        })
    );
  };

  const handleUpdateContract = (fieldName: keyof ContractInfo, newVal: string) => {
    setChangedContract(prev => ({
        ...prev,
        [fieldName]: newVal
      })
    );
  };
  

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
        <span className={styles.label}>
          {isEditing ? 'Agreement number: ' : 'Agreement: '}
        </span> 
        {isEditing ? (
          <div className={styles.inputsGroup}>
            <Input 
              value={companyInfo?.contract.no}
              onChange={(e) => handleUpdateContract('no', e.target.value)} 
            />
            <div className={styles.inputsGroup}>
              <span className={styles.additionalLabel}>Date: </span>
              <Input 
                value={dateFormatter.toDisplay(companyInfo?.contract.issue_date)} 
                onChange={(e) => handleUpdateContract('issue_date', e.target.value)} 
              /> 
            </div>
          </div>
          
        ) : (
          <span>{companyInfo?.contract.no} / {dateFormatter.toDisplay(companyInfo?.contract.issue_date)}</span>
        )}
      </div>
      <div className={cn(styles.row, {[styles.editingMode]: isEditing})}>
        <span className={styles.label}>Business entity: </span> 
        {isEditing ? (
          <Select 
            options={entities} 
            defaultSelected={companyInfo?.businessEntity ? [companyInfo?.businessEntity] : []} 
            onChange={(selected) => handleUpdateDetails('businessEntity', selected[0].value)}
          />
        ) : (
          <span>{companyInfo?.businessEntity}</span>
        )}
      </div>
      <div className={cn(styles.row, {[styles.editingMode]: isEditing})}>
        <span className={styles.label}>Company type: </span> 
        {isEditing ? (
          <Select 
            options={types} 
            defaultSelected={companyInfo?.type} 
            checkboxOptions 
            onChange={(selected) => handleUpdateDetails('type', selected.map((opt) => opt.value))} />
        ) : (
          <span>{labelsForTypes}</span>
        )}
      </div>
    </CardWrapper>           
  )
})