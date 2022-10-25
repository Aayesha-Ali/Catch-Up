import React, { useEffect, useState } from "react";
import MapView, { Circle, Marker } from "react-native-maps";
import { StyleSheet, View, Dimensions } from "react-native";
import * as Location from "expo-location";
import { SafeAreaView } from "react-native-safe-area-context";
import { useWindowDimensions } from "react-native";
import { Text } from "react-native-paper";

function MapScreen(props) {
  const { navigation, route } = props;
  // const { user, users } = route.params;
  const user = {
    id: "QsMXA5OjmdWuawF8Afrl9gCJ2Vv1",
    location: {
      latitude: -36.98552,
      longitude: 174.849,
    },
  };

  const users = [
    {
      id: "<replace with actual gid>",
      location: {
        latitude: -36.96552,
        longitude: 174.849,
      },
    },
    {
      id: "<replace with actual gid2>",
      location: {
        latitude: -36.92552,
        longitude: 174.849,
      },
    },
  ];

  //Used for the red pin
  const [pin, setPin] = useState({
    latitude: -36.98552070152305,
    longitude: 174.84990686604613,
  });

  const window = useWindowDimensions();

  useEffect(() => {
    //Used to ask for permission to access current location
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      const canRequestLocation = status === "granted";
      if (!canRequestLocation) {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location);

      //Used for current location
      setPin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  return (
    <SafeAreaView>
      <MapView
        style={{ width: window.width, height: window.height }}
        //Used for the area to be taken to in the map
        initialRegion={{
          latitude: -36.98552070152305,
          longitude: 174.84990686604613,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        }}
        showsUserLocation={true}
      >
        <Marker
          key={user.id}
          //Used for the current location pin
          coordinate={user.location}
          title="You Are Here"
        ></Marker>
        {users.map((user) => (
          <Marker
            key={user.id}
            //Used for the current location pin
            coordinate={user.location}
            title={`Replace with name. User id: ${user.id}`}
          ></Marker>
        ))}

        <Circle
          center={pin}
          //Used for radius
          radius={5000}
        />
      </MapView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MapScreen;
