import {Text, View, FlatList, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { firebase } from "../../config";
import styles from "./styles";

const FriendRequestScreen = (props) => {
  const [data, setData] = useState([]);
  const users = props.route.params.users;
  
  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("pendingFriendRequests")
      .onSnapshot((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push(
            doc.id,
          );
        });
        setData(data);
      }); 
  }, []);


  const pendingUsers = users.filter((user) => data.includes(user.id));
 console.log(pendingUsers);

  return (
    <View>
      <FlatList
        data={pendingUsers}
        numColumns={1}
        renderItem={({ item }) => (
          <View style={styles.item} >
            <Text style={styles.username}>{item.username}</Text>
            <Text style={styles.name}>{item.firstName} {item.lastName} <Button title="Accept"/>  <Button title="Decline"/></Text>

            </View>
        )}/>
    </View>
  );
};
export default FriendRequestScreen;

