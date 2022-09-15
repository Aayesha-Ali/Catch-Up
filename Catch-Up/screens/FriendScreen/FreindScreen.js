import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
} from "react-native";

export default class FreindScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calls: [
        {
          id: 1,
          name: "Mark Shin",
          status: "Hungry",
          //image: "https://bootdey.com/img/Content/avatar/avatar7.png",
        },
        {
          id: 2,
          name: "JY",
          status: "Full",
        },
        {
          id: 3,
          name: "Aayesha",
          status: "Offline",
        },
        {
          id: 4,
          name: "Brian",
          status: "Active",
        },
        {
          id: 5,
          name: "Romeo",
          status: "Busy",
        },
      ],
    };
  }

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity>
        <View style={styles.row}>
          <Image source={{ uri: item.image }} style={styles.pic} />
          <View>
            <View style={styles.nameContainer}>
              <Text
                style={styles.nameTxt}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.name}
              </Text>
              <Text style={styles.mblTxt}>{item.status}</Text>
            </View>
            <View style={styles.msgContainer}>
              <Text style={styles.msgTxt}>{"Message"}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          extraData={this.state}
          data={this.state.calls}
          keyExtractor={(item) => {
            return item.id;
          }}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#DCDCDC",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    padding: 10,
  },
  pic: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 280,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: "900",
    color: "#222",
    fontSize: 18,
    width: 170,
  },
  msgTxt: {
    color: "#008000",
    fontSize: 12,
    marginLeft: 15,
  },
  msgContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  mblTxt: {
    fontWeight: "600",
    color: "#008000",
    fontSize: 13,
  },
});
