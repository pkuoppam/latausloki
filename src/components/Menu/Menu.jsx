import styles from './Menu.module.scss'
import { GoChecklist } from 'react-icons/go'
import { MdQueryStats } from 'react-icons/md'
import { GiSettingsKnobs } from 'react-icons/gi'

function Menu() {

  return (
    <div className={styles.menu}>
      <div><GoChecklist /></div>
      <div><MdQueryStats /></div>
      <div><GiSettingsKnobs /></div>
    </div>
  )

}

export default Menu
