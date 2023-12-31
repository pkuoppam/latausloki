import { Link } from 'react-router-dom'
import styles from './Item.module.scss'
import { CiEdit } from 'react-icons/ci'

function Item({data, ...props}) {
  // määritellään locale vakio, jossa määritellään suomi
  const locale = "fi-FI"
  
  // Luodaan date-olio. Muuttaa ISO-muotoisen päivämäärän suomalaiseen muotoon
  // locale:sta saaman arvon muodossa
  const paymentDate = new Date(data.paymentDate).toLocaleDateString(locale)
  
  // locale vakiosta suomi, lisätietoina muotoilu valuuttana ja valuutta EUR
  const numberFormat = new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' })
  
  // Muotoillaan rahan arvo olion avulla, jossa 12.6 muuttuu suomalaiseen muotoon 12,60 €
  const totalPrice = numberFormat.format(data.totalPrice)

  // Lasketaan kilowatti lataushinta käyttäjän syöttämien tietojen avulla 
  let kwhPrice;
  if (data.charge && data.totalPrice) {
    const chargedKwh = data.charge;
    const paymentPrice = data.totalPrice;
    // Tarkistetaan, että jaettava ei ole nolla ja suoritetaan lasku
    if (chargedKwh !== 0) {
      kwhPrice = paymentPrice / chargedKwh;
    }
  }

    // Tarkistetaan, onko minuutit ja sekunnit määritelty.
    // Tulostetaan vain siinä tapauksessa, kun arvo suurempi kuin nolla
    const chargeTimeFormat = data.chargeTime && data.chargeTime.split(':')[0] > 0 &&
                             data.chargeTime.split(':')[1] > 0
                        ? `${data.chargeTime.split(':')[0]} min ${data.chargeTime.split(':')[1]} sek` : null;

    return (
        <div className={styles.item}>
          <div className={styles.item_data}>
            <div className={styles.item_operator}>{data.operator}</div>
            <div className={styles.item_totalPrice}>{totalPrice}</div>
            <div className={styles.item_date}>{paymentDate} {data.paymentTime}</div>
            <div className={styles.item_charge}>{data.charge} kWh</div>
            <div className={styles.item_location}>{data.location}</div>
            <div className={styles.item_price}>{kwhPrice ? numberFormat.format(kwhPrice) + " /kWh" : ""}</div>
            <div className={styles.item_filling}></div> 
            <div className={styles.item_chargeTime}>{chargeTimeFormat}</div>
          </div>
        <div className={styles.item_edit}>
        <Link to={"/edit/" + data.id}><CiEdit /></Link>
        </div>  
        </div>  // styles.item_filling on täytteenä, kun en saanut muuten aikaa asemoitumaan oikeaan reunaan
      )
    
  }
  
  export default Item
  