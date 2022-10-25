import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";

import { SafeArea } from "../components/utils/SafeArea";

import { RestaurantsNavigator } from "./retaurants.navigation";
import { FriendsNavigator } from "./friends.navigator";

import HomeScreen from "../screens/HomeScreen/HomeScreen";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
	Restaurants: "md-restaurant",
	Settings: "md-settings",
	Friends: "md-people",
};

const createScreenOptions = ({ route }) => {
	const iconName = TAB_ICON[route.name];
	return {
		tabBarIcon: ({ size, color }) => (
			<Ionicons name={iconName} size={size} color={color} />
		),
	};
};

export const AppNavigator = () => (
	<NavigationContainer>
		<Tab.Navigator
			screenOptions={createScreenOptions}
			tabBarOptions={{
				activeTintColor: "tomato",
				inactiveTintColor: "gray",
			}}
		>
			<Tab.Screen name="Restaurants" component={RestaurantsNavigator} />
			<Tab.Screen name="Friends" component={FriendsNavigator} />
			<Tab.Screen name="Settings" component={HomeScreen} />
		</Tab.Navigator>
	</NavigationContainer>
);
