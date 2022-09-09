import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import firebase from "firebase/app";
import "firebase/auth";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";



import BoardStacks from "../navigation/BoardStacks";

const CategoryStacks = createStackNavigator();


const Board = ({ navigation }) => {
  return(
    <View style= {{
      flexDirection: "row",
      margin: 20,
      justifyContent:"space-between"
    }}>
      <TouchableOpacity 
      onPress={() => navigation.navigate("BoardStacks", {screen:"자유게시판"})}
      style={{
        height: 100,
        width: 75,
        backgroundColor: "green",
        borderRadius: 25,
        alignItems:"center",
        justifyContent:"center"
      }}>
        <Text>자유</Text>
      </TouchableOpacity>

      <TouchableOpacity 
      onPress={() => navigation.navigate("BoardStacks", {screen:"공모전게시판"})}
      style={{
        height: 100,
        width: 75,
        backgroundColor: "blue",
        borderRadius: 25,
        alignItems:"center",
        justifyContent:"center"
      }}>
        <Text>공모전</Text>
      </TouchableOpacity>

      <TouchableOpacity 
      onPress={() => navigation.navigate("BoardStacks", {screen:"동아리게시판"})}
      style={{
        height: 100,
        width: 75,
        backgroundColor: "red",
        borderRadius: 25,
        alignItems:"center",
        justifyContent:"center"
      }}>
        <Text>동아리</Text>
      </TouchableOpacity>

      <TouchableOpacity 
      onPress={() => navigation.navigate("BoardStacks", {screen:"취미게시판"})} 
      style={{
        height: 100,
        width: 75,
        backgroundColor: "orange",
        borderRadius: 25,
        alignItems:"center",
        justifyContent:"center"
      }}>
        <Text>취미</Text>
      </TouchableOpacity>
    </View>
  )
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
