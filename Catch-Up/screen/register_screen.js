import * as React from "react";
import { TextInput } from "react-native";

export const register_screen = () => {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    
    return (
        <View style={styles.container}>
            <TextInput
                style = {styles.input}
                value = {username}
                onChangeText = {(text) => setUsername(text)}
                placeholder = "Username"
                autoCapitalize="none"
            />
            <TextInput
                style = {styles.input}
                value = {password}
                onChangeText = {(text) => setPassword(text)}
                placeholder = "Password"
                secureTextEntry={true}
                onChangeText = {(text) => setPassword(text)}
            />
            <Button title="Register" onPress={() => {}} />
        </View>
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        marginbottom: 10,
        backgroundColor: "#fff",
    },
});
