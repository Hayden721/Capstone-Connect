import firebase from 'firebase/app';
import 'firebase/auth';
import {
  Text,
  View,
  Alert,
  Linking,
  Dimensions,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Carousel, {
  Pagination,
  ParallaxImage,
} from 'react-native-snap-carousel';

// 아이콘 사용 import
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { CallBoard } from '../utils/firebase';

const { width: screenWidth } = Dimensions.get('window');

// 학교, 종정, 셔틀 링크 사용 import
const CarouselContainer = styled.View`
  background-color: ${({ theme }) => theme.blackPearlBackgorund};
  width: auto;
  height: 450px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  box-shadow: 1px 2px 5px;
`;

const InnerContainer = styled.View`
  background-color: #d2dae2;
  text-align: center;
  border-radius: 20px;
  margin: 0 10px 0 10px;
  margin-bottom: 20px;
  height: 60px;
  justify-content: center;
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
  width: 60;
  height: 60;
  border-width: 2px;
  border-radius: 40px;
  margin: 20px;
  margin-top: 10px;
  padding: 15px;
  background-color: #f7f1e3;
  border-color: #f7f1e3;
  box-shadow: 1px 1px 2px;
`;

const TextContainer2 = styled.View`

  justify-content: center;
  text-align: center;
`;

const renderItem = ({ item }, parallaxProps) => {
  return (
    <View
      style={{
        borderWidth: 1,
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
        backgroundColor: 'white',
      }}
    >
      <ParallaxImage
        source={{ uri: item.thumbnail }}
        containerStyle={styles.imageContainer}
        style={styles.image}
        parallaxFactor={0.4}
        {...parallaxProps}
      />
      <Image source={{ uri: item.url }} style={{ width: 200, height: 250 }} />
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ marginVertical: 10, fontSize: 20, fontWeight: 'bold' }}>
          {item.name}
        </Text>
        <TouchableOpacity >

        </TouchableOpacity>
      </View>
    </View>
  );
};

const data = [
  {
    id: 1,
    name: '학습법 워크숍',
    url: 'https://www.shinhan.ac.kr/CrossEditor/binary/images/000128/%EB%AF%B8%EB%9E%98%EC%82%AC%ED%9A%8C_%EC%97%AD%EB%9F%89%EA%B0%95%ED%99%94_%ED%95%99%EC%8A%B5%EB%B2%95_%EC%9B%8C%ED%81%AC%EC%83%B5_%ED%8F%AC%EC%8A%A4%ED%84%B0.png',
  },
  {
    id: 2,
    name: '한중일 대학생 외교캠프',
    url: 'https://www.shinhan.ac.kr/CrossEditor/binary/images/000128/%EC%A0%9C9%EC%B0%A8_%ED%95%9C%EC%9D%BC%EC%A4%91_%EB%8C%80%ED%95%99%EC%83%9D_%EC%99%B8%EA%B5%90%EC%BA%A0%ED%94%84(%EA%B5%AD%EB%AC%B8).png',
  },
  {
    id: 3,
    name: '낙동강 세계평화 문화 대축전',
    url: 'https://www.shinhan.ac.kr/CrossEditor/binary/images/000128/%ED%8F%AC%EC%8A%A4%ED%84%B0.png',
  },
];

const Main = ({ navigation }) => {
  const [freeBoard, setFreeBoard] = useState('');
  const [competitionBoard, setCompetitionBoard] = useState('');
  const [clubBoard, setClubBoard] = useState('');
  const [hobbyBoard, setHobbyBoard] = useState('');
  const [posts, setPosts] = useState(null);
  const isFocused = useIsFocused(); // isFoucesd Define
  const [index, setIndex] = useState(0);
  const isCarousel = useRef(null);

  CallBoard('Free', setFreeBoard);
  CallBoard('Competition', setCompetitionBoard);
  CallBoard('Club', setClubBoard);
  CallBoard('Hobby', setHobbyBoard);

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <CarouselContainer>
        <View style={{ marginTop: 30 }}></View>
        <Carousel
          ref={isCarousel}
          sliderWidth={screenWidth}
          sliderHeight={screenWidth}
          itemWidth={screenWidth - 80}
          itemHeight={styles.carouselHeight}
          renderItem={renderItem}
          hasParallaxImages={true}
          onSnapToItem={index => setIndex(index)}
          data={data}
        />
        <Pagination
          dotsLength={data.length}
          activeDotIndex={index}
          carouselRef={isCarousel}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 8,
            backgroundColor: '#F4BB41',
          }}
          tappableDots={true}
          inactiveDotStyle={{
            backgroundColor: 'white',
            // Define styles for inactive dots here
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
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
                fontSize: 8,
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
                fontSize: 10,
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
                    fontFamily: 'NanumGothicBold',
                    justifyContent: 'center',
                    textAlign: 'center',

                    fontSize: 15,
                    width: 50,
                  }}
                >
                  자유
                </Text>
              </TextContainer2>

              <Text
                style={{
                  fontFamily: 'NanumGothicBold',
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
                    fontFamily: 'NanumGothicBold',
                    justifyContent: 'center',
                    textAlign: 'center',
                    fontSize: 15,
                    width: 50,
                  }}
                >
                  공모전
                </Text>
              </TextContainer2>

              <Text
                style={{
                  fontFamily: 'NanumGothicBold',
                  fontSize: 15,
                  textAlign: 'center',
                }}
              >
                - {competitionBoard}
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
                    fontFamily: 'NanumGothicBold',
                    justifyContent: 'center',
                    textAlign: 'center',
                    fontSize: 15,
                    width: 50,
                  }}
                >
                  동아리
                </Text>
              </TextContainer2>

              <Text
                style={{
                  fontFamily: 'NanumGothicBold',
                  fontSize: 15,
                  textAlign: 'center',
                }}
              >
                - {clubBoard}
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
                    fontFamily: 'NanumGothicBold',
                    justifyContent: 'center',
                    textAlign: 'center',
                    fontSize: 15,
                    width: 50,
                  }}
                >
                  취미
                </Text>
              </TextContainer2>

              <Text
                style={{
                  fontFamily: 'NanumGothicBold',
                  fontSize: 15,
                  textAlign: 'center',
                }}
              >
                - {hobbyBoard}
              </Text>
            </View>
          </TouchableOpacity>
        </InnerContainer>
      </BoardContainer>
    </ScrollView>
  );
};

export default Main;

const styles = StyleSheet.create({
  item: {
    width: screenWidth - 60,
    height: 300,
  },

  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
});
