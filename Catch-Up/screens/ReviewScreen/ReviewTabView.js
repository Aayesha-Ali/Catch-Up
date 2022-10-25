import React from 'react';
import { SafeAreaView, Text, View, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ReviewScreen from './ReviewScreen';

const Tab = createMaterialTopTabNavigator();

export default function ReviewTabView() {
  return (
      <NavigationContainer>
        <Tab.Navigator tabBarPosition="bottom">
          <Tab.Screen name="All" component={ReviewScreen} />
          <Tab.Screen name="Following" component={ReviewScreen} />
        </Tab.Navigator>
      </NavigationContainer>
  );
}


