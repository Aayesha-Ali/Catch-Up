import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./styles";
import { firebase } from "../../config";
require("firebase/firestore");

export default function HomeScreen({ navigation }) {
	const signOutUser = () => firebase.auth().signOut();

	const signoutPress = () => {
		firebase
			.auth()
			.signOut()
			.then(() => {
				navigation.navigate("Login");
			})
			.catch((e) => {
				console.error("Sign Out Error", e);
			});
	};

	const FriendsList = () => {
		navigation.navigate("My Friends List");
	};

	const navigateRestaurant = () => {
		navigation.navigate("Restaurant");
	};

	const Profile = () => {
		navigation.navigate("Profile");
	};

	const navigateToMap = () => {
		navigation.navigate("Map");
	};
	
	return (
		<View>
			<TouchableOpacity style={styles.button} onPress={() => signOutUser()}>
				<Text style={styles.buttonTitle}>Sign Out</Text>
			</TouchableOpacity>

			<TouchableOpacity style={styles.button} onPress={() => FriendsList()}>
				<Text style={styles.buttonTitle}>Friends List</Text>
			</TouchableOpacity>

			<TouchableOpacity style={styles.button} onPress={() => Profile()}>
				<Text style={styles.buttonTitle}>Profile Screen</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={styles.button}
				onPress={() => navigateRestaurant()}
			>
				<Text style={styles.buttonTitle}>Restaurant List</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={styles.button}
				onPress={() => navigateToMap()}
			>
				<Text style={styles.buttonTitle}>Map</Text>
			</TouchableOpacity>
		</View>
	);
}
