import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import firebase from "firebase/app";
import "firebase/auth";

import "react-native-gesture-handler";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from '@react-navigation/stack';

import Board_bulletinBoard from "../screens/Board/Board_bulletinBoard";
import Board_free from "../screens/Board/Board_free";
import Board_competition from "../screens/Board/Board_competition";
import Board_club from "../screens/Board/Board_club";
import BoardStacks from "../navigation/BoardStacks";

const BoardTopTab = createMaterialTopTabNavigator();
//const BoardStack = createStackNavigator();

const Board = ({ navigation }) => {
  return (

    <BoardTopTab.Navigator>
      <BoardTopTab.Screen
        name="bulletinBoard"
        component={BoardStacks}  // Board_bulletinBoard연결 되있음
      />
      <BoardTopTab.Screen name="Board_free" component={Board_free} />
      <BoardTopTab.Screen
        name="Board_competition"
        component={Board_competition}
      />
      <BoardTopTab.Screen name="Board_club" component={Board_club} />
    </BoardTopTab.Navigator>
      
  );

};




export default Board;

const styles = StyleSheet.create({
  Container: {
    backgroundColor: "000000",
    marginTop: 30,
  },

  Top: {
    fontSize: 30,
    marginLeft: 32,
    fontFamily: "NanumGothicBold",
  },

  menuContainer: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  textContainer: {
    width: 70,
    height: 35,

    borderRadius: 10,
    margin: 5,
    padding: 10,
    backgroundColor: "000000",
  },

  textStyle: {
    justifyContent: "center",
    textAlign: "center",
    fontSize: 10,
    color: "black",
    fontFamily: "NanumGothicBold",
  },

  customBtn: {
    backgroundColor: "#D9D9D9",
    padding: 15,
    margin: 20,
    marginTop: 500,
    borderRadius: 10,
    alignItems: "center",
  },
});
