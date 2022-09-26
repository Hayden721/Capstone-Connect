import * as firebase from 'firebase';
import 'firebase/firestore';
import config from '../firebase.json';
//로그인
const app = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
const Auth = app.auth();

export const DB = firebase.firestore();

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

export const createMessage = async ({channelId, text}) => {

}