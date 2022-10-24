import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView} from 'react-native'
import React, { useState, useEffect } from 'react'
import { firebase } from '../../config';
import styles from '../LoginScreen/styles';
import SearchBar from '../../components/searchBar';
import List from '../../components/filter';
const FriendsScreen = ({navigation}) => {

  const AddFriends = () => {
    navigation.navigate('Add Friends')
}

  const FriendRequests = () => {
    console.log(data);
    navigation.navigate('Friend Requests', {users: data}) 
}

const [searchPhrase, setSearchPhrase] = useState("");
const [clicked, setClicked] = useState(false);
const [ data, setData ] = useState([]);
const [friends, setFriends] = useState([]);
const users = firebase.firestore().collection('users');

  useEffect(() => {
    const loadData = async () => {
    users.onSnapshot(
      querySnapshot => {
      const data = [];
      querySnapshot.forEach(doc => {
        const { username, firstName, lastName } = doc.data();
        data.push({
          id: doc.id,
          username,
          firstName,
          lastName,
        });
      });
      setData(data);
    }
    )
  };
  loadData();
  }, []);

  useEffect(() => {
    firebase
    .firestore()
    .collection('users')
    .doc(firebase.auth().currentUser.uid)
    .collection('friends')
    .onSnapshot((querySnapshot) => {
      const friends = [];
      querySnapshot.forEach((doc) => {
        friends.push(
          doc.id,
        );
      });
      setFriends(friends);
    });
  }, []);

  const displayFriend = data.filter((user) => friends.includes(user.id));
  console.log(displayFriend);
 
  return (
    <View>

      
<TouchableOpacity
          style={styles.button}
          onPress={() => AddFriends()}>
          <Text style={styles.buttonTitle}>Add Friend</Text>
      </TouchableOpacity>

      <TouchableOpacity
          style={styles.button}
          onPress={() => FriendRequests()}>
          <Text style={styles.buttonTitle}>Friend Requests</Text>
      </TouchableOpacity>

      <SafeAreaView style={styles.root}>
      {!clicked}
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
      </SafeAreaView>

            <List
            searchPhrase={searchPhrase}
            data={displayFriend}
            setClicked={setClicked}
        
          />

    </View>
  )
      }
export default FriendsScreen

