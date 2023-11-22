import React, { useState } from 'react';
import styles from './Settings.module.scss';
import Button from '../../shared/buttons';
import { signOut } from 'firebase/auth'

function Settings(props) {
  const [notification, setNotification] = useState();

  const handleOperatorSubmit = (event) => {
    event.preventDefault();
    const newOperator = event.target.elements.operator.value;
  // Tarkistus onko käyttäjän syöttämä operaattori listassa
    if (newOperator.trim() === '') {
      setNotification('Operaattorin nimi ei voi olla tyhjä.');
    } else if (!props.operatorlist.includes(newOperator)) {
      props.onOperatorSubmit(newOperator);
      setNotification(`Operaattori ${newOperator} lisätty.`);
    } else {
      setNotification(`Operaattori ${newOperator} on jo listassa. Ei lisätty.`);
    }
    event.target.elements.operator.value = '';
  }
  
  // Uloskirjautumisen kutsu
  const logout = () => {
    signOut(props.auth)
  }

  return (
    <div className={styles.settings}>
      <div className={styles.centerText}>
        <h2>Asetukset</h2>
      </div>
      <h3>Profiili</h3>
      <div className={styles.settings_profile}>
        <div className={styles.settings_user}>
          <div><img src={props.user.photoURL} /></div>
          <div>{props.user.displayName}<br />
               {props.user.email}</div>
        </div>
        <div>
          <Button primary onClick={logout}>Kirjaudu ulos</Button>
        </div>
      </div>
      <h3>Operaattorit</h3>
      <div className={styles.settings_operators}>
        {props.operatorlist.map((operator) => (
          <div key={operator}>{operator}</div>
        ))}
      <form onSubmit={handleOperatorSubmit}>
        <div className={styles.settings_form}>
          <input type='text' name='operator' />
          <Button type='submit' primary>Lisää</Button>
        </div>
      </form>
      </div>
      {notification && <div className={styles.notification}>{notification}</div>}
    </div>
  );
}

export default Settings;
