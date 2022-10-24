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

 const acceptFriendRequest = async(id) => {

  firebase.firestore().collection('users')
  .doc(firebase.auth().currentUser.uid)
  .collection('friends')
  .doc(id)
  .set({
    isFriend: true,
  });

  firebase.firestore().collection('users')
  .doc(id)
  .collection('friends')
  .doc(firebase.auth().currentUser.uid)
  .set({
    isFriend: true,
  });

  firebase.firestore().collection('users')
  .doc(firebase.auth().currentUser.uid)
  .collection('pendingFriendRequests')
  .doc(id)
  .delete()
}

const deleteFriendRequest = async(id) => {
  firebase.firestore().collection('users')
 .doc(firebase.auth().currentUser.uid)
 .collection('pendingFriendRequests')
 .doc(id)
 .delete()
}

  return (
    <View>
      <FlatList
        data={pendingUsers}
        numColumns={1}
        renderItem={({ item }) => (
          <View style={styles.item} >
            <Text style={styles.username}>{item.username}</Text>
            <Text style={styles.name}>{item.firstName} {item.lastName} <Button title= "Accept" onPress={() => acceptFriendRequest(item.id)}/>  <Button title="Decline" onPress={() => deleteFriendRequest(item.id)}/></Text>

            </View>
        )}/>
    </View>
  );
};
export default FriendRequestScreen;

