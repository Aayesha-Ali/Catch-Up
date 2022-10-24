import React from "react";
import {
  SafeAreaView,
  View,
  Button,
  StyleSheet,
  Image,
  Text,
} from "react-native";

export default function ProfileScreen(props) {
  //const user = props.route.params.user
  const user = {
    firstName: "jiyoung",
    lastName: "do",
  };
  return (
    <SafeAreaView>
      <View>
        <View>
          <Text>
            {user.firstName} {user.lastName}
          </Text>
        </View>
        <Button
          title="CHAT"
          onPress={() => Alert.alert("you can chat to your friend")}
        />
        <Button
          title="MAP"
          onPress={() => Alert.alert("you can go to map to invite friends")}
        />
      </View>
    </SafeAreaView>
  );
}
