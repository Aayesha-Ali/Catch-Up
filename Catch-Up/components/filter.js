import React from "react";
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    SafeAreaView,
  } from "react-native";

   const Item = ({username, firstName, lastName}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{username}</Text>
      <Text>{firstName} {lastName}</Text>
      
    </View>
   );

// the filter
const List = ({ searchPhrase, setClicked, data }) => {
    const renderItem = ({ item }) => {
      // when no input, show all
      if (searchPhrase === "") {
        return <Item username={item.username} firstName={item.firstName} lastName={item.lastName} />;
      }
      // filter of the name
      if (item.username.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
        return <Item username={item.username} firstName={item.firstName} lastName={item.lastName} />;
      }
      // filter of the description
      if (item.firstName.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
        return <Item username={item.username} firstName={item.firstName} lastName={item.lastName} />;
      }
    };
  
    return (
      <SafeAreaView style={styles.list__container}>
        <View
          onStartShouldSetResponder={() => {
            setClicked(false);
          }}
        >
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      </SafeAreaView>
    );
  };
  
  export default List;
  
  const styles = StyleSheet.create({
    list__container: {
      margin: 5,
      height: "85%",
      width: "100%",
    },
    item: {
      margin: 30,
      borderBottomWidth: 2,
      borderBottomColor: "lightgrey"
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 5,
      fontStyle: "italic",
    },
  });