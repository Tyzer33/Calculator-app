import styled, { css } from 'styled-components'
import { tabletLandscape } from '../styles/breakpoints'
import Key from './Key'
import keysList from '../keysList'

const Container = styled.div`
  display: grid;
  justify-content: center;
  align-content: center;
  grid: repeat(5, 3.75rem) / repeat(4, 3.75rem);
  gap: 1.0625rem 0.8125rem;
  padding: 1.5rem;
  background: ${({ theme }) => theme.keypadBackground};
  border-radius: 10px;

  ${tabletLandscape(css`
    grid: repeat(5, 3.75rem) / repeat(4, 6.3125rem);
    gap: 1.75rem 1.5rem;
    padding: 2rem 1.875rem;
  `)}
`

export default function Keypad() {
  return (
    <Container>
      {keysList.map((key) => (
        <Key content={key.content} type={key.type} size={key.size} key={key.content} />
      ))}
    </Container>
  )
}
