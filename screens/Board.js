import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
  Button,
  Alert,
} from 'react-native';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { addReport } from '../utils/firebase';

const Board = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const [userName, setUserName] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState(null); // 이미지 주소
  const [photoUrl, setPhotoUrl] = useState(null);
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions(); //권한 요청을 위한 hooks

  useEffect(() => {
    setUserName('');
    setContent('');
    setImageUrl(null);
    setPhotoUrl(null);
  }, [visible]);

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
        Alert.alert('업로드 성공', '완료');
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (


    <ScrollView style={{ backgroundColor: 'white', flex: 1 }}>
      <View
        style={{
          marginTop: 50,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
            <View
          style={{
            flex: 6,
            alignItems: 'flex-end',
          }}
        >
          <Text
            style={{
              fontFamily: 'NanumGothicBold',
              fontSize: 20,
            }}
          >
            게시판
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => setVisible(true)}
          style={{
            flex: 3.8,
            alignItems: 'flex-end',
            marginRight: 20,
          }}
        >
          <Ionicons
            name="ios-alert-outline"
            size={24}
            color="black"
            style={{
              marginRight: 10,
            }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          margin: 20,
          justifyContent: 'space-between',
        }}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('BoardStacks', { screen: '자유게시판' })
          }
          style={{
            height: 100,
            width: 100,
            backgroundColor: '#ef5777',
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text>자유</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('BoardStacks', { screen: '공모전게시판' })
          }
          style={{
            height: 100,
            width: 100,
            backgroundColor: '#575fcf',
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text>공모전</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('BoardStacks', { screen: '동아리게시판' })
          }
          style={{
            height: 100,
            width: 100,
            backgroundColor: '#4bcffa',
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text>동아리</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          margin: 20,
          justifyContent: 'space-between',
        }}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('BoardStacks', { screen: '취미게시판' })
          }
          style={{
            height: 100,
            width: 100,
            backgroundColor: '#0be881',
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text>취미</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('BoardStacks', { screen: '' })}
          style={{
            height: 100,
            width: 100,
            backgroundColor: '#808e9b',
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text>미개발</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('BoardStacks', { screen: '' })}
          style={{
            height: 100,
            width: 100,
            backgroundColor: '#808e9b',
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text>미개발</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={visible} transparent={false}>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#EDEAE3',
            }}
          >
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: 20,
                backgroundColor: '#ef5777',
                height: 50,
              }}
            >
              <Text
                style={{
                  fontFamily: 'NanumGothicBold',
                  fontSize: 30,
                  color: 'white',
                }}
              >
                신고하기
              </Text>
            </View>
            <View
              style={{
                marginHorizontal: 20,
              }}
            >
              <Text
                style={{
                  fontFamily: 'NanumGothicBold',
                  fontSize: 20,
                  color: '#636e72',
                }}
              >
                신고 할 대상
              </Text>
              <View
                style={{
                  marginVertical: 10,
                  borderWidth: 0.7,
                }}
              >
                <TextInput
                  placeholder="정보를 입력"
                  value={userName}
                  onChangeText={text => setUserName(text)}
                />
              </View>
            </View>

            <View
              style={{
                marginHorizontal: 20,
              }}
            >
              <Text
                style={{
                  fontFamily: 'NanumGothicBold',
                  fontSize: 20,
                  color: '#636e72',
                }}
              >
                신고사유
              </Text>
              <View
                style={{
                  marginVertical: 10,
                  borderWidth: 0.7,
                  height: 200,
                }}
              >
                <TextInput
                  multiline={true}
                  placeholder="신고사유를 입력하세요."
                  value={content}
                  onChangeText={text => setContent(text)}
                />
              </View>
            </View>
            <TouchableOpacity onPress={pickImage}>
              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: 20,
                  alignItems: 'center',
                }}
              >
                <AntDesign name="picture" size={40} color="green" />
                <Text
                  style={{
                    fontFamily: 'NanumGothicBold',
                    fontSize: 20,
                    color: '#636e72',
                  }}
                >
                  사진
                </Text>
                <View
                  style={{
                    marginLeft: 10,
                  }}
                >
                  <Image
                    source={{ uri: imageUrl }}
                    style={{ width: 40, height: 40 }} // 이미지 크기
                  />
                </View>
              </View>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                flex: 1,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  addReport({ userName, content, photoUrl, setVisible });
                }}
                style={{
                  borderRadius: 20,
                  backgroundColor: '#ef5777',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 50,
                  width: 100,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: 'white',
                  }}
                >
                  신고
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setVisible(false)}
                style={{
                  borderRadius: 20,
                  backgroundColor: '#485460',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 50,
                  width: 100,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: 'white',
                  }}
                >
                  취소
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Board;
