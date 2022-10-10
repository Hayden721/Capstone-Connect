import { Alert } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import config from '../firebase.json';
import firebases from 'firebase/app';


const app = !firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app();
const Auth = app.auth();
export const DB = firebase.firestore();

const resultMessages = {
  'auth/email-already-in-use': '이미 가입된 이메일입니다.',
  'auth/wrong-password': '잘못된 비밀번호입니다.',
  'auth/user-not-found': '존재하지 않는 계정입니다.',
  'auth/invalid-email': '유효하지 않은 이메일 주소입니다.',
  'auth/weak-password': '비밀번호를 6자리 이상 입력해 주세요.',
};
//User related
export const login = async ({email, password}) => {
  firebases
  .auth()
  .signInWithEmailAndPassword(email, password)
  .then(value => {
    if (value.user.emailVerified == false) {
      firebase.auth().signOut(); //이메일 인증 안하면 로그아웃
      Alert.alert('로그인 실패', '이메일 인증 하세요.'); // 이게 안나오고 밑에 알수없는 이유로가 나옴;;
    }
  })
  .catch(error => {
    console.log(error.code);

  });
}

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
  const ref = app.storage().ref(`/profile/${user.stuId}/photo.png`);
  const snapshot = await ref.put(blob, { contentType: 'image/png' });

  blob.close();
  return await snapshot.ref.getDownloadURL();
};

export const signup = async({email, password}) => {
    firebases
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebases
          .auth()
          .currentUser.sendEmailVerification()
          .then(() => {
            console.log("이메일 전송 완료");
          })
          .catch((error) => {
            console.log(error.code);
            Alert.alert("실패", "이메일 전송 실패");
          });
        Alert.alert("회원가입 성공", "회원가입을 축하드립니다. 이메일 인증을 해주세요.");
        firebases.auth().signOut();
      })
      .catch((error) => {
        console.log(error.code);
        const alertMessage = resultMessages[error.code];
        Alert.alert("회원가입 실패", alertMessage);
      });
  } 

export  const PwFind = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert('전송 완료', '이메일을 확인하세요.');
        console.log('비밀번호 전송완료');
      })
      .catch(error => {
        const alertMessage = resultMessages[error.code];
        Alert.alert('비밀번호 찾기 실패', alertMessage);
      });
  };

export const logout = async () => {
  return await Auth.signOut();
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

export const getCurrentUser = () => {
  const {uid, displayName, email, photoURL} = Auth.currentUser;
  return {uid, name:displayName, email, photoUrl:photoURL};
}

export const updateUserPhoto = async photoUrl => {
  const user = Auth.currentUser;
  const storageUrl = photoUrl.startsWith('http') ? photoUrl : await uploadImage(photoUrl);
  await user.updateProfile({photoURL: storageUrl });
  return {name: user.displayName, email: user.email, photoUrl:user.photoURL};
}


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

 export const Profile_Edit = ({photoUrl, userNumber})=>{
   DB.collection("users").doc(userNumber)
   .update({
     photoURL: photoUrl,
   })
   .then(() => {
     console.log('Create Complete!');
     Alert.alert('성공', '프로필을 수정했습니다.');
   })
   .catch(error => {
     console.log(error.message);
   });
 };