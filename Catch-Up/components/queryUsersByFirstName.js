import { firebase } from "../config";
require("firebase/firestore");

/*
  all of those codes are to connect to the firebase database for search users.
*/
export default async function queryUsersByFirstName(searchText) {
  const currentUser = firebase.auth().currentUser;

  if (searchText.length > 0) {
    const querySnapshot = await firebase
      .firestore()
      .collection("users")
      .where("firstName", ">=", searchText)
      .where("firstName", "<=", searchText + "\uf8ff")
      .get();
    return querySnapshot.docs
      .map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      })
      .filter((user) => user.id !== currentUser.uid);
  } else {
    return [];
  }
}
