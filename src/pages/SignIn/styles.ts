import styled from 'styled-components';
import { shade } from 'polished';
import signInBackground from '../../assets/sign-in-background.png';

export const Container = styled.div`
  /* maximo da tela horizontal */
  height: 100vh;

  /* ao lado do outro */
  display: flex;

  /* estica */
  align-items: stretch;
`;

export const Content = styled.div`
  /* ao lado do outro */
  display: flex;

  flex-direction: column;

  /* Alinhamento coluna */
  justify-content: center;

  /* alinhamento linha */
  align-items: center;

  /* centro h/v
  place-content: center */

  /* ocupe o máximo da tela com no máximo 700px */
  width: 100%;
  max-width: 700px;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: #f4ede8;
      /* Ocupa sempre a própria linha e posicionado abaixo */
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: background-color 0.2s;
      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }
  /* Pega só a do nível de fora */
  > a {
    color: #ff9000;
    /* Ocupa sempre a própria linha e posicionado abaixo */
    display: block;
    margin-top: 24px;
    text-decoration: none;
    /* alinhar icone com texto */
    display: flex;
    align-items: center;
    transition: background-color 0.2s;
    &:hover {
      color: ${shade(0.2, '#ff9000')};
    }
    svg {
      margin-right: 16px;
    }
  }
`;

export const Background = styled.div`
  /* igualmente distribuído entre todos os elementos(adaptar a imagem) */
  flex: 1;
  background: url(${signInBackground}) no-repeat center;
  /* Cobrir todo espaço disponivel */
  background-size: cover;
`;
