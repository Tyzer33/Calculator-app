import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'League Spartan';
  }

  button {
    border: none;
    cursor: pointer;
  }
`
export default GlobalStyle
