import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RestaurantsScreen } from "../screens/RestaurantScreen/RestaurantScreen";
import { RestaurantDetailScreen } from "../screens/RestaurantDetailScreen/restaurant-detail.screen";

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
