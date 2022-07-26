import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Modal,
  
} 

from 'react-native';
import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'react-native-gesture-handler';
import 'firebase/auth';
import 'firebase/firestore';
import styled from 'styled-components/native';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { getCurrentUser, updateUserPhoto, Profile_Edit } from '../utils/firebase';
import { Image } from '../components';

const ContainerBox = styled.View`
  width: auto;
  height: auto;
  border-radius: 15px;
  border-style: 'solid';
  margin: 30px;
  border-style: solid;
  background-color: whitesmoke;
  
`

const HorizentalLine = styled.View`
  margin-left: 5px;
  margin-right: 5px;
  background-color: black;
  height: 1px;
  align-self: stretch;
`;


const userDelete = () => {
  Alert.alert(
    '회원탈퇴 확인',
    '회원탈퇴를 하시겠습니까?',
    [
      { text: '아니요', onPress: () => {}, style: 'cancel' },
      {
        text: '예',
        onPress: () => {
          firebase.auth().currentUser.delete();
        },
        style: 'destructive',
      },
    ],
    {
      cancelable: true,
      onDismiss: () => {},
    }
  );
};
const Main_profile = ({navigation}) => {
  const db = firebase.firestore();
  const cu = firebase.auth().currentUser.email;
  const [userName, setUserName] = useState('');
  const [userNumber, setUserNumber] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions(); //권한 요청을 위한 hooks
  const [profile, setProfile] = useState(null);
  const [visible, setVisible] = useState(false);
  const user = getCurrentUser();
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);


  const _handlePhotoChange = async url => {
    try {
      const updateUser = await updateUserPhoto(url);
      setPhotoUrl(updateUser.photoUrl);
    } catch (e) {
      Alert.alert('포토 오류남', e.message);
    }
  };
  
  db.collection('users')
    .where('email', '==', cu)
    .get()
    .then(result => {
      //users 컬렉션 이메일과 현재 유저의 이메일을 비교하여 이름과 학번을 추출
      result.forEach(doc => {
        setPhotoUrl(doc.data().photoURL);
        setUserName(doc.data().displayName);
        setUserNumber(doc.data().stuId);
        setUserEmail(doc.data().email);
      });
    });

    function touch(){
      console.log(firebase.auth().currentUser.photoURL);
    }

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <SafeAreaView>
        <View
          style={{
            marginTop: 20,
            flexDirection: 'column',
            fontFamily: 'NanumGothicBold',

          }}
        >
            <Image
              url={photoUrl}
              onChangeImage={_handlePhotoChange}
              showButton
              rounded
            />
    

            <Text style={{marginLeft:20, fontSize:17, fontFamily: 'NanumGothicBold', margin:10}}> 학번 : {userNumber} </Text>
            <Text style={{marginLeft:20, fontSize:17, fontFamily: 'NanumGothicBold', margin:10}}> 이름 : {userName} </Text>
            <Text style={{marginLeft:20, fontSize:17, fontFamily: 'NanumGothicBold', margin:10}}> Email: {userEmail} </Text>
        
        </View>
        <HorizentalLine/>
        
        <ContainerBox>
          <Text style={{fontFamily: 'NanumGothicBold', fontSize:20}}>기타</Text>
          <TouchableOpacity
          onPress={() => firebase.auth().signOut()}
          style={{
            justifyContent: 'center',
            marginTop: 10,
            marginLeft: 20,
            fontFamily: 'NanumGothicLight',

          }}
        >
          <Text style={{fontSize: 16, fontFamily:'NanumGothicBold', color:'#404040'}}>
          로그아웃
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => userDelete()}
          style={{
            justifyContent: 'center',
            marginTop: 10,
            marginLeft: 20,
            fontFamily: 'NanumGothicBold',
          }}
        >
          <Text style={{fontSize: 16, fontFamily:'NanumGothicBold', color:'#404040'}}>
            회원탈퇴
          </Text>
        </TouchableOpacity>
        </ContainerBox>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Main_profile;