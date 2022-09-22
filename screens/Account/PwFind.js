import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
  Modal,
} from 'react-native';

import CheckBox from 'expo-checkbox';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const resultMessages = {
  //메시지
  'auth/email-already-in-use': '이미 가입된 이메일입니다.',
  'auth/wrong-password': '잘못된 비밀번호입니다.',
  'auth/user-not-found': '존재하지 않는 계정입니다.',
  'auth/invalid-email': '유효하지 않은 이메일 주소입니다.',
  'auth/weak-password': '비밀번호를 입력해 주세요.',
};

const PwFind = () => {
  const [emailAddress, setEmailAddress] = useState(''); //비밀번호 찾기 이메일 전송
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
      <Text style={styles.NanumRG}>비밀번호 찾기</Text>
      <View style={styles.pwdFind}>
        <Text style={styles.NanumRG}>이메일</Text>
        <TextInput
          placeholder={'이메일을 입력 하세요.'}
          onChangeText={text => setEmailAddress(text)}
        />
        <View style={styles.bottom}>
          <TouchableOpacity style={styles.pwdFindBtn} onPress={() => findPwd()}>
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
          <TouchableOpacity style={styles.pwdFindBtn}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  top: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 30,
  },
  mid: {
    flex: 2.5,
    backgroundColor: 'white',
  },
  bottom: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: 20,
  },
  connect: {
    fontSize: 50,
    fontFamily: 'Audiowide',
  },
  NanumRG: {
    fontSize: 25,
    fontFamily: 'NanumGothic',
    marginLeft: 20,
    marginTop: 40,
  },
  input: {
    backgroundColor: 'white',
    height: 40,
    margin: 5,
    marginLeft: 20,
    marginRight: 20,
    borderBottomWidth: 1.5,
  },
  membership: {
    fontSize: 20,
    fontFamily: 'NanumGothic',
  },
  customBtn: {
    backgroundColor: '#1e272e',
    padding: 15,
    margin: 20,
    marginTop: 50,
    borderRadius: 10,
    alignItems: 'center',
  },
  pwdFind: {
    //alignItems:"center",
    justifyContent: 'center',
    marginTop: '50%',
  },
  pwdFindBtn: {
    backgroundColor: '#808e9b',
    padding: 15,
    margin: 20,
    marginTop: 50,
    borderRadius: 10,
    alignItems: 'center',
  },
});
