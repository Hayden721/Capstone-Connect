import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
  Modal,
} from "react-native";

import CheckBox from "expo-checkbox";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const resultMessages = {
  "auth/email-already-in-use": "이미 가입된 이메일입니다.",
  "auth/wrong-password": "잘못된 비밀번호입니다.",
  "auth/user-not-found": "존재하지 않는 계정입니다.",
  "auth/invalid-email": "유효하지 않은 이메일 주소입니다.",
  "auth/weak-password": "비밀번호를 6자리 이상 입력해 주세요.",
};

function Register({navigation}) {
  const [agree, setAgree] = useState(false);
  const [addName, setAddName] = useState("");
  const [addNumber, setAddNumber] = useState("");
  const [email, setAddEmail] = useState("");
  const [pwd, setAddPwd] = useState("");
  const [pwd2, setAddPwd2] = useState("");

  const db = firebase.firestore();
  const docEmail = email;
  function addText() {
    db.collection("users")
      .doc(docEmail)
      .set({
        name: addName,
        number: addNumber,
        email: email,
      })
      .then(() => {
        console.log("Create Complete!");
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  function SignUp() {
    if (pwd == pwd2 && agree) {
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
    console.log();
  }
  /*
function touch() {
  db.collection("users").get().then((result) => {
    result.forEach((doc) => {
      //console.log(doc.data().number)
      if(addNumber == false){
        setCertification(false)
      } else if(doc.data().number != addNumber){
        setCertification(true)
      } else {
        setCertification(false)
      }
    });
    console.log(certification+ "1")
    console.log(certification+ "2")
});

}

/*
const handleChange = () => {
  db.collection("users").get().then((result) => {
    result.forEach((doc) => {
      //console.log(doc.data().number)
      if(addNumber == false || addNumber ===""){
        setCheckError("학번을 입력하세요.")
        setCertification(false)
      }
      else if(doc.data().number == addNumber){
        setCheckError("중복 학번 입니다.")
        setCertification(false)
        return true;
      } else if(doc.data().number != addNumber && addNumber.length == 7) {
        setCheckError("사용 가능한 학번 입니다.")
        setCertification(true)
      } else{
        setCheckError("불가능한 학번 입니다.")
      }
    });
});
}
function touch (){      무시해도 됨  나중에 학번 중복
  db.collection("users").doc("363636")
  .onSnapshot((doc) => {
      console.log("Current data: ", doc.data());
  });

  const nn =  db.collection("users").where("number", "==", addNumber).get();
  console.log(nn);
  nn.then((result) => {
    result.forEach((doc) => {
    if(nn){
      alert("학번 중복 입니다.");    
      setCertification(false);
      console.log("중복");
    }else{
      alert("중복 아님");
      console.log("중복아님");
    }
    });
  
});
<Text style={{ color: 'red', fontSize: 15, fontFamily:'NanumGothic', marginTop: 33, marginLeft: 20 }}>{checkError}</Text> 학번옆에 쓸 글
}*/

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.check}>
        <Text style={styles.NanumRG}>학번</Text>
      </View>
      <View style={styles.check}>
        <View style={styles.item1}>
          <TextInput
            placeholder={"ex) 20171111"}
            style={styles.input}
            value={addNumber}
            onChangeText={(text) => setAddNumber(text)}
          />
        </View>
        <View style={styles.item2}>
          <TouchableOpacity style={styles.checkBtn}>
            <Text
              style={{
                color: "#000000",
                fontSize: 20,
                fontFamily: "NanumGothicBold",
              }}
            >
              인증
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.NanumRG}>이름</Text>
      <TextInput
        placeholder={"ex) 홍길동"}
        style={styles.input}
        value={addName}
        onChangeText={(text) => setAddName(text)}
      />
      <Text style={styles.NanumRG}>비밀번호</Text>
      <TextInput
        secureTextEntry={true}
        style={styles.input}
        value={pwd}
        onChangeText={(text) => setAddPwd(text)}
      />
      <Text style={styles.NanumRG}>비밀번호 확인</Text>
      <TextInput
        secureTextEntry={true}
        style={styles.input}
        value={pwd2}
        onChangeText={(text) => setAddPwd2(text)}
      />
      <Text style={styles.NanumRG}>학교 이메일</Text>
      <View style={styles.check}>
        <View style={styles.item1}>
          <TextInput
            placeholder={"ex) 20001234@shinhan.ac.kr"}
            style={styles.input}
            value={email}
            onChangeText={(text) => setAddEmail(text)}
          />
        </View>
        <View style={styles.item2}>
          <TouchableOpacity style={styles.checkBtn} onPress={() => touch()}>
            <Text
              style={{
                color: "#000000",
                fontSize: 20,
                fontFamily: "NanumGothicBold",
              }}
            >
              인증
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.box}>
        <View style={styles.box1}>
          <CheckBox
            value={agree}
            onValueChange={() => setAgree(!agree)}
            color={agree ? "#4630EB" : undefined}
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
          backgroundColor: "#D9D9D9",
          padding: 15,
          margin: 20,
          marginTop: 50,
          borderRadius: 10,
          alignItems: "center",
        }}
        onPress={() => SignUp()}
      >
        <Text
          style={{
            color: "#000000",
            fontSize: 24,
            fontFamily: "NanumGothicBold",
          }}
        >
          회원가입
        </Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 30,
  },
  NanumRG: {
    fontSize: 20,
    fontFamily: "NanumGothic",
    marginLeft: 20,
    marginTop: 30,
  },
  input: {
    backgroundColor: "white",
    height: 40,
    margin: 5,
    marginLeft: 20,
    marginRight: 20,
    borderBottomWidth: 1.5,
  },
  check: {
    flexDirection: "row",
  },
  checkBtn: {
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
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
    flexDirection: "row",
  },
  box1: {
    flex: 1,
  },
  box2: {
    flex: 7,
  },
  box3: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Register;
