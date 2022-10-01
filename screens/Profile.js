import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'react-native-gesture-handler';
import 'firebase/auth';
import 'firebase/firestore';
import { FontAwesome } from '@expo/vector-icons';

const Main_profile = () => {
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
            marginTop: 40,
          }}
        >        
            <Text
              style={{
                margintop: 30,
                fontFamily: 'NanumGothicBold',
                fontSize: 20,
              }}
            >
              작성한 게시글
            </Text>     
        </View>

        <View
          style={{
            height: 160,
            borderColor: '#E6E7E8',
            backgroundColor: '#ffffff',
            borderWidth: 1,
            borderRadius: 10,
            margin: 10,
          }}
        ></View>

        <View
          style={{
            marginLeft: 20,
            marginTop: 40,
          }}
        >
            <Text
              style={{
                margintop: 30,
                fontFamily: 'NanumGothicBold',
                fontSize: 20,
              }}
            >
              작성한 댓글
            </Text>
        </View>

        <View
          style={{
            height: 160,
            borderColor: '#E6E7E8',
            backgroundColor: '#ffffff',
            borderWidth: 1,
            borderRadius: 10,
            margin: 10,
          }}
        ></View>

        <TouchableOpacity
          onPress={() => firebase.auth().signOut()}
          style={{
            marginTop: 40,
            borderRadius: 20,
            backgroundColor: '#485460',
            alignItems: 'center',
            justifyContent: 'center',
            height: 50,
            marginHorizontal: 60,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            로그아웃
          </Text>
        </TouchableOpacity>
        
      </SafeAreaView>
    </ScrollView>
  );
};

export default Main_profile;
