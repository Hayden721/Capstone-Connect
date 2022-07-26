import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Main_root from '../screens/Main_Screen/Main_root';
import Main_board from '../screens/Main_Screen/Main_board';
import Main_chat from '../screens/Main_Screen/Main_chat';
import Main_profile from '../screens/Main_Screen/Main_profile';


const BottomTabStack = createBottomTabNavigator();

const TabStackScreen = () => {
  return (
    <BottomTabStack.Navigator>
      <BottomTabStack.Screen name='Connect' component={Main_root} options={{headerShown: true}}/>
      <BottomTabStack.Screen name='게시판' component={Main_board}/>
      <BottomTabStack.Screen name='Chat' component={Main_chat}/>
      <BottomTabStack.Screen name='Profile' component={Main_profile}/>
    </BottomTabStack.Navigator>
  );
};

export default TabStackScreen;