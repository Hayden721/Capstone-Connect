import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import Tabs from './Tabs';
import Notice from './NoticeStack';
import BoardStacks from './BoardStacks';
import ChatStack from './ChatStack';
import ChatChannel from '../screens/Chat/Chat_Channel';
import { Ionicons } from '@expo/vector-icons';
import ProfileStack from './ProfileStack';

const Nav = createStackNavigator();

const Root = ({ navigation }) => {
  return (
    <Nav.Navigator screenOptions={{ headerShown: false }}>
      <Nav.Screen name="Tabs" component={Tabs} />

      <Nav.Screen
        name="Notice"
        component={Notice}
        options={{ headerShown: true }}
      />
      <Nav.Screen name="BoardStacks" component={BoardStacks}/>
      <Nav.Screen name="ChatStack" component={ChatStack} />
      <Nav.Screen
        name="ChatChannel"
        component={ChatChannel}
        options={{
          headerShown: true,
          headerRight: () => (
            <Ionicons
              name="ios-alert-outline"
              size={24}
              color="black"
              onPress={() => {}}
              style={{
                marginRight: 10,
              }}
            />
          ),
        }}
      />
      <Nav.Screen name="ProfileStack" component={ProfileStack} />
    </Nav.Navigator>
  );
};

export default Root;
