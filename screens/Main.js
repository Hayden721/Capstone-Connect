import firebase from "firebase/app";
import "firebase/auth";
import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

const Main = ({ navigation }) => {
  return (
    <ScrollView>
      <Text style={styles.Top}>Connect </Text>
      <Text style={styles.Top2}>공지사항 </Text>

      <View style={styles.Container}></View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Stack", { screen: "NotiSchool" })}
        style={styles.textContainerss}
      >

      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Stack", { screen: "NotiSystem" })}
        style={styles.textContainerss}
      >
        <Ionicons name="build" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.menuContainer} horizontal={true}>
        <TouchableOpacity style={styles.textContainer}>
          <Ionicons name="school" size={24} color="black" />
          <Text style={styles.textStyle}>학교</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.textContainer}>
          <Ionicons name="airplane" size={24} color="black" />
          <Text style={styles.textStyle}>종정</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.textContainer}>
          <Ionicons name="bus" size={24} color="black" />
          <Text style={styles.textStyle}>셔틀</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.Top2}>게시판</Text>

      <View style={styles.Container}></View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Tabs", { screen: "Board" })}
        style={styles.textContainerss}
      >
        <Ionicons name="clipboard" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.Top2}>채팅방</Text>

      <View style={styles.Container}></View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Tabs", { screen: "Chat" })}
        style={styles.textContainerss}
      >
        <Ionicons name="chatbubble-ellipses" size={24} color="black" />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Main;

const styles = StyleSheet.create({
  Container: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  Top: {
    fontSize: 25,
    fontFamily: "Audiowide",
    marginLeft: 15,
  },

  Top2: {
    fontSize: 30,
    marginLeft: 15,
    marginTop: 30,
    fontFamily: "NanumGothicBold",
  },

  School: {
    marginLeft: 15,
    marginTop: 10,
    fontFamily: "NanumGothic",
  },

  System: {
    marginLeft: 15,
    fontFamily: "NanumGothic",
  },

  textContainerss: {
    height: 50,
    borderColor: "#999999",
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderRadius: 10,
    margin: 10,
  },

  menuContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  textContainer: {
    width: 70,
    height: 60,
    borderWidth: 1,
    borderRadius: 40,
    margin: 20,
    padding: 15,
    backgroundColor: "#FFFFFF",
    borderColor: "#FFFFFF",
  },
  textStyle: {
    justifyContent: "center",
    textAlign: "center",
    fontSize: 15,
  },

  textStyle1: {
    justifyContent: "center",
    alignItems: "center",
  },
});
