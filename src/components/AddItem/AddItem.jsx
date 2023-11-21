import styles from './AddItem.module.scss'
import ItemForm from '../ItemForm/ItemForm'

function AddItem(props) {

  return (
    <div className={styles.additem}>
      <div className={styles.centerText}>
        <h2>Uuden lataus tapahtuman lisääminen</h2>
      </div>
      <ItemForm onItemSubmit={props.onItemSubmit}
                operatorlist={props.operatorlist} />
    </div> 
  )

}

export default AddItem
