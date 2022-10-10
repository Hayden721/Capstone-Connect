import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import MyPost from "../Profile/MyPost"


const ProfileStacks = createStackNavigator();

const ProfileStack = () => {
  return (
    <ProfileStacks.Navigator>
      <ProfileStacks.Screen name="MyPost" component={MyPost} />
    </ProfileStacks.Navigator>
  );
};

export default ProfileStack;