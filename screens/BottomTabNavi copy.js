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

const TabStack = createBottomTabNavigator();
const ConnectStack = createStackNavigator();
const BoardStack = createStackNavigator();

const ConnectStackScreen = ()=> {
  return(
   <ConnectStack.Navigator>
  <ConnectStack.Screen name="Connect" component={Main_root} />
  <ConnectStack.Screen name="School" component={MainSchool}/>
  </ConnectStack.Navigator>
  );
};

const BoardStackScreen = ()=> {
  return(
   <BoardStack.Navigator>
  <BoardStack.Screen name="Board" component={Main_board} />
  </BoardStack.Navigator>
  );
};

const TabStackScreen =() => {
  return (
    <TabStack.Navigator>
    <TabStack.Screen name="Connect" component={ConnectStackScreen} />
    <TabStack.Screen name="Board" component={BoardStackScreen} />
    </TabStack.Navigator>
  );
};


export default TabStackScreen;
