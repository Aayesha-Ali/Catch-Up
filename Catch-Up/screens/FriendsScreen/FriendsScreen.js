import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { firebase } from "../../config";
import SearchBar from "../../components/searchBar";
import List from "../../components/filter";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { Entypo, SimpleLineIcons } from "@expo/vector-icons";

const FriendsScreen = () => {
  const AddFriends = () => {
    navigation.navigate("Add Friends");
  };
  const Chat = () => {
    navigation.navigate("Chat");
  };

  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState([]);
  const users = firebase.firestore().collection("users");
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{ marginRight: 10 }} onPress={Chat}>
          <Entypo name="chat" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const loadData = async () => {
      users.onSnapshot((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          const { email, firstName, lastName } = doc.data();
          data.push({
            id: doc.id,
            email,
            firstName,
            lastName,
          });
        });
        setData(data);
      });
    };
    loadData();
  }, []);

  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={() => AddFriends()}>
        <Text style={styles.buttonTitle}>Add Friend</Text>
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

      <List searchPhrase={searchPhrase} data={data} setClicked={setClicked} />
    </View>
  );
};

export default FriendsScreen;

const style = StyleSheet.create({
  container: {
    backgroundColor: "lightgrey",
    padding: 15,
    borderRadius: 15,
    margin: 5,
    marginHorizontal: 10,
  },

  innerContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  email: {
    fontSize: 20,
    fontWeight: "bold",
  },
  name: {
    fontSize: 20,
  },
  root: {
    justifyContent: "center",
    alignItems: "center",
  },
});
