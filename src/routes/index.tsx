import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import { useAuth } from '../hooks/Auth';
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

const Routes: React.FC = () => {
  const { sponsor, loading } = useAuth();

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator size="large" color="#00a3e4" />
      </View>
    );
  }

  return sponsor ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
