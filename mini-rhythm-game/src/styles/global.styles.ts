import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    // 폰트 에러 해결 필요
    font-family: 'Edo';
    src: url('../assets/fonts/Edo.ttf');
  }

  html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
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
