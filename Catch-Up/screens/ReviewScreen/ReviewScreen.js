import React from 'react';
import { SafeAreaView, Text, View, StyleSheet, Image, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';



const ReviewScreen = (props) => {

  const { reviews } = props;


  return (
    <SafeAreaView>
       <ScrollView>
      <View style={styles.container}>
        <View>
          {reviews.map((review) => <ReviewCard review={review}></ReviewCard>)}
          {/* <Image style={styles.image} source={{ uri: 'https://i.ibb.co/Jdz0XJB/review1.png' }} /> */}
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const ReviewCard = (props) => {

  const { review } = props;
  const { userName, location, reviewText, userLogoUrl, foodImageUrl} = review;

  return (

    <View style={styles.card}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={{ uri: userLogoUrl }} />
        <Text>
          {userName}
          {"\n"}
          {"\n"}
          {"\n"}
        </Text>
      </View>
      <Text>
        {location}
        {"\n"}
        {"\n"}
      </Text>
      <Text>
        {reviewText}
        {"\n"}
      </Text>
      <Image style={styles.image1} source={{ uri: foodImageUrl }} />
    </View>
  )
}

export default ReviewScreen;

const styles = StyleSheet.create({
  container: {

    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: "100%",
    height: 500
  },
  image1: {
    width: "100%",
    height: 200
  },
  logoContainer: {
    flexDirection: "row",

  },
  logo: {
    width: 50,
    height: 50
  },
  card: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: '#fff',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
    padding: 20
  }
});
