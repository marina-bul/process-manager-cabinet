import { useAuth } from 'shared/helpers/useAuth'
import { 
  AccountIcon,
  CompanyIcon,
  ContractorIcon,
  Logo,
  SearchIcon,
  SettingsIcon,
  SignOutIcon
} from 'shared/icons'
import { Button } from 'shared/ui'

import styles from './Sidebar.module.css'


export const Sidebar = () => {

  const { logout } = useAuth()

  return (
    <div className={styles.sidebar}>
      <div className={styles.navbar}>
        <div className={styles.top}>
          <Logo />
          <Button className={styles.menuButton} size='square' isActive>
           <CompanyIcon /> 
          </Button>
          <Button className={styles.menuButton} size='square'>
           <SearchIcon /> 
          </Button>
        </div>
        <div className={styles.bottom}>
          <hr className={styles.divider} />
          <Button className={styles.menuButton} size='square'>
           <SettingsIcon /> 
          </Button>
          <Button className={styles.menuButton} size='square' onClick={logout}>
           <SignOutIcon /> 
          </Button>
        </div>
      </div>

      <div className={styles.content}>
        <div>
          <div className={styles.header}>
            <h1 className={styles.title}>Oak Tree Cemetery</h1>
            <span className={styles.subtitle}>Process Manager</span>
          </div>
          <div className={styles.actions}>
            <Button>
              <CompanyIcon className={styles.icon} /> 
              Organizations
            </Button>
            <Button variant='outline'>
              <ContractorIcon className={styles.icon} /> 
              Contractors
            </Button>
            <Button variant='outline'>
              <AccountIcon className={styles.icon} /> 
              Clients
            </Button>
          </div>
        </div>

        <span className={styles.footer}>
          All Funeral Services © 2015-2025
        </span>
      </div>
  </div>
  )
}