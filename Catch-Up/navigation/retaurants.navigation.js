import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RestaurantScreen } from "../screens/RestaurantScreen/RestaurantScreen";
import { RestaurantDetailScreen } from "../screens/RestaurantScreen/restaurant-detail.screen";

const RestaurantStack = createNativeStackNavigator();

export const RestaurantsNavigator = () => {
	return (
		<RestaurantStack.Navigator screenOptions={{ headerShown: false }}>
			<RestaurantStack.Screen name="Restaurants" component={RestaurantScreen} />
			<RestaurantStack.Screen
				name="RestaurantDetail"
				component={RestaurantDetailScreen}
			/>
		</RestaurantStack.Navigator>
	);
};
