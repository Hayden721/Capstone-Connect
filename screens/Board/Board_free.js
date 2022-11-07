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
import ActionButton from 'react-native-action-button';
import { SearchBar } from '@rneui/themed';
const Board_free = ({ navigation }) => {
  const isFocused = useIsFocused(); // isFoucesd Define
  const [posts, setPosts] = useState(null);
  //const [display, setDisplay] = useState(false);
  useEffect(() => {
    getPosts().then(setPosts);
    setTerm('');
  }, [isFocused]);

  const boardCategory = 'Free';
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
    <View style={{ 
            paddingTop: 16,
            margin:10
            }}>

      <View style={{width:"100%", height:200, backgroundColor:"#d2dae2",borderRadius:20}}>
          <View style={{
            paddingHorizontal: 16,
            flexDirection:"row"
          }}>
            <View style={{marginTop:20, height:50,  width:"55%", }}>
              <Text  numberOfLines={1} ellipsizeMode="tail" style={{
                fontSize: 15,
                fontFamily:'NanumGothicBold',
              }}>{item.title}</Text>
              <View style={{justifyContent:"center",height: 100,justifyContent:"flex-start",marginTop:10, width:"70%"}}>
                <Text numberOfLines={3} ellipsizeMode="tail"
                  style={{ 
                    fontSize: 14,
                    lineHeight: 24,
                    marginBottom: 8,
                  }}>
                    {item.content}</Text>
              </View>
              <Text
                style={{
                  color: '#757575',
                  fontSize: 10,
                  lineHeight: 18,}}>
                {item.date}
              </Text>
              <Text
                style={{
                  color: '#757575',
                  fontSize: 10,
                  lineHeight: 18,}}>
                작성자: {item.writer} {}
              </Text>
            </View>
            <View style={{
              flex:1,
              alignItems:"flex-end",
              justifyContent:"center",
              height:200,
            }}>
              <View>
                {item.photoUrl &&(
                  <Image
                    source={{uri:item.photoUrl}}
                    style={{
                      backgroundColor: '#bdbdbd',
                      width:150,
                      height:150,
                      aspectRatio: 1,
                      marginBottom: 16}}
                      resizeMethod="resize"
                      resizeMode="contain"
                  />
                )}
              </View>
            </View>
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
        placeholder="글 제목을 입력해주세요."
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
          initialNumToRender={10} //최초 랜더링 갯수
          maxToRenderPerBatch={10} //스크롤시 랜더링 갯수
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

export default Board_free;