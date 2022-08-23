import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import { View, Text, TouchableOpacity } from "react-native";
//Accunt import
import NotiSchool from "../screens/Main/Notice/NotiSchool";
import NotiSystem from "../screens/Main/Notice/NotiSystem";

// TabNavi를 호출하는 법 onPress={() => navigate("Tabs", {screen:"Search"})}

const Stacks = createStackNavigator();

const Stack = () => (
  <Stacks.Navigator screenOptions={{}}>
    <Stacks.Screen name="NotiSchool" component={NotiSchool} />
    <Stacks.Screen name="NotiSystem" component={NotiSystem} />


  </Stacks.Navigator>
);

export default Stack;
