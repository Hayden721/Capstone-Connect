import React from "react";
import { View, Text, TouchableOpacity,StyleSheet  } from "react-native";
import firebase from 'firebase/app';
import "firebase/auth";
import NotiSchool from "./Main/Notice/NotiSchool";



const Board = ({navigation}) => {
  return (
    <View>
    <View style={styles.Container}>
    <Text style={styles.Top}>게시판</Text>
      <View style={styles.menuContainer} horizontal ={true}>
      <View style={styles.textContainer}>
      <TouchableOpacity onPress={() => navigation.navigate("전체 게시판")} style={styles.textStyle}>
      <Text style={styles.textStyle}> 전체 </Text>
      </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.textContainer}>
      <Text style={styles.textStyle}> <Text onPress={()=> alert('자유게시판으로 이동 ')}></Text>자유</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.textContainer}>
      <Text style={styles.textStyle}> <Text onPress={()=> alert('공모전 게시판으로 이동 ')}></Text>공모전</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.textContainer}>
      <Text style={styles.textStyle}> <Text onPress={()=> alert('동아리 게시판으로 이동 ')}></Text>동아리</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.textContainer}>
      <Text style={styles.textStyle}> <Text onPress={()=> alert('취업 게시판으로 이동 ')}></Text>취업</Text>
      </TouchableOpacity>

      </View>
      </View>
  </View>
);
}

export default Board

const styles = StyleSheet.create({

  Container: {
    backgroundColor:"000000",
    marginTop: 30,
  },

  Top: {   
    fontSize:30,
    marginLeft:32,   
    fontFamily: 'NanumGothicBold',
  },

  menuContainer: {
    marginTop:10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  textContainer: {
    width:70,
    height:35,

    borderRadius:10,
    margin:5,
    padding:10,
    backgroundColor:"000000"
  },

  textStyle: {
    justifyContent:"center",
    textAlign:"center",
    fontSize:10,
    color:"black",
    fontFamily: 'NanumGothicBold',
  },

  customBtn:{
    backgroundColor: '#D9D9D9',
    padding: 15,
    margin: 20,
    marginTop: 500,
    borderRadius: 10,
    alignItems:"center"
  },

})