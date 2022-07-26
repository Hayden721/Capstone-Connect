import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, SafeAreaView } from 'react-native';
import { useFonts } from 'expo-font';
import LR from './screens/LR';

import BottomTabNavi from './screens/BottomTabNavi';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';
// import { MaterialCommunityIcons } from '@expo/vector-icons';

import firebase from 'firebase/app';
import "firebase/auth";



const Stack = createStackNavigator();

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const firebaseConfig = {
    apiKey: "AIzaSyBiAMNvHOG2_2g9vbuxNBse5qIQP8drdOo",
    authDomain: "capstonconnect-8876a.firebaseapp.com",
    databaseURL: "https://capstonconnect-8876a-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "capstonconnect-8876a",
    storageBucket: "capstonconnect-8876a.appspot.com",
    messagingSenderId: "434008796329",
    appId: "1:434008796329:web:3d5f07352693e496e3cdb8",
    measurementId: "G-GPTY23T65H"
  };
  //Checking if firebase has been initialized 파이어베이스 초기화 여부 확인
  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }else{
    firebase.app();
  }
  firebase.auth().onAuthStateChanged((user) => {
    if (user != null) {
      setIsLoggedIn(true)
    } else{
      setIsLoggedIn(false);
    }
  });




  const [loaded] = useFonts({  //폰트 설정..
    Audiowide : require('./assets/fonts/AudiowideRegular.ttf'),
    NanumGothic: require('./assets/fonts/NanumGothic.otf'),
    NanumGothicBold: require('./assets/fonts/NanumGothicBold.otf'),
  });
  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer> 
      {isLoggedIn ? <Stack.Navigator>
        <Stack.Screen name="BottomTab" component={BottomTabNavi} options={{headerShown: false}}/>
      </Stack.Navigator> :
      
      <Stack.Navigator>
      <Stack.Screen name="LR" component={LR} options={{headerShown: false}} />
      
      </Stack.Navigator>
      }
      </NavigationContainer>

      
      
  );
}




const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:"white",
  },
  top:{
    flex: 1,
    backgroundColor: "white",
    justifyContent:"flex-end",
    alignItems:"center",
    marginBottom: 30
  },
  mid:{
    flex: 2.5,
    backgroundColor: "white"
  },
  bottom:{
    justifyContent:"space-around",
    flexDirection: 'row',
    marginTop: 20,
  },
  connect:{
    fontSize: 50,
    fontFamily: 'Audiowide',
  },
  NanumRG:{
    fontSize: 25,
    fontFamily: 'NanumGothic',
    marginLeft: 20,
    marginTop: 40
    
  },
  input: {
    backgroundColor:"white",
    height: 40,
    margin: 5,
    marginLeft: 20,
    marginRight: 20,
    borderBottomWidth: 1.5,
  },
  membership:{
    fontSize: 20,
    fontFamily: 'NanumGothic',
    
  }
})