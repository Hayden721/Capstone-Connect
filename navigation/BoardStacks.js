import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import { View, Text, TouchableOpacity } from "react-native";

import 'react-native-gesture-handler';

//Board import
import Board_postLookUp from "../screens/Board/Board_postLookUp";
import Board_write from "../screens/Board/Board_write";
import Board_edit from "../screens/Board/Board_edit";

// TabNavi를 호출하는 법 onPress={() =>navigation.navigate("Tabs", {screen:"Search"})}
//BoardStack이 
const BoardStack = createStackNavigator();


  const BoardStacks = () => {
    return (
    <BoardStack.Navigator>
      <BoardStack.Screen name="글쓰기" component={Board_write}/>
      <BoardStack.Screen name="글조회" component={Board_postLookUp}/>
      <BoardStack.Screen name="글수정" component={Board_edit}/>
    </BoardStack.Navigator>  

    );
  };

  
export default BoardStacks;