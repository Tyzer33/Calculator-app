import { useContext } from 'react'
import styled, { css } from 'styled-components'
import { tabletLandscape } from '../styles/breakpoints'
import { CalculContext } from '../context/CalculContext'
import { CalculContextValue } from '../types/types'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 5.625rem;
  padding: 0 1.5rem;
  font-size: 2.1875rem;
  background: ${({ theme }) => theme.screenBackground};
  color: ${({ theme }) => theme.screenText};
  border-radius: 10px;
  overflow: hidden;

  ${tabletLandscape(css`
    height: 8rem;
    font-size: 3.5rem;
  `)}
`

const Display = styled.span`
  white-space: nowrap;
`
const Placeholder = styled(Display)`
  opacity: 0.5;
`

export default function Screen() {
  const { toDisplay } = useContext(CalculContext) as CalculContextValue

  return (
    <Container>
      {toDisplay() === undefined ? <Placeholder>0</Placeholder> : <Display>{toDisplay()}</Display>}
    </Container>
  )
}
