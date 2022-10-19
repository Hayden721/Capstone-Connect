import React from "react";
import { Text, View, Alert } from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer} from '@react-navigation/native';
import "react-native-gesture-handler";
import styled from 'styled-components/native';

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
      <BoardTouchable onPress= {() => navigation.navigate('BoardStacks', {screen: '자유게시판'})}>
        <Text>자유게시판</Text>
      </BoardTouchable>

      <BoardTouchable onPress= {() => navigation.navigate('BoardStacks', {screen: '자유게시판'})}>
        <Text>공모전게시판</Text>
      </BoardTouchable>

      <BoardTouchable onPress= {() => navigation.navigate('BoardStacks', {screen: '자유게시판'})}>
        <Text>동아리게시판</Text>
      </BoardTouchable>

      <BoardTouchable onPress= {() => navigation.navigate('BoardStacks', {screen: '자유게시판'})}>
        <Text>취미게시판</Text>
      </BoardTouchable>
    </Container>
  )
}

export default First;