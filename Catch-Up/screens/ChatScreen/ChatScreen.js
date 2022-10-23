import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { firebase } from "../../config";

export default function ChatScreen({ navigation }) {
  const currUser = firebase.auth().currentUser;

  const [users, setUsers] = useState(null);

  const getUsers = async () => {
    const querySanp = await firebase
      .firestore()
      .collection("mcokFriends")
      .where("holder", "==", currUser.email)
      .get();
    const friends = querySanp.docs.map((docSnap) => docSnap.data());
    setUsers(friends);
    console.log(friends.email);
  };

  // const getRecentMessage = async (friendEmail) => {
  //   const querySanp = await firebase
  //     .firestore()
  //     .collection("chats")
  //     .where("sender", "==", currUser.email)
  //     .where("receiver", "==", friendEmail)
  //     .get();
  //   const messages = querySanp.docs.map((docSnap) => docSnap.data());
  //   console.log(messages);
  //   return messages[0].message;
  // };

  useEffect(() => {
    getUsers();
    // getRecentMessage();
  }, []);

  const RenderCard = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Chat", {
            email: item.email,
            id: item.id,
          })
        }
      >
        <View style={styles.mycard}>
          <Image source={{ uri: item.pic }} style={styles.img} />
          <View>
            <Text style={styles.text}>{item.friendsEmail}</Text>
            {/* <Text> {item.message} </Text> */}
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={users}
        renderItem={({ item }) => {
          return <RenderCard item={item} />;
        }}
        keyExtractor={(item) => item.friendsEmail}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  img: { width: 60, height: 60, borderRadius: 30, backgroundColor: "red" },
  text: {
    fontSize: 18,
    marginLeft: 15,
  },
  mycard: {
    flexDirection: "row",
    margin: 3,
    padding: 5,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
});
