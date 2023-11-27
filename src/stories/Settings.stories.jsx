import Settings from '../components/Settings'
import { MemoryRouter } from 'react-router-dom'

export default {
  title: 'Components/Settings',
  component: Settings,
  tags: ['autodocs'],
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
  argTypes: {
    data: { control: 'object' },
  },
}

const Template = (args) => <Settings {...args} />;

export const Default = Template.bind({});
Default.args = {
  user: {},
  operatorlist: [], 
  auth: {},
  onOperatorSubmit: (newOperator) => console.log('Submit:', newOperator),
};
