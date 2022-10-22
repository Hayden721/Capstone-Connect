import React, { useState, useEffect, useLayoutEffect, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Text, FlatList, TouchableOpacity, View } from 'react-native';
import { Input } from '../../components';
import { Alert } from 'react-native';
import { GiftedChat, Send, Actions, Bubble } from 'react-native-gifted-chat';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../styles/theme';
import { DB, createMessage, getCurrentUser } from '../../utils/firebase';
import firebases from 'firebase/app';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

const Channel = ({ navigation, route: { params } }) => {

const [msgPhotoUrl, setMsgPhotoUrl] = useState(null);
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions(); //권한 요청을 위한 hooks
function renderBubble(props) {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: '#1e272e',
        },
      }}
      textStyle={{
        right: {
          color: '#FFFFFF',
        },
      }}
    />
  );
}

const renderActions = (props) => {
  
  return (
    <Actions
    {...props}
            // containerStyle={{
      //   width: 70,
      // }}
      icon={() => (
        <Ionicons
          name={"add"}
          size={30}
          color={"black"}

        />
      )}
    options={{
      ['Image']: async props => {
        // 권한 확인 코드: 권한이 없으면 물어보고, 승인하지 않으면 종료
    if (!status?.granted) {
      const permission = await requestPermission();
      if (!permission.granted) {
        return null;
      }
    }
    // 이미지 업로드 기능
    const imageData = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
      aspect: [1, 1],
    });
    if (imageData.cancelled) {
      return null; //이미지 업로드 취소
    }

    console.log(imageData);

    //파이어베이스 스토리지 업로드
    let uri = imageData.uri;
    const filename = imageData.uri.split('/').pop();
    // const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    const reference = firebases
      .storage()
      .ref()
      .child('ChatImages/' + filename);
    await reference
      .put(blob)
      .then(() => {
        console.log('성공');
      })
      .catch(error => {
        console.log(error);
      });

    //이미지 다운로드 url
    await reference
      .getDownloadURL()
      .then(url => {
        console.log(url);
       setMsgPhotoUrl(url);
        Alert.alert('업로드 성공', '완료');
      })
      .catch(error => {
        console.log(error);
      });
      },

      Cancel: props => {
        console.log('Cancel');
        setMsgPhotoUrl(null);
      },
    }}
    onSend={_handleMessageSend}
  />
);
};

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
  const [messages, setMessages] = useState([]);
  const { uid } = getCurrentUser();
  const theme = useContext(ThemeContext);
  const [pohtoUrl, setPhotoUrl] = useState('');
  const [displayName, setDisplayName] = useState('');
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
    .where('email', '==', firebases.auth().currentUser.email)
    .get()
    .then(result => {
      //users 컬렉션 이메일과 현재 유저의 이메일을 비교하여 이름과 학번을 추출
      result.forEach(doc => {
        setPhotoUrl(doc.data().photoURL);
        setDisplayName(doc.data().displayName);
      });
    });

  //hostAdmin  찾기
  DB.collection('channels')
    .where('id', '==', params.id)
    .where('hostAdmin', '==', cu)
    .get()
    .then(result => {
      result.forEach(doc => {
        setHostAdmin(true);
      });
    });

  const ChatRoomDelete = () => {
    DB.collection('channels')
      .doc(params.id)
      .delete()
      .then(() => {
        Alert.alert('삭제', '채팅방을 삭제했습니다.');
        navigation.navigate('Tabs', { screen: 'Chat' });
      });
  };


  const _handleMessageSend = async messageList => {
    const newMessage = messageList[0];
    try {
      await createMessage({ channelId: params.id, message: newMessage, image:msgPhotoUrl});
      setMsgPhotoUrl(null);
    } catch (e) {
      Alert.alert('Send Message Error', e.message);
    }
    
  };

  //navigation.navigate("ChatStack", {screen:"ChannelCreation"})
  return (
    <Container>
      {hostAdmin == true && (
        <View>
          <TouchableOpacity onPress={() => ChatRoomDelete()}>
            <Text> 채팅방 삭제</Text>
          </TouchableOpacity>
        </View>
      )}
      <GiftedChat
        listViewProps={{
          style: { backgorundColor: theme.backgorundColor },
        }}
        placeholderf="Enter a message..."
        messages={messages}
        user={{ _id: uid, name: displayName, avatar: pohtoUrl }}
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
        renderSend={props => <SendButton {...props} />}
        renderActions={() => renderActions()}
        renderBubble={renderBubble}
      />
    </Container>
  );
};

export default Channel;