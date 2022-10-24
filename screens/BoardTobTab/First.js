import React from 'react';
import { Text, View, Alert, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import styled from 'styled-components/native';
import Board from '../Board';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

const CarouselContainer = styled.View`
  background-color: ${({ theme }) => theme.blackPearlBackgorund};
  height: auto;
  width: auto;
  border-radius: 20px;
  box-shadow: 1px 3px 5px;
  margin: 0 10px 0 10px;
`;
const InnerContainer = styled.View`
  background-color: #f5f6fa;
  text-align: center;
  border-radius: 15px;
  margin: 15px;
  height: 60px;
  justify-content: center;
`;

const Container = styled.View`
  background-color: 'white';
  justify-content: center;
  border-radius: 5px;
  width: 100%;
  padding: 10px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const BoardTouchable = styled.TouchableOpacity`
  margin: 0px 15px 0 15px;
  justify-content: center;
`;
const First = ({ navigation }) => {
  return (
    <ScrollView>
      <View style={{ margin: 10 }}></View>
      <CarouselContainer>
        <InnerContainer>
          <BoardTouchable
            onPress={() =>
              navigation.navigate('BoardStacks', { screen: '내가쓴글' })
            }
          >
            <Text
              style={{
                fontFamily: 'NanumGothicBold',
                fontSize: 20,
              }}
            >
              내가 쓴 글
            </Text>
          </BoardTouchable>
        </InnerContainer>
      </CarouselContainer>
      <View style={{ margin: 10 }}></View>
      <CarouselContainer>
        <InnerContainer>
          <BoardTouchable
            onPress={() =>
              navigation.navigate('BoardStacks', { screen: '자유게시판' })
            }
          >
            <Text
              style={{
                fontFamily: 'NanumGothicBold',
                fontSize: 20,
              }}
            >
              자유게시판
            </Text>
          </BoardTouchable>
        </InnerContainer>

        <InnerContainer>
          <BoardTouchable
            onPress={() =>
              navigation.navigate('BoardStacks', { screen: '공모전게시판' })
            }
          >
            <Text
              style={{
                fontFamily: 'NanumGothicBold',
                fontSize: 20,
              }}
            >
              <Text> 공모전게시판</Text>
            </Text>
          </BoardTouchable>
        </InnerContainer>
        <InnerContainer>
          <BoardTouchable
            onPress={() =>
              navigation.navigate('BoardStacks', { screen: '동아리게시판' })
            }
          >
            <Text
              style={{
                fontFamily: 'NanumGothicBold',
                fontSize: 20,
              }}
            >
              <Text> 동아리게시판</Text>
            </Text>
          </BoardTouchable>
        </InnerContainer>
        <InnerContainer>
          <BoardTouchable
            onPress={() =>
              navigation.navigate('BoardStacks', { screen: '취미게시판' })
            }
          >
            <Text
              style={{
                fontFamily: 'NanumGothicBold',
                fontSize: 20,
              }}
            >
              <Text> 취미게시판</Text>
            </Text>
          </BoardTouchable>
        </InnerContainer>
      </CarouselContainer>
    </ScrollView>
  );
};

export default First;
