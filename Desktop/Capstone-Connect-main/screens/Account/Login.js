import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  Modal,
} from 'react-native';
import styled from 'styled-components/native';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Image, Input, Button } from '../../components';
import { images } from '../../utils/images';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { validateEmail, removeWhitespace } from '../../utils/common';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 20px;
`;
const ErrorText = styled.Text`
  align-items: flex-start;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: ${({ theme }) => theme.errorText};
`;
const resultMessages = {
  //메시지
  'auth/email-already-in-use': '이미 가입된 이메일입니다.',
  'auth/wrong-password': '잘못된 비밀번호입니다.',
  'auth/user-not-found': '존재하지 않는 계정입니다.',
  'auth/invalid-email': '유효하지 않은 이메일 주소입니다.',
  'auth/weak-password': '비밀번호를 입력해 주세요.',
};

function LoginScreen({ navigation }) {
  console.disableYellowBox = false;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef();
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [modalVisible, setModalVisible] = useState(false); //비밀번호 찾기 모달

  useEffect(() => {
    setDisabled(!(email && password && !errorMessage));
  }, [email, password, errorMessage]);

  const _handleEmailChange = email => {
    const changedEmail = removeWhitespace(email);
    setEmail(changedEmail);
    setErrorMessage(
      validateEmail(changedEmail) ? '' : 'Please verify your email.'
    );
  };
  const _handlePasswordChange = password => {
    setPassword(removeWhitespace(password));
  };

  //로그인
  const _handleLoginButtonPress = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        if (value.user.emailVerified == false) {
          firebase.auth().signOut(); //이메일 인증 안하면 로그아웃
          Alert('로그인 실패', '이메일 인증 하세요.'); // 이게 안나오고 밑에 알수없는 이유로가 나옴;;
        }
      })
      .catch(error => {
        console.log(error.code);
        // ..
        const alertMessage = resultMessages[error.code]
          ? resultMessages[error.code]
          : '이메일 인증을 해주세요.';
        Alert.alert('로그인 실패', alertMessage);
      });
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flex: 1 }}
      extraScrollHeight={20}
    >
      <Container>
        <Image url={images.logo} />
        <Input
          label="Email"
          value={email}
          onChangeText={_handleEmailChange}
          onSubmitEditing={() => passwordRef.current.focus()}
          placeholder="Email"
          returnKetType="next"
        />
        <Input
          ref={passwordRef}
          label="Password"
          value={password}
          onChangeText={_handlePasswordChange}
          onSubmitEditing={_handleLoginButtonPress}
          placeholder="Password"
          returnKetType="done"
          isPassword
        />
        <ErrorText>{errorMessage}</ErrorText>
        <Button
          title="Login"
          onPress={_handleLoginButtonPress}
          disabled={disabled}
        />
        <Button
          title="Signup"
          onPress={() => navigation.navigate('Register')}
          isFilled={false}
        />
        <Text onPress={() => setModalVisible(!modalVisible)}>
          비밀번호 찾기
        </Text>
        <Modal visible={modalVisible}>
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
                onPress={() => setModalVisible(!modalVisible)}
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
        </Modal>
      </Container>
    </KeyboardAwareScrollView>
  );
}
export default LoginScreen;

