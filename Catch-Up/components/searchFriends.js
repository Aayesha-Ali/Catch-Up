import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'


export default function searchFriends({ item })  {
  return (
    <TouchableOpacity style={styles.container}>
<Text style={styles.title}>{email}</Text>
      <Text>{firstName} {lastName}</Text>
    </TouchableOpacity>
  )
}

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

