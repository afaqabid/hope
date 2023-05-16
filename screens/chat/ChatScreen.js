import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
  TextInput,
} from "react-native";
import {
  Avatar,
  Provider as PaperProvider,
  Text,
  Appbar,
  IconButton,
} from "react-native-paper";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { GiftedChat } from "react-native-gifted-chat";
import { useEffect } from "react";
import { useState } from "react";
import { useCallback } from "react";
import { auth, db, dbStore } from "../../firebase";
import { addDoc, collection, doc, onSnapshot, orderBy, setDoc, subcollection } from "firebase/firestore";
import { useLayoutEffect } from "react";
import { query } from "firebase/database";



export default function ChatScreen({ route }) {
  console.log(route.params);
  const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: 'Hello developer',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //     },
  //   ])
  // }, [])
 
  // useLayoutEffect(()=>{
  //   const unsubscribe = db.collection('chats').orderBy('createdAt', desc).onSnapshot(snapshot=>setMessages(
  //     snapshot.docs.map(doc=>({
  //       _id:doc.data()._id,
  //       createdAt:doc.data().createdAt.toDate(),
  //       text:doc.data().text,
  //       user:doc.data().user

  //     }))
  //   ))
  //   return unsubscribe;
  // }, [])


  useLayoutEffect(() => {
    const q = query(collection(dbStore, "chats"+"/"+"afaqabid" +"/" + "rehmozahmad"), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
          name: doc.data().name
        }))
      );
    });

    return () => {
      unsubscribe();
    };
  }, []);


  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    const {
      _id,
      createdAt,
      text,
      user,

    } = messages[0]

  //   addDoc(collection(dbStore, "chats"), {
  //     _id,
  //     createdAt,
  //     text,
  //     user
  // });

  addDoc(collection(dbStore, "chats"+"/"+"afaqabid" +"/" + "rehmozahmad"), {
    _id,
    createdAt,
    text,
    user
});



  }
  
  , [])
  console.log(route);

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={messages => onSend(messages)}
      user={{
        _id: auth.currentUser.email,
        name: auth.currentUser.displayName
      }}
    />  );
}

const styles = StyleSheet.create({
  header: {
    paddingLeft: 15,
    backgroundColor: "#FDFAF6",
  },
  mainContainer: {
    height: "100%",
  },
  mainScreen: {
    height: "78%",
    display: "flex",
    flexDirection: "row",
  },
  inputScreen: {
    backgroundColor: "#FDFAF6",
    display: "flex",
    flexDirection: "row",
    height: 100,
  },
  userInput: {
    width: "80%",
    height: 40,
    marginLeft: 15,
    padding: 10,
    marginTop: 10,
    maxHeight: 40,
    borderRadius: 70,
    borderTopLeftRadius: 70,
    borderTopRightRadius: 70,
    backgroundColor: "#F0F1F4",
    fontFamily: "Manrope-Bold",
    fontSize: 15,
  },
});
