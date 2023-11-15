import styles from './Item.module.scss'
import { CiEdit } from 'react-icons/ci'

function Item({data, ...props}) {
  // määritellään locale vakio, jossa määritellään suomi
  const locale = "fi-FI"
  // Luodaan date-olio. Muuttaa ISO-muotoisen päivämäärän suomalaiseen muotoon
  // locale:sta saaman arvon muodossa
  const paymentDate = new Date(data.paymentDate).toLocaleDateString(locale)

    return (
        <div className={styles.item}>
          <div className={styles.item_data}>
            <div className={styles.item_operator}>{data.operator}</div>
            <div className={styles.item_totalPrice}>{data.totalPrice} €</div>
            <div className={styles.item_date}>{paymentDate}</div>
            <div className={styles.item_charge}>{data.charge} kWh</div>
            <div className={styles.item_location}>{data.location}</div>
            <div className={styles.item_price}>{data.price} €/kWh</div>
            <div className={styles.item_filling}></div> 
            <div className={styles.item_chargeTime}>{data.chargeTime}</div>
          </div>
        <div className={styles.item_edit}>
          <CiEdit />
        </div>  
        </div>  // styles.item_filling on täytteenä, kun en saanut muuten aikaa asemoitumaan oikeaan reunaan
      )
    
  }
  
  export default Item
  