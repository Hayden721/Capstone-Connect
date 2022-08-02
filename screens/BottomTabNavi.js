import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Main_root from "../screens/Main_Screen/Main_root";
import Main_board from "../screens/Main_Screen/Main_board";
import Main_chat from "../screens/Main_Screen/Main_chat";
import Main_profile from "../screens/Main_Screen/Main_profile";
import MainSchool from "./Main_Screen/Main_root_note/MainSchool";

import { AntDesign, MaterialCommunityIcons  } from '@expo/vector-icons'; 

const BottomTabStack = createBottomTabNavigator();

const TabStackScreen = () => {
  return (
    <BottomTabStack.Navigator>
      <BottomTabStack.Screen
        name="Connect"
        component={Main_root}
        options={{
          tabBarIcon: () => (
            <AntDesign 
            name="home" 
            size={24} 
            color="black" 
            />
        ),
          headerShown: true 
        }}
      />
      <Stack.Screen name="MainSchool" component={MainSchool} />
      <BottomTabStack.Screen 
        name="board" 
        component={Main_board} 
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons 
            name="clipboard-edit-outline" 
            size={24} 
            color="black" 
            />
          ),
      }}
      />
      <BottomTabStack.Screen 
      name="Chat" 
      component={Main_chat} 
      options={{
        tabBarIcon: () => (
          <AntDesign 
          name="wechat" 
          size={24} 
          color="black" 
          />
        ),
      }}
      
      />
      <BottomTabStack.Screen 
        name="Profile" 
        component={Main_profile} 
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons 
            name="human"
            size={24}
            color="black" 
            />
          ),
        }}
        />
    </BottomTabStack.Navigator>
  );
};

export default TabStackScreen;
