import Menu from '../components/Menu'
import { MemoryRouter } from 'react-router-dom'
import { GoChecklist } from 'react-icons/go'
import { MdQueryStats } from 'react-icons/md'
import { GiSettingsKnobs } from 'react-icons/gi'

export default {
  title: 'Components/Menu',
  component: Menu,
  tags: ['autodocs'],
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
  argTypes: {
    data: { control: 'object' },
  },
}

const Template = (args) => <Menu {...args} />;

export const Default = Template.bind({});
Default.args = {
  items: [
    { to: '', icon: <GoChecklist /> },
    { to: '/stats', icon: <MdQueryStats /> },
    { to: '/settings', icon: <GiSettingsKnobs /> },
  ],
};
