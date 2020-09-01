import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import Dashboard from "../pages/Dashboard";
import UpdateSponsor from "../pages/UpdateSponsor";
import UpdateEnrollment from "../pages/UpdateEnrollment";
import Competitions from "../pages/Competitions";
import UpdateStudents from "../pages/UpdateStudents";

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: "#f2f2f2" },
    }}
  >
    <App.Screen name="Dashboard" component={Dashboard} />
    <App.Screen name="UpdateStudents" component={UpdateStudents} />
    <App.Screen name="Competitions" component={Competitions} />
    <App.Screen name="UpdateEnrollment" component={UpdateEnrollment} />
    <App.Screen name="UpdateSponsor" component={UpdateSponsor} />
  </App.Navigator>
);

export default AppRoutes;
