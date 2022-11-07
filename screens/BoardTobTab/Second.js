import React from 'react';
import { View, Text, TouchableOpacity, BoardTouchable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Linking } from 'react-native';
import { RNCarousel } from 'react-native-carousel-cards';

export default class App extends React.Component {
  render() {
    return (
      <View>
        <View style={{ marginTop: 5 }}>
          <RNCarousel
            data={[
              {
                url: 'https://cdn.pixabay.com/photo/2018/02/27/10/49/training-3185170_1280.jpg',
              },
              {
                url: 'https://cdn.pixabay.com/photo/2018/05/19/00/53/online-education-3412473_1280.jpg',
              },
              {
                url: 'https://cdn.pixabay.com/photo/2017/10/21/12/36/training-2874597_1280.jpg',
              },
            ]}
          />
        </View>
        <View
          style={[
            {
              height: 55,

              justifyContent: 'center',
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => Linking.openURL('https://jobs.shinhan.ac.kr/')}
          >
            <Text
              style={{
                fontFamily: 'NanumGothicBold',
                padding: 10,
                fontSize: 20,
              }}
            >
              <AntDesign name="smile-circle" size={21} color="blue" />
              <Text> 신한대학교 취창업처 </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
