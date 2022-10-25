import React, { useContext } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { ActivityIndicator, Colors } from "react-native-paper";

import { RestaurantsContext } from "./restaurants.context";

// import { Search } from "../components/search.component";
import RestaurantInfoCard from "../../components/RestaurantInfoCard/restaurant-info-card.component";
import styled from "styled-components";
import { SafeArea } from "../../components/utils/SafeArea";
import { Spacer } from "../../components/utils/Spacer";

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

export const RestaurantScreen = ({ navigation }) => {
	const { isLoading, restaurants } = useContext(RestaurantsContext);

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
