import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
//로그인



export const DB = firebase.firestore();

export const createChannel = async ({ title, description }) => {
  const newChannelRef = DB.collection('channels').doc();
  const id = newChannelRef.id;
  const newChannel = {
    id,
    title,
    description,
    createdAt:Date.now(),
  };
  await newChannel.set(newChannel);
  return id;
};

