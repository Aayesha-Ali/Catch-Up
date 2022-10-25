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
import ResetPasswordScreen from "./screens/ResetPasswordScreen/ResetPasswordScreen";

import { usePushUserLocationUpdates } from "./hooks/usePushUserLocationUpdates";
import { LocationContextProvider } from "./screens/RestaurantScreen/location/location.context";
import { RestaurantsContextProvider } from "./screens/RestaurantScreen/restaurants.context";
import { FavouritesContextProvider } from "./components/Favourites/favourites.context";
import { Navigation } from "./navigation";

if (!global.btoa) {
	global.btoa = encode;
}
if (!global.atob) {
	global.atob = decode;
}

const Stack = createStackNavigator();
const FriendsStack = createStackNavigator();

const Tab = createBottomTabNavigator();

export default function App() {
	const [userLogged, setUserLogged] = useState(false);

	const [user, setUser] = useState(null);

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
				<FavouritesContextProvider>
					<LocationContextProvider>
						<RestaurantsContextProvider>
							<Navigation />
						</RestaurantsContextProvider>
					</LocationContextProvider>
				</FavouritesContextProvider>
			)}
		</ThemeProvider>
	);
}
