import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
    touch-action: manipulation;
  }

  button {
    border: 0;
    background-color: transparent;
    outline: none;
  }

  #root {
    height: 100%;
  }

  * {
    font-family: 'Jockey One';
    touch-action: manipulation;
  }
`;

export default GlobalStyle;
