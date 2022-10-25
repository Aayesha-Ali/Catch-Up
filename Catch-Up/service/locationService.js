import { firebase } from "../config";

export const updateLocationForUser = async (userId, latitude, longitude) => {
  console.log(
    `Calling firebase to update location for userId: ${userId}, location: ${latitude} ${longitude}`
  );

  await firebase.firestore().collection("users").doc(userId).update({
    "location.latitude": latitude,
    "location.longitude": longitude,
  });
};
