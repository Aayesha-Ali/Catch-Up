import React from "react";
import { Text, View } from "react-native";

const RestaurantInfoCard = ({ restaurant }) => {
	return (
		<View>
			<Text>{restaurant.name}</Text>
		</View>
	);
};

export default RestaurantInfoCard;
