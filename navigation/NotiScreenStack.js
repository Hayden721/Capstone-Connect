import React from "react";
import { createStackNavigator } from "@react-navigation/stack";


import NotiWrite from "../screens/Main/Notice/NotiWrite.js";
import NotiLookUp from "../screens/Main/Notice/NotiLookUp.js";

// TabNavi를 호출하는 법 onPress={() => navigation.navigate("Tabs", {screen:"Search"})}

const NoticeScreenStacks = createStackNavigator();
const NoticeScreenStack = () => {
  return (
    <NoticeScreenStacks.Navigator>
      <NoticeScreenStacks.Screen name="공지글쓰기" component={NotiWrite} />
      <NoticeScreenStacks.Screen name="공지조회" component={NotiLookUp} />
    </NoticeScreenStacks.Navigator>
  );
};
export default NoticeScreenStack;