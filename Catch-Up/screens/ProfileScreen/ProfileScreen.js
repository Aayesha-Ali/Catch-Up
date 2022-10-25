import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Button,
  StyleSheet,
  Image,
  Text,
} from "react-native";
import { firebase } from "../../config";

export default function ProfileScreen(props) {
  //const user = props.route.params.user
  const [user, setUser] = useState([]);

  useEffect(() => {
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
    
  }, [props.route.params.uid]);

  
  return (
    <SafeAreaView>
      <View>
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
        </View>
        <Button
          title="CHAT"
          onPress={() => Alert.alert("you can chat to your friend")}
        />
        <Button
          title="MAP"
          onPress={() => Alert.alert("you can go to map to invite friends")}
        />
      </View>
    </SafeAreaView>
  );
}
