import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
  Modal,
} from 'react-native';
import styled from 'styled-components/native';


import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.backgroundColor};
`;

const resultMessages = {
  //메시지
  'auth/email-already-in-use': '이미 가입된 이메일입니다.',
  'auth/wrong-password': '잘못된 비밀번호입니다.',
  'auth/user-not-found': '존재하지 않는 계정입니다.',
  'auth/invalid-email': '유효하지 않은 이메일 주소입니다.',
  'auth/weak-password': '비밀번호를 입력해 주세요.',
};

const PwFind = () => {
  firebase
    .auth()
    .sendPasswordResetEmail(emailAddress)
    .then(() => {
      Alert.alert('전송 완료', '이메일을 확인하세요.');
      console.log('비밀번호 전송완료');
    })
    .catch(error => {
      const alertMessage = resultMessages[error.code];
      Alert.alert('비밀번호 찾기 실패', alertMessage);
    });
  return (
    <View>
      <Text
        style={{
          fontSize: 25,
          fontFamily: 'NanumGothic',
          marginLeft: 20,
          marginTop: 40,
        }}
      >
        비밀번호 찾기
      </Text>
      <View
        style={{
          justifyContent: 'center',
          marginTop: '50%',
        }}
      >
        <Text
          style={{
            fontSize: 25,
            fontFamily: 'NanumGothic',
            marginLeft: 20,
            marginTop: 40,
          }}
        >
          이메일
        </Text>
        <TextInput
          placeholder={'이메일을 입력 하세요.'}
          onChangeText={text => setEmailAddress(text)}
        />
        <View
          style={{
            justifyContent: 'space-around',
            flexDirection: 'row',
            marginTop: 20,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: '#808e9b',
              padding: 15,
              margin: 20,
              marginTop: 50,
              borderRadius: 10,
              alignItems: 'center',
            }}
            onPress={() => findPwd()}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 24,
                fontFamily: 'NanumGothicBold',
              }}
            >
              찾기
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#808e9b',
              padding: 15,
              margin: 20,
              marginTop: 50,
              borderRadius: 10,
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 24,
                fontFamily: 'NanumGothicBold',
              }}
            >
              취소
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PwFind;
