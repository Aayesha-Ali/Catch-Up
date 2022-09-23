import { View, Text, TouchableOpacity} from 'react-native'
import React from 'react'
import styles from './styles';
import { firebase } from '../../config'
export default function HomeScreen({navigation}){
 
  const signOutUser = () => firebase.auth().signOut();
const signoutPress= () => {
    firebase.auth().signOut() 
    .then(() => {
        navigation.navigate('Login')
    })
    .catch(e=>{
     console.error('Sign Out Error', e);
    });

    }

    const FriendsList = () => {
      navigation.navigate('My Friends List')
  }
  
  return (
  
    <View>
      <Text>HomeScreen</Text>
      <TouchableOpacity
      style={styles.button}
      onPress={() => signOutUser()}>
      <Text style={styles.buttonTitle}>Sign Out</Text>
  </TouchableOpacity>

  <TouchableOpacity
      style={styles.button}
      onPress={() => FriendsList()}>
      <Text style={styles.buttonTitle}>Friends List</Text>
  </TouchableOpacity>

    </View>
  )
}
