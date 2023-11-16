import styles from './ItemForm.module.scss'
import useForm from '../../shared/useform/useform'
import Button from '../../shared/buttons'

function ItemForm(props) {
  // Esitellään submit funktio,joka painamalla 
  // nappia LISÄÄ tulostaa ruudulle 
  // väliaikaisesti varoitusteksin SUBMIT
  const submit = () => {
    console.log(values)
    alert("SUBMIT")
  }

  // Haetaan maksupäivä(paymentDate) label:n, valmiiksi kuluva päivä
  const today = new Date();
  const todayDate = today.toISOString().split('T')[0];

  // Määritellään vakiolla alkuarvot lomakekenttiin 
  const initialState = {
    operator: "",
    totalPrice: "",
    paymentDate: todayDate,
    charge: "",
    location: "",
    chargeTime: ""
  };
  
  // Otetaan käyttöön useform funktio
  const {values, handleChange, handleSubmit } = useForm(submit, initialState, false)
  
  // Funktio tulostaa nappia PERUUTA painamalla näytölle varoitustekstin CANCEL
  const handleCancel = () => {
    alert('CANCEL') 
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className={styles.itemform}>
          <div className={styles.itemform_row}>
            <div>
              <label htmlFor='operator'>Operaattori</label>
              <select id='operator' name='operator' onChange={handleChange} value={values.operator}>
                <option>ABC-Lataus</option>
                <option>K-Lataus</option>
                <option>Ionity</option>
                <option>Tesla</option>
              </select>
            </div>
          </div>
          <div className={styles.itemform_row}>
            <div>
              <label htmlFor='totalPrice'>Summa</label>
              <input id='totalPrice' type='number' name='totalPrice' step='0.01' onChange={handleChange} value={values.totalPrice} />
            </div>
            <div>
              <label htmlFor='paymentDate'>Maksupäivä</label>
              <input id='paymentDate' type='date' name='paymentDate' onChange={handleChange} value={values.paymentDate} />
            </div>
          </div>
          <div className={styles.itemform_row}>
            <div>
              <label htmlFor='charge'>Latausmäärä kWh</label>
              <input id='charge' type='number' name='charge' step='0.001' onChange={handleChange} value={values.charge} />
            </div>
            <div>
              <label htmlFor='location'>Sijainti</label>
              <input id='location' type='text' name='location' onChange={handleChange} value={values.location} />
            </div>
          </div>
          <div className={styles.itemform_row}>
            <div>
              <label htmlFor='chargeTime'>Latausaika</label>
              <input id='chargeTime' type='text' name='chargeTime' onChange={handleChange} value={values.chargeTime} />
            </div>
          </div>
          <div className={styles.itemform_row}>
            <div>
              <Button onClick={handleCancel}>PERUUTA</Button>
            </div>
            <div>
              <Button primary type='submit'>LISÄÄ</Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )

}

export default ItemForm
