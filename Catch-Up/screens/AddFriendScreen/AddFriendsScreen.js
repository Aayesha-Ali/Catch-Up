import React, { useState, useEffect } from "react";
import { FlatList, SafeAreaView, TextInput, Text } from "react-native";
import searchFriends from "../../components/searchFriends";
import styles from "./styles";
import { queryUsersByEmail } from "../../components/searchUserQuery";
import SearchBar from "../../components/searchBar";

export default function AddFriendsScreen() {
  const [textInput, setTextInput] = useState('');
  const [searchUsers, setSearchUsers] = useState([]);
  const [searchPhrase, setSearchPhrase] = useState("");
const [clicked, setClicked] = useState(false);

  useEffect(() => {
    console.log(textInput)
    queryUsersByEmail(textInput)
    .then(setSearchUsers)
  }, [textInput])

  return (
    <SafeAreaView style={styles.container}>
       <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
      
      <FlatList
        data={searchUsers}
        renderItem={searchFriends}
        keyExtractor={(item => item)}
        />
    </SafeAreaView>
  )
}