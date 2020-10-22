import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

interface ContainerProps {
  type?: 'success' | 'error' | 'info';
  hasDescription?: number;
}

// Variações para criar os toasts com cores diferentes
const toastTypeVariations = {
  info: css`
    background: #ebf8ff;
    color: #3172b7;
  `,
  success: css`
    background: #e6fffa;
    color: #2e656a;
  `,
  error: css`
    background: #fddede;
    color: #c53030;
  `,
};

// animated.div é para animação com a biblioteca react-spring
export const Container = styled(animated.div)<ContainerProps>`
  width: 360px;
  position: relative;
  padding: 16px 30px 16px 16px;
  border-radius: 16px;
  /* sombra preta com 20% de opacidade */
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  display: flex;

  background: #ebf8ff;
  color: #3172b7;

  /* tost que antes dele tem outro tost */
  & + div {
    margin-top: 8px;
  }

  /* 
pega o type, se não existe pega o padrão */
  ${props => toastTypeVariations[props.type || 'info']}

  /* svg dentro */
  > svg {
    margin: 4px 12px 0 0;
  }

  div {
    /* todo tamanho possível */
    flex: 1;
    p {
      margin-top: 4px;
      font-size: 14px;
      opacity: 0.8;
      /* espaçamento */
      line-height: 20px;
    }
  }
  button {
    position: absolute;
    right: 16px;
    top: 19px;
    opacity: 0.6px;
    border: 0px;
    background: transparent;
    color: inherit;
  }

  /* se ele nao tem descrição  */
  ${props =>
    !!props.hasDescription &&
    css`
      align-itens: center;

      svg {
        margin-top: 0;
      }
    `}
`;
