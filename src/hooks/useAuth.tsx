import { useContext } from 'react';
import { AuthContenxt } from '../context/auth';

export function useAuth() {
  const context = useContext(AuthContenxt);

  if (!context) {
    throw new Error('useAuth must be used within an Authprovider');
  }

  return context;
}
