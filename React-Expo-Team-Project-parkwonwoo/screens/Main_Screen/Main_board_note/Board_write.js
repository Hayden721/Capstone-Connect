import { View, Text, TouchableOpacity,StyleSheet, TextInput} from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


const Board_write = ({navigation}) => {
  return (
    <View style={styles.Container}>
      <TouchableOpacity style={styles.icon}>
      <AntDesign name="checksquareo" size={30} color="black" />
      <Text style={styles.Category}> 카테고리 </Text>
      </TouchableOpacity>  

      <TouchableOpacity style={styles.icon}>
      <AntDesign name="picture" size={30} color="black" />
      <Text style={styles.Category}> 사진 </Text>
      </TouchableOpacity>  
      
      <TouchableOpacity style={styles.icon}>
      <MaterialIcons name="upload-file" size={30} color="black"/>
      <Text style={styles.Category}> 첨부파일 </Text>
      </TouchableOpacity>   

      <View style={styles.Container2}>
      <TextInput placeholder={"제목"} style={styles.input}/>

      <TextInput placeholder={"내용을 입력해주세요."} style={styles.input2}/>
  

      <TouchableOpacity onPress={() => navigation.navigate("전체 게시판")}
      style={styles.customBtn}>
      <Text style={{ color: '#000000', fontSize: 24, fontFamily:'NanumGothicBold' }}>작성</Text>
      </TouchableOpacity>
      </View>
    </View>
    
  )
}

export default Board_write


const styles = StyleSheet.create({

  Container: {
    flexDirection: 'column',
  },

  Container2: {
    flexDirection: 'column',
  },

  icon: {
    marginTop: 20,
    marginLeft: 20,
    flexDirection: 'row',
  },

  Category: {
    marginLeft: 5,
    marginTop:3,
    
  },
  
  Picture:{
    marginLeft: 5,
    marginTop:3,
    flexDirection: 'row',
  },

  Picture2:{
    marginLeft:10,
  },

  customBtn:{
    backgroundColor: '#D9D9D9',
    padding: 15,
    margin: 80,
    marginTop: 350,
    borderRadius: 10,
    alignItems:"center"
  },

  input: {
    backgroundColor:"000000",
    height: 40,
    margin: 5,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    borderBottomWidth: 1.5,
  },

  input2: {
    backgroundColor:"000000",
    height: 40,
    margin: 5,
    marginLeft: 20,
    marginRight: 20,
  },

  icon2:{
    marginTop: 20,
    marginLeft: 10,

  }


})