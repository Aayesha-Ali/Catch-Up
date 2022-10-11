import React, { useState } from "react";
import { FlatList, SafeAreaView, TextInput, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ListItem } from "@rneui/themed";
import styles from "./styles";
import queryUsersByFirstName from "../../components/queryUsersByFirstName";

export default function AddFriendsScreen() {
  const [otherUsers, setOtherUsers] = useState([]);
  const timeout = React.useRef(null);

  const onHandlerSearchText = (searchText) => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(async () => {
      const queryResults = await queryUsersByFirstName(searchText);
      setOtherUsers(queryResults);
    }, 100);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Search here..."
        onChangeText={(searchText) => {
          onHandlerSearchText(searchText);
        }}
        style={styles.searchBar}
      />

      <FlatList
        data={otherUsers}
        horizontal={false}
        numColumns={1}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <Text style={styles.user}>
              {item.firstName + " " + item.lastName}
            </Text>
            <ListItem
              key={item.uid}
              // leftAvatar={
              //   {
              //      source: { uri: item.profilePhotoUrl },
              //   }
              // }
              title={item.firstName + " " + item.lastName}
            />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
