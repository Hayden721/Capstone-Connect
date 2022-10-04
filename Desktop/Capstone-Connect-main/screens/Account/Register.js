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
import { images } from '../../utils/images';
import CheckBox from 'expo-checkbox';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Image } from '../../components';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


const resultMessages = {
  'auth/email-already-in-use': '이미 가입된 이메일입니다.',
  'auth/wrong-password': '잘못된 비밀번호입니다.',
  'auth/user-not-found': '존재하지 않는 계정입니다.',
  'auth/invalid-email': '유효하지 않은 이메일 주소입니다.',
  'auth/weak-password': '비밀번호를 6자리 이상 입력해 주세요.',
};

function Register({ navigation }) {
  const [admin] = useState('0');
  const [agree, setAgree] = useState(false);
  const [addName, setAddName] = useState('');
  const [addNumber, setAddNumber] = useState('');
  const [email, setAddEmail] = useState('');
  const [pwd, setAddPwd] = useState('');
  const [pwd2, setAddPwd2] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [photoURL, setPhotoURL] = useState(images.profile);
  const db = firebase.firestore();
  const docEmail = email;

  function addText() {
    db.collection('users')
      .doc(docEmail)
      .set({
        name: addName,
        number: addNumber,
        email: email,
        admin: admin,
        photoURL: photoURL,
      })
      .then(() => {
        console.log('Create Complete!');
      })
      .catch(error => {
        console.log(error.message);
      });
  }
  const uploadImage = async uri => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
  
    const user = Auth.currentUser;
    const ref = app.storage().ref(`/profile/${user.uid}/photo.png`);
    const snapshot = await ref.put(blob, { contentType: 'image/png' });
  
    blob.close();
    return await snapshot.ref.getDownloadURL();
  };

  
  const SignUp = () => {
    if (addNumber && addName && email && pwd == pwd2 && agree) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, pwd)
        .then(() => {
          addText();
          firebase
            .auth()
            .currentUser.sendEmailVerification()
            .then(() => {
              console.log("이메일 전송 완료");
            })
            .catch((error) => {
              console.log(error.code);
              Alert.alert("실패", "이메일 전송 실패");
            });
          Alert.alert("회원가입 성공", "회원가입을 축하드립니다.");
          firebase.auth().signOut();
        })
        .catch((error) => {
          console.log(error.code);
          const alertMessage = resultMessages[error.code]
            ? resultMessages[error.code]
            : "알 수 없는 이유로 회원가입에 실패하였습니다.";
          console.log(alertMessage);
          Alert.alert("회원가입 실패", alertMessage);
        });
    } else if (!email) {
      Alert.alert("회원가입 실패", "이메일을 입력해주세요.");
    } else if (!addName) {
      Alert.alert("회원가입 실패", "이름을 입력해주세요.");
    } else if (!addNumber){
      Alert.alert("회원가입 실패", "학번을 입력해주세요.");
    } else if (!pwd) {
      Alert.alert("회원가입 실패", "비밀번호를 입력해주세요.");
    } else if (pwd != pwd2) {
      Alert.alert("회원가입 실패", "비밀번호가 다릅니다.");
    } else if (!agree) {
      Alert.alert("회원가입 실패", "필수 약관을 동의해주세요.");
    }
  }

  function touch() {
    console.log(addNumber);
    db.collection('HakbunName')
      .get()
      .then(result => {
        result.forEach(doc => {
          if (addNumber == doc.data().number && addName == doc.data().name) {
            console.log('확인되었습니다');
            throw setModalVisible(true);
          } else if (addNumber == '' || addName == '') {
            Alert.alert('인증 실패', '학번 또는 이름을 입력해주세요.');
            setModalVisible(false);
          } else if (
            addNumber != doc.data().number ||
            addName != doc.data().name
          ) {
            Alert.alert('인증 실패', '학번 또는 이름이 다릅니다.');
            setModalVisible(false);
          }
        });
      });
  }

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.check}>
        <Text style={styles.NanumRG}>학번</Text>
      </View>
      <View style={styles.check}>
        <View style={styles.item1}>
          <TextInput
            placeholder={'ex) 20171111'}
            style={styles.input}
            value={addNumber}
            onChangeText={text => setAddNumber(text)}
          />
        </View>
      </View>

      <Text style={styles.NanumRG}>이름</Text>
      <TextInput
        placeholder={'ex) 홍길동'}
        style={styles.input}
        value={addName}
        onChangeText={text => setAddName(text)}
      />
      <TouchableOpacity
        style={{
          backgroundColor: '#1e272e',
          padding: 15,
          margin: 20,
          marginTop: 50,
          borderRadius: 10,
          alignItems: 'center',
        }}
        onPress={() => touch()}
      >
        <Text
          style={{
            color: 'white',
            fontSize: 24,
            fontFamily: 'NanumGothicBold',
          }}
        >
          인증
        </Text>
      </TouchableOpacity>
      <Modal presentationStyle={'formSheet'} visible={modalVisible}>
      <Image rounded url={photoURL} showButton onChangeImage={url => setPhotoURL(url)}/>
        <Text style={styles.NanumRG}>학교 이메일</Text>
        <View style={styles.check}>
          <View style={styles.item1}>
            <TextInput
              placeholder={'ex) 20001234@shinhan.ac.kr'}
              style={styles.input}
              value={email}
              onChangeText={text => setAddEmail(text)}
            />
          </View>
        </View>
        <Text style={styles.NanumRG}>비밀번호</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          value={pwd}
          onChangeText={text => setAddPwd(text)}
        />
        <Text style={styles.NanumRG}>비밀번호 확인</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          value={pwd2}
          onChangeText={text => setAddPwd2(text)}
        />
        <View style={styles.box}>
          <View style={styles.box1}>
            <CheckBox
              value={agree}
              onValueChange={() => setAgree(!agree)}
              color={agree ? '#4630EB' : undefined}
              margin={20}
              marginRight={-10}
              marginTop={31}
            />
          </View>
          <View style={styles.box2}>
            <Text style={styles.NanumRG}>[필수]동의합니다.</Text>
          </View>
          <View style={styles.box3}>
            <TouchableOpacity>
              <MaterialCommunityIcons name="plus" size={50} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: '#D9D9D9',
            padding: 15,
            margin: 20,
            marginTop: 50,
            borderRadius: 10,
            alignItems: 'center',
          }}
          onPress={() => SignUp()}
        >
          <Text
            style={{
              color: '#000000',
              fontSize: 24,
              fontFamily: 'NanumGothicBold',
            }}
          >
            회원가입
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: '#D9D9D9',
            padding: 15,
            margin: 20,
            marginTop: 20,
            borderRadius: 10,
            alignItems: 'center',
          }}
          onPress={() => setModalVisible(false)}
        >
          <Text
            style={{
              color: '#000000',
              fontSize: 24,
              fontFamily: 'NanumGothicBold',
            }}
          >
            뒤로가기
          </Text>
        </TouchableOpacity>
      </Modal>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 30,
  },
  NanumRG: {
    fontSize: 20,
    fontFamily: 'NanumGothic',
    marginLeft: 20,
    marginTop: 30,
  },
  input: {
    backgroundColor: 'white',
    height: 40,
    margin: 5,
    marginLeft: 20,
    marginRight: 20,
    borderBottomWidth: 1.5,
  },
  check: {
    flexDirection: 'row',
  },
  checkBtn: {
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 50,
  },
  item1: {
    flex: 4,
  },
  item2: {
    flex: 1,
  },
  box: {
    flexDirection: 'row',
  },
  box1: {
    flex: 1,
  },
  box2: {
    flex: 7,
  },
  box3: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Register;
