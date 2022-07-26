import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';

import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
//stack screens import
import Main from '../screens/Main';
import Board from '../screens/Board';
import Chat from '../screens/Chat';
import Profile from '../screens/Profile';

import Board_postLookUp from '../screens/Board/Board_postLookUp';

import { ThemeConsumer, ThemeContext } from 'styled-components/native';

const Tab = createBottomTabNavigator();
const tabBarIcon = ({ focused, name }) => {
  const theme = useContext(ThemeConsumer);
  return <Ionicons name="name" size={24} />;
};
/*<Ionicons name="ios-alert-outline" size={24} color="black" 
style={{
  marginRight: 10,
}} /> */
const Tabs = ({ navigation, route }) => {
  const theme = useContext(ThemeContext);
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Main"
        component={Main}
        options={{
          headerShown: true,
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="home-outline" size={24} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Board"
        component={Board}
        options={{
          headerShown: true,
          tabBarIcon: ({ color, size }) => {
            return (
              <Ionicons name="clipboard-outline" size={24} color={color} />
            );
          },
          headerRight: () => (
            <Ionicons name="ios-alert-outline" size={24} color="black" 
            onPress={() => navigation.navigate("BoardStacks", {screen:"신고"})}
            style={{
              marginRight: 10,
            }} />
          )
        }}
        
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={24}
                color={color}
              />
            );
          },
          headerRight: ({ color, size }) => (
            <Ionicons
              name="add"
              size={26}
              color="black"
              onPress={() =>
                navigation.navigate('ChatStack', { screen: 'ChannelCreation' })
              }
              style={{
                marginRight: 10,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <Ionicons name="person-circle-outline" size={24} color={color} />
            );
          },
          headerRight: ({ color }) => (
            <Ionicons
              name="settings-outline"
              size={24}
              color="black"
              onPress={() =>
                navigation.navigate('ProfileStack', { screen: '프로필 설정' })
              }
              style={{
                marginRight: 10,
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
