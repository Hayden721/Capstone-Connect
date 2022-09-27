import firebase from 'firebase/app';
import 'firebase/auth';
import { StyleSheet, Text, View, Alert } from 'react-native';
import React, { useEffect,useState } from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

// 아이콘 사용 import
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import { ScrollView } from 'react-native-gesture-handler';

import { Linking } from 'react-native';
// 학교, 종정, 셔틀 링크 사용 import

const Container = styled.View`
  width: 60px
  height: 60px;
  borderWidth: 2px;
  borderRadius: 15px;
  margin:10px;
  padding: 15px;
  backgroundColor: #F4F3EA;
  borderColor: #E6E7E8;
`;

const Top = styled.Text`
  fontSize: 20px;
  marginLeft: 15px;
  marginTop: 10px;
  fontFamily: 'NanumGothicBold';
`;

const TextContainer = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  borderWidth: 2px;
  borderRadius: 40px;
  margin: 20px;
  padding: 15px;
  backgroundColor: #F4F3EA;
  borderColor: #E6E7E8;
`;

const Main = ({ navigation }) => {
  const [freeBoard, setFreeBoard] = useState("");
  const [competitionBoard, setCompetitionBoard] = useState("");
  const [clubBoard, setClubBoard] = useState("");
  const [hobbyBoard, setHobbyBoard] = useState("");
  
  const db = firebase.firestore();
  db.collection("Free").orderBy("timestamp","desc").limit(1).get().then((result)=> {  //자유게시판에서 최신글 가져오기
    result.forEach((doc)=> {
      setFreeBoard(doc.data().title)
    });
  });
  db.collection("Competition").orderBy("timestamp","desc").limit(1).get().then((result)=> {  //공모전게시판에서 최신글 가져오기
    result.forEach((doc)=> {
      setCompetitionBoard(doc.data().title)
    });
  });
  db.collection("Club").orderBy("timestamp","desc").limit(1).get().then((result)=> {  //동아리게시판에서 최신글 가져오기
    result.forEach((doc)=> {
      setClubBoard(doc.data().title)
    });
  });
  db.collection("Hobby").orderBy("timestamp","desc").limit(1).get().then((result)=> {  //취미게시판에서 최신글 가져오기
    result.forEach((doc)=> {
      setHobbyBoard(doc.data().title)
    });
  });



  return (
    <ScrollView 
      style={{ 
        backgroundColor: '#ffffff' 
      }}
    >   
      <View style={styles.separator}/>
      
      <Top>
        공지사항
        <Entypo name="megaphone" size={24} color="red" />
      </Top>
      <TouchableOpacity  onPress={() =>
        navigation.navigate('Notice', { screen: 'NotiSchool' })
      }>
        <Container>
          <Ionicons name="home-outline" size={24} color="#E2495B" />
          <Text
            style={{
              justifyContent: 'center',
              textAlign: 'center',
              fontSize: 8,
            }}
          >
            학교
          </Text>
        </Container>
      </TouchableOpacity>
      <TouchableOpacity onPress={() =>
        navigation.navigate('Notice', { screen: 'NotiSystem' })
      }>
        <Container>
          <Entypo name="laptop" size={24} color="#0C4A60" />
          <Text
            style={{
              justifyContent: 'center',
              textAlign: 'center',
              fontSize: 8,
            }}   
          >
            시스템
          </Text>
        </Container>
      </TouchableOpacity>

      <View style={styles.separator} />

      <Top>
        바로가기
        <AntDesign name="swapright" size={24} color="black" />
      </Top>

      <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
        }} horizontal={true}
      >
        <TextContainer>
        <TouchableOpacity>
          <Ionicons name="home-outline" size={24} color="#E2495B" />
          <Text
            style={{
              justifyContent: 'center',
              textAlign: 'center',
              fontSize: 8,
            }}
            onPress={() =>
              Linking.openURL('https://www.shinhan.ac.kr/sites/kr/index.do')
            }
          >
            학교
          </Text>
        </TouchableOpacity>
        </TextContainer>

        <TextContainer>
        <TouchableOpacity>
          <AntDesign name="earth" size={24} color="#0C4A60" />
          <Text
            style={{
            justifyContent: 'center',
            extAlign: 'center',
            fontSize: 8,
            }}
            onPress={() =>
              Linking.openURL('https://stins.shinhan.ac.kr/irj/portal')
            }
          >
            종정시
          </Text>
        </TouchableOpacity>
        </TextContainer>

        <TextContainer>
        <TouchableOpacity>
          <Ionicons name="bus" size={24} color="#D3AC2B" />
          <Text
            style={{
              justifyContent: 'center',
              textAlign: 'center',
              fontSize: 8,
            }}
            onPress={() =>
              Linking.openURL('https://www.shinhan.ac.kr/kr/125/subview.do')
            }
          >
            셔틀
          </Text>
        </TouchableOpacity>
        </TextContainer>
      </View>
      <View style={{
         justifyContent: 'center',
         textAlign: 'center',
         fontSize: 8,
      }} />

      <Top>
      <Text>카테고리: 게시판</Text>
      </Top>

      <View style={{
        marginTop: 20,
        justifyContent: 'center',
      
      }}>
        <TouchableOpacity onPress = {() => navigation.navigate("BoardStacks", { screen: "자유게시판" })}>
          <View style = {[styles.box, {marginTop: 20}]}>
            <Text style = {styles.boxTitle}>자유 - {freeBoard}</Text>
          </View>
        </TouchableOpacity> 

        <TouchableOpacity onPress = {() => navigation.navigate("BoardStacks", { screen: "공모전게시판" })}>
          <View style = {styles.box}>
            <Text style = {styles.boxTitle}>공모전 - {competitionBoard}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress = {() => navigation.navigate("BoardStacks", { screen: "동아리게시판" })}>
          <View style = {styles.box}>
            <Text style = {styles.boxTitle}>동아리 - {clubBoard}</Text>
          </View>
        </TouchableOpacity>  

        <TouchableOpacity onPress = {() => navigation.navigate("BoardStacks", { screen: "취미게시판" })}>
          <View style = {styles.box}>
            <Text style = {styles.boxTitle}>취미 - {hobbyBoard}</Text>
          </View>
        </TouchableOpacity> 
      </View>
      
      <Top>
      <Text>채팅방</Text>
      </Top>
      
      <View style={{
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Tabs', { screen: 'Chat' })}
        style={{
          height: 50,
          borderColor: '#ffffff',
          backgroundColor: '#E5E5E5',
          borderWidth: 2,
          borderRadius: 10,
          margin: 10,
        }}
      ></TouchableOpacity>
    </ScrollView>
  );
};

export default Main;
const styles = StyleSheet.create({
  boxTitle:{
    fontFamily: "NanumGothic",
    fontSize:15
  },
  box: {
    height: 40,
    marginHorizontal: 15,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    justifyContent:"center"
  },
});