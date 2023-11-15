import styles from './Item.module.scss'
import { CiEdit } from 'react-icons/ci'

function Item() {

    return (
        <div className={styles.item}>
          <div className={styles.item_data}>
            <div className={styles.item_operator}>ABC-Lataus</div>
            <div className={styles.item_totalPrice}>12.68 €</div>
            <div className={styles.item_date}>20.3.2023</div>
            <div className={styles.item_charge}>36.223</div>
            <div className={styles.item_location}>Prisma Savonlinna</div>
            <div className={styles.item_price}>0.35 €/kWh</div>
            <div className={styles.item_filling}></div> 
            <div className={styles.item_chargeTime}>22 min 39 sek</div>
          </div>
        <div className={styles.item_edit}>
          <CiEdit />
        </div>  
        </div>  // styles.item_filling on täytteenä, kun en saanut muuten aikaa asemoitumaan oikeaan reunaan
      )
    
  }
  
  export default Item
  