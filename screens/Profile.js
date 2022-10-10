import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'react-native-gesture-handler';
import 'firebase/auth';
import 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import { getCurrentUser, updateUserPhoto, Profile_Edit } from '../utils/firebase';
import { Image } from '../components';

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
const Main_profile = () => {
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
          <TouchableOpacity onPress={() => Profile_Edit(photoUrl,userNumber)}>
            <Image
              url={photoUrl}
              //onChangeImage={_handlePhotoChange}
              showButton
              rounded
            />
          </TouchableOpacity>
          <View
            style={{
              justifyContent: 'center',
              flexDirection: 'column',
              fontFamily: 'NanumGothicBold',
            }}
          >
            <Text> 학번 : {userNumber} </Text>
            <Text> 이름 : {userName} </Text>
            <Text> Email: {userEmail} </Text>
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

        <TouchableOpacity
          onPress={() => firebase.auth().signOut()}
          style={{
            marginTop: 120,
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

        <TouchableOpacity
          onPress={() => userDelete()}
          style={{
            marginTop: 20,
            borderRadius: 20,
            backgroundColor: '#ef5777',
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
            회원탈퇴
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Main_profile;
