import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Linking 
} from 'react-native';
import React from 'react';

const Profile_setting = () => {
  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <SafeAreaView>
        <View
          style={{
            marginLeft: 20,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontFamily: 'NanumGothicBold',
              fontSize: 20,
            }}
          >
            {' '}
            이용안내
          </Text>
        </View>

        <View
          style={{
            justifyContent: 'center',
            marginTop: 10,
            marginLeft: 30,
            fontFamily: 'NanumGothicBold',
          }}
        >
          <Text>앱 버전 - 0.1</Text>
          <Text>개발 Tool - Vscode  </Text>
        </View>

        <View
          style={{
            justifyContent: 'center',
            marginTop: 20,
            marginLeft: 30,
            fontFamily: 'NanumGothicBold',
          }}
        ></View>

        <View
          style={{
            marginLeft: 20,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontFamily: 'NanumGothicBold',
              fontSize: 20,
            }}
          >
            {' '}
            GitHub
          </Text>
        </View>

        <View
          style={{
            justifyContent: 'center',
            marginTop: 10,
            marginLeft: 30,
            fontFamily: 'NanumGothicBold',
          }}
        >
          <TouchableOpacity
          onPress={() =>
            Linking.openURL('https://www.shinhan.ac.kr/sites/kr/index.do')
          }>
          <Text>https://github.com/Hayden721/Capstone-Connect</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginLeft: 20,
            marginTop: 20,
          }}
        >
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Profile_setting;
