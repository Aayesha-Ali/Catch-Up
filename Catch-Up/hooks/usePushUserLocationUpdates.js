import { useEffect, useRef, useState } from "react";
import { updateLocationForUser } from "../service/locationService";
import * as Location from "expo-location";

const minutesInMillis = (minutes) => {
  return minutes * 60 * 1000;
};

const SendFrequencyInMillis = minutesInMillis(1);

export const usePushUserLocationUpdates = (user) => {
  const userRef = useRef(user);
  userRef.current = user;

  const [canRequestLocation, setCanRequestLocation] = useState(false);

  useEffect(() => {
    Location.requestForegroundPermissionsAsync().then((res) =>
      setCanRequestLocation(res.status == "granted")
    );
  }, [userRef.current]);

  // Keep sending the current user's location to firebase
  useEffect(() => {
    const timer = setInterval(sendLocationToFirebase, SendFrequencyInMillis);
    return () => clearInterval(timer);
  }, []);

  const sendLocationToFirebase = async () => {
    if (!canRequestLocation || !userRef.current) {
      console.log(
        `Not sending loc to firebase. canRequestLocation=${canRequestLocation} userRef.current=${userRef.current}`
      );
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    console.log(
      `Sending location to firebase every ${SendFrequencyInMillis} ms. latitude=${latitude} longitude=${longitude}`
    );
    updateLocationForUser(userRef.current.id, latitude, longitude);
  };
};
