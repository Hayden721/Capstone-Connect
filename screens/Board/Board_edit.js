import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  StyleSheet,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const Board_edit = ({ navigation, route }) => {
  const db = firebase.firestore();
  const [imageUrl, setImageUrl] = useState(route.params.photoUrl); // 이미지 주소
  const [downUrl, setdownUrl] = useState(route.params.photoUrl);
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions(); //권한 요청을 위한 hooks
  const [boardTitle, setTitle] = useState(route.params.title);
  const [boardContent, setContent] = useState(route.params.content);
  const writer = route.params.writer;
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  const userId = route.params.id;
  const boardCategory = route.params.boardCategory;

  let gsp = '';
  if (boardCategory == 'Free') {
    gsp = '자유게시판';
  } else if (boardCategory == 'Competition') {
    gsp = '공모전게시판';
  } else if (boardCategory == 'Club') {
    gsp = '동아리게시판';
  } else if (boardCategory == 'Hobby') {
    gsp = '취미게시판';
  }

  const nowTime = () => {
    let time = new Date();
    let year = time.getFullYear();
    let month = time.getMonth() + 1;
    let day = time.getDate();

    return year + '-' + month + '-' + day;
  };
  const date = nowTime();

  //보드 db에 저장
  function Update() {
    if (boardTitle == '') {
      Alert.alert('글작성 실패', '제목을 입력하세요.');
    } else if (boardContent == '') {
      Alert.alert('글작성 실패', '내용을 입력하세요.');
    } else {
      firebase
        .firestore()
        .collection(boardCategory)
        .doc(userId)
        .update({
          title: boardTitle,
          content: boardContent,
          timestamp: timestamp,
          date: date,
          photoUrl: downUrl,
        })
        .then(() => {
          console.log('게시글 수정 완료.');
          Alert.alert('수정 완료', '게시글 수정을 완료했습니다.');
          navigation.reset({
            routes: [
              {
                name: gsp,
              },
            ],
          });
        })
        .catch(error => {
          console.log(error.message);
        });
    }
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
        setdownUrl(url);
      })
      .catch(error => {
        console.log(error);
      });
  };

  //작성 확인 작업
  /*
  const checkWrite = () => {
    Alert.alert(
      '작성',
      '작성하시겠습니까?',
      [
        {text: '취소', onPress: () => {}, style: 'cancel'},
        {
          text: '확인',
          onPress: () => {
          writeText
          },
        },
      ],
      {
        cancelable: true,
        onDismiss: () => {},
      },
    );
  };
  */
  return (
    <KeyboardAwareScrollView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View
        style={{
          backgroundColor: '#ffffff',
        }}
      >
        <TextInput
          placeholder={'제목'}
          style={{
            padding: 10,
            height: 50,
            marginLeft: 5,
            borderBottomColor: '#CBD0D8',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
          value={boardTitle}
          onChangeText={text => setTitle(text)}
        />

        <TouchableOpacity
          style={{
            marginTop: 5,
            padding: 5,
            marginLeft: 5,
            flexDirection: 'row',
          }}
          onPress={pickImage}
        >
          <AntDesign name="picture" size={30} color="green" />
          <Text
            style={{
              marginTop: 3,
              marginHorizontal: 5,
            }}
          >
            {' '}
            사진{' '}
          </Text>
        </TouchableOpacity>

        <View
          style={{
            borderBottomColor: '#CBD0D8',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <View
          style={{
            marginLeft: 10,
          }}
        >
          <TextInput
            placeholder={'내용을 입력해주세요.'}
            style={{
              backgroundColor: '#ffffff',
              right: 5,
              marginLeft: 5,
              height: 50,
            }}
            value={boardContent}
            multiline={true}
            onChangeText={text => setContent(text)}
          />
          <Image
            source={{ uri: imageUrl }}
            style={{ width: 400, height: 400 }} // 이미지 크기
          />
        </View>

        <View
          style={{
            flex: 1,
            marginBottom: 10,
            justifyContent: 'center',
            backgroundColor: '#ffffff',
          }}
        >
          <TouchableOpacity
            onPress={() => {
              Update();
            }}
            style={{
              marginTop: 50,
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
              수정
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Board_edit;
