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
      setTerm('');
    },
    [posts],
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

  const categories = ['자유', '공모전', '동아리', '취미'];

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
  const searchName = text => {
    if (text) {
      const searchData = data.filter(item => {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setPosts(searchData);
      setTerm(text);
    } else {
      setPosts(data);
      setTerm(text);
    }
  };

  const renderItem = ({ item }) => (
    //
    <Pressable
      onPress={() =>
        navigation.navigate(
          'BoardStacks',
          { screen: '글조회' },
          {
            title: item.title,
            date: item.date,
            writer: item.writer,
            content: item.content,
            photoUrl: item.photoUrl,
            id: item.id,
            boardCategory: boardCategory,
          }
        )
      }
    >
      <View
        style={{
          backgroundColor: '#ffffff',
          //배경색
        }}
      >
        <View
          style={[
            {
              flexDirection: 'row',
              alignItems: 'center',
              // 제목, 날짜, 이메일
              height: 90,
              marginHorizontal: 10,
              borderBottomWidth: 1,
              // 아래밑줄
            },
          ]}
        >
          <View
            style={[
              {
                flexDirection: 'column',
                flex: 2,
                // 그림여백
              },
            ]}
          >
            <Text
              style={{
                fontFamily: 'NanumGothicBold',
                fontSize: 20,
              }}
            >
              {item.title}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 5,
              }}
            >
              <Text style={{ fontSize: 11 }}>{item.date}</Text>
              <Text style={{ fontSize: 11 }}> / </Text>
              <Text style={{ fontSize: 11 }}>{item.writer}</Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
            }}
          >
            <Image
              source={{ uri: item.photoUrl }}
              style={{ width: 80, height: 80 }}
              resizeMethod="resize"
              resizeMode="cover"
            />
          </View>
        </View>
      </View>
    </Pressable>
  );

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
          onPress={() => setVisible(true)}
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
                backgroundColor: categoryValue  == categories[index] ? 'black' : 'transparent',
                
              }
            }
          >
            <Text
              style={{
                padding: 10,
                borderWidth: 1,
                borderColor: 'black',
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
        <SearchBar
          placeholder="알아검색해"
          onChangeText={text => {
            searchName(text);
          }}
          value={term}
          platform='ios'
        />
      </View>

      <View
        style={{
          flex: 11,
        }}
      >
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          initialNumToRender={7} //최초 랜더링 갯수
          maxToRenderPerBatch={7} //스크롤시 랜더링 갯수
        />
      </View>
      <ActionButton
        buttonColor="rgba(231,76,60,1)"
        onPress={() => {
          navigation.navigate('BoardStacks', { screen: '글작성' });
        }}
      />
    </View>
  );
};

export default Board;
