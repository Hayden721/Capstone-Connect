import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
  TextInput,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import { FlatList } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native'; //새로고침 랜더링
import { Ionicons } from '@expo/vector-icons';
import ActionButton from 'react-native-action-button';
import { SearchBar } from '@rneui/themed';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const Board = ({ navigation }) => {
  const isFocused = useIsFocused(); // isFoucesd Define
  const [posts, setPosts] = useState(null);

  useEffect(
    () => {
      getPosts().then(setPosts);
      
    },
    [isFocused]
  );

  const boardCategory = 'Free';
  const db = firebase.firestore();
  async function getPosts() {
    const snapshot = await db
      .collection(dbCategories)
      .orderBy('timestamp', 'desc')
      .get();
    const posts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setData(posts);
    return posts;
  }

  const categories = ['게시판', '취업', '홍보'];

  const [categoryValue, setCategoryValue] = useState('자유');

  let dbCategories = 'Free';
  if (categoryValue == '자유') {
    dbCategories = 'Free';
  } else if (categoryValue == '공모전') {
    dbCategories = 'Competition';
  } else if (categoryValue == '동아리') {
    dbCategories = 'Club';
  } else if (categoryValue == '취미') {
    dbCategories = 'Hobby';
  }
  const [data, setData] = useState(posts);
  const [term, setTerm] = useState('');


  return (
    <View
      style={{
        flexDirection: 'column',
        flex: 1,
      }}
    >
      <View
        style={{
          marginTop: 50,
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            flex: 1,
            marginLeft: 35,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontFamily: 'NanumGothicBold',
              fontSize: 20,
            }}
          >
            {categoryValue}게시판
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("BoardStacks", { screen: '신고' })}
          style={{
            alignItems: 'flex-end',
          }}
        >
          <Ionicons
            name="ios-alert-outline"
            size={24}
            color="black"
            style={{
              marginRight: 10,
            }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          justifyContent: 'space-evenly',
        }}
      >
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              setCategoryValue(categories[index]);
            }}
            style={
              {
                borderWidth:1,
                backgroundColor: categoryValue  == categories[index] ? 'red' : 'transparent',
                borderRadius: 10,

                
              }
            }
          >
            <Text
              style={{
                padding: 10,
                color:"blue",
                fontSize: 19,
                margin: 5,
                borderRadius: 10,
              }}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View
        style={{

        }}
      >
      </View>

      <View
        style={{
          flex: 11,
        }}
      >
        
      </View>

    </View>
  );
};

export default Board;
