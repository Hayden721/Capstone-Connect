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
  FlatList,
  Platform
} from "react-native";
import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { MaterialIcons } from "@expo/vector-icons";
import Icon from "@expo/vector-icons/Ionicons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// 글 조회
const Board_postLookUp = ({ navigation, route }) => {
  const title = route.params.title;
  const content = route.params.content;
  const date = route.params.date;
  const writer = route.params.writer;
  const photoUrl = route.params.photoUrl;
  const userId = route.params.id;
  const boardCategory = route.params.boardCategory;
  const [display, setDisplay] = useState(false);
  const [Comments, setComments] = useState("");
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  const myBoard = writer === firebase.auth().currentUser.email; //햄버거 버튼 자신이 쓴 글 확인
  const db = firebase.firestore();
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    if (photoUrl != null) {
      setDisplay(true);
    }
    getPosts().then(setPosts);
  },[{addComments}]);

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
  const renderItem = ({ item }) => (  //랜더링할 UI
      <View style={[styles.box]}>
        <Text>{item.writer}</Text>
        <Text>{item.Comments}</Text>
        <Text>{item.date}</Text>
      </View>
  );

  const boardDelete = () => { //글 삭제
    firebase
      .firestore()
      .collection(boardCategory)
      .doc(userId)
      .delete()
      .then(() => {
        Alert.alert("삭제", "게시글을 삭제 완료했습니다.");
        navigation.reset({
          routes: [{
            name: gsp,
          }]
        });
      
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  const boardEdit = () => {  //글수정
    navigation.navigate("글수정", {
      title: title,
      writer: writer,
      content: content,
      photoUrl: photoUrl,
      id: userId,
      boardCategory: boardCategory,
    });
  };

  function addComments() { //댓글작성
    if (Comments == "") {
      Alert.alert("댓글작성 실패", "댓글을 입력하세요.");
    } else {
      db.collection(boardCategory).doc(userId).collection("Comments").add({
          Comments: Comments,
          timestamp: timestamp,
          date: date,
          writer: writer,
        })
        .then(() => {
          console.log("Create Complete!");
          setComments("");
          Alert.alert("성공", "글을 작성했습니다.");
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }
  return (
    <KeyboardAwareScrollView
      style={styles.container}
      nestedScrollEnabled={false}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.titleContainer}>
        <View style={styles.titlevar}>
          <Text style={styles.title}>{title}</Text>
        </View>
        {myBoard && (
          <View style={styles.editDelete}>
            <TouchableOpacity
              onPress={() => boardEdit()}
              style={styles.customBtn}
            >
              <Text
                style={{
                  color: "#000000",
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
          <View style={styles.editDelete}>
            <TouchableOpacity
              onPress={() => boardDelete()}
              style={styles.customBtn}
            >
              <Text
                style={{
                  color: "#000000",
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
        <View style={styles.writerContainer}>
          <Text style={styles.profile}>{writer}</Text>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.profile}>{date}</Text>
        </View>
      </View>
      {display && (
        <View style={styles.photoUrl}>
          <Image
            source={{ uri: photoUrl }}
            style={{ width: 250, height: 250 }}
            resizeMethod="resize"
            resizeMode="cover"
          />
        </View>
      )}
      <View style={styles.contentContainer}>
        <Text>{content}</Text>
      </View>
      <View style = {styles.flex}>
        <View style={styles.container}>
          <FlatList
            data={posts}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            initialNumToRender ={10} //최초 랜더링 갯수
            maxToRenderPerBatch= {10} //스크롤시 랜더링 갯수
           
          />
        </View>
          <View style={styles.comments}>
            <TextInput
              placeholder ={'댓글을 입력하세요.'}
              value={Comments}
              multiline={true}
              backgroundColor="#d2dae2"
              height={50}
              flex={1}
              onChangeText={(text) => setComments(text)}
            >
            </TextInput>
            <Icon name="chevron-forward-outline" size={50} onPress = {() => addComments()}></Icon>
          </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Board_postLookUp;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 30,
    flex:1
  },
  titleContainer: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 30,
  },
  title: {
    fontFamily: "NanumGothicBold",
    fontSize: 20,
  },
  profile: {
    fontFamily: "NanumGothic",
    fontSize: 15,
  },
  writerContainer: {
    padding: 10,
    borderBottomWidth: 1,
  },
  dateContainer: {
    padding: 10,
  },
  photoUrl: {
    marginTop: 30,
    alignItems: "center",
  },
  contentContainer: {
    marginTop: 30,
    fontFamily: "NanumGothic",
  },
  var: {
    flex: 1,
  },
  titlevar: {
    flex: 5,
  },
  customBtn: {
    backgroundColor: "#D9D9D9",
    padding: 5,
    borderRadius: 10,
    alignItems: "center",
  },
  editDelete: {
    flex: 1,
    marginHorizontal: 5,
  },
  comments:{
    flexDirection: "row",
    justifyContent:"space-between",
    alignItems:"center",
    marginTop:20,
    flex:1
  },
  box: {
    height: 75,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
  },
  flex:{
    flex:1
  }
});
