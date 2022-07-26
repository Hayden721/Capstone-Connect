import React from "react";
import { View, Text, TouchableOpacity,StyleSheet } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import firebase from 'firebase/app';
import "firebase/auth";



function Start()  {
  return (
    <View>
      <TouchableOpacity>
        <Text>공지사항</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Start;



