import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import SignIn from '../../pages/SignIn';

// Cria as funções sem valor

// Utilizar os módulos que são necessários
// (a) Conferir essa função foi disparada e enviada para roda dashboard
const mockedHistoryPush = jest.fn();
jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    // React node:qualquer conteúdo que o react pode receber
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});
// (b)
const mockedSignIn = jest.fn();
jest.mock('../../hooks/auth', () => {
  return {
    useAuth: () => ({
      signIn: mockedSignIn,
    }),
  };
});

// (c)
const mockedAddToast = jest.fn();
jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

// Descrevendo o teste
describe('SignIn Page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
  });

  // deve ser possível autenticar
  it('should be able to sign in', async () => {
    // getByPlaceholderText - Procura pelo placeholder do elemento
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    fireEvent.change(emailField, {
      target: { value: 'johndoe@example.com' },
    });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('should not be able to sign in with invalid credentials', async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    fireEvent.change(emailField, { target: { value: 'not-valid-email' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    fireEvent.click(buttonElement);

    // Espero que a função tenha sido chamada
    await wait(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });

  it('should display an error if login fails', async () => {
    mockedSignIn.mockImplementation(() => {
      throw new Error();
    });

    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText('E-mail');
    fireEvent.change(emailField, {
      target: { value: 'johndoe@example.com' },
    });

    const passwordField = getByPlaceholderText('Senha');
    fireEvent.change(passwordField, { target: { value: '123456' } });

    const buttonElement = getByText('Entrar');
    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
        }),
      );
    });
  });
});
