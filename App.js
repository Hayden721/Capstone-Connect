import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFonts } from "expo-font";
// Component
import CustomBtn from "./src/components/CustomBtn";
import { Images } from "./Images";
// Screen import
import Register from "./src/screens/Register";
import FindPassWord from "./src/screens/FindPassWord";
import MainScreen from "./src/screens/MainScreen";
import { useState } from "react";


function login({ navigation }) {

  const [studentId, setStudentId] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [loaded] = useFonts({
    //폰트 설정
    Audiowide: require("./assets/fonts/AudiowideRegular.ttf"),
    NanumGothic: require("./assets/fonts/NanumGothic.otf"),
    NanumGothicBold: require("./assets/fonts/NanumGothicBold.otf"),
  });
  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto"></StatusBar>
      <View style={styles.top}>
        <Text style={styles.connect}>CONNECT</Text>
      </View>
      <View style={styles.mid}>
        <Text style={styles.NanumRG}>학번</Text>
        <TextInput value={studentId} onChangeText={(studentId) => {setStudentId(studentId)}} placeholder={"ex) 20171111"} style={styles.input} />
        <Text style={styles.NanumRG}>비밀번호</Text>
        <TextInput value={studentPassword} onChangeText={(studentPassword) => {setStudentPassword(studentPassword)}} secureTextEntry={true} style={styles.input} />
        <CustomBtn  title="로그인" onClick={() => navigation.navigate("메인")} />
        <View style={styles.bottom}>
          <Text style={styles.membership}>
            <Text onPress={() => navigation.navigate("회원가입")}>
              회원가입
            </Text>
          </Text>
          <Text style={styles.membership}>
            <Text onPress={() => navigation.navigate("비밀번호 찾기")}>
              비밀번호 찾기
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="로그인">
        <Stack.Screen name="로그인" component={login} options={{headerShown: false}}/>
        <Stack.Screen name="회원가입" component={Register} />
        <Stack.Screen name="비밀번호 찾기" component={FindPassWord} />
      </Stack.Navigator>
    </NavigationContainer>



  );
}



// <Stack.Navigator initialRouteName="메인">
// <Stack.Screen name="메인" component={MainScreen} />
// </Stack.Navigator>
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  top: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 30,
  },
  mid: {
    flex: 2.5,
    backgroundColor: "white",
  },
  bottom: {
    justifyContent: "space-around",
    flexDirection: "row",
    marginTop: 20,
  },
  connect: {
    fontSize: 50,
    fontFamily: "Audiowide",
  },
  NanumRG: {
    fontSize: 25,
    fontFamily: "NanumGothic",
    marginLeft: 20,
    marginTop: 40,
  },
  input: {
    backgroundColor: "white",
    height: 40,
    margin: 5,
    marginLeft: 20,
    marginRight: 20,
    borderBottomWidth: 1.5,
  },
  membership: {
    fontSize: 20,
    fontFamily: "NanumGothic",
  },
});
