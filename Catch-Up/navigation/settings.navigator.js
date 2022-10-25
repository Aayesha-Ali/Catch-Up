import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FriendsScreen } from "../screens/FriendsScreen/FriendsScreen";
import { AddFriendsScreen } from "../screens/AddFriendScreen/AddFriendsScreen";
import { MapScreen } from "../screens/MapScreen/MapScreen";
import { ProfileScreen } from "../screens/ProfileScreen/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen/SettingsScreen";
import { AddFriendProfile } from "../screens/AddFriendProfileScreen/AddFriendProfile";
import { friendRequestScreen } from "../screens/FriendRequestScreen/FriendRequestScreen";
const SettingsStack = createNativeStackNavigator();

export const SettingsNavigator = () => {
	return (
		<SettingsStack.Navigator screenOptions={{ headerShown: false }}>
			<SettingsStack.Screen name="Settings" component={SettingsScreen} />
			<SettingsStack.Screen name="friends" component={FriendsScreen} />
			<SettingsStack.Screen name="Profile" component={ProfileScreen} />
			<SettingsStack.Screen
				name="AddFriendProfile"
				component={AddFriendProfile}
			/>
			<SettingsStack.Screen name="addFriends" component={AddFriendsScreen} />
			<SettingsStack.Screen
				name="friendRequests"
				component={friendRequestScreen}
			/>
			<SettingsStack.Screen name="Map" component={MapScreen} />
		</SettingsStack.Navigator>
	);
};
