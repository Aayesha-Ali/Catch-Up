import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native'
import React, { useState, useEffect} from "react";
import { firebase } from "../../config";
import styles from "./styles";

const UserProfileScreen = () => {
    const [user, setUser] = useState([]);

    useEffect(() => {
                firebase.firestore().collection("users")
                .doc(firebase.auth().currentUser.uid)
                .get()
                .then((snapshot) => {
                       
                    setUser({ uid: firebase.auth().currentUser.uid, ...snapshot.data() });
                    })
            
    }, [firebase.auth().currentUser.uid]);

   console.log(user);


  return (
    <View>
        <Image
        style={{width: 200, height: 200, resizeMode: 'contain',alignSelf: 'center',}}
          source={require("../../assets/profile.png")}
        />
      <Text style={{fontSize: 30, fontWeight: "bold", textAlign: "center", marginBottom: 20}}>
        Username: {user.username}
      </Text>
      <Text style={{fontSize: 20,fontWeight: "bold", textAlign: "center", marginTop: 10, marginBottom: 20, fontStyle: "italic",
        }}
      >
        Firstname: {user.firstName} 
      </Text>
      <Text style={{fontSize: 20,fontWeight: "bold", textAlign: "center", marginBottom: 20, fontStyle: "italic",
        }}
      >
        Lastname: {user.lastName}
      </Text>
      <Text style={{fontSize: 20,fontWeight: "bold", textAlign: "center", marginBottom: 20, fontStyle: "italic",
        }}
      >
        Email: {user.email}      </Text>

        <TouchableOpacity
      style={styles.button}>
      <Text style={styles.buttonTitle}>Edit Profile</Text>
  </TouchableOpacity>

  <TouchableOpacity
      style={styles.button}>
      <Text style={styles.buttonTitle}>Reset Password</Text>
  </TouchableOpacity>
    </View>
  )
}

export default UserProfileScreen

