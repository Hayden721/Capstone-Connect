import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import { View, Text, TouchableOpacity } from "react-native";


import NotiWrite from "../screens/Main/Notice/NotiWrite.js";
import NotiLookUp from "../screens/Main/Notice/NotiLookUp.js";

// TabNavi를 호출하는 법 onPress={() => navigation.navigate("Tabs", {screen:"Search"})}

const NoticeStack = createStackNavigator();
const Stack = () => {
  return (
    <NoticeStack.Navigator>
      <NoticeStack.Screen name="NotiWrite" component={NotiWrite} />
      <NoticeStack.Screen name="NotiLookUp" component={NotiLookUp} />
    </NoticeStack.Navigator>
  );
};

export default Stack;
