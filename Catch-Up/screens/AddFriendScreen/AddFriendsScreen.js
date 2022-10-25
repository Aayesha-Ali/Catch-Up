import React, { useState, useEffect } from "react";
import {
  FlatList,
  SafeAreaView,
  TextInput,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./styles";
import queryUsersByFirstName from "../../components/queryUsersByFirstName";

export default function AddFriendsScreen(props) {
  const [otherUsers, setOtherUsers] = useState([]);
  const timeout = React.useRef(null);

  const onHandlerSearchText = (searchText) => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(async () => {
      const queryResults = await queryUsersByFirstName(searchText);
      setOtherUsers(queryResults);
    }, 100);
  };
  /*
    To search the user by first name.
    And it shows the user's first name and last name.
  */
  return (
    <SafeAreaView style={styles.item}>
      <TextInput
        styles={styles.textInput}
        placeholder="Search here..."
        onChangeText={(searchText) => {
          onHandlerSearchText(searchText);
        }}
        style={styles.searchbar}
        textAlign="center"
      />
     
      <FlatList
        data={otherUsers}
        horizontal={false}
        numColumns={1}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              props.navigation.navigate("AddFriendProfile", { uid: item.id })
            }
          >
            <View style={{margin: 30, borderBottomWidth: 2, borderBottomColor: "lightgrey", justifyContent: "center", alignItems: "center"}} >
            <Text style={{fontSize: 20, marginBottom: 5, fontStyle: "bold",}}>{item.username}</Text>
            <Text style={{fontSize: 16, marginBottom: 5, fontStyle: "italic"}}>{item.firstName} {item.lastName} </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
