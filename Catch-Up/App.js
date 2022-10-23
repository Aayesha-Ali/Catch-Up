import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect, useContext } from "react";
import { firebase } from "./config";
import { decode, encode } from "base-64";

import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegistrationScreen from "./screens/RegistrationScreen/RegistrationScreen";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen/ResetPasswordScreen";
import FriendsScreen from "./screens/FriendsScreen/FriendsScreen";
import AddFriendsScreen from "./screens/AddFriendScreen/AddFriendsScreen";
import ChatScreen from "./screens/ChatScreen/ChatScreen";
import Chat from "./screens/ChatScreen/Chat";
import ChatRoomScreen from "./screens/ChatScreen/ChatRoomScreen";
import AddChatScreen from "./screens/ChatScreen/AddChatScreen";
import MainChatScreen from "./screens/ChatScreen/MainChatScreen";

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const Stack = createStackNavigator();

export default function App() {
  const [userLogged, setUserLogged] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const usersRef = firebase.firestore().collection("users");
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data();
            setUser(userData);
          })
          .catch((error) => {});
      } else {
      }
    });
  }, []);

  useEffect(() => {
    const authListener = firebase.auth().onAuthStateChanged((user) => {
      setUserLogged(user ? true : false);
    });
    return authListener;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userLogged == false ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen
              name="Create Account"
              title="account"
              component={RegistrationScreen}
            />
            <Stack.Screen
              name="Forgot Password?"
              component={ResetPasswordScreen}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Home">
              {(props) => <HomeScreen {...props} extraData={user} />}
            </Stack.Screen>
            <Stack.Screen name="My Friends List" component={FriendsScreen} />
            <Stack.Screen name="Add Friends" component={AddFriendsScreen} />
            {/* <Stack.Screen name="Chat Screen">
              {(props) => <ChatScreen {...props} extraData={user} />}
            </Stack.Screen> */}
            {/* <Stack.Screen name="Chat" component={Chat} /> */}
            <Stack.Screen name="AddChat" component={AddChatScreen} />
            <Stack.Screen name="Chat" component={ChatRoomScreen} />
            <Stack.Screen name="Main Chat" component={MainChatScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
