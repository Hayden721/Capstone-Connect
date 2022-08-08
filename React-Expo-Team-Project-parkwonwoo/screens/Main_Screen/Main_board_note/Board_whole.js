import { View, Text,TouchableOpacity,StyleSheet } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import firebase from 'firebase/app';

const Board_whole = ({navigation}) => {
  const db = firebase.firestore();
  
  return (

    <View>
      <View style={styles.container}>
        <View style={styles.title}>
        <Text style={styles.font}>글 제목</Text>
        </View>
        <View style={styles.writer}>
        <Text style={styles.font}>작성자</Text>
        </View>
        <View style={styles.date}>
        <Text style={styles.font}>작성일</Text>
        </View>
      </View>

    <View>
      <TouchableOpacity onPress={() => navigation.navigate("글작성")} style={styles.icon}>
      <AntDesign name="pluscircle" size={50} color="black" />
      </TouchableOpacity>
    </View>
    </View>
    
  )
}

export default Board_whole

const styles = StyleSheet.create({

  icon: {
    marginLeft: 335,
    marginTop: 590,
  },
  container: {
    flexDirection: 'row',
    marginTop: 30,
    margin: 20,
    
  },
  title:{
    flex:5,
    alignItems:"center",
  },
  writer:{
    flex:2,
    alignItems:"center",
  },
  date:{
    flex:2,
    alignItems:"center",
  },
  font:{
    fontFamily:"NanumGothicBold",
    fontSize:20
  }
  
})
