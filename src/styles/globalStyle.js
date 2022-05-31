import { createGlobalStyle } from 'styled-components';
import colors from 'styles/colors.json';

const GlobalStyle = createGlobalStyle`
  *, input::placeholder {
    margin: 0;
    padding: 0;
    border: none;
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
  }

  body {
    font-size: 16px;
  }

  label, input::placeholder {
    line-height: 148%;
    letter-spacing: -0.02em;
  }

  h1 {
    font-size: 2.25rem;
    color: ${colors['main-header']};
    font-weight: 700;
    font-family: 'Poppins', sans-serif;
  }

  h2 {
    color: ${colors['secondary-header']};
    font-size: 1.13rem;
    font-weight: 500;
    opacity: 0.64;
  }
`;

export default GlobalStyle;
