import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TouchableOpacity,StyleSheet  } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import firebase from 'firebase/app';
import "firebase/auth";


import Chat_free from "../screens/Chat/Chat_free";
import Chat_job from "../screens/Chat/Chat_job";

const ChatTopTab = createMaterialTopTabNavigator();

  const Chat = () => {
    return (
    <ChatTopTab.Navigator>
      <ChatTopTab.Screen name="Chat_free" component={Chat_free}/>
      <ChatTopTab.Screen name="Chat_job" component={Chat_job}/>
    </ChatTopTab.Navigator>  
    );
  };
export default Chat
