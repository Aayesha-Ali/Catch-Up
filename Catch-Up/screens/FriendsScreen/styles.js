import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    item: {
        margin: 30,
        borderBottomWidth: 2,
        borderBottomColor: "lightgrey",
        justifyContent: "center",
      alignItems: "center"

      },
    list__container: {
        margin: 5,
        height: "85%",
        width: "100%",
      
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
    logo: {
        flex: 1,
        height: 200,
        width: 300,
        alignSelf: "center",
        margin: 30
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    button: {
        backgroundColor: 'red',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },
    footerText: {
        fontSize: 16,
        color: '#2e2e2d'
    },
    footerLink: {
        color: "red",
        fontWeight: "bold",
        fontSize: 16
    }
})