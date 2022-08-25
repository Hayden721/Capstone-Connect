import { View, Text, StyleSheet, Image,Pressable, Modal} from 'react-native'
import React, { useState, useEffect } from 'react'
import firebase from 'firebase/app';
import "firebase/auth";
import { MaterialIcons } from '@expo/vector-icons';

// 글 조회

const Board_postLookUp = ({route}) => {
    const title = route.params.title;
    const content = route.params.content;
    const date = route.params.date;
    const writer = route.params.writer;
    const photoUrl = route.params.photoUrl;
    const [display, setDisplay] = useState(false);
    const myBoard = writer === firebase.auth().currentUser.email; //햄버거 버튼 자신이 쓴 글 확인

    useEffect(() =>{
      if(photoUrl != null){
        setDisplay(true)
      }
    }, []);
  
  return (
    <View style = {styles.container}>
      <View style = {styles.titleContainer}>
        <View style = {styles.titlevar}>
          <Text style = {styles.title}>{title}</Text>
        </View>
        {myBoard && (<Pressable hitSlop={8}>
          <View style = {styles.var}>
          <MaterialIcons name="more-vert" size={30} color="black" />
        </View></Pressable>)}
      </View>
      <View>
        <View style = {styles.writerContainer}>
          <Text style = {styles.profile}>{writer}</Text>
        </View>
        <View style = {styles.dateContainer}>
          <Text style = {styles.profile}>{date}</Text>
        </View>
      </View>
      {display && <View style = {styles.photoUrl}>
        <Image source = {{uri:photoUrl}} 
                style={{width: 300 , height: 300,} }
                resizeMethod="resize"
                resizeMode="cover"
                />  
        </View>}
      <View style = {styles.contentContainer}>
        <Text>{content}</Text>
      </View>
    </View>
  )
}

export default Board_postLookUp;

const styles = StyleSheet.create({
  container : {
    marginHorizontal: 20,
    marginTop: 30,
    
  },
  titleContainer :{
    flexDirection: 'row',
    marginBottom: 10,
    alignItems:"center",
    justifyContent:"center",
    height: 30
  },
  title: {
    fontFamily:"NanumGothicBold",
    fontSize: 20,
  },
  profile:{
    fontFamily:"NanumGothic",
    fontSize: 15
  },
  writerContainer:{
    padding: 10,
    borderBottomWidth: 1
  },
  dateContainer:{
    padding: 10,
  },
  photoUrl:{
    marginTop: 30,
    alignItems:"center",
  },
  contentContainer:{
    marginTop: 30,
    fontFamily:"NanumGothic"
  },
  var:{
    flex:1
  },
  titlevar:{
    flex:15
  }
})