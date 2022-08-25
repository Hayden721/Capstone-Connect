import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import Login from "../screens/Account/Login";
import Register from "../screens/Account/Register";


const LRstack = createStackNavigator();
const LoginRegister = () => {
  
  return(
    <LRstack.Navigator>
    <LRstack.Screen name="Login" component={Login}/>
    <LRstack.Screen name="Register" component={Register}/>
  </LRstack.Navigator>  
  );
  
};
export default LoginRegister;