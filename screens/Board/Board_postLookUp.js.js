import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Modal,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform
} from "react-native";
import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { MaterialIcons } from "@expo/vector-icons";
import Icon from "@expo/vector-icons/Ionicons";
import { KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import { FlatList } from "react-native-gesture-handler";
import { boardDelete, getPosts, DB, commentsDelete, addComments} from '../../utils/firebase';

// 글 조회
const Board_postLookUp = ({ navigation, route }) => {
  const title = route.params.title;
  const content = route.params.content;
  const date = route.params.date;
  const writer = route.params.writer;
  const photoUrl = route.params.photoUrl;
  const userId = route.params.id; //게시글 ID
  const userEmail = firebase.auth().currentUser.email;
  const boardCategory = route.params.boardCategory;
  const [display, setDisplay] = useState(false);
  const [Comments, setComments] = useState("");
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  const myBoard = writer === userEmail; //햄버거 버튼 자신이 쓴 글 확인
  const db = firebase.firestore();
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    if (photoUrl != null) {
      setDisplay(true);
    }
    getPosts().then(setPosts);
  },[{addComments},{commentsDelete}]);

  let gsp = "";
  if(boardCategory == "Free"){
    gsp ="자유게시판"
  } else if(boardCategory == "Competition"){
    gsp ="공모전게시판"
  } else if(boardCategory == "Club"){
    gsp ="동아리게시판"
  } else if(boardCategory == "Hobby"){
    gsp ="취미게시판"
  }

  async function getPosts() {  //댓글DB불러오기
    const snapshot = await db
      .collection(boardCategory).doc(userId).collection("Comments")
      .orderBy("timestamp", "desc")
      .get();
    const posts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return posts;
  }
  const renderItem = ({ item }) =>{ 
    return(  
      <View style={{
        height: 75,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
      }}
      >

        <View style={{
              flexDirection:"row"
        }}
        >

          <View style={{
            flex:5
          }}
          >

            <Text>{item.userEmail}</Text>
          </View>
          {item.userEmail == userEmail && (
          <View style={{
            flex: 1,
            marginHorizontal: 5,
            marginTop:5,
          }}
          >

            <TouchableOpacity
              onPress={() => commentsDelete({boardCategory,userId},item.id)}
              style={{
                backgroundColor: "#D9D9D9",
                padding: 5,
                borderRadius: 10,
                alignItems: "center",
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
        <Text>{item.Comments}</Text>
        <Text>{item.date}</Text>
      </View>
  );
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
              onPress={() => navigation.navigate("글수정",{
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
                navigation.reset({
                  routes: [{
                    name: gsp,
                  }]
                });
              }}
              style={{
                backgroundColor: "#D9D9D9",
                padding: 5,
                borderRadius: 10,
                alignItems: "center",
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
      <View>
        <View style={{flex :1.2}}>
          <FlatList
            data={posts}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            initialNumToRender ={10} //최초 랜더링 갯수
            maxToRenderPerBatch= {10} //스크롤시 랜더링 갯수
            scrollEnabled={false}
          />
        </View>

          <View style={{
                flexDirection: "row",
                justifyContent:"space-between",
                alignItems:"center",
                flex:1,
                marginTop:20,
          }}>
            <TextInput
              placeholder ={'댓글을 입력하세요.'}
              value={Comments}
              multiline={true}
              backgroundColor="#ffffff"
              height={50}
              flex={1}
              onChangeText={(text) => setComments(text)}
              
            />
            <Icon name="chevron-forward-outline" size={30}
            onPress = {() => {
              addComments({Comments,boardCategory,userId,timestamp,date,userEmail})
              setComments("")
              }}></Icon>
          </View>
      </View>
     

    </KeyboardAwareScrollView>
    </View>
  );
};

export default Board_postLookUp;

const styles = StyleSheet.create({});














