import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main_root from "../screens/Main_Screen/Main_root";
import Main_board from "../screens/Main_Screen/Main_board";
import Main_chat from "../screens/Main_Screen/Main_chat";
import Main_profile from "../screens/Main_Screen/Main_profile";
import MainSchool from "./Main_Screen/Main_root_note/MainSchool";

import { AntDesign, MaterialCommunityIcons  } from '@expo/vector-icons'; 
import { createStackNavigator } from "@react-navigation/stack";
import MainSystem from "./Main_Screen/Main_root_note/MainSystem";

const TabStack = createBottomTabNavigator();
const ConnectStack = createStackNavigator();
const BoardStack = createStackNavigator();

const ConnectStackScreen = ()=> {
  return(
   <ConnectStack.Navigator>
  <ConnectStack.Screen name="Connect" component={Main_root} options={{headerShown: false}} />
  <ConnectStack.Screen name="학교 공지사항" component={MainSchool} />
  <ConnectStack.Screen name="시스템 공지사항" component={MainSystem} />
  </ConnectStack.Navigator>
  );
};

const BoardStackScreen = ()=> {
  return(
   <BoardStack.Navigator>
  <BoardStack.Screen name="Board" component={Main_board} options={{headerShown: false}} />
  </BoardStack.Navigator>
  );
};

const TabStackScreen =() => {
  return (
    <TabStack.Navigator>
    <TabStack.Screen name="Connect" component={ConnectStackScreen} options={{ headerShown: false,
          tabBarIcon: () => (
            <AntDesign 
            name="home" 
            size={24} 
            color="black" 
            />
        ),
        }}
      />

    <TabStack.Screen name="Board" component={BoardStackScreen} options={{headerShown: false,
          tabBarIcon: () => (
            <MaterialCommunityIcons 
            name="clipboard-edit-outline" 
            size={24} 
            color="black" 
            />
          ),
      }}
      />  
    <TabStack.Screen name="Chat" component={Main_chat} options={{ 
        tabBarIcon: () => (
          <AntDesign 
          name="wechat" 
          size={24} 
          color="black" 
          />
        ),
      }}  
      />
    <TabStack.Screen name="Profile" component={Main_profile} options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons 
            name="human"
            size={24}
            color="black" 
            />
          ),
        }}   />
    </TabStack.Navigator>
  );
};


export default TabStackScreen;
