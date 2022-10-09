import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";

export default function ChatScreen({ user }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {}, []);
  const onSend = (messageArray) => {
    const msg = messageArray[0];
    const msgFromMe = {
      ...msg,
      sentFromUser: user.uid,
      sentTo: uid,
      createdAt: new Date(),
    };
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, msgFromMe)
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: "1",
        }}
      />
    </View>
  );
}
