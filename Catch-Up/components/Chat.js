import { Text, View } from "react-native";
import React, {
  useLayoutEffect,
  useEffect,
  useCallback,
  useState,
} from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { GiftedChat } from "react-native-gifted-chat";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../config";

export default function Chat({ navigation }) {
  const [messages, setMessages] = useState([]);
  const db = firebase.firestore();
  const auth = firebase.auth();
  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: "Hello developer",
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: "React Native",
  //         avatar: "https://placeimg.com/140/140/any",
  //       },
  //     },
  //   ]);
  // }, []);
  useLayoutEffect(() => {
    db.collection("chats")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({
            _id: doc.data()._id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user,
          }))
        );
      });
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerRight: () => (
        <View style={{ marginRight: 20 }}>
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign name="infocirlceo" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages).filter(
        // filter out messages that are from the current user
        (message) => message.user._id === auth.currentUser.uid
      )
    );

    const { _id, createdAt, text, user } = messages[0];
    db.collection("chats").add({
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: auth?.currentUser?.email,
        name: auth?.currentUser?.displayName,
        avatar: auth?.currentUser?.photoURL,
      }}
    />
  );
}
