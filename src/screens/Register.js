import React from 'react';
import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';

function Register() {
    return(
      <View style={styles.container}>
        <Text style={styles.NanumRG}>학번</Text>
        <TextInput placeholder={"ex) 20171111"} style={styles.input}/>
        <Text style={styles.NanumRG}>이름</Text>
        <TextInput placeholder={"ex) 홍길동"} style={styles.input}/>
        <Text style={styles.NanumRG}>비밀번호</Text>
        <TextInput secureTextEntry ={true} style={styles.input}/>
        <Text style={styles.NanumRG}>비밀번호 확인</Text>
        <TextInput secureTextEntry ={true} style={styles.input}/>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor:"white",
      paddingTop:30
    },
    NanumRG:{
        fontSize: 20,
        fontFamily: 'NanumGothic',
        marginLeft: 20,
        marginTop: 30
        
      },
      input: {
        backgroundColor:"white",
        height: 40,
        margin: 5,
        marginLeft: 20,
        marginRight: 20,
        borderBottomWidth: 1.5,
      }
})

  export default Register;