import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    Pressable,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { AntDesign } from "@expo/vector-icons";
  import firebase from "firebase/app";
  import { FlatList } from "react-native-gesture-handler";
  import { useIsFocused } from '@react-navigation/native';
  
  const Board_hobby = ({ navigation }) => {
    const isFocused = useIsFocused(); // isFoucesd Define
    const [posts, setPosts] = useState(null);
    useEffect(() => {
      getPosts().then(setPosts);
    }, [isFocused]);
    const boardCategory = "Hobby";
    const db = firebase.firestore();
    async function getPosts() {
      const snapshot = await db
        .collection(boardCategory)
        .orderBy("timestamp", "desc")
        .get();
      const posts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return posts;
    }
  
    const renderItem = ({ item }) => (
      <Pressable
        onPress={() =>
          navigation.navigate("글조회", {
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
        <View style={[styles.container, styles.box]}>
          <View style={[styles.container2, styles.title]}>
            <Text style={styles.font}>{item.title}</Text>
            <View style={[styles.container, { marginTop: 5 }]}>
              <Text style={{ fontSize: 11 }}>{item.date}</Text>
              <Text style={{ fontSize: 11 }}> || </Text>
              <Text style={{ fontSize: 11 }}>{item.writer}</Text>
            </View>
          </View>
          <View style={styles.pickture}>
            <Image
              source={{ uri: item.photoUrl }}
              style={{ width: 70, height: 70 }}
              resizeMethod="resize"
              resizeMode="cover"
            />
          </View>
        </View>
      </Pressable>
    );
    return (
      <View style={styles.container2}>
        <View style={styles.flatlist}>
          <FlatList
            data={posts}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
        <View style={{
        flex: 1,
        marginBottom:10,
      }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("글쓰기")}
          style={{
            borderRadius: 20,
            backgroundColor: "#485460",
            alignItems: "center",
            justifyContent: "center", 
            height: 50,
            marginHorizontal: 60,
          }}
        >
          <Text style={{ 
            fontSize: 20,
            fontWeight:"bold",
            color: "white",
            }}>글작성</Text>
        </TouchableOpacity>
      </View>
      </View>
    );
  };
  
  export default Board_hobby;
  
  const styles = StyleSheet.create({
    icon: {},
    container: {
      flexDirection: "row",
      alignItems: "center",
    },
    searchbar: {
      marginTop: 30,
      padding: 2,
    },
    box: {
      height: 90,
      marginHorizontal: 20,
      borderTopWidth: 0.5,
      borderBottomWidth: 0.5,
    },
    container2: {
      flexDirection: "column",
      flex: 1,
    },
    title: {
      flex: 4,
    },
    pickture: {
      flex: 2,
      alignItems: "center",
    },
    font: {
      fontFamily: "NanumGothicBold",
      fontSize: 20,
    },
    flatlist: {
      flex: 11,
    },
    write: {
      flex: 1,
    },
  });