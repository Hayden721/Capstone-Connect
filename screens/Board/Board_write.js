import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const Board_write = ({ navigation }) => {
  const db = firebase.firestore();
  const [imageUrl, setImageUrl] = useState(null); // 이미지 주소
  const [downUrl, setdownUrl] = useState(null);
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions(); //권한 요청을 위한 hooks

  const [boardTitle, setTitle] = useState("");
  const [boardContent, setContent] = useState("");

  const currentUser = firebase.auth().currentUser; //현재 사용자
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  const nowTime = () => {
    let time = new Date();
    let year = time.getFullYear();
    let month = time.getMonth() + 1;
    let day = time.getDate();

    return year + "-" + month + "-" + day;
  };
  const date = nowTime();

  //보드 db에 저장
  function addText() {
    db.collection("Free")
      .add({
        title: boardTitle,
        content: boardContent,
        timestamp: timestamp,
        date: date,
        writer: currentUser.email,
        photoUrl: downUrl,
      })
      .then(() => {
        console.log("Create Complete!");
        navigation.navigate("Board");
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  function touch() {
    db.collection("Free")
      .get()
      .then((result) => {
        result.forEach((doc) => {
          console.log(doc.data());
        });
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
    const filename = imageData.uri.split("/").pop();
    // const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const reference = firebase
      .storage()
      .ref()
      .child("images/" + filename);
    await reference
      .put(blob)
      .then(() => {
        console.log("성공");
      })
      .catch((error) => {
        console.log(error);
      });

    //이미지 다운로드 url
    await reference
      .getDownloadURL()
      .then((url) => {
        console.log(url);
        setdownUrl(url);
      })
      .catch((error) => {
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
      style={styles.Container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableOpacity style={styles.icon}>
        <AntDesign name="checksquareo" size={30} color="black" />
        <Text style={styles.Category}> 카테고리 </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.icon} onPress={pickImage}>
        <AntDesign name="picture" size={30} color="black" />
        <Text style={styles.Category}> 사진 </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.icon} onPress={() => touch()}>
        <MaterialIcons name="upload-file" size={30} color="black" />
        <Text style={styles.Category}> 첨부파일 </Text>
      </TouchableOpacity>

      <View style={styles.Container2}>
        <View style={styles.Container3}>
          <Image
            source={{ uri: imageUrl }}
            style={{ width: 200, height: 200 }} // 이미지 크기
          />
        </View>
        <TextInput
          placeholder={"제목"}
          style={styles.input}
          value={boardTitle}
          onChangeText={(text) => setTitle(text)}
        />
        <TextInput
          placeholder={"내용을 입력해주세요."}
          style={styles.input2}
          value={boardContent}
          onChangeText={(text) => setContent(text)}
        />
        <TouchableOpacity onPress={() => addText()} style={styles.customBtn}>
          <Text
            style={{
              color: "#000000",
              fontSize: 24,
              fontFamily: "NanumGothicBold",
            }}
          >
            작성
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Board_write;

const styles = StyleSheet.create({
  Container: {
    flexDirection: "column",
  },

  Container2: {
    flexDirection: "column",
  },
  Container3: {
    alignItems: "center",
  },

  icon: {
    marginTop: 20,
    marginLeft: 20,
    flexDirection: "row",
  },

  Category: {
    marginLeft: 5,
    marginTop: 3,
  },

  Picture: {
    marginLeft: 5,
    marginTop: 3,
    flexDirection: "row",
  },

  Picture2: {
    marginLeft: 10,
  },

  customBtn: {
    backgroundColor: "#D9D9D9",
    padding: 15,
    margin: 80,
    marginTop: 350,
    borderRadius: 10,
    alignItems: "center",
  },

  input: {
    backgroundColor: "#ffffff",
    height: 40,
    margin: 5,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    borderBottomWidth: 1.5,
  },

  input2: {
    backgroundColor: "#ffffff",
    height: 40,
    margin: 5,
    marginLeft: 20,
    marginRight: 20,
  },

  icon2: {
    marginTop: 20,
    marginLeft: 10,
  },
});
