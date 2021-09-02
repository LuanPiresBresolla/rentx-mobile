import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useEffect } from 'react';
import { database } from '../database';
import { User as ModelUser } from '../database/models/User';
import { api } from '../services/api';

interface User {
  id: string;
  user_id: string;
  email: string;
  name: string;
  driver_license: string;
  avatar?: string;
  token: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn: (credentials: SignInCredentials) => Promise<void>;
}

export const AuthContenxt = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);

  useEffect(() => {
    async function loadUserData() {
      const userColletion = database.get<ModelUser>('users');
      const response = await userColletion.query().fetch();

      if (response.length > 0) {
        const userData = response[0]._raw as unknown as ModelUser;
        api.defaults.headers.Authorization = `Bearer ${userData.token}`;
        setUser(userData);
      }
    }
    loadUserData();
  }, []);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('/sessions', {
        email,
        password,
      });

      const { token, user } = response.data;

      api.defaults.headers.Authorization = `Bearer ${token}`;

      const userCollection = database.get<ModelUser>('users');
      await database.write(async () => {
        await userCollection.create((newUser) => {
          newUser.user_id = user.id,
          newUser.name = user.name,
          newUser.email = user.email,
          newUser.driver_license = user.driver_license,
          newUser.avatar = user.avatar,
          newUser.token = token
        });
      });

      setUser({ ...user, token });
    } catch (error) {
      throw new Error(error);
    }
  }

  return (
    <AuthContenxt.Provider value={{ user, signIn }}>
      {children}
    </AuthContenxt.Provider>
  );
}
