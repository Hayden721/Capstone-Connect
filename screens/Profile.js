import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { FlatList } from "react-native-gesture-handler";

const Main_profile = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          {/* 이름과 학번은 DB에서 호출 */}
          <Text style={{ fontSize: 20, margin: 10 }}>이름바로 뜨게 하면 될듯 </Text> 
          <Text style={{ fontSize: 20, margin: 10 }}>학번도 </Text>
        </View>
        <View style={styles.separator} />

        <View>
          <Text style={{fontSize:25}}>계정</Text>
          <TouchableOpacity>
            <Text style={{ fontSize: 20}}>프로필 설정</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={{ fontSize: 20}}>계정 설정</Text>
          </TouchableOpacity>
          
          <View style={styles.separator} />
          <TouchableOpacity>

            <Text style={{ fontSize: 20}}></Text>
          </TouchableOpacity>
          
        </View>

        {/* 로그아웃 */}
        <TouchableOpacity
          style={styles.customBtn}
          onPress={() => firebase.auth().signOut()}
        >
          <Text
            style={{
              color: "#000000",
              fontSize: 24,
              fontFamily: "NanumGothicBold",
            }}
          >
            로그아웃
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Main_profile;

const styles = StyleSheet.create({
  customBtn: {
    backgroundColor: "#D9D9D9",
    padding: 15,
    margin: 20,
    marginTop: 550,
    borderRadius: 10,
    alignItems: "center",
  },

  Container: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  Profile: {
    justifyContent: "center",
    fontFamily: "NanumGothicBold",
    alignItems: "center",
    marginLeft: 160,
    marginTop: 30,
    fontSize: 30,
  },

  separator: {
    marginVertical: 9,
    marginHorizontal: 10,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

});
