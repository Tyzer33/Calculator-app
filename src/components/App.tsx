import styled, { css } from 'styled-components'
import { tabletLandscape } from '../styles/breakpoints'
import Header from './Header'
import Screen from './Screen'
import Keypad from './Keypad'

const Container = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 20.4375rem;

  ${tabletLandscape(css`
    width: 33.75rem;
  `)}
`

export default function App() {
  return (
    <Container>
      <Header />
      <Screen />
      <Keypad />
    </Container>
  )
}
