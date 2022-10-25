import React, { useEffect, useState } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { firebase } from "../config";

export default function Chat(props) {
  const [messages, setMessages] = useState([]);
  const db = firebase.firestore().collection("chats");
  var hash = require("object-hash");

  // Sender
  const currentUser = {
    _id: firebase.auth().currentUser.uid,
    name: "Me",
    avatar: "",
  };

  // Receiver
  const otherUser = {
    _id: props.route.params.user.id,
    name: props.route.params.user.username,
    avatar: "",
  };

  const chatId = [currentUser._id, otherUser._id].sort().join("_");

  // Get chat from firebase
  // Get result of filtered currentUser's id와 otherUser's id
  // transform react-gifted-chats' messages
  const loadMessages = async () => {
    const messages_snapshot = await db.doc(chatId).get();
    if (messages_snapshot.exists) {
      const _messages = messages_snapshot.data().messages.map((message) => {
        return {
          _id: message.id,
          createdAt: message.sent_at.toDate(),
          text: message.message,
          user: currentUser._id === message.user ? currentUser : otherUser,
        };
      });
      _messages.sort((a, b) => b.createdAt - a.createdAt);
      setMessages(_messages);
    } else {
      db.doc(chatId).set({
        messages: [],
      });
    }

    const observer = db.doc(chatId).onSnapshot(
      (docSnapshot) => {
        if (docSnapshot.exists) {
          const _messages = docSnapshot.data().messages.map((message) => {
            return {
              _id: message.id,
              createdAt: message.sent_at.toDate(),
              text: message.message,
              user: currentUser._id === message.user ? currentUser : otherUser,
            };
          });
          _messages.sort((a, b) => b.createdAt - a.createdAt);
          setMessages(_messages);
          console.log(`Received doc snapshot: ${docSnapshot.data()}`);
        } else {
          console.log("docSnapshot.data()");
        }
      },
      (err) => {
        console.log(`Encountered error: ${err}`);
      }
    );
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const onSend = (messages = []) => {
    // Get message from GiftedChat
    // Ref: https://github.com/FaridSafi/react-native-gifted-chat#message-object
    const message = messages[0];
    const { createdAt, text } = message;

    // append messages immediately
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, message)
    );
    const messageToAdd = {
      message: text,
      sent_at: createdAt,
      user: currentUser._id,
    };

    // save messages to firebase
    db.doc(chatId).update({
      messages: firebase.firestore.FieldValue.arrayUnion({
        id: hash(messageToAdd),
        ...messageToAdd,
      }),
    });
  };

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={onSend}
      user={currentUser}
    />
  );
}
