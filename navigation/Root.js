import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Stack from "./Stack";
import Tabs from "./Tabs";
import Notice from "./Notice";
import BoardStacks from "./BoardStacks";
import ChatStack from "./ChatStack";
const Nav = createStackNavigator();

const Root = () => {
  return(
  <Nav.Navigator screenOptions={{headerShown: false}}>
    <Nav.Screen name="Tabs" component={Tabs} />
    <Nav.Screen  name="Stack" component={Stack} />
    <Nav.Screen options={{headerShown: true}} name="Notice" component={Notice} />
    <Nav.Screen name="BoardStacks" component={BoardStacks}/>
    <Nav.Screen name="ChatStack" component={ChatStack}/>
  </Nav.Navigator>
  );
};

export default Root;
