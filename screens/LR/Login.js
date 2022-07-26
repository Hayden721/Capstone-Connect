import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity,Alert } from 'react-native';
//import { useFonts } from 'expo-font';

import firebase from 'firebase/app';
import "firebase/auth";


const resultMessages = {
  "auth/email-already-in-use": "이미 가입된 이메일입니다.",
  "auth/wrong-password": "잘못된 비밀번호입니다.",
  "auth/user-not-found": "존재하지 않는 계정입니다.",
  "auth/invalid-email": "유효하지 않은 이메일 주소입니다.",
  "auth/weak-password": "비밀번호를 입력해 주세요."
}


function LoginScreen({navigation}) {
    const [values, setValues] = useState({
      email:"",
      pwd:""
    })

    function handleChange(text, eventName){
      setValues(prev => {
        return {
          ...prev,
          [eventName] : text
        }
      })
    }

    
    function Login(){

      const {email, pwd} = values

      firebase.auth().signInWithEmailAndPassword(email, pwd)
      .then(() => {
          
      })
      .catch((error) => {
        console.log(error.code)
      // ..
      const alertMessage = resultMessages[error.code] ? 
      resultMessages[error.code] : "알 수 없는 이유로 로그인에 실패하였습니다.";
      Alert.alert("로그인 실패", alertMessage);

      });
    }

    return(
      <View style={styles.container}>
        <StatusBar style="auto"></StatusBar>
        <View style={styles.top}>
          <Text style={styles.connect}>CONNECT</Text>
        </View>
        <View style={styles.mid}>
          <Text style={styles.NanumRG}>이메일</Text>
          <TextInput placeholder={"ex) 20171111@naver.com"} style={styles.input} onChangeText={text => handleChange(text, "email")}/>
          <Text style={styles.NanumRG}>비밀번호</Text>
          <TextInput secureTextEntry ={true} style={styles.input} onChangeText={text => handleChange(text, "pwd")} />
          <TouchableOpacity
            style={styles.customBtn}
            onPress={()=> Login()}
            >
            <Text style={{ color: '#000000', fontSize: 24, fontFamily:'NanumGothicBold' }}>로그인</Text>
        </TouchableOpacity>
          <View style={styles.bottom}>
            <Text style={styles.membership}><Text onPress={()=> navigation.navigate('Register')}>회원가입</Text></Text> 
            <Text style={styles.membership}><Text onPress={()=> alert("비밀번호 찾기")}>비밀번호 찾기</Text></Text>  
          </View>
        </View>
      </View>
    );
  }
  export default LoginScreen;
  const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor:"white",
    },
    top:{
      flex: 1,
      backgroundColor: "white",
      justifyContent:"flex-end",
      alignItems:"center",
      marginBottom: 30
    },
    mid:{
      flex: 2.5,
      backgroundColor: "white"
    },
    bottom:{
      justifyContent:"space-around",
      flexDirection: 'row',
      marginTop: 20,
    },
    connect:{
      fontSize: 50,
      fontFamily: 'Audiowide',
    },
    NanumRG:{
      fontSize: 25,
      fontFamily: 'NanumGothic',
      marginLeft: 20,
      marginTop: 40
      
    },
    input: {
      backgroundColor:"white",
      height: 40,
      margin: 5,
      marginLeft: 20,
      marginRight: 20,
      borderBottomWidth: 1.5,
    },
    membership:{
      fontSize: 20,
      fontFamily: 'NanumGothic',
      
    },
    customBtn:{
      backgroundColor: '#D9D9D9',
      padding: 15,
      margin: 20,
      marginTop: 50,
      borderRadius: 10,
      alignItems:"center"
    }
  })