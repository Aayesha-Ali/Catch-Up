import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import { firebase } from "./config";

import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegistrationScreen from "./screens/RegistrationScreen/RegistrationScreen";
import HomeScreen from "./screens/HomeScreen/HomeScreen";


const Stack = createStackNavigator();

function App() {
  const [initlizing, setInitilizing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);

    if(initlizing) setInitilizing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if(initlizing) return null;

  if (!user){
    return (
      <Stack.Navigator> 
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Create Account" component={RegistrationScreen}/>
      </Stack.Navigator>
    );
  }

  return  ( 
    <Stack.Navigator> 
      <Stack.Screen name="HomeScreen" component={HomeScreen}/>
    </Stack.Navigator>
);
}



export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  )
}