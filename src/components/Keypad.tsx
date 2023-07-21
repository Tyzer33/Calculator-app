import styled, { css } from 'styled-components'
import { tabletLandscape } from '../styles/breakpoints'
import Key from './Key'

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

type Keys =
  | 7
  | 8
  | 9
  | 'DEL'
  | 4
  | 5
  | 6
  | '+'
  | 1
  | 2
  | 3
  | '-'
  | '.'
  | 0
  | '/'
  | 'x'
  | 'RESET'
  | '='

type KeysListItem = {
  content: Keys
  type: 'primary' | 'secondary' | 'tertiary'
  size: 1 | 2
}

// TODO: Modifier et déplacer KeysList
const keysList: KeysListItem[] = [
  { content: 7, type: 'primary', size: 1 },
  { content: 8, type: 'primary', size: 1 },
  { content: 9, type: 'primary', size: 1 },
  { content: 'DEL', type: 'secondary', size: 1 },
  { content: 4, type: 'primary', size: 1 },
  { content: 5, type: 'primary', size: 1 },
  { content: 6, type: 'primary', size: 1 },
  { content: '+', type: 'primary', size: 1 },
  { content: 1, type: 'primary', size: 1 },
  { content: 2, type: 'primary', size: 1 },
  { content: 3, type: 'primary', size: 1 },
  { content: '-', type: 'primary', size: 1 },
  { content: '.', type: 'primary', size: 1 },
  { content: 0, type: 'primary', size: 1 },
  { content: '/', type: 'primary', size: 1 },
  { content: 'x', type: 'primary', size: 1 },
  { content: 'RESET', type: 'secondary', size: 2 },
  { content: '=', type: 'tertiary', size: 2 },
]

export default function Keypad() {
  return (
    <Container>
      {keysList.map((key) => (
        <Key content={key.content} type={key.type} size={key.size} key={key.content} />
      ))}
    </Container>
  )
}
