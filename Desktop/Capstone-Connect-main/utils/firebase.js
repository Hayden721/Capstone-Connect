import { Alert } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import config from '../firebase.json';
import firebases from 'firebase/app';

//로그인
const app = !firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app();
const Auth = app.auth();
export const DB = firebase.firestore();



export const getCurrentUser = () => {
  const { uid, displayName, email, photoURL } = Auth.currentUser;
  return { uid, name: displayName, email, photoUrl: photoURL };
};


export const createChannel = async ({ title, description }) => {
  const newChannelRef = DB.collection('channels').doc();
  const id = newChannelRef.id;
  const hostAdmin = firebases.auth().currentUser.email;
  const newChannel = {
    id,
    title,
    description,
    createdAt: Date.now(),
    hostAdmin,
  };
  await newChannelRef.set(newChannel);
  return id;
};

export const logout = async () => {
  return await Auth.signOut();
};

const uploadImage = async uri => {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const user = Auth.currentUser;
  const ref = app.storage().ref(`/profile/${user.uid}/photo.png`);
  const snapshot = await ref.put(blob, { contentType: 'image/png' });

  blob.close();
  return await snapshot.ref.getDownloadURL();
};



export const createMessage = async ({ channelId, message }) => {
  return await DB.collection('channels')
    .doc(channelId)
    .collection('messages')
    .doc(message._id)
    .set({
      ...message,
      createdAt: Date.now(),
    });
};

export const boardDelete = ({ boardCategory, userId }) => {
  //글 삭제
  firebase
    .firestore()
    .collection(boardCategory)
    .doc(userId)
    .delete()
    .then(() => {
      Alert.alert('삭제', '게시글을 삭제 완료했습니다.');
    })
    .catch(error => {
      console.error('Error removing document: ', error);
    });
};

export async function getPosts({ boardCategory, userId }) {
  //댓글DB불러오기
  const snapshot = await DB.collection(boardCategory)
    .doc(userId)
    .collection('Comments')
    .orderBy('timestamp', 'desc')
    .get();
  const posts = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
  return posts;
}

export const commentsDelete = ({ boardCategory, userId }, commentsId) => {
  //댓글 삭제
  DB.collection(boardCategory)
    .doc(userId)
    .collection('Comments')
    .doc(commentsId)
    .delete()
    .then(() => {
      Alert.alert('삭제', '댓글 삭제를 완료했습니다.');
    })
    .catch(error => {
      console.error('Error removing document: ', error);
    });
};

export const addComments = ({
  Comments,
  boardCategory,
  userId,
  timestamp,
  date,
  userEmail,
}) => {
  //댓글작성
  if (Comments == '') {
    Alert.alert('댓글작성 실패', '댓글을 입력하세요.');
  } else {
    DB.collection(boardCategory)
      .doc(userId)
      .collection('Comments')
      .add({
        Comments,
        timestamp,
        date,
        userEmail,
      })
      .then(() => {
        console.log('Create Complete!');
        Alert.alert('성공', '글을 작성했습니다.');
      })
      .catch(error => {
        console.log(error.message);
      });
  }
};

export const addText = ({
  navigation,
  category,
  title,
  content,
  timestamp,
  date,
  photoUrl,
  gsp,
}) => {
  //보드 db에 저장
  if (category == '') {
    Alert.alert('글작성 실패', '카테고리를 선택하세요.');
  } else if (title == '') {
    Alert.alert('글작성 실패', '제목을 입력하세요.');
  } else if (content == '') {
    Alert.alert('글작성 실패', '내용을 입력하세요.');
  } else {
    DB.collection(category)
      .add({
        title,
        content,
        timestamp,
        date,
        writer: firebases.auth().currentUser.email,
        photoUrl,
      })
      .then(() => {
        console.log('Create Complete!');
        Alert.alert('성공', '글을 작성했습니다.');
        navigation.reset({
          routes: [
            {
              name: gsp,
            },
          ],
        });
      })
      .catch(error => {
        console.log(error.message);
      });
  }
};

export const addNotice = ({
  navigation,
  category,
  title,
  content,
  timestamp,
  date,
  photoUrl,
}) => {
  //공지 작성
  if (category == '') {
    Alert.alert('글작성 실패', '카테고리를 선택하세요.');
  } else if (title == '') {
    Alert.alert('글작성 실패', '제목을 입력하세요.');
  } else if (content == '') {
    Alert.alert('글작성 실패', '내용을 입력하세요.');
  } else {
    DB.collection(category)
      .add({
        title,
        content,
        timestamp,
        date,
        writer: firebases.auth().currentUser.email,
        photoUrl,
      })
      .then(() => {
        console.log('Create Complete!');
        Alert.alert('성공', '글을 작성했습니다.');
        navigation.goBack();
      })
      .catch(error => {
        console.log(error.message);
      });
  }
};

export const CallBoard = (category, boardCategory) => {
  DB.collection(category)
    .orderBy('timestamp', 'desc')
    .limit(1)
    .get()
    .then(result => {
      //자유게시판에서 최신글 가져오기
      result.forEach(doc => {
        boardCategory(doc.data().title);
      });
    });
};

export const addReport = ({ userName, content, photoUrl, setVisible }) => {
  //보드 db에 저장
  if (userName == '') {
    Alert.alert('신고 실패', '신고할 대상을 입력하세요.');
  } else if (content == '') {
    Alert.alert('신고 실패', '신고사유를 입력하세요.');
  } else {
    DB.collection('Report')
      .add({
        userName,
        content,
        timestamp: firebases.firestore.FieldValue.serverTimestamp(),
        writer: firebases.auth().currentUser.email,
        photoUrl,
      })
      .then(() => {
        console.log('Create Complete!');
        Alert.alert('성공', '글을 작성했습니다.');
        setVisible(false);
      })
      .catch(error => {
        console.log(error.message);
      });
  }
};
