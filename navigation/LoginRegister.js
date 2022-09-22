import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import Login from "../screens/Account/Login";
import Register from "../screens/Account/Register";
import PwFind from "../screens/Account/PwFind";
const LRstack = createStackNavigator();

const LoginRegister = () => {
  
  return(
    <LRstack.Navigator>
    <LRstack.Screen name="Login" component={Login} options={{headerShown: false}}/>
    <LRstack.Screen name="Register" component={Register}/>
    <LRstack.Screen name="PwFind" component={PwFind}/>
  </LRstack.Navigator>  
  );
  
};
export default LoginRegister;