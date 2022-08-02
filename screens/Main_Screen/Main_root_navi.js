import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import MainSchool from './Main_root_note/MainSchool';
import MainSystem from './Main_root_note/MainSystem';

const Stack = createStackNavigator();

const Main_root_navi = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="MS ONE" component={MainSchool} options={{headerShown: false}} />
            <Stack.Screen name="MS TWO" component={MainSystem}  options={{title: '상세보기'}}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Main_root_navi