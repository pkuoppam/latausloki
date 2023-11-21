import { useState } from 'react'
import useLocalStorage from '../../shared/uselocalstorage/uselocalstorage'
import AppRouter from '../AppRouter'
import testdata from './testdata.js'
import firebase from './firebase.js'
import { collection, deleteDoc, doc, getFirestore, onSnapshot, orderBy, query, setDoc  } from 'firebase/firestore'
import { useEffect } from 'react'

function App() {
  // Luodaan tilamuuttuja ja alustetaan alkuarvot
  const [data, setData] = useState([])
  const [operatorlist, setOperatorlist] = useLocalStorage('latausloki-operatorlist',[])

  // Haetaan tiedot firestore kytkennästä
  const firestore = getFirestore(firebase)
  
  // Pidetään tiedot ajantasalla firebase tietokannan kanssa
  // Lisää lajittelun myös firebase tietojen hakuun
  useEffect( () => {
    const unsubscribe = onSnapshot(query(collection(firestore,'item'),
                                         orderBy('paymentDate', 'desc')),
                                   snapshot => {
      const newData = []
      snapshot.forEach( doc => {
        newData.push({ ...doc.data(), id: doc.id })
      })
      setData(newData)
    })
    return unsubscribe
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
    
    // Selvitetään löytyykö tunnistetta vastaava merkintä taulukko olion
    // findIndex funktion avulla. Tämän avulla joko lisätään uusi tai
    // tai korvataan muokattu merkintä.
    const index = copy.findIndex(item => item.id === newitem.id)
    if (index >= 0) {
      copy[index] = newitem
    } else {
      copy.push(newitem)
    }
    // Merkintöjen lajittelu suoritetaan sort funktiolla
    copy.sort( (a,b) => {
      const aDate = new Date(a.paymentDate + "T" + a.paymentTime)
      const bDate = new Date(b.paymentDate + "T" + b.paymentTime)
      return bDate - aDate
    })
    setData(copy)
  }

  const handleOperatorSubmit = (operator) => {
    let copy = operatorlist.slice()
    copy.push(operator)
    copy.sort()
    setOperatorlist(copy)
  }

  // Välitetään AppRouter-komponentille edellämääritetty käsittelijä funktio
  return (
    <>
      <AppRouter data={data}
                 operatorlist={operatorlist}
                 onItemSubmit={handleItemSubmit} 
                 onItemDelete={handleItemDelete}
                 onOperatorSubmit={handleOperatorSubmit} /> 
    </>
  )
}

export default App
