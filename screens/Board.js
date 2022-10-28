import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import 'react-native-gesture-handler';
import { Text, View, Alert, StatusBar } from 'react-native';
import First from './BoardTobTab/First';
import Second from './BoardTobTab/Second';
import Third from './BoardTobTab/Third';



const BoardTopTabs = createMaterialTopTabNavigator();
{/* <BoardTopTabs.Navigator tabBar={(props) => <TabBar {...props} />}></BoardTopTabs.Navigator> */}
const Board = ({ navigation }) => {
  
  return (
    
    <BoardTopTabs.Navigator
    screenOptions={{ //use this config
      tabBarScrollEnabled: true,
      tabBarIndicatorStyle:{
        backgroundColor:"#808e9b",
        height:2,
    },
      tabBarActiveTintColor: 'red',
      tabBarStyle: {
        backgroundColor: 'white',
      },
      tabBarItemStyle: {
        width: 'auto',
        alignItems: 'flex-start',
      },
      tabBarLabelStyle: {
        fontSize: 30,
        color: 'black',
        textTransform: 'capitalize',
        fontFamily: 'NanumGothicBold',
      },
      
    }}
    sceneContainerStyle={{backgroundColor: 'white'}}>
      <BoardTopTabs.Screen name="게시판" component={First} />
      <BoardTopTabs.Screen name="진로" component={Second} />
      <BoardTopTabs.Screen name="홍보" component={Third} />
    </BoardTopTabs.Navigator>

  );
};

export default Board;
