import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
  TextInput,
  ScrollView
} from 'react-native';
import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import { FlatList } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native'; //새로고침 랜더링
import { Ionicons } from '@expo/vector-icons';
import { SearchBar } from '@rneui/themed';

const MyPost = ({ navigation }) => {
  const isFocused = useIsFocused(); // isFoucesd Define
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    getPosts().then(setPosts);
    setTerm("");
    console.log("zz")
  },[isFocused]);
 

  
  const boardCategory = 'Free';
  const db = firebase.firestore();
  async function getPosts () {
    if (categoryValue== '자유') {
      dbCategories ='Free';
    } else if (categoryValue == '공모전') {
      dbCategories ='Competition';
    } else if (categoryValue == '동아리') {
      dbCategories ='Club';
    } else if (categoryValue == '취미') {
      dbCategories ='Hobby';
    }
    
    const snapshot = await db
      .collection(dbCategories)
      .where('writer', '==', firebase.auth().currentUser.email)
      //.orderBy('timestamp', 'desc')
      .get();
    const posts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setData(posts);
    return posts;
  }

  const categories = [
    '자유',
    '공모전',
    '동아리',
    '취미',
  ];

  //const [categoryValue, setCategoryValue] = useState("자유");
  const [categoryTitle, setCategoryTitle] = useState("자유");
  let categoryValue = "";
  let dbCategories = "Free";
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
              style={{ width: 80, height: 80 }}
              resizeMethod="resize"
              resizeMode="cover"
            />
          </View>
        </View>
    </Pressable>
  );

  return (
    <View
      style={{
        flexDirection: 'column',
        flex: 1,
        backgroundColor:"#ffffff",
      }}>
        <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          
        }}
      >
      </View>
      <View
        style={{
          marginTop: 10,
          flexDirection:"row",
          flex:1,
          justifyContent:"space-evenly"
        }}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>{
              categoryValue = categories[index];
              setCategoryTitle(categories[index]);
              getPosts().then(setPosts)
            }
            }
            style = {{
              height: 60,
              backgroundColor: categoryTitle  == categories[index] ? '#808e9b' : 'transparent',
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
              
            }}>
              <Text 
                style={{
                  padding: 15,
                  fontSize: 19,
                  
                }}>
                {category}
              </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View
        style={{
          marginLeft: 10,
          marginRight: 10,
          padding: 8,
        }}
      >
      <SearchBar
          placeholder="글 제목을 입력해주세요."
          onChangeText={text => {
            searchName(text);
          }}
          value={term}
          platform='ios'
        />
      </View>

      <View
        style={{
          flex: 10
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
    </View>
  );
};

export default MyPost;