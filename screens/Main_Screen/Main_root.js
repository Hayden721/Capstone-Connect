
import firebase from 'firebase/app';
import "firebase/auth";
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'



const Main_root = ({navigation}) => {
  return (
    <View>
    <Text style={styles.Top}>공지사항</Text>

    <View style={styles.Container}></View>
    <TouchableOpacity onPress={() => navigation.navigate("학교 공지사항")} style={styles.textContainerss}>
      <Text style={styles.School}> 학교 </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("시스템 공지사항")} style={styles.textContainerss}>
      <Text style={styles.System}> 시스템 </Text>
      </TouchableOpacity>

      <View style={styles.menuContainer} horizontal ={true}>
      <TouchableOpacity style={styles.textContainer}>
      <Text style={styles.textStyle}>학교 홈</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.textContainer}>
      <Text style={styles.textStyle}>종정시</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.textContainer}>
      <Text style={styles.textStyle}>셔틀버스</Text>
      </TouchableOpacity>
      </View>

      <Text style={styles.Top}>게시판</Text>

      <View style={styles.Container}></View>
      <TouchableOpacity onPress={() => navigation.navigate("Board")} style={styles.textContainerss}>
      <Text style={styles.School}> 게시판 </Text>
      </TouchableOpacity>

      <View style={styles.Container}></View>
      <TouchableOpacity onPress={() => navigation.navigate("Chat")} style={styles.textContainerss}>
      <Text style={styles.School}> 채팅방 </Text>
      </TouchableOpacity>
  </View>

  )
}

export default Main_root
const styles = StyleSheet.create({
  Container: {
    marginTop: 20,
    justifyContent:"flex-end",
    alignItems:"center",
    
  },
  
  Top: {
    fontSize:30,
    marginLeft: 15,
  },
  
  School: {
    fontSize:15,
    marginLeft: 15,
  },
  
  System: {
    fontSize:15,
    marginLeft: 15,
  },
  
  textContainerss: {
    height:80,
    borderColor:'#000',
    borderWidth:1,
    borderRadius:10,
    margin:10,
  },
  
  menuContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  
  },
  textContainer: {
    width:100,
    height:50,
    borderWidth:1,
    borderRadius:10,
    margin:20,
    padding:15,
    backgroundColor:"black"
  },
  textStyle: {
    justifyContent:"center",
    textAlign:"center",
    fontSize:15,
    color:"white"
  },
  
  })



