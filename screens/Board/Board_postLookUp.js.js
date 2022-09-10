import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Modal,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { MaterialIcons } from "@expo/vector-icons";
import {
  useActionSheet,
  ActionSheetProvider,
} from "@expo/react-native-action-sheet";
import { ReloadInstructions } from "react-native/Libraries/NewAppScreen";

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
  const myBoard = writer === firebase.auth().currentUser.email; //햄버거 버튼 자신이 쓴 글 확인
  

  useEffect(() => {
    if (photoUrl != null) {
      setDisplay(true);
    }
  }, []);

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

  const boardDelete = () => {
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

  const boardEdit = () => {
    navigation.navigate("글수정", {
      title: title,
      writer: writer,
      content: content,
      photoUrl: photoUrl,
      id: userId,
      boardCategory: boardCategory,
    });
  };
  return (
    <View style={styles.container}>
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
            style={{ width: 300, height: 300 }}
            resizeMethod="resize"
            resizeMode="cover"
          />
        </View>
      )}
      <View style={styles.contentContainer}>
        <Text>{content}</Text>
      </View>
    </View>
  );
};

export default Board_postLookUp;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 30,
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
});
