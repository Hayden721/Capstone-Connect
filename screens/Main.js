import firebase from 'firebase/app';
import 'firebase/auth';
import { StyleSheet, Text, View, Alert } from 'react-native';
import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

// 아이콘 사용 import
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import { ScrollView } from 'react-native-gesture-handler';

import { Linking } from 'react-native';
// 학교, 종정, 셔틀 링크 사용 import

const Main = ({ navigation }) => {
  return (
    <ScrollView
      style={{
        backgroundColor: '#ffffff',
      }}
    >
      <View style={styles.separator} />

      <Text
        style={{
          fontSize: 20,
          marginLeft: 15,
          marginTop: 10,
          fontFamily: 'NanumGothicBold',
        }}
      >
        공지사항
        <Entypo name="megaphone" size={24} color="red" />
      </Text>

      <View
        style={{
          width: 60,
          height: 60,
          borderWidth: 2,
          borderRadius: 15,
          margin: 10,
          padding: 15,
          backgroundColor: '#F4F3EA',
          borderColor: '#E6E7E8',
        }}
      >
        <TouchableOpacity>
          <Ionicons name="home-outline" size={24} color="#E2495B" />
          <Text
            style={{
              justifyContent: 'center',
              textAlign: 'center',
              fontSize: 8,
            }}
            onPress={() =>
              navigation.navigate('Notice', { screen: 'NotiSchool' })
            }
          >
            학교
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          width: 60,
          height: 60,
          borderWidth: 2,
          borderRadius: 15,
          margin: 10,
          padding: 15,
          backgroundColor: '#F4F3EA',
          borderColor: '#E6E7E8',
        }}
      >
        <TouchableOpacity>
          <Entypo name="laptop" size={24} color="#0C4A60" />
          <Text
            style={{
              justifyContent: 'center',
              textAlign: 'center',
              fontSize: 8,
            }}
            onPress={() =>
              navigation.navigate('Notice', { screen: 'NotiSystem' })
            }
          >
            시스템
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.separator} />

      <Text
        style={{
          fontSize: 20,
          marginLeft: 15,
          marginTop: 10,
          fontFamily: 'NanumGothicBold',
        }}
      >
        바로가기
        <AntDesign name="swapright" size={24} color="black" />
      </Text>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}
        horizontal={true}
      >
        <Text
          style={{
            width: 60,
            height: 60,
            borderWidth: 2,
            borderRadius: 40,
            margin: 20,
            padding: 15,
            backgroundColor: '#F4F3EA',
            borderColor: '#E6E7E8',
          }}
        >
          <TouchableOpacity>
            <Ionicons name="home-outline" size={24} color="#E2495B" />
            <Text
              style={{
                justifyContent: 'center',
                textAlign: 'center',
                fontSize: 8,
              }}
              onPress={() =>
                Linking.openURL('https://www.shinhan.ac.kr/sites/kr/index.do')
              }
            >
              학교
            </Text>
          </TouchableOpacity>
        </Text>

        <Text
          style={{
            width: 60,
            height: 60,
            borderWidth: 2,
            borderRadius: 40,
            margin: 20,
            padding: 15,
            backgroundColor: '#F4F3EA',
            borderColor: '#E6E7E8',
          }}
        >
          <TouchableOpacity>
            <AntDesign name="earth" size={24} color="#0C4A60" />
            <Text
              style={{
                justifyContent: 'center',
                extAlign: 'center',
                fontSize: 8,
              }}
              onPress={() =>
                Linking.openURL('https://stins.shinhan.ac.kr/irj/portal')
              }
            >
              종정시
            </Text>
          </TouchableOpacity>
        </Text>

        <Text
          style={{
            width: 60,
            height: 60,
            borderWidth: 2,
            borderRadius: 40,
            margin: 20,
            padding: 15,
            backgroundColor: '#F4F3EA',
            borderColor: '#E6E7E8',
          }}
        >
          <TouchableOpacity>
            <Ionicons name="bus" size={24} color="#D3AC2B" />
            <Text
              style={{
                justifyContent: 'center',
                textAlign: 'center',
                fontSize: 8,
              }}
              onPress={() =>
                Linking.openURL('https://www.shinhan.ac.kr/kr/125/subview.do')
              }
            >
              셔틀
            </Text>
          </TouchableOpacity>
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'center',
          textAlign: 'center',
          fontSize: 8,
        }}
      />

      <Text
        style={{
          fontSize: 20,
          marginLeft: 15,
          marginTop: 10,
          fontFamily: 'NanumGothicBold',
        }}
      >
        <Text>카테고리: 게시판</Text>
      </Text>

      <View
        style={{
          marginTop: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      ></View>

      <TouchableOpacity
        onPress={() => navigation.navigate('Tabs', { screen: 'Board' })}
        style={{
          height: 50,
          borderColor: '#ffffff',
          backgroundColor: '#E5E5E5',
          borderWidth: 2,
          borderRadius: 10,
          margin: 10,
        }}
      ></TouchableOpacity>

      <Text
        style={{
          fontSize: 20,
          marginLeft: 15,
          marginTop: 10,
          fontFamily: 'NanumGothicBold',
        }}
      >
        <Text>채팅방</Text>
      </Text>

      <View
        style={{
          marginTop: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      ></View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Tabs', { screen: 'Chat' })}
        style={{
          height: 50,
          borderColor: '#ffffff',
          backgroundColor: '#E5E5E5',
          borderWidth: 2,
          borderRadius: 10,
          margin: 10,
        }}
      ></TouchableOpacity>
    </ScrollView>
  );
};

export default Main;

const styles = StyleSheet.create({});
