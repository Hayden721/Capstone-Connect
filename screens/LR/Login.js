import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity,Alert, Modal} from 'react-native';
//import { useFonts } from 'expo-font';

import firebase from 'firebase/app';
import "firebase/auth";
//import { getAuth, sendPasswordResetEmail } from "firebase/auth";


const resultMessages = {
  "auth/email-already-in-use": "이미 가입된 이메일입니다.",
  "auth/wrong-password": "잘못된 비밀번호입니다.",
  "auth/user-not-found": "존재하지 않는 계정입니다.",
  "auth/invalid-email": "유효하지 않은 이메일 주소입니다.",
  "auth/weak-password": "비밀번호를 입력해 주세요."
}


function Loginscreen({navigation}) {
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

    //로그인
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


    //비밀번호 찾기 모달
    const [modalVisible, setModalVisible] = useState(false);
  
    //비밀번호 찾기 이메일 전송
   
    const [emailAddress, setEmailAddress ]= useState('');
    function findPwd() {
      
      firebase.auth().sendPasswordResetEmail(emailAddress)
      .then(()=> {
        setModalVisible(!modalVisible)
        Alert.alert("전송 완료", "이메일을 확인하세요.")
        console.log('비밀번호 전송완료');
      })
      .catch((error) => {
        const alertMessage = resultMessages[error.code]
        Alert.alert("비밀번호 찾기 실패", alertMessage);
      })
    }

    
    return(
      
      <View style={styles.container}>
        <StatusBar style="auto"></StatusBar>
        <View style={styles.top}>
          <Text style={styles.connect}>CONNECT</Text>
        </View>
        <View style={styles.mid}>
          <Modal  visible = {modalVisible}>
            <Text style={styles.NanumRG}>비밀번호 찾기</Text>
            <View style={styles.pwdFind}>
            <Text style={styles.NanumRG}>이메일</Text>
              <TextInput placeholder={"이메일을 입력 하세요."} style={styles.input} onChangeText={text =>setEmailAddress(text)}/>
              <View style={styles.bottom}>
                <TouchableOpacity style={styles.pwdFindBtn} onPress={() => findPwd()}>
                <Text style={{ color: '#000000', fontSize: 24, fontFamily:'NanumGothicBold' }}>찾기</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.pwdFindBtn} onPress={() => setModalVisible(!modalVisible)}>
                <Text style={{ color: '#000000', fontSize: 24, fontFamily:'NanumGothicBold' }}>취소</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
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
            
            <Text style={styles.membership}><Text onPress={() => setModalVisible(!modalVisible)}>비밀번호 찾기</Text></Text>  
            
          </View>
        </View>
      </View>
      
    );
  }
  export default Loginscreen;
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
    },
    pwdFind:{
      //alignItems:"center",
      justifyContent:"center",
      marginTop:"50%" 
    }
    ,pwdFindBtn:{
      backgroundColor: '#D9D9D9',
      padding: 15,
      margin: 20,
      marginTop: 50,
      borderRadius: 10,
      alignItems:"center",
      
    }
  })