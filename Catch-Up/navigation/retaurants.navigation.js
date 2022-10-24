import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RestaurantsScreen } from "../../features/restaurants/screens/restaurants.screen";
import { RestaurantDetailScreen } from "../../features/restaurants/screens/restaurant-detail.screen";

const RestaurantStack = createNativeStackNavigator();

export const RestaurantsNavigator = () => {
	return (
		<RestaurantStack.Navigator screenOptions={{ headerShown: false }}>
			<RestaurantStack.Screen
				name="Restaurants"
				component={RestaurantsScreen}
			/>
			<RestaurantStack.Screen
				name="RestaurantDetail"
				component={RestaurantDetailScreen}
			/>
		</RestaurantStack.Navigator>
	);
};
