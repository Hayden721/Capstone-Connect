import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { FontAwesome } from '@expo/vector-icons';

const Profile_top = () => {
  const db = firebase.firestore();
  const cu = firebase.auth().currentUser.email;
  const [userName, setUserName] = useState('');
  const [userNumber, setUserNumber] = useState('');
  db.collection('users')
    .where('email', '==', cu)
    .get()
    .then(result => {
      //users 컬렉션 이메일과 현재 유저의 이메일을 비교하여 이름과 학번을 추출
      result.forEach(doc => {
        setUserName(doc.data().name);
        setUserNumber(doc.data().number);
      });
    });
  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <SafeAreaView>
        <View
          style={{
            marginLeft: 20,
            marginTop: 20,
            flexDirection: 'row',
            fontFamily: 'NanumGothicBold',
          }}
        >
          <FontAwesome name="user-circle-o" size={70} color="black" />
          <View
            style={{
              justifyContent: 'center',
              marginLeft: 10,
              fontFamily: 'NanumGothicBold',
            }}
          >
            <Text> 학번 : {userName} </Text>
            <Text> 이름 : {userNumber} </Text>
          </View>
        </View>

        <View
          style={{
            marginLeft: 20,
            marginTop: 50,
          }}
        >
          <Text
            style={{
              fontFamily: 'NanumGothicBold',
              fontSize: 20,
            }}
          >
          
            계정
          </Text>
        </View>

        <View
          style={{
            justifyContent: 'center',
            marginTop: 10,
            marginLeft: 30,
            fontFamily: 'NanumGothicBold',
          }}
        >
          
        
          <TouchableOpacity>
          <Text>회원탈퇴</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Profile_top;
