import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  SafeAreaView,
  LogBox,
} from 'react-native';
import { useFonts } from 'expo-font';
import Root from './navigation/Root';
import LoginRegister from './navigation/LoginRegister';

import { ThemeProvider } from 'styled-components/native';
import { theme } from './styles/theme';
//Navi import
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

//firebase import
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import config from './firebase.json'
const Stack = createStackNavigator();

export default function App() {
  LogBox.ignoreLogs(['Warning: ...']);
  LogBox.ignoreLogs(['Require cycle:']);
  LogBox.ignoreLogs(['*']);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  //Checking if firebase has been initialized 파이어베이스 초기화 여부 확인
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  } else {
    firebase.app();
  }
  firebase.auth().onAuthStateChanged(user => {
    if (user != null) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  });

  //font setting
  const [loaded] = useFonts({
    Audiowide: require('./assets/fonts/AudiowideRegular.ttf'),
    NanumGothic: require('./assets/fonts/NanumGothic.otf'),
    NanumGothicBold: require('./assets/fonts/NanumGothicBold.otf'),
  });
  if (!loaded) {
    return null;
  }

  return (
  <ThemeProvider theme={theme}>
    <SafeAreaView/>
    <NavigationContainer>
      {isLoggedIn ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Root"
            component={Root}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="LoginRegister"
            component={LoginRegister}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
    </ThemeProvider>
  );
}
