import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import AppProvider from './src/hooks';
import Routes from './src/routes';
import { useAuth } from './src/hooks/Auth';

const App: React.FC = () => {
  const { loading } = useAuth();

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  if (!fontsLoaded || loading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator size="large" color="#00a3e4" />
      </View>
    );
  } else {
    return (
      <NavigationContainer>
        <StatusBar style="dark" />

        <AppProvider>
          <Routes />
        </AppProvider>
      </NavigationContainer>
    );
  }
};

export default App;
