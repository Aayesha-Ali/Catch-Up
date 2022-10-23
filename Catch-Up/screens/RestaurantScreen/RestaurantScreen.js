import React, { useContext } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { ActivityIndicator, Colors } from "react-native-paper";

// import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";

// import { Search } from "../components/search.component";
import RestaurantInfoCard from "../../components/RestaurantInfoCard";
import styled from "styled-components";
import { SafeArea } from "../../components/utils/SafeArea";
import { Spacer } from "../../components/utils/Spacer";
import { getRestaurants } from "./restaurants.service";

const RestaurantList = styled(FlatList).attrs({
	contentContainerStyle: {
		padding: 16,
	},
})``;

const Loading = styled(ActivityIndicator)`
	margin-left: -25px;
`;
const LoadingContainer = styled.View`
	position: absolute;
	top: 50%;
	left: 50%;
`;

const useRestaurant = () => {
	return {
		isLoading: false,
		restaurants: getRestaurants("51.219448,4.402464"),
	};
};
const RestaurantScreen = ({ navigation }) => {
	const { isLoading, restaurants } = useRestaurant();

	return (
		<SafeArea>
			{isLoading && (
				<LoadingContainer>
					<Loading size={50} animating={true} color={Colors.blue300} />
				</LoadingContainer>
			)}
			{/* <Search /> */}
			<RestaurantList
				data={restaurants}
				renderItem={({ item }) => {
					return (
						<TouchableOpacity
							onPress={() =>
								navigation.navigate("RestaurantDetail", {
									restaurant: item,
								})
							}
						>
							<Spacer position="bottom" size="large">
								<RestaurantInfoCard restaurant={item} />
							</Spacer>
						</TouchableOpacity>
					);
				}}
				keyExtractor={(item) => item.name}
			/>
		</SafeArea>
	);
};

export default RestaurantScreen;
