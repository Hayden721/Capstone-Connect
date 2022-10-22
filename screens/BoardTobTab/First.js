import React from "react";
import { Text, View, Alert, TouchableOpacity } from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer} from '@react-navigation/native';
import "react-native-gesture-handler";
import styled from 'styled-components/native';
import Board from "../Board";
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import { Foundation } from '@expo/vector-icons';
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
          height: 100,
          borderColor: '#111111',
          backgroundColor: '#ffffff',
          borderWidth: 1,
          borderRadius: 10,
          margin:10,
          marginTop:20,

        }}
      >  

    <BoardTouchable
        onPress={()=>
         navigation.navigate("BoardStacks",{screen:"내가쓴글"})
         }
         > 
         
         <View
            style={[
              {
                height: 35,
                marginHorizontal: 25,
                marginTop: 30,
                justifyContent: 'center',
                
              },
            ]}
          >

            <Text
              style={{
                fontFamily: 'NanumGothicBold', 
                fontSize: 20,
              }}
            >
              <Foundation name="clipboard-pencil" size={21} color="#9932CC" />
               <Text> 내가 쓴 글</Text>
            </Text>
            
          </View>
        </BoardTouchable>
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
                fontSize: 20,
              }}
            >
               <AntDesign name="smile-circle" size={21} color="blue" />
               <Text> 자유 게시판</Text>
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
                fontSize: 20,
              }}
            >
               <Ionicons name="brush" size={21} color="green" />
               <Text> 공모전 게시판</Text>
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
                fontSize: 20,
              }}
            >
               <Ionicons name="cafe" size={21} color="#D3AC2B" />
               <Text> 동아리 게시판</Text>
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
                fontSize: 20,
              }}
            >
              <Ionicons name="baseball-outline" size={21} color="red" />
               <Text> 취미 게시판</Text>
            </Text>
          </View>
        </BoardTouchable>
      </View>
    </Container>
    
  )
}

export default First;