import {
  View,
  ScrollView,
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
import { Picker } from "@react-native-picker/picker"; //선택박스 만들기


const Board_write = ({ navigation }) => {
  const db = firebase.firestore();
  const [category, setCategory] = useState(""); //카테고리
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
  let gsp = "";
  if(category == "Free"){
    gsp ="자유게시판"
  } else if(category == "Competition"){
    gsp ="공모전게시판"
  } else if(category == "Club"){
    gsp ="동아리게시판"
  } else if(category == "Hobby"){
    gsp ="취미게시판"
  }
  //보드 db에 저장
  function addText() {
    if (category == "") {
      Alert.alert("글작성 실패", "카테고리를 선택하세요.");
    } else if (boardTitle == "") {
      Alert.alert("글작성 실패", "제목을 입력하세요.");
    } else if (boardContent == "") {
      Alert.alert("글작성 실패", "내용을 입력하세요.");
    } else {
      db.collection(category)
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
          Alert.alert("성공", "글을 작성했습니다.");
          navigation.reset({
            routes: [{
              name: gsp,
            }]
          });

        })
        .catch((error) => {
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
    <ScrollView
      style={styles.Container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.background}>
      <View style={styles.separator} />
      <View style={styles.Category}>
        <Picker
          selectedValue={category}
          onValueChange={(value, index) => setCategory(value)}
          mode="dropdown" // Android only
          style={styles.picker}
        >    
          <Picker.Item label="카테고리 선택" value="" />
          <Picker.Item label="자유 " value="Free" />
          <Picker.Item label="공모전 " value="Competition" />
          <Picker.Item label="동아리" value="Club" />
          <Picker.Item label="취미" value="Hobby" />
        </Picker>
      </View>
      <View style={styles.separator} />
      <TextInput
          placeholder={"제목"}
          style={styles.input}
          value={boardTitle}
          onChangeText={(text) => setTitle(text)}
        />
      
      <View style={styles.separator} />
      <TouchableOpacity style={styles.icon} onPress={pickImage}>
        <AntDesign name="picture" size={30} color="green" />
        <Text style={styles.Category}> 사진 </Text>
      </TouchableOpacity>
      <View style={styles.separator} />
        <View style={styles.Container3}>
          <Image
            source={{ uri: imageUrl }}
            style={{ width: 400, height: 400 }} // 이미지 크기
          />
        </View>
        <TextInput
          placeholder={"내용을 입력해주세요."}
          style={styles.input2}
          value={boardContent}
          multiline={true}
          onChangeText={(text) => setContent(text)}
        />
         

        <View style={{
        marginBottom:20,
      }}>
        <TouchableOpacity
          onPress={() => {
            addText();
          }}

          style={{
            borderRadius: 20,
            backgroundColor: "#485460",
            alignItems: "center",
            justifyContent: "center", 
            height: 50,
            marginHorizontal: 70,
            marginTop:330,
          }}
        >
          <Text style={{ 
            fontSize: 20,
            fontWeight:"bold",
            color: "white",
            }}>등록</Text>
        </TouchableOpacity>
      </View>     
        </View>
    </ScrollView>
    
  );
};

export default Board_write;

const styles = StyleSheet.create({
  Container: {
    flexDirection: "column",
  },

  Container3: {
    alignItems: "center",
  },

  icon: {
    marginTop: 5,
    marginLeft: 20,
    flexDirection: "row",
  },

  Category: {
    marginTop:3,
    marginHorizontal: 10,
  },

  Picture: {
    marginLeft: 5,
    marginTop: 5,
    flexDirection: "row",
  },

  Picture2: {
    marginLeft: 10,
  },

  customBtn: {
    backgroundColor: "#D9D9D9",
    padding: 15,
    margin: 80,
    borderRadius: 10,
    alignItems: "center",
  },

  input: {
    backgroundColor: "#ffffff",
    height: 40,
    marginLeft: 20,
  },

  input2: {
    backgroundColor: "#ffffff",
    marginLeft: 20,
    marginRight:10,
    height: 40,
  },

  icon2: {
    marginTop: 20,
    marginLeft: 10,
    
  },

  picker: {
    width: 170,
  },

  separator: {
    marginVertical: 5,
    borderBottomColor: '#CBD0D8',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  background: {
    backgroundColor: "#ffffff"
  },

  
});
