import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Edo';
    src: url('../assets/fonts/Edo.ttf');
  }

  html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
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
    font-family: 'Edo';
  }
`;

export default GlobalStyle;
