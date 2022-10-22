import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  BoardTouchable
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Linking } from 'react-native';
import { RNCarousel } from 'react-native-carousel-cards';

export default class App extends React.Component {
  render() {
    return (
      
      <View>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL('https://jobs.shinhan.ac.kr/')
          }
        >
        <RNCarousel 
          data={[
            { url: "http://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg" },
            { url: "https://cdn.imweb.me/upload/S201910012ff964777e0e3/62f9a36ea3cea.jpg" },
            { url: "https://images.mypetlife.co.kr/content/uploads/2019/09/09152937/blind-dog-2-1024x683.jpg" },
          ]}/>
        </TouchableOpacity>

      </View>
    )
  }
};

    {/* <View
        style={{
          height: 100,
          borderColor: '#111111',
          backgroundColor: '#ffffff',
          borderWidth: 1,
          borderRadius: 10,
          margin:10, marginTop:20
        }}
      >  

        <TouchableOpacity
          onPress={() =>
            Linking.openURL('https://jobs.shinhan.ac.kr/')
          }
        >
         
         <View
            style={[
              {
                height: 35,
                marginHorizontal: 25,
                marginTop: 30,
                
                
              },
            ]}
          >

            <Text
              style={{
                fontFamily: 'NanumGothicBold', 
                fontSize: 25,
              }}
            >
              <AntDesign name="smile-circle" size={21} color="blue" />
               <Text> 신한대학교 취창업처 </Text>
            </Text>
            
          </View>
        </TouchableOpacity>
         </View> */}