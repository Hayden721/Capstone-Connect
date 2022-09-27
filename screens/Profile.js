import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import React, {useState} from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const Main_profile = () => {
  const db = firebase.firestore();
  const cu = firebase.auth().currentUser.email;
  const [userName, setUserName] = useState("");
  const [userNumber, setUserNumber] = useState("");
  db.collection("users").where('email', '==' , cu).get().then((result)=> { //users 컬렉션 이메일과 현재 유저의 이메일을 비교하여 이름과 학번을 추출
    result.forEach((doc)=> {
      setUserName(doc.data().name)
      setUserNumber(doc.data().number) 
    });
  });
  return (
    <SafeAreaView>
      <ScrollView style={{backgroundColor: "white"}}>
        <View>
          {/* 이름과 학번은 DB에서 호출 */}
          <Text style={{ fontSize: 20, margin: 10 }}>{userName}</Text> 
          <Text style={{ fontSize: 20, margin: 10 }}>{userNumber}</Text>
        </View>
        <View style={{
              marginVertical: 9,
              marginHorizontal: 10,
              borderBottomColor: '#737373',
              borderBottomWidth: StyleSheet.hairlineWidth,
        }} />

        <View style={{
          marginLeft:20,
        }}>

          <Text style={{
            fontSize:25
            }}>계정
            </Text>

          <TouchableOpacity>
            <Text style={{ 
              fontSize: 20
            }}>프로필 설정
            </Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={{
              fontSize: 20
            }}>계정 설정
            </Text>
          </TouchableOpacity>
          
          {/* <View style={{
                marginVertical: 10,
                marginHorizontal: 0,
                borderBottomColor: '#737373',
                borderBottomWidth: StyleSheet.hairlineWidth,
          }} 
          /> */}
          <TouchableOpacity>

            <Text style={{
              fontSize: 20
            }}>
            </Text>
          </TouchableOpacity>
          
        </View>

        {/* 로그아웃 */}
        <TouchableOpacity
          style={{
            backgroundColor: "#D9D9D9",
            padding: 15,
            margin: 20,
            marginTop: 550,
            borderRadius: 10,
            alignItems: "center",
          }}
          onPress={() => firebase.auth().signOut()}
        >
          <Text
            style={{
              color: "#000000",
              fontSize: 24,
              fontFamily: "NanumGothicBold",
            }}
          >
            로그아웃
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Main_profile;

const styles = StyleSheet.create({});
