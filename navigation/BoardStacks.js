import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import { View, Text, TouchableOpacity } from "react-native";
//Accunt import
import NotiSchool from "../screens/Main/Notice/NotiSchool";
import NotiSystem from "../screens/Main/Notice/NotiSystem";

//Board import
import Board_bulletinBoard from "../screens/Board/Board_bulletinBoard";
import Board_free from "../screens/Board/Board_free";
import Board_competition from "../screens/Board/Board_competition";
import Board_club from "../screens/Board/Board_club";
import Board_postLookUp from "../screens/Board/Board_postLookUp.js.js";

import Board_write from "../screens/Board/Board_write";

// TabNavi를 호출하는 법 onPress={() => navigate("Tabs", {screen:"Search"})}

const BoardStack = createStackNavigator();

  const BoardStacks = () => {
    return (
    <BoardStack.Navigator>
      <BoardStack.Screen name="Board_bulletinBoard" component={Board_bulletinBoard}/>
      <BoardStack.Screen name="Board_write" component={Board_write}/>
      <BoardStack.Screen name="Board_postLookUp" component={Board_postLookUp}/>
    </BoardStack.Navigator>  
    );
  };

  
export default BoardStacks;