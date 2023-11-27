import Item from '../components/Item'
import { MemoryRouter } from 'react-router-dom'

export default {
  title: 'Components/Item',
  component: Item,
  tags: ['autodocs'],
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
  argTypes: {
    data: { control: 'object' },
  },
}

export const Default = { 
  args: {
    data: {
      id:          "1",
      operator:    "ABC-Lataus",
      totalPrice:  12.68,
      paymentDate: "2023-03-20",
      paymentTime: "14:15",
      charge:      36.223,
      location:    "Savonlinna Prisma",      
      price:       0.35,
      chargeTimeMinutes:  "22",
      chargeTimeSeconds:"39"      
    }
  }
}

export const OnlyRequiredData = {
  args: {
    data: {
      id:          "2",
      operator:    "Ionity",
      totalPrice:  35.86,
      paymentDate: "2023-03-18",
      paymentTime: "14:45",
      charge:      45.245
    }
  }  
}