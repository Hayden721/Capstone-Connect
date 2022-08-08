
import firebase from 'firebase/app';
import "firebase/auth";
import { StyleSheet, Text, View,Alert } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { FontAwesome5 } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';





const Main_root = ({navigation}) => {
  return (
    <View>
    <Text style={styles.Top}>Connect </Text>
    <Text style={styles.Top2}>공지사항 </Text>

    <View style={styles.Container}></View>
    <TouchableOpacity onPress={() => navigation.navigate("학교 공지사항")} style={styles.textContainerss}>
    <MaterialCommunityIcons name="school" size={40} color="#993333" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("시스템 공지사항")} style={styles.textContainerss}>
      <AntDesign name="tool" size={40} color="#FF9900"/>
      </TouchableOpacity>

      <View style={styles.menuContainer} horizontal ={true}>
      <TouchableOpacity style={styles.textContainer}>
      <FontAwesome5 style={styles.textStyle} name="school" size={24} color="green" />
      <Text style={styles.textStyle}>학교</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.textContainer}>
      <Foundation  style={styles.textStyle} name="social-myspace" size={24} color="blue" />
      <Text style={styles.textStyle}>종정</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.textContainer}>
      <FontAwesome5 style={styles.textStyle} name="bus-alt" size={24} color="yellow" />
      <Text style={styles.textStyle}>셔틀</Text>
      </TouchableOpacity>
      </View>

      <Text style={styles.Top2}>게시판</Text>

      <View style={styles.Container}></View>
      <TouchableOpacity onPress={() => navigation.navigate("Board1")} style={styles.textContainerss}>
      <Foundation name="clipboard-pencil" size={40} color="#FF3300" />
      </TouchableOpacity>

      <Text style={styles.Top2}>채팅방</Text>

      <View style={styles.Container}></View>
      <TouchableOpacity onPress={() => navigation.navigate("Chat")} style={styles.textContainerss}>
      <AntDesign name="wechat" size={40} color="#CC33FF" />
      </TouchableOpacity>
  </View>

  )
}

export default Main_root
const styles = StyleSheet.create({
  Container: {
    marginTop: 20,
    justifyContent:"center",
    alignItems:"center",  

  },
  
  Top: {
    fontSize:25,
    fontFamily: 'Audiowide',
    marginLeft: 15,
    
  },

  Top2: {
    fontSize:30,
    marginLeft: 15,
    marginTop:30,
    fontFamily: 'NanumGothicBold',
    
  },
  
  School: {
    marginLeft: 15,
    marginTop: 10,
    fontFamily: 'NanumGothic',    
  },
  
  System: {
    marginLeft: 15,
    fontFamily: 'NanumGothic',

  },
  
  textContainerss: {
    height:50,
    borderColor:'#999999',
    backgroundColor:"#FFFFFF",
    borderWidth:2,
    borderRadius:10,
    margin:10,
  },
  
  menuContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  
  },
  textContainer: {
    width:70,
    height:60,
    borderWidth:1,
    borderRadius:40,
    margin:20,
    padding:15,
    backgroundColor:"#FFFFFF",
    borderColor:"#FFFFFF"
  },
  textStyle: {
    justifyContent:"center",
    textAlign:"center",
    fontSize:15,
  },

  textStyle1: {
    justifyContent:"center",
    alignItems:"center",
    
  }
  
  })



