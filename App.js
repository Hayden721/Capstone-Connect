import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  SafeAreaView,
} from "react-native";
import { useFonts } from "expo-font";

//navigation import

import Root from "./navigation/Root";

//Navi import
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";

//firebase import
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const firebaseConfig = {
    apiKey: "AIzaSyBiAMNvHOG2_2g9vbuxNBse5qIQP8drdOo",
    authDomain: "capstonconnect-8876a.firebaseapp.com",
    databaseURL:
      "https://capstonconnect-8876a-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "capstonconnect-8876a",
    storageBucket: "capstonconnect-8876a.appspot.com",
    messagingSenderId: "434008796329",
    appId: "1:434008796329:web:3d5f07352693e496e3cdb8",
    measurementId: "G-GPTY23T65H",
  };
  //Checking if firebase has been initialized 파이어베이스 초기화 여부 확인
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }
  firebase.auth().onAuthStateChanged((user) => {
    if (user != null) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  });

  //font setting
  const [loaded] = useFonts({
    Audiowide: require("./assets/fonts/AudiowideRegular.ttf"),
    NanumGothic: require("./assets/fonts/NanumGothic.otf"),
    NanumGothicBold: require("./assets/fonts/NanumGothicBold.otf"),
  });
  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer>
    <Root />
  </NavigationContainer>
  )
}
