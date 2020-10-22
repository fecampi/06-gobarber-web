import React, { useEffect } from 'react';
import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiXCircle,
} from 'react-icons/fi';
import { Container } from './styles';
import { ToastMessage, useToast } from '../../../hooks/toast';

interface ToastProps {
  message: ToastMessage;
  // style é para animação com a biblioteca react-spring
  style: object;
}

const icons = {
  info: <FiInfo size={24} />,
  error: <FiAlertCircle size={24} />,
  success: <FiCheckCircle size={24} />,
};

const Toast: React.FC<ToastProps> = ({ message, style }) => {
  const { removeToast } = useToast();
  // Disparar ação assim que componente é criado
  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);
    // Cancelar o timer se o componente deixa de existir
    return () => {
      clearTimeout(timer);
    };
    // Dependências
  }, [removeToast, message.id]);
  return (
    // style é para animação com a biblioteca react-spring
    <Container
      type={message.type}
      hasDescription={Number(!!message.description)}
      style={style}
    >
      {icons[message.type || 'info']}
      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>
      {/* Para não executar, temos que criar uma função */}
      <button onClick={() => removeToast(message.id)} type="button">
        <FiXCircle size={18} />
      </button>
    </Container>
  );
};

export default Toast;
