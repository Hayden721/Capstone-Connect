import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import { View, Text, TouchableOpacity } from "react-native";
//Accunt import
import NotiSchool from "../screens/Main/Notice/NotiSchool";
import NotiSystem from "../screens/Main/Notice/NotiSystem";

//Board import

import Board_free from "../screens/Board/Board_free";
import Board_competition from "../screens/Board/Board_competition";
import Board_club from "../screens/Board/Board_club";
import Board_postLookUp from "../screens/Board/Board_postLookUp.js";

// TabNavi를 호출하는 법 onPress={() => navigation.navigate("Tabs", {screen:"Search"})}

const NoticeStack = createStackNavigator();
const BoardStack = createStackNavigator();
const Stack = () => {
  return (
    <NoticeStacks.Navigator>
      <NoticeStack.Screen name="NotiSchool" component={NotiSchool} />
      <NoticeStack.Screen name="NotiSystem" component={NotiSystem} />
    </NoticeStacks.Navigator>
  );
};

export default Stack;
