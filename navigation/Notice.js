import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import NotiSchool from "../screens/Main/Notice/NotiSchool";
import NotiSystem from "../screens/Main/Notice/NotiSystem";

const noticeTab = createMaterialTopTabNavigator();

function Notice() {
  return (
    <noticeTab.Navigator>
      <noticeTab.Screen name="NotiSchool" component={NotiSchool}/>
      <noticeTab.Screen name="NotiSystem" component={NotiSystem}/>
    </noticeTab.Navigator>
  )
}
export default Notice;