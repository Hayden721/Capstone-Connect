import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Stack from "./Stack";
import Tabs from "./Tabs";
import Notice from "./Notice";
const Nav = createStackNavigator();

const Root = () => (
  <Nav.Navigator screenOptions={{ headerShown: false }}>
    <Nav.Screen name="Tabs" component={Tabs} />
    <Nav.Screen name="Stack" component={Stack} />
    <Nav.Screen name="Notice" component={Notice} />
  </Nav.Navigator>
);

export default Root;
