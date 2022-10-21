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
import { Linking } from 'react-native';
import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'react-native-gesture-handler';
import 'firebase/auth';
import 'firebase/firestore';


const Profile_setting = () => {
  

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
  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <SafeAreaView>
        <View
          style={{
            marginLeft: 20,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontFamily: 'NanumGothicBold',
              fontSize: 20,
            }}
          >
            {' '}
            이용안내
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
          <Text>앱 버전 - 0.1</Text>
          <Text>개발 Tool - Vscode  </Text>
        </View>

        <View
          style={{
            justifyContent: 'center',
            marginTop: 20,
            marginLeft: 30,
            fontFamily: 'NanumGothicBold',
          }}
        ></View>

        <View
          style={{
            marginLeft: 20,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontFamily: 'NanumGothicBold',
              fontSize: 20,
            }}
          >
            {' '}
            GitHub
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
          <TouchableOpacity
          onPress={() =>
            Linking.openURL('https://github.com/Hayden721/Capstone-Connect')
          }>
          <Text>https://github.com/Hayden721/Capstone-Connect</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginLeft: 20,
            marginTop: 20,
          }}
        >
        </View>

        <View
          style={{
            marginLeft: 20,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontFamily: 'NanumGothicBold',
              fontSize: 20,
            }}
          >
            {' '}
            기타
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => firebase.auth().signOut()}
          style={{
            justifyContent: 'center',
            marginTop: 10,
            marginLeft: 30,
            fontFamily: 'NanumGothicBold',
          }}
        >
          <Text>
          로그아웃
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => userDelete()}
          style={{
            justifyContent: 'center',
            marginTop: 10,
            marginLeft: 30,
            fontFamily: 'NanumGothicBold',
          }}
        >
          <Text>
            회원탈퇴
          </Text>
        </TouchableOpacity>
        
      </SafeAreaView>
    </ScrollView>
  );
};

export default Profile_setting;

