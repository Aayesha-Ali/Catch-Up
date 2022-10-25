import { Text, View, Button, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { firebase } from "../../config";

import styles from "./styles";

function AddFriendProfile(props) {
  const [user, setUser] = useState([]);
  const [cancel, setCancel] = useState(null);

  const addFriends = () => {
    firebase
      .firestore()
      .collection("users")
      .doc(props.route.params.uid)
      .collection("pendingFriendRequests")
      .doc(firebase.auth().currentUser.uid)
      .set({
        isFriend: true,
      })
      .then(() => {
        console.log("Friend Request Sent");
        Alert.alert("Friend Request Sent");
      })

  };

  const cancelFriendRequest = () => {
    firebase
      .firestore()
      .collection("users")
      .doc(props.route.params.uid)
      .collection("pendingFriendRequests")
      .doc(firebase.auth().currentUser.uid)
      .delete();
  };

  useEffect(() => {
    const currentUser = props;
    if (props.route.params.uid === firebase.auth().currentUser.uid) {
      setUser(currentUser);
    } else {
      firebase
        .firestore()
        .collection("users")
        .doc(props.route.params.uid)
        .get()
        .then((snapshot) => {
          props.navigation.setOptions({
            title: snapshot.data().firstName,
            id: snapshot.data().id,
            firstName: snapshot.data().firstName,
            lastName: snapshot.data().lastName,
            userame: snapshot.data().userame,
          });
          setUser({ uid: props.route.params.uid, ...snapshot.data() });
        });
    }
  }, [props.route.params.uid]);
  return (
    <View>
      <Text
        style={{
          fontSize: 40,
          fontWeight: "bold",
          textAlign: "center",
          marginTop: 20,
        }}
      >
        {user.username}
      </Text>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          textAlign: "center",
          marginTop: 10,
          marginBottom: 20,
          fontStyle: "italic",
        }}
      >
        {user.firstName} {user.lastName}
      </Text>

      <View>
        {cancel ? (
          <Button
            style={styles.button}
            title="cancel"
            onPress={() => cancelFriendRequest()}
          />
        ) : (
          <Button
            style={styles.button}
            title="add friend"
            onPress={() => addFriends()}
          />
        )}
      </View>
    </View>
  );
}

export default AddFriendProfile;
