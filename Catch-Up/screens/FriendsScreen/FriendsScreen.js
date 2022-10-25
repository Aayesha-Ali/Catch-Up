import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { firebase } from "../../config";
import styles from "../LoginScreen/styles";
import SearchBar from "../../components/searchBar";
const FriendsScreen = (props) => {
  const AddFriends = () => {
    navigation.navigate("Add Friends");
  };

  const FriendRequests = () => {
    console.log(data);
    navigation.navigate("Friend Requests", { users: data });
  };

  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState([]);
  const [friends, setFriends] = useState([]);
  const users = firebase.firestore().collection("users");

  useEffect(() => {
    const loadData = async () => {
      users.onSnapshot((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          const { username, firstName, lastName } = doc.data();
          data.push({
            id: doc.id,
            username,
            firstName,
            lastName,
          });
        });
        setData(data);
      });
    };
    loadData();
  }, []);

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("friends")
      .onSnapshot((querySnapshot) => {
        const friends = [];
        querySnapshot.forEach((doc) => {
          friends.push(doc.id);
        });
        setFriends(friends);
      });
  }, []);

  const displayFriend = data.filter((user) => friends.includes(user.id));
  console.log(displayFriend);

  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={() => AddFriends()}>
        <Text style={styles.buttonTitle}>Add Friend</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => FriendRequests()}>
        <Text style={styles.buttonTitle}>Friend Requests</Text>
      </TouchableOpacity>

      <SafeAreaView style={styles.root}>
        {!clicked}
        <SearchBar
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
          clicked={clicked}
          setClicked={setClicked}
        />
      </SafeAreaView>

      <FlatList
        data={displayFriend}
        numColumns={1}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              // props.navigation.navigate("Profile", { uid: item.id })
              props.navigation.navigate("Profile", { user: item })
            }
          >
            <View
              style={{
                margin: 30,
                borderBottomWidth: 2,
                borderBottomColor: "lightgrey",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{ fontSize: 16, marginBottom: 5, fontStyle: "italic" }}
              >
                {item.username}
              </Text>
              <Text
                style={{ fontSize: 16, marginBottom: 5, fontStyle: "italic" }}
              >
                {item.firstName} {item.lastName}{" "}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
export default FriendsScreen;
