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

const styles = StyleSheet.create({

  Container: {
    backgroundColor:"000000",
    marginTop: 30,
  },

  Top: {   
    fontSize:30,
    marginLeft:32,   
    fontFamily: 'NanumGothicBold',
  },

  menuContainer: {
    marginTop:10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  textContainer: {
    width:70,
    height:35,

    borderRadius:10,
    margin:5,
    padding:10,
    backgroundColor:"000000"
  },

  textStyle: {
    justifyContent:"center",
    textAlign:"center",
    fontSize:10,
    color:"black",
    fontFamily: 'NanumGothic',
  },

  customBtn:{
    backgroundColor: '#D9D9D9',
    padding: 15,
    margin: 20,
    marginTop: 500,
    borderRadius: 10,
    alignItems:"center"
  },

})