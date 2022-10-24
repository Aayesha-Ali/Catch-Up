import { Text, View } from "react-native";
import React, {
  useLayoutEffect,
  useEffect,
  useCallback,
  useState,
} from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { firebase } from "../config";
import { doc } from "firebase/firestore";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const db = firebase.firestore().collection("chats");

  // 나 자신 (송신자)
  const currentUser = {
    _id: "9jiEYnmtdLc3TIpGq1RuEudb7aQ2",
    name: "Mark",
    avatar: "",
  };

  // 여기에 상대방 (수신자)
  const destinationUser = {
    _id: "BmE7RdPZpLSx6VI4juAkXBIkzg52",
    name: "Junhyeok",
    avatar: "",
  };

  // 체팅을 firebase에서 가져와서 보여주는 부분 u
  // currentUser의 id와 destinationUser의 id로 필터한 결과 값을 가져와야 함
  // 그리고 react-gifted-chats 스타일의 메시지로 transform
  const loadMessages = async () => {
    const sent_messages_snapshot = await db
      .where("sender", "==", currentUser._id)
      .orderBy("createdAt", "desc")
      .get();

    const received_messages_snapshot = await db
      .where("receiver", "==", currentUser._id)
      .orderBy("createdAt", "desc")
      .get();

    const sent_messages = sent_messages_snapshot.docs
      .filter((doc) => doc.data().receiver != destinationUser.uid)
      .map((doc) => {
        return {
          _id: doc.data().uid,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: destinationUser,
        };
      });

    const received_messages = received_messages_snapshot.docs
      .filter((doc) => doc.data().sender != destinationUser.uid)
      .map((doc) => {
        return {
          _id: doc.data().uid,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: currentUser,
        };
      });

    const _messages = [...sent_messages, ...received_messages];
    _messages.sort((lhs, rhs) => lhs.createdAt < rhs.createdAt);

    setMessages(_messages);
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const onSend = (messages = []) => {
    // 메시지 내용 가져오고
    // Ref: https://github.com/FaridSafi/react-native-gifted-chat#message-object
    const message = messages[0];
    const { createdAt, text } = message;

    // 바로 메시지 append 하고
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [
        { message, sent: true, received: true },
      ])
    );

    // 그리고 Firebase에 저장 해주고
    db.add({
      createdAt: createdAt,
      text: text,
      sender: currentUser._id,
      receiver: destinationUser._id,
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
