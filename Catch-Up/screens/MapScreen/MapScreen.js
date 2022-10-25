import React, { useContext, useEffect, useState } from "react";
import MapView, { Circle, Marker } from "react-native-maps";
import { StyleSheet, View, Dimensions } from "react-native";
import * as Location from "expo-location";
import { SafeAreaView } from "react-native-safe-area-context";
import { useWindowDimensions } from "react-native";
import { Text } from "react-native-paper";

import styled from "styled-components/native";

import { LocationContext } from "../../services/location/location.context";
import { RestaurantsContext } from "../../services/restaurants/restaurants.context";

import { Search } from "../components/search.component";
import { MapCallout } from "../components/map-callout.component";

  function MapScreen(props) {
  const { navigation, route } = props;
  // const { user, users } = route.params;
  const user = {
    id: "Friend 1",
    location: {
      latitude: -36.98552,
      longitude: 174.849,
    },
  };

  const users = [
    {
      id: "Friend 2",
      location: {
        latitude: -36.96552,
        longitude: 174.849,
      },
    },
    {
      id: "Friend 3",
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

  const { rlocation } = useContext(LocationContext);
	const { restaurants = [] } = useContext(RestaurantsContext);

	const [latDelta, setLatDelta] = useState(0);

	const { lat, lng, viewport } = rlocation;

  useEffect(() => {
    const northeastLat = viewport.northeast.lat;
		const southwestLat = viewport.southwest.lat;

		setLatDelta(northeastLat - southwestLat);
	}, [rlocation, viewport]);
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
  };

  return (
    <SafeAreaView>
      <Search />
			<Map
				region={{
					latitude: lat,
					longitude: lng,
					latitudeDelta: latDelta,
					longitudeDelta: 0.02,
				}}
			>
				{restaurants.map((restaurant) => {
					return (
						<MapView.Marker
							key={restaurant.name}
							title={restaurant.name}
							coordinate={{
								latitude: restaurant.geometry.location.lat,
								longitude: restaurant.geometry.location.lng,
							}}
						>
							<MapView.Callout
								onPress={() =>
									navigation.navigate("RestaurantDetail", {
										restaurant,
									})
								}
							>
								<MapCallout restaurant={restaurant} />
							</MapView.Callout>
						</MapView.Marker>
					);
				})}
			</Map>
        <MapView
          style={{width: window.width, height: window.height}}
          //Used for the area to be taken to in the map
          initialRegion={{
            latitude: -36.98552070152305,
            longitude: 174.84990686604613,
            latitudeDelta: 0.040,
            longitudeDelta: 0.040,
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
              title={``}
            >
            </Marker>
          ))}

          <Circle
            center={pin}
            //Used for radius
            radius={5000}
          />
        </MapView>
    </SafeAreaView>
  );

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  }
});

export default MapScreen;
