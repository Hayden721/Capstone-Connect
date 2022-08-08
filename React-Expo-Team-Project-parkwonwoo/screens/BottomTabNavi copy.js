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
import Board_whole from "./Main_Screen/Main_board_note/Board_whole";
import Board_write from "./Main_Screen/Main_board_note/Board_write";



const TabStack = createBottomTabNavigator();
const ConnectStack = createStackNavigator();
const BoardStack = createStackNavigator();
const ChatStack = createStackNavigator();



const ConnectStackScreen = ()=> {
  return(
   <ConnectStack.Navigator>
  <ConnectStack.Screen name="Connect" component={Main_root} options={{headerShown: false}} />
  <ConnectStack.Screen name="학교 공지사항" component={MainSchool}  />
  <ConnectStack.Screen name="시스템 공지사항" component={MainSystem} />
  </ConnectStack.Navigator>
  );
};

const BoardStackScreen = ()=> {
  return(
   <BoardStack.Navigator>
  <BoardStack.Screen name="Board" component={Main_board} options={{headerShown: false}} />
  <BoardStack.Screen name="전체 게시판" component={Board_whole} />
  <BoardStack.Screen name="글작성" component={Board_write}/>
  </BoardStack.Navigator>
  );
};

const ChatStackScreen = ()=> {
  return(
   <ChatStack.Navigator>
  <ChatStack.Screen name="Chat" component={Main_chat} options={{headerShown: false}} />
  <ChatStack.Screen name="전체 채팅방" component={Chat_whole} />
  </ChatStack.Navigator>
  );
};


const TabStackScreen =() => {
  return (
    <TabStack.Navigator>
    <TabStack.Screen name="Connect1" component={ConnectStackScreen} options={{ headerShown: false,
          tabBarIcon: () => (
            <AntDesign 
            name="home" 
            size={24} 
            color="black" 
            />
        ),
        }}
      />

    <TabStack.Screen name="Board1" component={BoardStackScreen} options={{headerShown: false,
          tabBarIcon: () => (
            <MaterialCommunityIcons 
            name="clipboard-edit-outline" 
            size={24} 
            color="black" 
            />
          ),
      }}
      />  
    <TabStack.Screen name="Chat" component={Main_chat} options={{ headerShown: false,
        tabBarIcon: () => (
          <AntDesign 
          name="wechat" 
          size={24} 
          color="black" 
          />
        ),
      }}  
      />
    <TabStack.Screen name="Profile" component={Main_profile} options={{  headerShown: false,
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
