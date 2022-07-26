import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react';
import "firebase/auth";

const Main_profile = () => {
  return (
    <ScrollView>
      <Text>Profile</Text>
      <TouchableOpacity
      style={styles.customBtn}
      onPress={()=> firebase.auth().signOut()}
      >
      <Text style={{ color: '#000000', fontSize: 24, fontFamily:'NanumGothicBold' }}>로그아웃</Text>
      </TouchableOpacity>

    </ScrollView>
  )
}

export default Main_profile

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
