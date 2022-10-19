import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import MyPost from "../Profile/MyPost"
import Profile_setting from "../Profile/Profile_setting"



const ProfileStacks = createStackNavigator();

const ProfileStack = () => {
  return (
    <ProfileStacks.Navigator>
    <ProfileStacks.Screen name="프로필 설정" component={Profile_setting} />
    </ProfileStacks.Navigator>
  );
};

export default ProfileStack;