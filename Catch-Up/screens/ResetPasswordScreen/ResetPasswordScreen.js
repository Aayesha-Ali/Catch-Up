import { View, Image, TextInput, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { firebase } from "../../config";

const ResetPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const onFooterLinkPress = () => {
    navigation.navigate("Login");
  };

  const onResetPress = () => {
    if (email.length == 0) {
      alert("Please enter an email address.");
      return;
    } else {
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          alert("Password reset email sent.");
          navigation.navigate("Login");
        })
        .catch((error) => {
          if (error.code === "auth/user-not-found") {
            alert("There is no account registered with this email.");
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
        <View style={styles.footerView}>
          <Text style={styles.heading}>Enter Registered Email</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.button} onPress={() => onResetPress()}>
          <Text style={styles.buttonTitle}>Reset Password</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Return to Log in
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};
export default ResetPasswordScreen;
