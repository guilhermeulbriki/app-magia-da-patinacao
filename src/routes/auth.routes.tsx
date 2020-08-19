import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import Login from '../pages/Login';
import RegisterSponsor from '../pages/RegisterSponsor';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#f2f2f2' },
    }}
  >
    <Auth.Screen name="Login" component={Login} />
    <Auth.Screen name="RegisterSponsor" component={RegisterSponsor} />
  </Auth.Navigator>
);

export default AuthRoutes;
