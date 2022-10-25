import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect, useContext } from "react";
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
import Chat from "./components/Chat";
import RestaurantScreen from "./screens/RestaurantScreen/RestaurantScreen";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import MapScreen from "./screens/MapScreen/MapScreen";
import AddFriendProfile from "./screens/AddFriendProfileScreen/AddFriendProfile";
import friendRequestScreen from "./screens/FriendRequestScreen/FriendRequestScreen";
import { usePushUserLocationUpdates } from "./hooks/usePushUserLocationUpdates";
import ReviewScreen from "./screens/ReviewScreen/ReviewScreen";
import UserProfileScreen from "./screens/UserProfileScreen/UserProfileScreen";
import { Ionicons } from "@expo/vector-icons";

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

	const TAB_ICON = {
		Restaurant: "md-restaurant",
		Map: "md-map",
		Settings: "md-settings",
		Friends: "md-people",
	};

	const createScreenOptions = ({ route }) => {
		const iconName = TAB_ICON[route.name];
		return {
			tabBarIcon: ({ size, color }) => (
				<Ionicons name={iconName} size={size} color={color} />
			),
		};
	};

	usePushUserLocationUpdates(user);

	useEffect(() => {
		const usersRef = firebase.firestore().collection("users");
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				usersRef
					.doc(user.uid)
					.get()
					.then((document) => {
						const userData = document.data();
						setUser({
							...userData,
							id: user.uid,
						});
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
					<Tab.Navigator
						screenOptions={createScreenOptions}
						tabBarOptions={{
							activeTintColor: "tomato",
							inactiveTintColor: "gray",
						}}
					>
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
			<FriendsStack.Screen
				name="AddFriendProfile"
				component={AddFriendProfile}
			/>
			<FriendsStack.Screen name="Chat" component={Chat} />
			<FriendsStack.Screen name="Add Friends" component={AddFriendsScreen} />
			<FriendsStack.Screen
				name="Friend Requests"
				component={friendRequestScreen}
			/>
			<FriendsStack.Screen name="Map" component={MapScreen} />
		</FriendsStack.Navigator>
	);
};
const SettingsNavigator = () => {
	return (
		<SettingsStack.Navigator screenOptions={{ headerShown: false }}>
			<SettingsStack.Screen name="Settings" component={HomeScreen} />
			<SettingsStack.Screen name="My Profile" component={UserProfileScreen} />
			<SettingsStack.Screen name="Map" component={MapScreen} />
			<SettingsStack.Screen name="Review" component={ReviewScreen} />
		</SettingsStack.Navigator>
	);
};
