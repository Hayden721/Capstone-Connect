import { View, Text,TouchableOpacity,StyleSheet, Image} from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import firebase from 'firebase/app';
import { FlatList } from 'react-native-gesture-handler';

const Board_whole = ({navigation}) => {

  const [posts, setPosts] = useState(null);

  useEffect(() =>{
    getPosts().then(setPosts);
  }, []);


  const db = firebase.firestore();
  
   async function getPosts () {
    const snapshot = await db.collection("Free").orderBy("timestamp", "desc").get();
    const posts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
   return posts;
   }
  
   const renderItem = ({item}) => (
    <View style = {[styles.container, styles.box]}>
          <View style = {[styles.container2, styles.title]}>
            <Text style= {styles.font}>{item.title}</Text>
            <View style= {[styles.container, {marginTop:5}]}>
              <Text style={{fontSize : 11}}>{item.date}</Text>
              <Text style={{fontSize : 11}}> || </Text>
              <Text style={{fontSize : 11}}>{item.writer}</Text>
            </View>
          </View>
          <View style= {styles.pickture}>
            <Image source = {{uri:item.photoUrl}} 
              style={{width: 70 , height: 70,} }
              resizeMethod="resize"
              resizeMode="cover"
              />  
          </View>
      </View>
        
  );

  return (
    <View style = {styles.container2}>
      <View style= {styles.flatlist}>
      <FlatList 
      data = {posts}
      renderItem={renderItem}
      keyExtractor={(item)=> item.id}
      />
      </View>
      <View style= {styles.write}>
       <TouchableOpacity onPress={() => navigation.navigate("글작성")} style={styles.icon}>
        <AntDesign name="pluscircle" size={50} color="black" />
        </TouchableOpacity>
       </View> 
    </View>
    
  )
}




export default Board_whole

const styles = StyleSheet.create({

  icon: {
    
 },
  container: {
    flexDirection: 'row',
    alignItems:"center",
  },
  box:{
    height: 90,
    marginHorizontal: 20,
    borderTopWidth:0.5,
    borderBottomWidth:0.5
  }
  ,
  container2:{
    flexDirection: "column",
    flex:1
  },
  title:{
    flex:4
  },
  pickture:{
    flex: 2,
    alignItems:"center",
  },
  font:{
    fontFamily:"NanumGothicBold",
    fontSize:20
  },
  flatlist:{
    flex:11
  },
  write:{
    flex: 1,
    marginLeft: 20
  }
  
})
