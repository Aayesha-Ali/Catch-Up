import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FriendsScreen } from "../screens/FriendsScreen/FriendsScreen";
import { AddFriendsScreen } from "../screens/AddFriendScreen/AddFriendsScreen";
import { MapScreen } from "../screens/MapScreen/MapScreen";
import { ProfileScreen } from "../screens/ProfileScreen/ProfileScreen";

import { AddFriendProfile } from "../screens/AddFriendProfileScreen/AddFriendProfile";
import { friendRequestScreen } from "../screens/FriendRequestScreen/FriendRequestScreen";
const FriendsStack = createNativeStackNavigator();

export const FriendsNavigator = () => {
	return (
		<FriendsStack.Navigator screenOptions={{ headerShown: false }}>
			<FriendsStack.Screen name="friendsList" component={FriendsScreen} />
			<FriendsStack.Screen name="Profile" component={ProfileScreen} />
			<FriendsStack.Screen
				name="AddFriendProfile"
				component={AddFriendProfile}
			/>
			<FriendsStack.Screen name="addFriends" component={AddFriendsScreen} />
			<FriendsStack.Screen
				name="friendRequests"
				component={friendRequestScreen}
			/>
			<FriendsStack.Screen name="Map" component={MapScreen} />
		</FriendsStack.Navigator>
	);
};
