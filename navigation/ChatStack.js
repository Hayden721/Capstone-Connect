import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import ChannelCreation from '../screens/Chat/Chat_ChannelCreation';


// TabNavi를 호출하는 법 onPress={() =>navigation.navigate("Tabs", {screen:"Search"})}

const ChatStacks = createStackNavigator();

const ChatStack = () => {
  return (
    <ChatStacks.Navigator>
      <ChatStacks.Screen name="ChannelCreation" component={ChannelCreation} />
    </ChatStacks.Navigator>
  );
};

export default ChatStack;
