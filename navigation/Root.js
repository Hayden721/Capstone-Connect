import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Stack from "./Stack";
import Tabs from "./Tabs";
import Notice from "./NoticeStack";
import BoardStacks from "./BoardStacks";
import ChatStack from "./ChatStack";
import ChatChannel from "../screens/Chat/Chat_Channel"
const Nav = createStackNavigator();

const Root = () => {
  return(
  <Nav.Navigator screenOptions={{headerShown: false}}>
    <Nav.Screen name="Tabs" component={Tabs} />
    <Nav.Screen name="Stack" component={Stack} />
    <Nav.Screen name="Notice" component={Notice} options={{headerShown: true}} />
    <Nav.Screen name="BoardStacks" component={BoardStacks}/>
    <Nav.Screen name="ChatStack" component={ChatStack}/>
    <Nav.Screen name="ChatChannel" component={ChatChannel} options={{headerShown: true}}/>
  </Nav.Navigator>
  );
};

export default Root;
