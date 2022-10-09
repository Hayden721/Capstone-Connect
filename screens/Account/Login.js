import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  Modal,
  LogBox,
} from 'react-native';
import styled from 'styled-components/native';
import 'firebase/auth';
import { login } from '../../utils/firebase';
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

function LoginScreen({ navigation }) {
  LogBox.ignoreLogs(['Warning: ...']);
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
  const _handleLoginButtonPress = async () => {
    try {
      const user = await login({ email, password });
    } catch (e) {
      Alert.alert('Login Error', e.message);
    }
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
        <Button
          title="비밀번호 찾기"
          onPress={() => setModalVisible(true)}
          isFilled={false}
        />
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
              justifyContent: "center",
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
              onChangeText={text => setEmail(text)}
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
                onPress={() => PwFind()}
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
