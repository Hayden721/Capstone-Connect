import firebase from 'firebase/app';
import 'firebase/auth';
import { StyleSheet, Text, View, Alert } from 'react-native';
import React, { useEffect } from 'react';
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
  fontsize: 20px;
  marginleft: 15px;
  margintop: 10px;
  fontfamily: 'NanumGothicBold';
`;

const TextContainer = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  borderwidth: 2px;
  borderradius: 40px;
  margin: 20px;
  padding: 15px;
  backgroundcolor: #f4f3ea;
  bordercolor: #e6e7e8;
`;

const Main = ({ navigation }) => {
  return (
    <ScrollView
      style={{
        backgroundColor: '#ffffff',
      }}
    >
      <View style={styles.separator} />

      <Top>
        공지사항
        <Entypo name="megaphone" size={24} color="red" />
      </Top>

      <Container>
        <TouchableOpacity>
          <Ionicons name="home-outline" size={24} color="#E2495B" />
          <Text
            style={{
              justifyContent: 'center',
              textAlign: 'center',
              fontSize: 8,
            }}
            onPress={() =>
              navigation.navigate('Notice', { screen: 'NotiSchool' })
            }
          >
            학교
          </Text>
        </TouchableOpacity>
      </Container>

      <Container>
        <TouchableOpacity>
          <Entypo name="laptop" size={24} color="#0C4A60" />
          <Text
            style={{
              justifyContent: 'center',
              textAlign: 'center',
              fontSize: 8,
            }}
            onPress={() =>
              navigation.navigate('Notice', { screen: 'NotiSystem' })
            }
          >
            시스템
          </Text>
        </TouchableOpacity>
      </Container>

      <View style={styles.separator} />

      <Top>
        바로가기
        <AntDesign name="swapright" size={24} color="black" />
      </Top>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}
        horizontal={true}
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
      <View
        style={{
          justifyContent: 'center',
          textAlign: 'center',
          fontSize: 8,
        }}
      />

      <Top>
        <Text>카테고리: 게시판</Text>
      </Top>

      <View
        style={{
          marginTop: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      ></View>

      <TouchableOpacity
        onPress={() => navigation.navigate('Tabs', { screen: 'Board' })}
        style={{
          height: 50,
          borderColor: '#ffffff',
          backgroundColor: '#E5E5E5',
          borderWidth: 2,
          borderRadius: 10,
          margin: 10,
        }}
      ></TouchableOpacity>

      <Top>
        <Text>채팅방</Text>
      </Top>

      <View
        style={{
          marginTop: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      ></View>
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

const styles = StyleSheet.create({});
