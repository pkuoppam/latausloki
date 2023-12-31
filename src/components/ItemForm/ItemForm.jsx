import { useNavigate } from 'react-router-dom'
import useForm from '../../shared/useform/useform'
import styles from './ItemForm.module.scss'
import Button from '../../shared/buttons'

/**
 * Lomakekomponentti, joka mahdollistaa uuden merkinnän lisäämisen ja olemassa olevan
 * merkinnän muokkaamisen.
 *
 * @component
 * @param {Object} props - Komponentin ominaisuudet.
 * @param {function} props.onItemSubmit - Käsittelijäfunktio uuden merkinnän lisäämistä tai muokkaamista varten.
 * @param {function} [props.onItemDelete] - Käsittelijäfunktio merkinnän poistamista varten.
 * @param {Object} [props.formData] - Muokattavan merkinnän tiedot.
 * @param {Array} props.operatorlist - Lista operaattoreista.
 * @returns {JsxElement} - Renderöity komponentti.
 */

function ItemForm(props) {
  // Navigoinnin alustus
  const navigate = useNavigate()

  /**
   * Käsittelijäfunktio lomakkeen lähettämistä varten.
   * Muuntaa tarvittavat arvot, kutsuu onItemSubmit-funktiota ja navigoi takaisin.
   *
   * @function
   * @returns {void}
   */
  // Esitellään submit funktio,joka LISÄÄ nappia painamalla tulostaa 
  // konsoliin tiedot ja Object.assing kopion avulla muutetaan totalPrice
  // arvo merkkijonosta luvuksi. 
  // Yhditetään minuutit ja sekunnit jotta voimme käyttää niitä toivotusti
  const submit = () => {
    let storedValues = Object.assign({}, values)
    storedValues.totalPrice = parseFloat(storedValues.totalPrice)
    storedValues.chargeTime = `${storedValues.chargeTimeMinutes || 0}:${storedValues.chargeTimeSeconds || 0}`;
    storedValues.id = storedValues.id ? storedValues.id : crypto.randomUUID()
    props.onItemSubmit(storedValues)
    navigate(-1)
  }

  // Haetaan maksupäivä(paymentDate) label:n, valmiiksi kuluva päivä
  const today = new Date();
  const todayDate = today.toISOString().split('T')[0];
 
  // Haetaan maksuaika(paymentTime) label:n, valmiiksi kuluva aika
  const hours = today.getHours().toString().padStart(2, '0');
  const minutes = today.getMinutes().toString().padStart(2, '0');
  const todayTime = `${hours}:${minutes}`;

  // Tarkistetaan onko formData määritteellä välitetty tiedot. 
  // Jos on, niin välitetty merkintä asetetaan initialState vakion arvoksi 
  // muussa tapauksessa määritellään tyhdän merkinnän alkuarvot.
  const initialState = props.formData ? props.formData : {
    operator: "",
    totalPrice: "",
    paymentDate: todayDate,
    paymentTime: todayTime,
    charge: "",
    location: "",
    chargeTimeMinutes: "",
    chargeTimeSeconds: ""
  };
  
  // Otetaan käyttöön useform funktio
  const {values, handleChange, handleSubmit } = useForm(submit, initialState, false)
  
  /**
   * Käsittelijäfunktio peruuta-napin painamista varten.
   * Navigoi takaisin etusivulle.
   * @function
   * @returns {void}
   */
  // Funktio palauttaa etusivulle PERUUTA nappia painamalla 
  const handleCancel = () => {
    navigate('/') 
  }
  
  /**
   * Käsittelijäfunktio poista-napin painamista varten.
   * Kutsuu onItemDelete-funktiota ja navigoi takaisin.
   *
   * @function
   * @returns {void}
  */
  // Lisäyksen poistamisen käsittevä funktio
  const handleDelete = () => {
    props.onItemDelete(values.id)
    navigate(-1)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className={styles.itemform}>
          <div className={styles.itemform_row}>
            <div>
              <label htmlFor='operator'>Operaattori</label>
              <select id='operator' name='operator' onChange={handleChange} value={values.operator}>
                <option value="">(valitse)</option> 
                { props.operatorlist.map(
                  operator => <option key={operator}>{operator}</option> // map- funktiolla luodaan operaattori lista
                )}
              </select>
            </div>
          </div>
          <div className={styles.itemform_row}>
            <div>
              <label htmlFor='totalPrice'>Summa</label>
              <input id='totalPrice' type='number' name='totalPrice' step='0.01' onChange={handleChange} value={values.totalPrice} />
            </div>
            <div>
              <label htmlFor='charge'>Latausmäärä kWh</label>
              <input id='charge' type='number' name='charge' step='0.001' onChange={handleChange} value={values.charge} />
            </div>
          </div>
          <div className={styles.itemform_row}>
	          <div>
              <label htmlFor='paymentDate'>Maksupäivä</label>
              <input id='paymentDate' type='date' name='paymentDate' onChange={handleChange} value={values.paymentDate} max={todayDate} />
            </div>
	          <div>
              <label htmlFor='paymentTime'>Maksuaika</label>
	            <input id='paymentTime' type='time' name='paymentTime' onChange={handleChange} value={values.paymentTime} />
	          </div>
	          </div>
          <div className={styles.itemform_row}>
            <div>
              <label htmlFor='location'>Sijainti</label>
              <input id='location' type='text' name='location' placeholder='Ilmoita halutessasi laturin sijainti' onChange={handleChange} value={values.location} />
            </div>
            </div>
          <div className={styles.itemform_column}>
            <span className={styles.chargeTimeTitle}>Latausaika</span> 
          <div className={styles.itemform_row}>
            <div className={styles.itemform_input}>
              <label htmlFor='chargeTimeMinutes'></label>
              <input id='chargeTimeMinutes' type='number' name='chargeTimeMinutes' placeholder='Minuutit' onChange={handleChange} value={values.chargeTimeMinutes}  />
            </div>
            <div className={styles.itemform_input}>
              <label htmlFor='chargeTimeSeconds'></label>
              <input id='chargeTimeSeconds' type='number' name='chargeTimeSeconds' placeholder='Sekunnit' onChange={handleChange}value={values.chargeTimeSeconds} />
            </div>
            </div>
          <div className={styles.itemform_row}>
            <div>
              <Button onClick={handleCancel}>PERUUTA</Button>
            </div>
            <div>
              <Button primary 
                      disabled={values.operator &&
                                values.totalPrice &&
                                values.charge &&
                                values.paymentDate && 
                                values.paymentTime ? "" : "disabled"}
                      type='submit'>
                { props.formData ? "TALLENNA" : "LISÄÄ" }</Button>
            </div>
            </div>
          </div>
          { props.onItemDelete ? 
            <div className={styles.itemform_row}>
              <div>
                <Button secondary onClick={handleDelete}>POISTA</Button>
              </div>
              <div></div>
            </div>
            : null }
        </div>
      </form>
    </div>
  )

}

export default ItemForm
