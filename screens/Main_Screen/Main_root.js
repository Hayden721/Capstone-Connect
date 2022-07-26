import React from "react";
import { View, Text, TouchableOpacity,StyleSheet } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import firebase from 'firebase/app';
import "firebase/auth";



function Start()  {
  return (
    <View>
      <Text>Start안녕</Text>
    
      <TouchableOpacity
      style={styles.customBtn}
      onPress={()=> firebase.auth().signOut()}
      >
      <Text style={{ color: '#000000', fontSize: 24, fontFamily:'NanumGothicBold' }}>로그아웃</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Start;

const styles = StyleSheet.create({
  customBtn:{
    backgroundColor: '#D9D9D9',
    padding: 15,
    margin: 20,
    marginTop: 50,
    borderRadius: 10,
    alignItems:"center"
  },

})


