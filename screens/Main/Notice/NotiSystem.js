import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Pressable,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import firebase from 'firebase/app';
import { useIsFocused } from '@react-navigation/native';
import { SearchBar } from '@rneui/themed';

const NotiSystem = ({ navigation }) => {
  const isFocused = useIsFocused(); // isFoucesd Define
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    getPosts().then(setPosts);
    setTerm('');
  }, [isFocused]);

  const db = firebase.firestore();
  const currentUser = firebase.auth().currentUser.email;
  const [admin, setAdmin] = useState('');

  db.collection('users') //admin 유저찾기
    .where('email', '==', currentUser)
    .get()
    .then(result => {
      result.forEach(doc => {
        setAdmin(doc.data().admin);
      });
    });

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

  const boardCategory = 'NotiSystem';
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
      navigation.navigate('Stack',{ screen: 'NotiLookUp' , //다른 네비게이터에 파라미터 보내고 싶을때
        params:{
        title: item.title,
        date: item.date,
        writer: item.writer,
        content: item.content,
        photoUrl: item.photoUrl,
        id: item.id,
        boardCategory: boardCategory,
      }}, )
    }
  >
      <View
        style={{
          backgroundColor: '#ffffff',
        }}
      >
        <View
          style={[
            {
              flexDirection: 'row',
              alignItems: 'center',
            }, //Container

            {
              height: 90,
              marginHorizontal: 10,
              borderBottomWidth: 1,
            },
          ]} // box
        >
          <View
            style={[
              {
                flexDirection: 'column',
                flex: 1,
              }, //Container2

              {
                flex: 4,
              },
            ]} // title
          >
            <Text
              style={{
                fontFamily: 'NanumGothicBold',
                fontSize: 20,
              }} // font
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
              <Text
                style={{
                  fontSize: 11,
                }}
              >
                {item.date}
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 2,
              alignItems: 'center',
            }} //pickture
          >
            <Image
              source={{
                uri: item.photoUrl,
              }}
              style={{
                width: 70,
                height: 70,
              }}
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
          backgroundColor: '#ffffff',
        }}
      >
      <View
        style={{
          marginLeft: 5,
          marginRight: 10,
          padding: 8,
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
      </View>
      </View>
      <View>
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          initialNumToRender={10} //최초 랜더링 갯수
          maxToRenderPerBatch={10} //스크롤시 랜더링 갯수
        />
      </View>
      {admin == '1' && (
        <View
          style={{
            flex: 1,
            marginBottom: 10,
          }}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Stack', { screen: 'NotiWrite' })
            }
            style={{
              borderRadius: 20,
              backgroundColor: '#485460',
              alignItems: 'center',
              justifyContent: 'center',
              height: 50,
              marginHorizontal: 60,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'white',
              }}
            >
              글작성
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default NotiSystem;