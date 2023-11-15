import styles from './App.module.scss'
import { ButtonContainer } from '../../shared/buttons'
import Content from '../Content'
import Header from '../Header'
import Item from '../Item'
import Items from '../Items'
import Menu from '../Menu'
import { FloatingButton } from '../../shared/buttons'

function App() {

  return (
    <>
      <ButtonContainer>    
      <div className={styles.app}>
        <Header />
        <Content>
          <Items />
          <FloatingButton secondary>+</FloatingButton>
        </Content>
        <Menu />
      </div>
      </ButtonContainer>
    </>
  )
}

export default App
