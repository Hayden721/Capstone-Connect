import * as firebase from 'firebase';
import 'firebase/firestore';
import config from '../firebase.json';
//로그인
const app = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
const Auth = app.auth();

export const DB = firebase.firestore();

export const getCurrentUser = () => {
  const { uid, displayName, email, photoURL } = Auth.currentUser;
  return { uid, name: displayName, email, photoUrl: photoURL };
};

export const createChannel = async ({ title, description }) => {
  const newChannelRef = DB.collection('channels').doc();
  const id = newChannelRef.id;
  const newChannel = {
    id,
    title,
    description,
    createdAt: Date.now(),
  };
  await newChannelRef.set(newChannel);
  return id;
};

export const logout = async () => {
  return await Auth.signOut();
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