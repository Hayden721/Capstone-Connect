import {
    View,
    Text,
    Image,
    TouchableOpacity,
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import firebase from "firebase/app";
  import "firebase/auth";
  import "firebase/firestore";
  import { KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
  import { boardDelete} from '../../../utils/firebase';
  
  // 글 조회
  const NotiLookUp = ({ navigation, route }) => {
    const title = route.params.title;
    const content = route.params.content;
    const date = route.params.date;
    const writer = route.params.writer;
    const photoUrl = route.params.photoUrl;
    const userId = route.params.id; //게시글 ID
    const userEmail = firebase.auth().currentUser.email;
    const boardCategory = route.params.boardCategory;
    const [display, setDisplay] = useState(false);
    const myBoard = writer === userEmail; //햄버거 버튼 자신이 쓴 글 확인

    useEffect(() => {
      if (photoUrl != null) {
        setDisplay(true);
      }
    },[]);
  
    let gsp = "";
    if(boardCategory == "NotiSchool"){
      gsp ="학교공지게시판"
    } else if(boardCategory == "NotiSystem"){
      gsp ="시스템공지게시판"
    } 
  
    return (
      <View style={{
        backgroundColor:"#ffffff",
      }}
      >
  
      <KeyboardAwareScrollView
        style={{
          marginHorizontal: 20,
          marginTop: 30,
        }}>
      
   
        <View style={{
              flexDirection: "row",
              marginBottom: 10,
              alignItems: "center",
              justifyContent: "center",
              height: 30,
        }}
        >
  
          <View style={{
                flex: 5,
          }}
          >
            <Text style={{
                  fontFamily: "NanumGothicBold",
                  fontSize: 25,
                  marginLeft:10,
            }}>{title}</Text>
            
          </View>
          {myBoard && (
            <View style={{
              flex: 1,
              marginHorizontal: 5,
              marginTop:5,
            }}>
              <TouchableOpacity
                onPress={() => navigation.navigate("글수정",{  //미구현
                  title: title,
                  wirter: writer,
                  content: content,
                  photoUrl: photoUrl,
                  id: userId,
                  boardCategory: boardCategory,
                })}
                style={{
                  backgroundColor: "#D9D9D9",
                  padding: 5,
                  borderRadius: 10,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "blue",
                    fontSize: 10,
                    fontFamily: "NanumGothicBold",
                  }}
                >
                  수정
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {myBoard && (
            <View style={{
              flex: 1,
              marginHorizontal: 5,
              marginTop:5,
            }}>
              <TouchableOpacity
                onPress={() => {
                  boardDelete({boardCategory,userId})
                  navigation.goBack();
                }}
              >
                <Text
                  style={{
                    color: "red",
                    fontSize: 10,
                    fontFamily: "NanumGothicBold",
                  }}
                >
                  삭제
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View>
          <View style={{
                padding: 10,
                borderBottomWidth: 1,
          }}>
            <Text style={{
                  fontFamily: "NanumGothic",
                  fontSize: 15,
            }}>{writer}</Text>
          </View>
          <View style={{
                padding: 10,
          }}>
            <Text style={{
                  fontFamily: "NanumGothic",
                  fontSize: 15,
            }}>{date}</Text>
          </View>
        </View>
        {display && (
          <View style={{
            marginTop: 30,
            alignItems: "center",
          }}>
            <Image
              source={{ uri: photoUrl }}
              style={{ width: 400, height: 350 }}
              resizeMethod="resize"
              resizeMode="cover"
            />
          </View>
        )}
        <View style={{
              marginTop: 30,
              marginBottom: 30,
              fontFamily: "NanumGothic",
        }}>
          <Text>{content}</Text>
        </View>
      </KeyboardAwareScrollView>
      </View>
    );
  };
  
  export default NotiLookUp;
  