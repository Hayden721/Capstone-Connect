import firebase from 'firebase/app';
import 'firebase/auth';
import { Text, View, Alert, Linking } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

// 아이콘 사용 import
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { CallBoard } from '../utils/firebase';

import {} from 'expo-status-bar';
import { render } from 'react-dom';
// 학교, 종정, 셔틀 링크 사용 import
const CarouselContainer = styled.View`
  background-color: ${({ theme }) => theme.blackPearlBackgorund};
  width: auto;
  height: 400px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  box-shadow: 1px 3px 5px;
`;

const InnerContainer = styled.View`
  background-color: #d2dae2;
  text-align: center;
  border-radius: 20px;
  margin: 0 10px 0 10px;
  margin-bottom: 20px;
  height: 60px;
`;

const ButtonContainer = styled.View`
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
  flex-direction: row;
`;

const BoardContainer = styled.View`
  background-color: ${({ theme }) => theme.imageButtonIcon};
  width: auto;
  height: 400px;
  border-radius: 20px;
  box-shadow: 1px 3px 5px;
`;

const Top = styled.Text`
  font-size: 20px;
  margin-left: 25px;
  margin-top: 10px;
  font-family: 'NanumGothicBold';
`;

const FastButtonContainer = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 40px;
  margin: 20px;
  margin-top: 10px;
  padding: 15px;
  background-color: #f7f1e3;
  box-shadow: 1px 3px 5px;
`;

const TextContainer2 = styled.View`
  width: 60px;
  padding: 15px;
`;

const Main = ({ navigation }) => {
  const [freeBoard, setFreeBoard] = useState('');
  const [competitionBoard, setCompetitionBoard] = useState('');
  const [clubBoard, setClubBoard] = useState('');
  const [hobbyBoard, setHobbyBoard] = useState('');
  const [posts, setPosts] = useState(null);
  const isFocused = useIsFocused(); // isFoucesd Define

  CallBoard('Free', setFreeBoard);
  CallBoard('Competition', setCompetitionBoard);
  CallBoard('Club', setClubBoard);
  CallBoard('Hobby', setHobbyBoard);

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <CarouselContainer>
        <Text>안녕</Text>
      </CarouselContainer>

      <ButtonContainer>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Notice', { screen: 'NotiSchool' })
          }
        >
          <FastButtonContainer>
          <Ionicons name="megaphone" size={24} color="black" />
            <Text
              style={{
                justifyContent: 'center',
                textAlign: 'center',
                fontSize: 10,
              }}
            >
              공지
            </Text>
          </FastButtonContainer>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            Linking.openURL('https://www.shinhan.ac.kr/sites/kr/index.do')
          }
        >
          <FastButtonContainer>
            <Ionicons name="school" size={24} color="black" />
            <Text
              style={{
                justifyContent: 'center',
                textAlign: 'center',
                fontSize: 8,
              }}
            >
              학교
            </Text>
          </FastButtonContainer>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            Linking.openURL('https://stins.shinhan.ac.kr/irj/portal')
          }
        >
          <FastButtonContainer>
          <Ionicons name="desktop" size={24} color="black" />
            <Text
              style={{
                justifyContent: 'center',
                textAlign: 'center',
                fontSize: 8,
              }}
            >
              종정시
            </Text>
          </FastButtonContainer>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              'https://shinhanunivst.modoo.at/?link=6n7lulzb&messageNo=108&mode=view&query=&queryType=0&myList=0&page=2'
            )
          }
        >
          <FastButtonContainer>
            <Ionicons name="bus" size={24} color="black" />
            <Text
              style={{
                justifyContent: 'center',
                textAlign: 'center',
                fontSize: 8,
              }}
            >
              셔틀
            </Text>
          </FastButtonContainer>
        </TouchableOpacity>
      </ButtonContainer>

      <BoardContainer>
        <Text
          style={{
            margin: 20,
            fontSize: 25,
            fontFamily: 'NanumGothicBold',
          }}
        >
          <Text> 최신글 </Text>
        </Text>
        <InnerContainer>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('BoardStacks', { screen: '자유게시판' })
            }
          >
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
              }}
            >
              <TextContainer2>
                <Text
                  style={{
                    justifyContent: 'center',
                    textAlign: 'center',
                    fontSize: 15,
                    width: 40,
                  }}
                >
                  자유
                </Text>
              </TextContainer2>

              <Text
                style={{
                  fontFamily: 'NanumGothic',
                  fontSize: 15,
                  textAlign: 'center',
                }}
              >
                - {freeBoard}
              </Text>
            </View>
          </TouchableOpacity>
        </InnerContainer>

        <InnerContainer>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('BoardStacks', { screen: '공모전게시판' })
            }
          >
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
              }}
            >
              <TextContainer2>
                <Text
                  style={{
                    justifyContent: 'center',
                    textAlign: 'center',
                    fontSize: 15,
                    width: 40,
                  }}
                >
                  공모전
                </Text>
              </TextContainer2>

              <Text
                style={{
                  fontFamily: 'NanumGothic',
                  fontSize: 15,
                }}
              >
                - {freeBoard}
              </Text>
            </View>
          </TouchableOpacity>
        </InnerContainer>

        <InnerContainer>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('BoardStacks', { screen: '동아리게시판' })
            }
          >
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
              }}
            >
              <TextContainer2>
                <Text
                  style={{
                    justifyContent: 'center',
                    textAlign: 'center',
                    fontSize: 15,
                    width: 40,
                  }}
                >
                  동아리
                </Text>
              </TextContainer2>

              <Text
                style={{
                  fontFamily: 'NanumGothic',
                  fontSize: 15,
                }}
              >
                - {freeBoard}
              </Text>
            </View>
          </TouchableOpacity>
        </InnerContainer>

        <InnerContainer>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('BoardStacks', { screen: '취미게시판' })
            }
          >
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
              }}
            >
              <TextContainer2>
                <Text
                  style={{
                    justifyContent: 'center',
                    textAlign: 'center',
                    fontSize: 15,
                    width: 40,
                  }}
                >
                  취미
                </Text>
              </TextContainer2>

              <Text
                style={{
                  fontFamily: 'NanumGothic',
                  fontSize: 15,
                }}
              >
                - {freeBoard}
              </Text>
            </View>
          </TouchableOpacity>
        </InnerContainer>
      </BoardContainer>
    </ScrollView>
  );
};

export default Main;
