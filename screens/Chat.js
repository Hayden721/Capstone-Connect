import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, TouchableOpacity } from 'react-native';

import styled from 'styled-components';
import { Text, Button } from 'react-native';

import firebase from 'firebase/app';
import 'firebase/auth';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

const Chat = ({ navigation }) => {
  return (
    <Container>
      <Text style={{ fontSize: 24 }}>Channel List</Text>
      <Button
        title="Channel Creation"
        onPress={() =>
          navigation.navigate("ChatStack", { screen: "ChannelCreation" })}
      />
    </Container>
  );
};
export default Chat;
