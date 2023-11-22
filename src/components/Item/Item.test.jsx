import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Item from './Item.jsx'

describe('Item', () => {
  test('Komponentti renderöityy merkinnän tiedoilla', () => {
    // Määritellään merkinnän tiedot.
    const data = {
      id:          "1",
      operator:    "ABC-Lataus",
      totalPrice:  12.68,
      paymentDate: "2023-03-20",
      periodSTime: "14:45",
      charge:      36.226,
      location:    "Savonlinna Prisma",
      price:       "0.35",
      chargeTime:  "22 min 39 sek"      
    }
    render(<Item data={data} />, {wrapper: BrowserRouter})
    
    // Määritetään lokaaliasetukset.
    const locale = "fi-FI"
  
    // Operaattori
    const operatorElement = screen.getByText(data.operator)
    expect(operatorElement).toBeInTheDocument()

    // Maksupäivä
    const paymentDate = new Date(data.paymentDate).toLocaleDateString(locale)
    const dateElement = screen.getByText(paymentDate)
    expect(dateElement).toBeInTheDocument() 

    // Maksuaika
    const paymentTime = new Date(data.paymentDate).toLocaleDateString(locale)
    const paymentTimeElement = screen.getByText(paymentTime)
    expect(paymentTimeElement).toBeInTheDocument() 

    // Sijainti
    const locationElement = screen.getByText(data.location)
    expect(locationElement).toBeInTheDocument()

  })
})
