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
  marginLeft:30px;
  marginTop:20px;

`;

const Top = styled.Text`
  fontSize: 20px;
  marginLeft: 25px;
  marginTop: 10px;
  fontFamily: 'NanumGothicBold';
`;

const Top2 = styled.Text`
  marginTop: 0px;
`;

const TextContainer = styled.View`
  width: 60px;
  height: 60px;
  borderWidth: 2px;
  borderRadius: 40px;
  margin: 30px;
  padding: 15px;
  backgroundColor: #F4F3EA;
  borderColor: #E6E7E8;
`;

const boxTitle = styled.View`
fontFamily: 'NanumGothicBold',
fontSize:15px;
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

      <Top2></Top2>

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
        <TouchableOpacity onPress={() =>
              Linking.openURL('https://www.shinhan.ac.kr/sites/kr/index.do')
            }>
        <TextContainer>
        
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
       
        </TextContainer>
        </TouchableOpacity>

        <TextContainer>
        <TouchableOpacity onPress={() =>
              Linking.openURL('https://stins.shinhan.ac.kr/irj/portal')
            }>
          <AntDesign name="earth" size={24} color="#0C4A60" />
          <Text
            style={{
            justifyContent: 'center',
            extAlign: 'center',
            fontSize: 8,
            }}
            
          >
            종정시
          </Text>
        </TouchableOpacity>
        </TextContainer>

        <TextContainer>
        <TouchableOpacity onPress={() =>
              Linking.openURL('https://www.shinhan.ac.kr/kr/125/subview.do')
            }>
          <Ionicons name="bus" size={24} color="#D3AC2B" />
          <Text
            style={{
              justifyContent: 'center',
              textAlign: 'center',
              fontSize: 8,
            }}
            
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
      <Text>실시간 최신글</Text>
      </Top>

      <View
        style={{
          height: 160,
          borderColor: '#E6E7E8',
          backgroundColor: '#ffffff',
          borderWidth: 1,
          borderRadius: 10,
          margin: 10,
        }}
      >
        <TouchableOpacity onPress = {() => navigation.navigate("BoardStacks", { screen: "자유게시판" })}>
          <View style = {[{
                height: 35,
                marginHorizontal: 25,
          }, {marginTop: 20}]}>
            <Text style = {{
                  fontFamily: "NanumGothicBold",
                  fontSize:15
            }}>자유 게시판 -  
            <Text style={{
                  fontFamily: "NanumGothic",
                  fontSize:15,
                  marginLeft:15,
            }}>{freeBoard}</Text>
            </Text>
          </View>
        </TouchableOpacity> 

        <TouchableOpacity onPress = {() => navigation.navigate("BoardStacks", { screen: "공모전게시판" })}>
        <View style = {{
              height: 35,
              marginHorizontal: 25,
        }}>
            <Text style = {{
                  fontFamily: "NanumGothicBold",
                  fontSize:15
            }}>공모전 게시판 -  
            <Text style={{
                  fontFamily: "NanumGothic",
                  fontSize:15,
                  marginLeft:15,
            }}>{competitionBoard}</Text>
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress = {() => navigation.navigate("BoardStacks", { screen: "동아리게시판" })}>
        <View style = {{
              height: 35,
              marginHorizontal: 25,
        }}>
            <Text style = {{
                  fontFamily: "NanumGothicBold",
                  fontSize:15
            }}>동아리 게시판 -  
            <Text style={{
                  fontFamily: "NanumGothic",
                  fontSize:15,
                  marginLeft:15,
            }}>{clubBoard}</Text>
            </Text>
          </View>
        </TouchableOpacity>  

        <TouchableOpacity onPress = {() => navigation.navigate("BoardStacks", { screen: "취미게시판" })}>
        <View style = {{
              height: 35,
              marginHorizontal: 25,
        }}>
            <Text style = {{
                  fontFamily: "NanumGothicBold",
                  fontSize:15
            }}>자유 게시판 -  
            <Text style={{
                  fontFamily: "NanumGothic",
                  fontSize:15,
                  marginLeft:15,
            }}>{hobbyBoard}</Text>
            </Text>
          </View>
        </TouchableOpacity> 

      </View>   
      <Top>
      <Text>채팅방</Text>
      </Top>
      <View
        style={{
          height: 160,
          borderColor: '#E6E7E8',
          backgroundColor: '#ffffff',
          borderWidth: 1,
          borderRadius: 10,
          margin: 10,
        }}
      >
      </View>
    </ScrollView>
  );
};

export default Main;
const styles = StyleSheet.create({})