import styled, { css } from 'styled-components'
import { desktop } from '../styles/breakpoints'

const Error = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: ${({ theme }) => theme.screenText};
  text-align: center;

  ${desktop(css`
    font-size: 3rem;
  `)};
`

function CustomError() {
  return (
    <Error>
      🚨
      <p>Sorry, an error occured!</p>
      🚨
    </Error>
  )
}

export default CustomError
