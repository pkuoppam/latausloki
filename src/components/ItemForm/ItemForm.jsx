import styles from './ItemForm.module.scss'

function ItemForm(props) {

  return (
    <div>
      <form>
        <div className={styles.itemform}>
          <div className={styles.itemform_row}>
            <div>
              <label htmlFor='operator'>Operaattori</label>
              <select name='operator'>
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
              <input type='number' name='totalPrice' step='0.01' />
            </div>
            <div>
              <label htmlFor='paymentDate'>Maksupäivä</label>
              <input type='date' name='paymentDate' />
            </div>
          </div>
          <div className={styles.itemform_row}>
            <div>
              <label htmlFor='charge'>Latausmäärä kWh</label>
              <input type='number' name='charge' step='0.001' />
            </div>
            <div>
              <label htmlFor='location'>Sijainti</label>
              <input type='text' name='location' />
            </div>
          </div>
          <div className={styles.itemform_row}>
            <div>
              <label htmlFor='chargeTime'>Latausaika</label>
              <input type='text' name='chargeTime' />
            </div>
          </div>
        </div>
      </form>
    </div>
  )

}

export default ItemForm
