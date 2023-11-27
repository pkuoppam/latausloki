import Stats from '../components/Stats' 
import { MemoryRouter } from 'react-router-dom'

export default {
  title: 'Components/Stats',
  component: Stats,
  tags: ['autodocs'],
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
  argTypes: {
    data: { control: 'object' },
  },
}

const Template = (args) => <Stats {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: [
    { paymentDate: '2023-03-20', totalPrice: 12.68, operator: 'ABC-Lataus' },
    { paymentDate: '2023-04-13', totalPrice: 17.89, operator: 'Tesla'},
    { paymentDate: '2023-05-05', totalPrice: 3.34,  operator: 'Koti'},
    { paymentDate: '2023-06-01', totalPrice: 29.32, operator: 'Ionity'}
  ],
};
