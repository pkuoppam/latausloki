import { useState } from 'react'
import AppRouter from '../AppRouter'
import testdata from './testdata.js'

function App() {
  // Luodaan tilamuuttuja ja alustetaan alkuarvoksi testdatan sisältö
  const [data, setData] = useState(testdata)
  
  // Esitellään alemmille komponenteille välitettävä käsittejä funktio
  // Tehdään kopio slice funktion avulla ja lisätään uusi tieto taulukkoon
  const handleItemSubmit = (newitem) => {
    let copy = data.slice()
    
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

  // Välitetään AppRouter-komponentille edellämääritetty käsittelijä funktio
  return (
    <>
      <AppRouter data={data} onItemSubmit={handleItemSubmit} /> 
    </>
  )
}

export default App
