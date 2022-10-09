import React, { useState, useEffect, useLayoutEffect, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Text, FlatList } from 'react-native';
import { Input } from '../../components';
import { Alert } from 'react-native';
import { GiftedChat, Send } from 'react-native-gifted-chat';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../styles/theme';
import { DB, createMessage, getCurrentUser } from '../../utils/firebase';
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
  const {uid, name, photoUrl} = getCurrentUser();
  const theme = useContext(ThemeContext);

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
      <GiftedChat
        listViewProps={{
          style: {backgorundColor: theme.backgorundColor},
        }}
        placeholderf = "Enter a message..."
        messages={messages}
        user={{ _id: uid, name, avatar:photoUrl }}
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
