import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import { firebase } from "./config";
import { decode, encode } from "base-64";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./navigation/theme";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
	useFonts as useOswald,
	Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";

import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegistrationScreen from "./screens/RegistrationScreen/RegistrationScreen";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen/ResetPasswordScreen";
import FriendsScreen from "./screens/FriendsScreen/FriendsScreen";
import AddFriendsScreen from "./screens/AddFriendScreen/AddFriendsScreen";
import RestaurantScreen from "./screens/RestaurantScreen/RestaurantScreen";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import MapScreen from "./screens/MapScreen/MapScreen";

if (!global.btoa) {
	global.btoa = encode;
}
if (!global.atob) {
	global.atob = decode;
}

const Stack = createStackNavigator();
const FriendsStack = createStackNavigator();
const SettingsStack = createStackNavigator();
const Tab = createBottomTabNavigator();

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
	const [oswaldLoaded] = useOswald({
		Oswald_400Regular,
	});

	const [latoLoaded] = useLato({
		Lato_400Regular,
	});

	if (!oswaldLoaded || !latoLoaded) {
		return null;
	}
	return (
		<ThemeProvider theme={theme}>
			{userLogged == false ? (
				<NavigationContainer>
					<Stack.Navigator>
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
					</Stack.Navigator>
				</NavigationContainer>
			) : (
				<NavigationContainer>
					<Tab.Navigator>
						<Tab.Screen name="Restaurant" component={RestaurantScreen} />
						<Tab.Screen name="Friends" component={FriendsNavigator} />
						<Tab.Screen name="Settings" component={SettingsNavigator} />
					</Tab.Navigator>
				</NavigationContainer>
			)}
		</ThemeProvider>
	);
}
const FriendsNavigator = () => {
	return (
		<FriendsStack.Navigator>
			<FriendsStack.Screen name="My Friends List" component={FriendsScreen} />
			<FriendsStack.Screen name="Profile" component={ProfileScreen} />
			<FriendsStack.Screen name="Add Friends" component={AddFriendsScreen} />
			<FriendsStack.Screen name="Map" component={MapScreen} />
		</FriendsStack.Navigator>
	);
};
const SettingsNavigator = () => {
	return (
		<SettingsStack.Navigator>
			<SettingsStack.Screen name="Home" component={HomeScreen} />
			<SettingsStack.Screen name="Profile" component={ProfileScreen} />
			<SettingsStack.Screen name="Map" component={MapScreen} />
		</SettingsStack.Navigator>
	);
};
