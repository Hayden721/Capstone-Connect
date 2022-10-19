import React, { useState, useEffect, useLayoutEffect, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Text, FlatList, TouchableOpacity,View } from 'react-native';
import { Input } from '../../components';
import { Alert } from 'react-native';
import { GiftedChat, Send } from 'react-native-gifted-chat';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../styles/theme';
import { DB, createMessage, getCurrentUser, } from '../../utils/firebase';
import firebases from 'firebase/app';
const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;
const SendButton = props => {
  const theme = useContext(ThemeContext);

  return (
    <Send
      {...props}
      disabled={!props.text}
      containerStyle={{
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 4,
      }}
    >
      <MaterialIcons
        name="send"
        size={24}
        color={
          props.text ? theme.sendButtonActivate : theme.sendButtonInactivate
        }
      />
    </Send>
  );
};




//-------------
const Channel = ({ navigation, route: { params } }) => {
  const [messages, setMessages] = useState([]);
  const {uid} = getCurrentUser();
  const theme = useContext(ThemeContext);
  const [pohtoUrl, setPhotoUrl] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [hostAdmin, setHostAdmin] = useState(false);
  const cu = firebases.auth().currentUser.email;
  useEffect(() => {
    const unsubscribe = DB.collection('channels')
      .doc(params.id)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const list = [];
        snapshot.forEach(doc => {
          list.push(doc.data());
        });
        setMessages(list);
      });
    return () => unsubscribe();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: params.title || 'ChatChannel' });
  }, []);


  DB.collection('users')
  .where('email', '==', firebases.auth().currentUser.email )
  .get()
  .then(result => {
    //users 컬렉션 이메일과 현재 유저의 이메일을 비교하여 이름과 학번을 추출
    result.forEach(doc => {
      setPhotoUrl(doc.data().photoURL);
      setDisplayName(doc.data().displayName);
      
    });
  });

    //hostAdmin  찾기   
    DB.collection("channels").where('id', '==', params.id).where('hostAdmin', '==',cu)
    .get()
    .then(result => {
      result.forEach(doc => {
        setHostAdmin(true);
      });
    });
  
    const ChatRoomDelete = () => {
      DB.collection("channels").doc(params.id)
      .delete()
      .then(() => {
        Alert.alert('삭제', '채팅방을 삭제했습니다.');
        navigation.navigate('Tabs', {screen:"Chat"});
      })
    };

    const ChatRoomExit = () => {
     // DB.collection("channels").doc(params.id)
    };







  const _handleMessageSend = async messageList => {
    const newMessage = messageList[0];
    try {
      await createMessage({ channelId: params.id, message: newMessage});
    } catch (e) {
      Alert.alert('Send Message Error', e.message);
    }
  };

  //navigation.navigate("ChatStack", {screen:"ChannelCreation"})
  return (
    <Container>
       {hostAdmin == true && (
      <View>
      <TouchableOpacity onPress = {()=> ChatRoomDelete()}>
        <Text> 채팅방 삭제</Text>
      </TouchableOpacity>
      </View>
       )}
      <GiftedChat
        listViewProps={{
          style: {backgorundColor: theme.backgorundColor},
        }}
        placeholderf = "Enter a message..."
        messages={messages}
        user={{ _id: uid, name: displayName, avatar:pohtoUrl }}
        onSend={_handleMessageSend}
        alwaysShowSend={true}
        textInputProps={{
          autoCapitalize: 'none',
          autoCorrect: false,
          textContentType: 'none',
          underlioneColorAndroid: 'transparent',
        }}
        multiline={false}
        renderUsernameOnMessage={true}
        scrollToBottom={true}
        renderSend={props => <SendButton {...props}/>}
      />

    </Container>
  );
};

export default Channel;
