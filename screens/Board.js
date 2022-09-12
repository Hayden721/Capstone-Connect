import React from "react";
import {
  View,
  Text,
  ScrollView,
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
  return (
    <ScrollView style={{ backgroundColor: "white"}}>
      <View
        style={{
          flexDirection: "row",
          margin: 20,
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("BoardStacks", { screen: "자유게시판" })
          }
          style={{
            height: 100,
            width: 100,
            backgroundColor: "#ef5777",
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>자유</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("BoardStacks", { screen: "공모전게시판" })
          }
          style={{
            height: 100,
            width: 100,
            backgroundColor: "#575fcf",
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>공모전</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("BoardStacks", { screen: "동아리게시판" })
          }
          style={{
            height: 100,
            width: 100,
            backgroundColor: "#4bcffa",
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>동아리</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          margin: 20,
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("BoardStacks", { screen: "취미게시판" })
          }
          style={{
            height: 100,
            width: 100,
            backgroundColor: "#0be881",
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>취미</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("BoardStacks", { screen: "" })}
          style={{
            height: 100,
            width: 100,
            backgroundColor: "#808e9b",
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>미개발</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("BoardStacks", { screen: "" })}
          style={{
            height: 100,
            width: 100,
            backgroundColor: "#808e9b",
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>미개발</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
