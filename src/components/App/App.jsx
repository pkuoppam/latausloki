import { useState } from 'react'
import AppRouter from '../AppRouter'
import testdata from './testdata.js'

function App() {
  // Luodaan tilamuuttuja ja alustetaan alkuarvoksi testdatan sisältö
  const [data, setData] = useState(testdata)
  
  // Esitellään alemmille komponenteille välitettävä käsittejä funktio
  // Tehdään kopio slice funktion avulla ja lisätään uusi tieto taulukkoon
  // Merkintöjen lajittelu suoritetaan sort funktiolla
  const handleItemSubmit = (newitem) => {
    let copy = data.slice()
    copy.unshift(newitem)
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
