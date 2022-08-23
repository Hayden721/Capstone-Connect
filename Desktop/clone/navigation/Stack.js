import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text, TouchableOpacity } from "react-native";
import { YELLOW_COLOR } from "../colors";


const ScreenOne = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate("Two")}>
    <Text>One</Text>
  </TouchableOpacity>
);
const ScreenTwo = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate("Three")}>
    <Text>go to Three</Text>
  </TouchableOpacity>
);
const ScreenThree = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate("Tabs", {screen:"Search"})}>
    <Text>Go to Search</Text>
  </TouchableOpacity>
);
const NativeStack = createNativeStackNavigator();

const Stack = () => (
  <NativeStack.Navigator
    screenOptions={{

      headerBackTitleVisible: false,
    }}
  >
    <NativeStack.Screen name="One" component={ScreenOne} />
    <NativeStack.Screen name="Two" component={ScreenTwo} />
    <NativeStack.Screen name="Three" component={ScreenThree} />
  </NativeStack.Navigator>
);

export default Stack;