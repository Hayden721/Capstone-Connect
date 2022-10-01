import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import Profile_setting from '../Profile/Profile_setting'
import Profile_top from '../Profile/Profile_top';

const ProfileStacks = createStackNavigator();

const ProfileStack = () => {
  return (
    <ProfileStacks.Navigator>
      <ProfileStacks.Screen name="Profile_setting" component={Profile_setting} />
      <ProfileStacks.Screen name="Profile_top" component={Profile_top} />
    </ProfileStacks.Navigator>
  );
};

export default ProfileStack;