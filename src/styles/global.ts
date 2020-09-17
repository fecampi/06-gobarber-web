import { createGlobalStyle, keyframes } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: #312E38 ;
    color: #FFF;
    -webkit-font-smoothing: antialiased
  }

  body, input, button {
    font: 16px "Roboto Slab", serif;
  }

  button {
    cursor: pointer;
  }

  h1,h2,h3,h4,h5,h6, strong {
    font-weight:500;
  }
`;

// Animação
export const appearFromLeftAnimation = keyframes`
from{
  opacity: 0;
  transform: translateX(-50px);
}
to{
  opacity: 1;
  transform: translateX(0);
}
`;

export const appearFromRightAnimation = keyframes`
from{
  opacity: 0;
  transform: translateX(50px);
}
to{
  opacity: 1;
  transform: translateX(0);
}
`;
