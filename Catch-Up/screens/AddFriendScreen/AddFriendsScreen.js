import React, { useState, useEffect} from "react";
import { FlatList, SafeAreaView, TextInput, Text, TouchableOpacity} from "react-native";
import styles from "./styles";
import queryUsersByFirstName from "../../components/queryUsersByFirstName";
import { firebase } from "../../config";

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

  return (
    <SafeAreaView style={styles.item}>
      <TextInput  styles={styles.textInput}
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
        
          <TouchableOpacity style={styles.button}
          onPress={() => props.navigation.navigate("AddFriendProfile", {uid: item.id})}>
            <Text style={styles.username}>{item.username}</Text>
            <Text style={styles.name}>
              
              {item.firstName + " " + item.lastName}    
              </Text>     
                </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
        }