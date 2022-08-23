import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import 'react-native-gesture-handler';
import { Text, View } from "react-native";
import { useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { BLACK_COLOR, YELLOW_COLOR, LIGHT_GREY } from "../styles/colors/colors";
import Stacks from "./Stack";
//stack screens import
import Main from "../screens/Main";
import Board from "../screens/Board";
import Chat from "../screens/Chat";
import Profile from "../screens/Profile";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const isDarks = useColorScheme() === "dark";
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: isDarks ? BLACK_COLOR : "white",
        },
        tabBarActiveTintColor: isDarks ? YELLOW_COLOR : BLACK_COLOR,
        tabBarInactiveTintColor: isDarks ? "#d2dae2" : LIGHT_GREY,
        headerStyle: {
          backgroundColor: isDarks ? BLACK_COLOR : "white",
        },
        headerTitleStyle: {
          color: isDarks ? "white" : BLACK_COLOR,
        },
        tabBarLabelStyle: {
          marginTop: -5,
          fontSize: 10,
          fontWeight: "600",
        },
      }}
    >
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
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="chatbubble-ellipses-outline" size={24} color={color} />;
          },
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
