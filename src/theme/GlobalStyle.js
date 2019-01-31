import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    min-width: 1000px;
    overflow: auto;
    overflow-y: scroll;
  }

  ul {
    list-style-type: none;
  }

  img {
    width: 50px;
    height: 50px;
  }

  h4 {
    font-size: 15px;
  }
`;

export default GlobalStyle;
