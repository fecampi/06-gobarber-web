import React from 'react';
import {
  RouteProps as ReactDomRouteProps,
  Route as ReactDomRoute,
  Redirect,
} from 'react-router-dom';
import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDomRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <ReactDomRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/Dashboard',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
// pega o que tiver, e o render modifica a logística da rota
// (1)
// true/true onClick
// true/false = redirecionar para o login
// false/true = redirecionar para o dashboard
// false/false = ok
// tentando acessar uma rota autenticada sem estar autenticado,
// (2)
// ?manda para o login..
// :manda para o Dashboard
// (3)state: { from: location },
// Mantém o histórico das paginas para o login já carregar a dashboard em caso de autenticação
