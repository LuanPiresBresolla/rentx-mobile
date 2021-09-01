import React, { ReactNode } from 'react';
import { AuthProvider } from '../context/auth';

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
