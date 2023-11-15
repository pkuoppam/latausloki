import { Link, useLoaderData } from 'react-router-dom'
import styles from './Items.module.scss'
import { FloatingButton } from '../../shared/buttons'
import Item from '../Item/Item'

function Items() {
  // Noudetaan react routerin loader toiminnallisuuden kautta 
  // välitetty tieto  ja tallennetaan data vakioiksi
  const data = useLoaderData()
  // map-funktiolla tiedot muutetaan item-komponenteiksi
  const items = data.map(item => <Item key={item.id} data={item} />)

  return (
    <div className={styles.items}>
      { items }         
      <Link to="/add"><FloatingButton secondary>+</FloatingButton></Link>
    </div>
  )
}

export default Items
