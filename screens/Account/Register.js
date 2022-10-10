import React, { useState, useRef, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Platform,
  Alert,
  Modal,
  Image
} from 'react-native';
import { images } from '../../utils/images';
import CheckBox from 'expo-checkbox';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Input, Button } from '../../components';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { validateEmail } from '../../utils/common';
import { signup} from '../../utils/firebase';

const db = firebase.firestore();

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

function Register({ navigation }) {
  const [admin] = useState('0'); 
  const [agree, setAgree] = useState(false);
  const [name, setName] = useState('');
  const [stuId, setStuId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [photoUrl, setPhotoUrl] = useState(images.profile);
  const [imageUrl, setImageUrl] = useState(null); // 이미지 주소
  const [errorMessage1, setErrorMessage1] = useState('');
  const [errorMessage2, setErrorMessage2] = useState('');
  const [disabled1, setDisabled1] = useState(true);
  const [disabled2, setDisabled2] = useState(true);
  const uid = stuId;
  const [modalVisible, setModalVisible] = useState(false);
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions(); //권한 요청을 위한 hooks
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordCheckRef = useRef();
  //학번 인증
  useEffect(()=> {
    let _errorMessage1 = '';
    if(!stuId) {
      _errorMessage1 = '학번을 입력해주세요.';
    } else if(!name) {
      _errorMessage1 = '이름을 입력해주세요';
    } else {
      _errorMessage1 = '';
    }
    setErrorMessage1(_errorMessage1);
  }, [stuId, name]);
  //모달창 인증
  useEffect(() => {
    let _errorMessage2 = '';
    if (!validateEmail(email)) {
      _errorMessage2 = '이메일 형식을 확인해 주세요.';
    } else if (password.length < 6) {
      _errorMessage2 = '비밀번호를 6자리 이상 설정해주세요';
    } else if (password !== passwordCheck) {
      _errorMessage2 = '비밀번호가 일치하지 않습니다.';
    } else if (!agree) {
      _errorMessage2 = '필수 동의를 확인해주세요.';
    } else {
      _errorMessage2 = '';
    }
    setErrorMessage2(_errorMessage2);
  }, [email, password, passwordCheck, agree]);
  //학번인증버튼활성화
  useEffect(() => {
    setDisabled1(!(stuId && name && !errorMessage1));
  }, [stuId, name, errorMessage1]);
  //모달인증버튼 활성화
  useEffect(()=>{
    setDisabled2(!(email && password && passwordCheck && agree && !errorMessage2));
  }, [email, password, passwordCheck, agree, errorMessage2]);






//const storageUrl = photoUrl.startsWith('http') ? photoUrl : uploadImage(photoUrl);
function saveUserInfo (){
   db.collection('users')
    .doc(stuId)
    .set({
      admin: admin,
      displayName: name,
      stuId: stuId,
      email: email,
      photoUrl: photoUrl
  })
  .then(() => {
    console.log('Create Complete!');
  })
  .catch(error => {
    console.log(error.message);
  });
}


const pickImage = async () => {
    // 권한 확인 코드: 권한이 없으면 물어보고, 승인하지 않으면 종료
    if (!status?.granted) {
      const permission = await requestPermission();
      if (!permission.granted) {
        return null;
      }
    }
    // 이미지 업로드 기능
    const imageData = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
      aspect: [1, 1],
    });
    if (imageData.cancelled) {
      return null; //이미지 업로드 취소
    }

    console.log(imageData);
    setImageUrl(imageData.uri);

    //파이어베이스 스토리지 업로드
    let uri = imageData.uri;
    const filename = imageData.uri.split('/').pop();
    // const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    const reference = firebase
      .storage()
      .ref()
      .child('images/' + filename);
    await reference
      .put(blob)
      .then(() => {
        console.log('성공');
      })
      .catch(error => {
        console.log(error);
      });

    //이미지 다운로드 url
    await reference
      .getDownloadURL()
      .then(url => {
        console.log(url);
        setPhotoUrl(url);
        Alert.alert("업로드 성공", "완료");
      })
      .catch(error => {
        console.log(error);
      });
  };



  const _handleRegisterButtonPress = async () =>{
    try {
      const user = await signup({email, password});
      saveUserInfo();
      console.log(user);
    } catch(e) {
      Alert.alert('Signup Error', e.message)
    }
  }

  function stuidCheck() {
    db.collection('HakbunName')
      .get()
      .then(result => {
        result.forEach(doc => {
          if (stuId == doc.data().number && name == doc.data().name) {
            console.log('확인되었습니다');
            throw setModalVisible(true);
          } else if (
            stuId != doc.data().number || name != doc.data().name
          ) {
            setModalVisible(false);
          }
        });
      });


  }

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: 'white', paddingTop: 30 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Container>
        <Input
          label="학번"
          value={stuId}
          onChangeText={text => setStuId(text)}
          onSubmitEditing={() => nameRef.current.focus()}
          placeholder="학번을 입력하세요"
          returnKetType="next"
        />
        <Input
          label="이름"
          value={name}
          onChangeText={text => setName(text)}
          onSubmitEditing={() => stuidCheck()}
          placeholder="이름을 입력하세요"
          returnKetType="done"
        />
        <ErrorText>{errorMessage1}</ErrorText>
        <Button title="인증" onPress={() => stuidCheck()} disabled={disabled1} />

        <Modal presentationStyle={'formSheet'} visible={modalVisible}>
        <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: 'white', paddingTop: 30 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >  
          <View>
            <TouchableOpacity>
              <Ionicons
                name="chevron-back-sharp"
                size={50}
                color="black"
                onPress={() => setModalVisible(false)}
              />
            </TouchableOpacity>
          </View>
          <Container>
          <TouchableOpacity onPress ={pickImage}>
            <View 
              style={{ 
                width:120,
                height:120,
            }}>
              <Image 
                source={{ uri: imageUrl }}
                style={{
                  borderRadius: 100,
                  height:120,
                  width:120
                }}/>
              </View>
            </TouchableOpacity>
            <Input
              ref={emailRef}
              label="학교 이메일"
              value={email}
              onChangeText={text => setEmail(text)}
              onSubmitEditing={() => passwordRef.current.focus()}
              placeholder="ex) 20001234@shinhan.ac.kr"
              returnKetType="next"
            />
            <Input
              label="비밀번호"
              value={password}
              onChangeText={text => setPassword(text)}
              onSubmitEditing={() => passwordCheckRef.current.focus()}
              placeholder="비밀번호를 입력하세요"
              returnKetType="next"
              isPassword
            />
            <Input
              label="비밀번호 확인"
              value={passwordCheck}
              onChangeText={text => setPasswordCheck(text)}
              placeholder="비밀번호를 입력하세요"
              returnKetType="done"
              isPassword
            />

            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <CheckBox
                  value={agree}
                  onValueChange={() => setAgree(!agree)}
                  color={agree ? '#1e272e' : undefined}
                  margin={20}
                  marginRight={-10}
                  marginTop={31}
                />
              </View>
              <View style={{ flex: 7 }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: 'NanumGothic',
                    marginLeft: 20,
                    marginTop: 30,
                  }}
                >
                  [필수]동의합니다.
                </Text>
              </View>
              <View
                style={{
                  flex: 3,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <TouchableOpacity>
                  <Ionicons name="add" size={40} color="black" />
                </TouchableOpacity>
                
              </View>
              
            </View>
            <ErrorText>{errorMessage2}</ErrorText>

            <Button title="회원가입" onPress={() => _handleRegisterButtonPress()} disabled={disabled2} />
          </Container>
          </KeyboardAwareScrollView>
        </Modal>
      </Container>
    </KeyboardAwareScrollView>
  );
}



export default Register;
