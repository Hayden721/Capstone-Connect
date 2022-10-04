import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
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
          <Text style>앱 버전 - Version.000</Text>
          <Text>개발 Tool - 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 </Text>
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
            기타
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
          
          <TouchableOpacity>
          <Text>회원 탈퇴</Text>
          </TouchableOpacity>

          <TouchableOpacity>
          <Text>비밀번호 변경</Text>
          </TouchableOpacity>
        </View>

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
          <Text>Http://</Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Profile_setting;
