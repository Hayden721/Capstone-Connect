import firebase from "firebase/app";
import "firebase/auth";
import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

// 아이콘 사용 import
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';


import { ScrollView } from "react-native-gesture-handler";

import { Linking } from 'react-native';
// 학교, 종정, 셔틀 링크 사용 import

const Main = ({ navigation }) => {
  return (
    <ScrollView style={{backgroundColor: "#ffffff"}}>
      <View style={styles.separator} />
      <Text style={styles.Top2}>공지사항  
      <Entypo name="megaphone" size={24} color="red" />
      </Text> 
      
      
      <TouchableOpacity style={styles.textContainer}>
      <Ionicons name="home-outline" size={24} color="#E2495B" /> 
          <Text style={styles.textStyle}
           onPress={() =>
            navigation.navigate("Notice", { screen: "NotiSchool" }) }>학교</Text>
        </TouchableOpacity>
        

        <TouchableOpacity style={styles.textContainer}>
        <Entypo name="laptop" size={24} color="#0C4A60" />
          <Text style={styles.textStyle}
           onPress={() =>
            navigation.navigate("Notice", { screen: "NotiSystem" }) }>시스템</Text>
        </TouchableOpacity>
          
        
        <View style={styles.separator} />
    
        <Text style={styles.Top2}>바로가기
        <AntDesign name="swapright" size={24} color="black" />
        </Text>
      <View style={styles.menuContainer} horizontal={true}>
        
        <TouchableOpacity style={styles.textContainer2}>
        <Ionicons name="home-outline" size={24} color="#E2495B" />
          <Text style={styles.textStyle}     
           onPress={() => Linking.openURL('https://www.shinhan.ac.kr/sites/kr/index.do')}>학교</Text>
       </TouchableOpacity>

       <TouchableOpacity style={styles.textContainer2}>
         <AntDesign name="earth" size={24} color="#0C4A60" />
          <Text style={styles.textStyle}
           onPress={() => Linking.openURL('https://stins.shinhan.ac.kr/irj/portal')}>종정시</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.textContainer2}>
          <Ionicons name="bus" size={24} color="#D3AC2B" />
          <Text style={styles.textStyle}
           onPress={() => Linking.openURL('https://www.shinhan.ac.kr/kr/125/subview.do')}>셔틀</Text>
        </TouchableOpacity>

        

        {/* <TouchableOpacity style={styles.textContainer}>
          <Ionicons name="bus" size={24} color="#d3ac2b" />
          <Text style={styles.textStyle}
           onPress={() =>
            navigation.navigate("Notice", { screen: "NotiSchool" }) }>공지</Text>
        </TouchableOpacity> */}
      </View>
      <View style={styles.separator} />
      <Text style={styles.Top2}>카테고리: 게시판
      </Text>
  
      <View style={styles.Container}></View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Tabs", { screen: "Board" })}
        style={styles.textContainerss3}
        
      >
        
      </TouchableOpacity>

      <Text style={styles.Top2}>채팅방
      
      </Text>
      
      <View style={styles.Container}></View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Tabs", { screen: "Chat" })}
        style={styles.textContainerss3}
      >
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Main;

const styles = StyleSheet.create({
  Container: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  Top: {
    fontSize: 30,
    fontFamily: "Audiowide",
    marginLeft: 15,
  },

  Top2: {
    fontSize: 20,
    marginLeft: 15,
    marginTop: 10,
    fontFamily: "NanumGothicBold",
  },

  top3: {
    marginTop: 15,
  },

  School: {
    marginLeft: 15,
    marginTop: 10,
    fontFamily: "NanumGothic",
  },

  System: {
    marginLeft: 15,
    fontFamily: "NanumGothic",
  },

  textContainerss: {
    height: 50,
    borderColor: "#CBD0D8",
    backgroundColor: "#F4F3EA",
    borderWidth: 2,
    borderRadius: 10,
    margin: 10,
  },

  textContainerss2: {
    height: 50,
    borderColor: "#ffffff",
    backgroundColor: "#ED7458 ",
    borderWidth: 2,
    borderRadius: 10,
    margin: 10,
  },

  textContainerss3: {
    height: 50,
    borderColor: "#ffffff",
    backgroundColor: "#E5E5E5",
    borderWidth: 2,
    borderRadius: 10,
    margin: 10,
  },

  menuContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  textContainer: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderRadius: 15,
    margin: 10,
    padding: 15,
    backgroundColor: "#F4F3EA",
    borderColor: "#E6E7E8",
  },

  textContainer2: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderRadius: 40,
    margin: 20,
    padding: 15,
    backgroundColor: "#F4F3EA",
    borderColor: "#E6E7E8",
  },

  textStyle: {
    justifyContent: "center",
    textAlign: "center",
    fontSize: 8,
  },

  textStyle1: {
    justifyContent: "center",
    alignItems: "center",
  },

  separator: {
    marginVertical: 5,
    marginHorizontal: 10,
    borderBottomColor: '#CBD0D8',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

});
