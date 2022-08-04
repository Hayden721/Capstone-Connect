import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react';
import "firebase/auth";

const Main_profile = () => {
  return (
    <View>
      <View style={styles.Container}></View>
      <Text style={styles.Profile}>프로필</Text>

      <TouchableOpacity
      style={styles.customBtn}
      onPress={()=> firebase.auth().signOut()}
      >
      <Text style={{ color: '#000000', fontSize: 24, fontFamily:'NanumGothicBold' }}>로그아웃</Text>
      </TouchableOpacity>

    </View>
  )
}

export default Main_profile

const styles = StyleSheet.create({
  customBtn:{
    backgroundColor: '#D9D9D9',
    padding: 15,
    margin: 20,
    marginTop: 550,
    borderRadius: 10,
    alignItems:"center"
  },

  Container: {
    marginTop: 20,
    justifyContent:"center",
    alignItems:"center",  

  },

  Profile: {
    justifyContent:"center",
    fontFamily: 'NanumGothicBold',
    alignItems:"center",  
    marginLeft:160,
    marginTop:30,
    fontSize:30,
  }

})
