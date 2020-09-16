import React from 'react';
import { AuthProvider } from './auth';
import { ToastProvider } from './toast';

// provider global que agrupa todos os providers da aplicação
const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>{children}</ToastProvider>
  </AuthProvider>
);
export default AppProvider;
