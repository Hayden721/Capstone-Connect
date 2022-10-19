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
import { useIsFocused } from '@react-navigation/native';
import ActionButton from 'react-native-action-button';
import { SearchBar } from '@rneui/themed';
const Board_competition = ({ navigation }) => {
  const isFocused = useIsFocused(); // isFoucesd Define
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    getPosts().then(setPosts);
    setTerm('');
  }, [isFocused]);

  const boardCategory = 'Competition';
  const db = firebase.firestore();
  async function getPosts() {
    const snapshot = await db
      .collection(boardCategory)
      .orderBy('timestamp', 'desc')
      .get();
    const posts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setData(posts);
    return posts;
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
    <Pressable
      onPress={() =>
        navigation.navigate('글조회', {
          title: item.title,
          date: item.date,
          writer: item.writer,
          content: item.content,
          photoUrl: item.photoUrl,
          id: item.id,
          boardCategory: boardCategory,
        })
      }
    >
      <View
        style={{
          backgroundColor: '#ffffff',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: 90,
            marginHorizontal: 10,
            borderBottomWidth: 1,
          }}
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
              <Text style={{ fontSize: 11 }}> || </Text>
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
              style={{ width: 70, height: 70 }}
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
        flex: 2,
      }}
    >
      <SearchBar
        placeholder="알아검색해"
        onChangeText={text => {
          searchName(text);
        }}
        value={term}
        platform="ios"
      />
      <View
        style={{
          flex: 11,
        }}
      >
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>

      <ActionButton
        buttonColor="rgba(231,76,60,1)"
        onPress={() => {
          navigation.navigate('BoardStacks', { screen: '글쓰기' });
        }}
      />
    </View>
  );
};

export default Board_competition;
