import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import AddItem from './AddItem.jsx'

describe('AddItem', () => {
  test('Lisäyslomake lähettää tiedot, kun vaadittavat kentät on täytetty', async () => {

    // Testirivi maksupäivälle
    //const todayDate = new Date().toISOString().split('T')[0];
    
    // Alustetaan testauskirjaston käyttäjäinteraktiot.
    const user = userEvent.setup()

    // Muodostetaan operaattori-lista.
    const operatorlist = ['ABC-Lataus','K-Lataus','Virta']

    // Lomakkeelle syötettävät tiedot.
    const formdata = {
        operator: operatorlist[1],  // operaattori-listan toinen alkio
        totalPrice: 12.68,
        charge: 32.233
      }

    // Muodostetaan lomakekäsittelijää simuloiva funktio.
    // Testin kannalta riittää, että nähdään kuinka monta
    // kertaa funktiota kutsuttiin ja millä arvolla.
    const handleItemSubmit = vi.fn(() => true)

    // Renderöidään komponentti.
    render(<AddItem onItemSubmit={handleItemSubmit} 
                    operatorlist={operatorlist} />, {wrapper: BrowserRouter} )
    
    // Valitaan operaattori ja tarkistetaan, että
    //  - listasta on valittu oikea valinta ja 
    //  - lisäysnappi on disabloitu.
    await user.selectOptions(screen.getByLabelText('Operaattori'), formdata.operator)
    expect(screen.getByRole('option', {name: formdata.operator}).selected).toBe(true)
    expect(screen.getByRole('button', {name: 'LISÄÄ'}).disabled).toBe(true)

    // Syötetään summa ja tarkistetaan, että
    //  - kentän arvo on sama kuin syötetty arvo ja 
    //  - lisäysnappi on disabloitu.
    await user.type(screen.getByLabelText('Summa'), formdata.totalPrice.toString())
    expect(screen.getByLabelText('Summa')).toHaveValue(formdata.totalPrice)
    expect(screen.getByRole('button', {name: 'LISÄÄ'}).disabled).toBe(true)
    
    // Syötetään latausmäärä ja tarkistetaan, että
    //  - kentän arvo on sama kuin syötetty arvo ja 
    //  - lisäysnappi on aktiivinen.
    await user.type(screen.getByLabelText('Latausmäärä kWh'), formdata.charge.toString())
    expect(screen.getByLabelText('Latausmäärä kWh')).toHaveValue(formdata.charge)
    expect(screen.getByRole('button', {name: 'LISÄÄ'}).disabled).toBe(false)

    // Painetaan lisäysnappia ja tarkistetaan, että
    //  - handleItemSubmit-funktiota on kutsuttu vain kerran ja
    //  - funktion parametrina saama olio sisältää samat tiedot
    //    kuin mitä lomakkeelle syötettiin.
    await user.click(screen.getByRole('button', {name: 'LISÄÄ'}))
    expect(handleItemSubmit).toHaveBeenCalledTimes(1);
    const submittedItem = handleItemSubmit.mock.lastCall.shift()
    expect(submittedItem).toMatchObject(formdata)

  })
})
