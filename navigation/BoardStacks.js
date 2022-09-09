import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import { View, Text, TouchableOpacity } from "react-native";

import 'react-native-gesture-handler';

//Board import
import Board_free from "../screens/Board/Board_free";
import Board_competition from "../screens/Board/Board_competition";
import Board_club from "../screens/Board/Board_club";
import Board_postLookUp from "../screens/Board/Board_postLookUp.js.js";
import Board_hobby from "../screens/Board/Board_hobby";
import Board_write from "../screens/Board/Board_write";
import Board_edit from "../screens/Board/Board_edit";

// TabNavi를 호출하는 법 onPress={() =>navigation.navigate("Tabs", {screen:"Search"})}
//BoardStack이 
const BoardStack = createStackNavigator();


  const BoardStacks = () => {
    return (
    <BoardStack.Navigator>
      <BoardStack.Screen name="자유게시판" component={Board_free}/>
      <BoardStack.Screen name="공모전게시판" component={Board_competition}/>
      <BoardStack.Screen name="동아리게시판" component={Board_club}/>
      <BoardStack.Screen name="취미게시판" component={Board_hobby}/>
      <BoardStack.Screen name="글쓰기" component={Board_write}/>
      <BoardStack.Screen name="글조회" component={Board_postLookUp}/>
      <BoardStack.Screen name="글수정" component={Board_edit}/>
    </BoardStack.Navigator>  

    );
  };

  
export default BoardStacks;