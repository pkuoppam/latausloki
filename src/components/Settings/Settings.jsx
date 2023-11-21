import styles from './Settings.module.scss'

function Settings(props) {

  return (
    <div className={styles.settings}>
      <div className={styles.centerText}>
      <h2>Asetukset</h2></div>
      <h3>Operaattorit</h3>
      <div className={styles.settings_operators}>
        { props.operatorlist.map(
            operator => <div key={operator}>{operator}</div>
        )}
      </div>
    </div>
  )
}

export default Settings
