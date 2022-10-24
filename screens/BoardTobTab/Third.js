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
      <View >
                <View style={{marginTop:5,}}>
        <RNCarousel 
          data={[
            { url: "https://cdn.pixabay.com/photo/2018/10/11/18/34/marketing-3740526_1280.jpg" },
            { url: "https://cdn.pixabay.com/photo/2021/03/08/09/05/marketing-6078538_1280.png" },
            { url: "https://cdn.pixabay.com/photo/2019/04/05/20/46/ppc-4105994_1280.jpg" },
          ]}/>
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
          onPress={() =>
            Linking.openURL('https://www.shinhan.ac.kr/kr/118/subview.do')
          }
        >
            <Text
              style={{
                fontFamily: 'NanumGothicBold', 
                padding:10,
                fontSize: 20,
                
              }}
            >
              <AntDesign name="smile-circle" size={21} color="green" />
               <Text> 신한대학교 홍보관 </Text>
            </Text>
            </TouchableOpacity>
          </View>

 
         </View>     
   
      
  
    )
  }
};
