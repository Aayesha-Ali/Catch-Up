import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    textInput: {
        margin: 10,
        backgroundColor: 'lightgrey',
        padding: 5,
        borderRadius: 4,
    },
    item: {
        margin: 30,
        borderBottomWidth: 2,
        borderBottomColor: "lightgrey",
        justifyContent: "center",
      alignItems: "center"

      },
      username: {
        fontSize: 25,
        fontWeight: "bold",
        marginBottom: 5,

      },
      
      name: {
        fontSize: 16,
        marginBottom: 5,
        fontStyle: "italic",
      },
      searchbar: {
        padding: 10,
        flexDirection: "row",
        width: "95%",
        backgroundColor: "#d9dbda",
        borderRadius: 15,
        alignItems: "center",
        marginBottom: 15

      },
})
