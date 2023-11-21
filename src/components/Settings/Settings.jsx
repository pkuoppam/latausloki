import styles from './Settings.module.scss'
import Button from '../../shared/buttons'

function Settings(props) {
  // Luodaan lomake käsittelijä, jolla mahdollistetaan 
  // operaattorin lisääminen nappia painaessa
  const handleOperatorSubmit = (event) => {
    event.preventDefault()
    const newoperator = event.target.elements.operator.value
    props.onOperatorSubmit(newoperator)
    event.target.elements.operator.value = ''
  }

  return (
    <div className={styles.settings}>
      <div className={styles.centerText}>
      <h2>Asetukset</h2></div>
      <h3>Operaattorit</h3>
      <div className={styles.settings_operators}>
        { props.operatorlist.map(
            operator => <div key={operator}>{operator}</div>
        )}
        <form onSubmit={handleOperatorSubmit}>
          <div className={styles.settings_form}>
            <input type='text' name='operator' />
            <Button type='submit' primary>Lisää</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Settings
