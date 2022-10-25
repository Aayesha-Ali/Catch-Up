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
  const user = props.route.params.user;
  // const [user, setUser] = useState([]);

  const removeFriend = () => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("friends")
      .doc(props.route.params.uid)
      .delete()
      .then(() => {
        console.log("Friend has been removed");
        Alert.alert("Friend has been removed");

      })

       firebase
      .firestore()
      .collection("users")
      .doc(props.route.params.uid)
      .collection("friends")
      .doc(firebase.auth().currentUser.uid)
      .delete();
      
    props.navigation.navigate("My Friends List");
  };
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
      
      <View style={{flex: 1, alignItems: "center", marginTop: 20}}>
          <Text style={{fontSize: 16, color: '#2e2e2d'}}>
            Already got an account?{" "}
            <Text onPress={removeFriend} style={{color: "red", fontWeight: "bold",fontSize: 16}}>
              Log in
            </Text>
          </Text>
     
        </View>
        <Button
          title="CHAT"
          onPress={() => props.navigation.navigate("Chat", { user })}
        />
        <Button
          title="MAP"
          onPress={() => Alert.alert("you can go to map to invite friends")}
        />


      
        </View>

        <View style={{ alignItems: "center", marginTop: 20}}>
          <Text style={{fontSize: 16, color: '#2e2e2d'}}>
            <Text onPress={removeFriend} style={{color: "red", fontWeight: "bold",fontSize: 16}}>
              Remove Friend
            </Text>
          </Text>
     
        </View>
    </SafeAreaView>
  );
}
