import { useLoaderData } from 'react-router-dom'
import styles from './EditItem.module.scss'
import ItemForm from '../ItemForm/ItemForm'

function EditItem(props) {

  const data = useLoaderData()

  return (
    <div className={styles.edititem}>
      <div className={styles.centerText}>
      <h2>Merkinnän muokkaaminen</h2></div>
      <ItemForm onItemSubmit={props.onItemSubmit}
                onItemDelete={props.onItemDelete}
                formData={data.item} />
    </div>
  )

}

export default EditItem
