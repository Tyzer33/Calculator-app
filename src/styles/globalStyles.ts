import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'League Spartan';
  }

  body {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    min-height: 100svh;
    background: ${({ theme }) => theme.mainBackground};
    padding: 2rem 1.5rem;
  }

  button {
    border: none;
    cursor: pointer;
  }
`
export default GlobalStyle
