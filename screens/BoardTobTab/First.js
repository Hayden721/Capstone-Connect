import React from "react";
import { Text, View, Alert } from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer} from '@react-navigation/native';
import "react-native-gesture-handler";
import styled from 'styled-components/native';
import Board from "../Board";

const Container = styled.View`
  background-color: 'white';
  
  justify-content: center;
  border-radius: 5px;
  width: 100%;
  padding: 10px;
  
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const BoardTouchable = styled.TouchableOpacity`
`;
const First = ({navigation}) => {

  return (
    <Container>
      <View
        style={{
          height: 250,
          borderColor: '#111111',
          backgroundColor: '#ffffff',
          borderWidth: 1,
          borderRadius: 10,
          margin: 10,
        }}
      >  
      </View>

      <View
        style={{
          height: 250,
          borderColor: '#111111',
          backgroundColor: '#ffffff',
          borderWidth: 1,
          borderRadius: 10,
          margin: 10,
        }}
      >  
   
   <BoardTouchable
          onPress={() =>
            navigation.navigate('BoardStacks', { screen: '자유게시판' })
          }
        >
          <View
            style={[
              {
                height: 35,
                marginHorizontal: 25,
                marginTop: 20,
              },
            ]}
          >
            <Text
              style={{
                fontFamily: 'NanumGothicBold',
                fontSize: 15,
              }}
            >
              자유 게시판
              <Text
                style={{
                  fontFamily: 'NanumGothic',
                  fontSize: 15,
                  marginLeft: 15,
                }}
              >
              </Text>
            </Text>
          </View>
        </BoardTouchable>
        

        <BoardTouchable
          onPress={() =>
            navigation.navigate('BoardStacks', { screen: '공모전게시판' })
          }
        >
          <View
            style={[
              {
                height: 35,
                marginHorizontal: 25,
                marginTop: 20,
              },
            ]}
          >
            <Text
              style={{
                fontFamily: 'NanumGothicBold',
                fontSize: 15,
              }}
            >
              공모전 게시판
              <Text
                style={{
                  fontFamily: 'NanumGothic',
                  fontSize: 15,
                  marginLeft: 15,
                }}
              >
              </Text>
            </Text>
          </View>
        </BoardTouchable>


         <BoardTouchable
          onPress={() =>
            navigation.navigate('BoardStacks', { screen: '동아리게시판' })
          }
        >
          <View
            style={[
              {
                height: 35,
                marginHorizontal: 25,
                marginTop: 20,
              },
            ]}
          >
            <Text
              style={{
                fontFamily: 'NanumGothicBold',
                fontSize: 15,
              }}
            >
              동아리 게시판
              <Text
                style={{
                  fontFamily: 'NanumGothic',
                  fontSize: 15,
                  marginLeft: 15,
                }}
              >
              </Text>
            </Text>
          </View>
        </BoardTouchable>

        <BoardTouchable
          onPress={() =>
            navigation.navigate('BoardStacks', { screen: '취미게시판' })
          }
        >
          <View
            style={[
              {
                height: 35,
                marginHorizontal: 25,
                marginTop: 20,
              },
            ]}
          >
            <Text
              style={{
                fontFamily: 'NanumGothicBold',
                fontSize: 15,
              }}
            >
              취미 게시판
              <Text
                style={{
                  fontFamily: 'NanumGothic',
                  fontSize: 15,
                  marginLeft: 15,
                }}
              >
              </Text>
            </Text>
          </View>
        </BoardTouchable>
      </View>
    </Container>
  )
}

export default First;