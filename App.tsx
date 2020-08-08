import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import { AppLoading } from 'expo';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

import Login from './src/pages/Login';

export default function App() {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <>
        <Login />
        <StatusBar style="dark" />
      </>
    );
  }
}
