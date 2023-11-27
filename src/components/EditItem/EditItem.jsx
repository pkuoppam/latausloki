import { useLoaderData } from 'react-router-dom'
import styles from './EditItem.module.scss'
import ItemForm from '../ItemForm/ItemForm'

/**
 * `EditItem`-komponentti vastaa merkinnän muokkausnäkymästä, jossa käyttäjä voi
 * muokata ja päivittää tietojaan. Käyttää `ItemForm`-komponenttia lomakkeen
 * renderöintiin ja tiedon päivittämiseen.
 *
 * @component
 * @param {Object} props - Komponentille annetut ominaisuudet.
 * @param {Function} props.onItemSubmit - Funktio, joka käsittelee merkinnän lähettämisen.
 * @param {Function} props.onItemDelete - Funktio, joka käsittelee merkinnän poistamisen.
 * @param {Object} props.operatorlist - Lista käytettävissä olevista operaattoreista.
 * @returns {JsxElement} - Renderöity komponentti.
 *
 * @example
 * // Käyttö EditItem-komponentin kanssa:
 * EditItem
 *   onItemSubmit={handleItemSubmit}
 *   onItemDelete={handleItemDelete}
 *   operatorlist={operatorList}
 */

function EditItem(props) {

  const data = useLoaderData()

  return (
    <div className={styles.edititem}>
      <div className={styles.centerText}>
        <h2>Merkinnän muokkaaminen</h2>
      </div>
      <ItemForm onItemSubmit={props.onItemSubmit}
                onItemDelete={props.onItemDelete}
                formData={data.item}
                operatorlist={props.operatorlist} />
    </div>
  )

}

export default EditItem
