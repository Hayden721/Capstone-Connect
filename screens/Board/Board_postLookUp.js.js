import { View, Text, StyleSheet, Image,  Modal} from 'react-native'
import React, { useState, useEffect } from 'react'

// 글 조회

const Board_postLookUp = ({route}) => {
    const title = route.params.title;
    const content = route.params.content;
    const date = route.params.date;
    const writer = route.params.writer;
    const photoUrl = route.params.photoUrl;
    const [display, setDisplay] = useState(false);
    useEffect(() =>{
      
      if(photoUrl != null){
        setDisplay(true)
      }
    }, []);
  
  return (
    <View style = {styles.container}>
      <View style = {styles.titleContainer}>
        <Text style = {styles.title}>{title}</Text>
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
    marginBottom: 10,
  },
  title: {
    fontFamily:"NanumGothicBold",
    fontSize: 30,
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
  }
})