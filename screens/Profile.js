import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
  Modal,
  TextInput
} from 'react-native';
import React, { useState,useEffect } from 'react';
import firebase from 'firebase/app';
import 'react-native-gesture-handler';
import 'firebase/auth';
import 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import { Profile_Edit} from '../utils/firebase';


const Main_profile = () => {
  const db = firebase.firestore();
  const cu = firebase.auth().currentUser.email;
  const [userName, setUserName] = useState('');
  const [userNumber, setUserNumber] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions(); //권한 요청을 위한 hooks
  const [profile, setProfile] = useState(null);
  const [visible, setVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  
  db.collection('users')
    .where('email', '==', cu)
    .get()
    .then(result => {
      //users 컬렉션 이메일과 현재 유저의 이메일을 비교하여 이름과 학번을 추출
      result.forEach(doc => {
        setProfile(doc.data().photoUrl);
        setUserName(doc.data().name);
        setUserNumber(doc.data().number);
        setUserEmail(doc.data().email);
      })
      });

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
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (imageData.cancelled) {
        return null; //이미지 업로드 취소
      }
      console.log(imageData);
      //setImageUrl(imageData.uri);
  
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
      reference
        .getDownloadURL()
        .then(url => {
          console.log(url);
          setImageUrl(url);
        })
        .catch(error => {
          console.log(error);
        });
     
    };

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <SafeAreaView>
      <View
          style={{
            marginLeft: 20,
            marginTop: 20,
            flexDirection: 'row',
            fontFamily: 'NanumGothicBold',
          }}
        >
          <TouchableOpacity onPress ={()=> setVisible(true)}>
          <View 
            style={{ 
              width:120,
              height:120,
             }}>
                <Image 
                  source={{ uri: profile }}
                  style={{
                    borderRadius: 100,
                    height:120,
                    width:120
                  }}
          />
          </View>
          </TouchableOpacity>
          <View
            style={{
              justifyContent: 'center',
              marginLeft: 10,
              fontFamily: 'NanumGothicBold',
            }}
          > 
            <Text> 학번 : {userName} </Text>
            <Text> 이름 : {userNumber} </Text>
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

        <Modal visible={visible} transparent={false}>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#EDEAE3',
            }}>
            <View
              style={{
                alignItems:"center",
                justifyContent:"center",
                marginVertical:20,
                backgroundColor:"#ef5777",
                height:50
              }}>
                <Text
                  style={{
                    fontFamily:"NanumGothicBold",
                    fontSize:30,
                    color:"white"
                  }}>프로필 수정</Text>
            </View> 
            
            <View
              style={{
                marginHorizontal:20,
              }}/>
            <TouchableOpacity onPress={pickImage}>
              <View 
                style={{
                  marginHorizontal:20,
                  alignItems:"center",
                }}>
                <AntDesign name="picture" size={40} color="green" />
                <Text 
                  style={{
                    fontFamily:"NanumGothicBold",
                    fontSize:20,
                    color:"#636e72"
                }}>사진</Text>
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
                  }} />
          </View>
              </View>
            </TouchableOpacity> 
            <View 
              style={{
                flexDirection:"row",
                alignItems:"center",
                justifyContent:"space-evenly",
                flex:1
            }}>
              <TouchableOpacity
                onPress={() => {
                  Profile_Edit({imageUrl,setVisible})
                }}
                style={{
                  borderRadius: 20,
                  backgroundColor: '#ef5777',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 50,
                  width:100
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

              <TouchableOpacity
                onPress={() => 
                  setVisible(false)
                }
                style={{
                  borderRadius: 20,
                  backgroundColor: '#485460',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 50,
                  width:100
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
      </SafeAreaView>
    </ScrollView>
  );
};

export default Main_profile;
