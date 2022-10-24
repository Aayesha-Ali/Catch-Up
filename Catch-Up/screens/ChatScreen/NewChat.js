import {
  ScrollView,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
} from "react-native";
import React, { useLayoutEffect } from "react";

const NewChat = (navigation) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerRight: () => (
        <View style={{ marginRight: 20 }}>
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign name="infocirlceo" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <ScrollView horizontal>
      <Text>Chat</Text>
    </ScrollView>
  );
};

export default NewChat;

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("screen").height,
    backGroundColor: "white",
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    JustifyContent: "space-between",
  },
  chatItem: {
    flexDirection: "row",
  },
});
