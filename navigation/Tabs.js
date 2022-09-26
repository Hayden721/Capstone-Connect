import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import 'react-native-gesture-handler';
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Stacks from "./Stack";
//stack screens import
import Main from "../screens/Main";
import Board from "../screens/Board";
import Chat from "../screens/Chat";
import Profile from "../screens/Profile";

import { ThemeConsumer, ThemeContext } from "styled-components/native";

const Tab = createBottomTabNavigator();
const tabBarIcon = ({ focused, name }) => {
  const theme = useContext(ThemeConsumer);
  return (
    <Ionicons
      name="name"
      size={24}
    />
  )
}

const Tabs = ({ navigation, route}) => {
  const theme = useContext(ThemeContext);
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Main"
        component={Main}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="home-outline" size={24} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Board"
        component={Board}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="clipboard-outline" size={24} color={color} />;
          },
          headerRight: ({color}) => (
            <Ionicons name="ios-alert-outline" size={24} color="black" 
            onPress={() => alert('신고 버튼')}
            style={{
              marginRight: 10,
            }} />
          )
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="chatbubble-ellipses-outline" size={24} color={color} />;
          },
          headerRight: ({color, size}) => (
            <Ionicons name="ios-alert-outline" size={24} color="black" 
            onPress={() => navigation.navigate("ChatStack", {screen:"ChannelCreation"})}
            style={{
              marginRight: 10,
            }} />
          )
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="person-circle-outline" size={24} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
