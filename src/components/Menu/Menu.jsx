import styles from './Menu.module.scss'
import { GoChecklist } from 'react-icons/go'
import { MdQueryStats } from 'react-icons/md'
import { GiSettingsKnobs } from 'react-icons/gi'
import { NavLink } from 'react-router-dom'

function Menu() {

  return (
    <div className={styles.menu}>
      <div><NavLink to=""><GoChecklist /></NavLink></div>
      <div><NavLink to="/stats"><MdQueryStats /></NavLink></div>
      <div><NavLink to="/settings"><GiSettingsKnobs /></NavLink></div>
    </div>
  )

}

export default Menu
