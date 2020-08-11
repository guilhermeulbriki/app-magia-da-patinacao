import AsyncStorage from '@react-native-community/async-storage';
import React, { createContext, useCallback, useState, useContext, useEffect } from 'react';

import api from '../services/api';

interface Sponsor {
  id: string;
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  rg: string;
  cpf: string;
  gender: string;
  born: string;
  type: string;
  addressAsJson: {
    street: string;
    neighborhood: string;
    complement: string;
    number: number;
    cep: number;
    city: string;
  };
}

interface Credential {
  email: string;
  password: string;
}

interface AuthContextData {
  sponsor: Sponsor;
  loading: boolean;
  signIn(credentials: Credential): Promise<void>;
  signOut(): Promise<void>;
  updateSponsor(sponsor: Sponsor): Promise<void>;
}

interface AuthState {
  token: string;
  sponsor: Sponsor;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoraged(): Promise<void> {
      const [token, sponsor] = await AsyncStorage.multiGet(['@Patinacao:token', '@Patinacao:user']);

      if (token[1] && sponsor[1]) {
        api.defaults.headers.authorization = `Bearer ${token[1]}`;

        setData({ token: token[1], sponsor: JSON.parse(sponsor[1]) });
      }

      setLoading(false);
    }

    loadStoraged();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions/sponsor', {
      email,
      password,
    });

    const { token, sponsor } = response.data;

    await AsyncStorage.multiSet([
      ['@Patinacao:token', token],
      ['@Patinacao:sponsor', JSON.stringify(sponsor)],
    ]);

    api.defaults.headers.authorization = `Bearer ${token[1]}`;

    setData({ token, sponsor });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@Patinacao:token', '@Patinacao:sponsor']);

    setData({} as AuthState);
  }, []);

  const updateSponsor = useCallback(
    async (sponsor: Sponsor) => {
      await AsyncStorage.setItem('@Patinacao:sponsor', JSON.stringify(sponsor));

      setData({
        token: data.token,
        sponsor,
      });
    },
    [setData, data.token]
  );

  return (
    <AuthContext.Provider
      value={{ sponsor: data.sponsor, signIn, signOut, loading, updateSponsor }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
