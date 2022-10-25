import { mocks } from "./restaurants";
import { firebase } from "../../config";

export const getRestaurants = async () => {
	const restaurants = [];
	const snapshot = await firebase
		.firestore()
		.collection("restaurants")
		.get();
	snapshot.forEach((doc) => {
		restaurants.push(doc.data());
	})
	return restaurants;
};
