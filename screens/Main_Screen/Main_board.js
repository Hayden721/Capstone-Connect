import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'



const Main_board = () => {
  return (
    <View>
      <TouchableOpacity>
        <Text></Text>
      </TouchableOpacity>
    </View>
  )
}

export default Main_board

const styles = StyleSheet.create({
  textContainer: {
    width:100,
    height:50,
    borderWidth:1,
    borderRadius:10,
    margin:20,
    padding:15,
    backgroundColor:"#EFD9E0"
  },
  textStyle: {
    justifyContent:"center",
    textAlign:"center",
    fontSize:15,
    color:"white"
  },


})