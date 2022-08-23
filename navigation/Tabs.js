import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Text, View } from "react-native";
import { useColorScheme } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";

import { BLACK_COLOR, YELLOW_COLOR, LIGHT_GREY } from "../colors";
import Stack from "./Stack";
//stack screens import
import Movie from "../screens/Movie";
import Search from "../screens/Search";
import Tv from "../screens/Tv";

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
            return <AntDesign name="film-outline" color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="Board"
        component={Board}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <AntDesign name="tv-outline" color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <AntDesign name="search-outline" color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <AntDesign name="search-outline" color={color} size={size} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
