import { useState } from 'react'
import useLocalStorage from '../../shared/uselocalstorage/uselocalstorage'
import AppRouter from '../AppRouter'
import testdata from './testdata.js'
import firebase, { auth } from './firebase.js'
import { addDoc, collection, deleteDoc, doc, getFirestore, onSnapshot, orderBy, query, setDoc  } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import Startup from '../Startup'

function App() {
  // Luodaan tilamuuttuja ja alustetaan alkuarvot
  const [data, setData] = useState([])
  const [operatorlist, setOperatorlist] = useState([])
  const [user, setUser] = useState()

  // Haetaan tiedot firestore kytkennästä
  const firestore = getFirestore(firebase)
  
  // Pidetään tiedot ajantasalla firebase tietokannan kanssa
  // Lisää lajittelun myös firebase tietojen hakuun
  useEffect( () => {
    const unsubscribe = onSnapshot(query(collection(firestore,'item'),
                                         orderBy('paymentDate', 'desc'),
                                         orderBy('paymentTime', 'desc')),
                                   snapshot => {
      const newData = []
      snapshot.forEach( doc => {
        newData.push({ ...doc.data(), id: doc.id })
      })
      setData(newData)
    })
    return unsubscribe
  }, [])

  // Pidetään tiedot ajantasalla firebase tietokannan kanssa
  // Lisää lajittelun myös firebase operaattorin hakuun
  useEffect( () => {
    const unsubscribe = onSnapshot(query(collection(firestore,'operator'),
                                         orderBy('operator')),
                                   snapshot => {
      const newOperatorlist = []
      snapshot.forEach( doc => {
        newOperatorlist.push(doc.data().operator)
      })
      setOperatorlist(newOperatorlist)
    })
    return unsubscribe
  }, []) 

  // Käyttäjän kirjautumistilan käsittelijä
  useEffect( () => {
    onAuthStateChanged(auth, user => {
      setUser(user)
    })
  }, [])

  // Esitellään uusi funktio merkinnän poistamista varten.
  // Yhteys firespace:iin itemin poistamiseen 
  const handleItemDelete = async (id) => {
    await deleteDoc(doc(firestore, 'item', id))
  }

  // Esitellään alemmille komponenteille välitettävä käsittejä funktio
  // Yhteys firespace:iin itemin lisäykseen ja muokkaamiseen
  const handleItemSubmit = async (newitem) => {
    await setDoc(doc(firestore, 'item', newitem.id), newitem)
    
    // Uuden muuttujan luonti copy -> newCopy (muuten konsoli antaa virheen)
  const newCopy = [...data];
    // Selvitetään löytyykö tunnistetta vastaava merkintä taulukko olion
    // findIndex funktion avulla. Tämän avulla joko lisätään uusi tai
    // tai korvataan muokattu merkintä.
    const index = newCopy.findIndex(item => item.id === newitem.id)
    if (index >= 0) {
      newCopy[index] = newitem
    } else {
      newCopy.push(newitem)
    }
    // Merkintöjen lajittelu suoritetaan sort funktiolla
    newCopy.sort( (a,b) => {
      const aDate = new Date(a.paymentDate + "T" + a.paymentTime)
      const bDate = new Date(b.paymentDate + "T" + b.paymentTime)
      return bDate - aDate
    })
    setData(newCopy)
  }
  // Lisää firebase operator-kokoelmaan uuden dokumentin
  const handleOperatorSubmit = async (operator) => {
    await addDoc(collection(firestore,'operator'),{operator: operator})
  }

  // Välitetään AppRouter-komponentille edellämääritetty käsittelijä funktio
  return (
    <>
      { user ?
          <AppRouter data={data}
                     operatorlist={operatorlist}
                     onItemSubmit={handleItemSubmit} 
                     onItemDelete={handleItemDelete}
                     onOperatorSubmit={handleOperatorSubmit} />
         : <Startup auth={auth} />
      }  
    </>
  )
}

export default App
