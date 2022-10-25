// Call this anywhere in a component, to randomly generate restaurants with reviews.

import { faker } from "@faker-js/faker";
import { useEffect } from "react";
import { firebase } from "./config";

// Careful not to call this too often. Delete all restaurants and try again, if there's too many.
export const useMakeRestaurants = () => {

    useEffect(() => {
        const fn = async () => {
            // Create restaurants, the info and reviews
            for (let i = 0; i < 50; i++) {
                const reviews1 = [];
                for (let i = 0; i < 10; i++) {
                    const review = {
                        userName: faker.name.fullName(),
                        location: faker.address.streetAddress(),
                        reviewText: faker.lorem.paragraph(),
                        userLogoUrl: faker.image.avatar(),
                        foodImageUrl: faker.image.food(640, 480, true)
                    }

                    reviews1.push(review);

                }

                const restaurant = {
                    name: faker.company.name(),
                    icon: faker.image.food(640, 480, true),
                    photos: [
                        faker.image.food(640, 480, true),
                        faker.image.food(640, 480, true)
                    ],
                    address: faker.address.streetAddress(),
                    isOpenNow: i % 2 == 0,
                    rating: Math.random() * 6,
                    isClosedTemporarily: i % 2 == 0,
                    reviews: reviews1
                };

                await firebase
                    .firestore()
                    .collection("restaurants")
                    .doc()
                    .set(restaurant);
                console.log(`Created restaurant with id: ${restaurant.name}`);
            }
        }
        fn();
    }, []);
}