import React, { useEffect, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import { firebase } from "../../config";

export default function LoginScreen({ navigation }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const onFooterLinkPress = () => {
		navigation.navigate("Create Account");
	};

	const resetPassword = () => {
		navigation.navigate("Forgot Password?");
	};

	// TODO temporary auto login
	useEffect(() => {
		setEmail("user@gmail.com");
		setPassword("password");
	}, []);

	const onLoginPress = () => {
		console.log("Logging in...");
		if (email.length == 0) {
			alert("Please enter an email address.");
			return;
		} else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
			alert("Incorrect email format.");
			return;
		} else if (password.length == 0) {
			alert("Please enter a password.");
			return;
		} else {
			firebase
				.auth()
				.signInWithEmailAndPassword(email, password)
				.then((response) => {
					const uid = response.user.uid;
					const usersRef = firebase.firestore().collection("users");
					usersRef
						.doc(uid)
						.get()
						.then((firestoreDocument) => {
							if (!firestoreDocument.exists) {
								alert("User does not exist.");
								return;
							}
						})
						.catch((error) => {
							alert(error);
						});
				})
				.catch((error) => {
					if (error.code === "auth/wrong-password") {
						alert("The password you have entered is incorrect!");
					} else if (error.code === "auth/user-not-found") {
						alert("There is no account registered with this email address.");
					} else if (error.code === "auth/network-request-failed") {
						alert(
							"Failed to communicate with the server. Please check your internet connection and try again."
						);
					} else {
						alert("An unknown error occurred. Contact your dev team.");
					}
				});
		}
	};

	return (
		<View style={styles.container}>
			<KeyboardAwareScrollView
				style={{ flex: 1, width: "100%" }}
				keyboardShouldPersistTaps="always"
			>
				<Image
					style={styles.logo}
					source={require("../../assets/Catchup.png")}
				/>

				<TextInput
					style={styles.input}
					placeholder="E-mail"
					placeholderTextColor="#aaaaaa"
					onChangeText={(text) => setEmail(text)}
					value={email}
					underlineColorAndroid="transparent"
					autoCapitalize="none"
				/>

				<TextInput
					style={styles.input}
					placeholderTextColor="#aaaaaa"
					secureTextEntry
					placeholder="Password"
					onChangeText={(text) => setPassword(text)}
					value={password}
					underlineColorAndroid="transparent"
					autoCapitalize="none"
				/>

				<TouchableOpacity style={styles.button} onPress={() => onLoginPress()}>
					<Text style={styles.buttonTitle}>Log in</Text>
				</TouchableOpacity>
				<View style={styles.footerView}>
					<Text style={styles.footerText}>
						Don't have an account?{" "}
						<Text onPress={onFooterLinkPress} style={styles.footerLink}>
							Sign up
						</Text>
					</Text>
				</View>

				<View style={styles.footerView}>
					<Text style={styles.footerText}>
						<Text onPress={resetPassword} style={styles.footerLink}>
							Forgot Password?
						</Text>
					</Text>
				</View>
			</KeyboardAwareScrollView>
		</View>
	);
}
