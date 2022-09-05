//firebase config key setup
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB0u28OrQ2jeDBURrjOEAlXYHMOdiXJ2LI",
  authDomain: "catch-up-ad4b3.firebaseapp.com",
  projectId: "catch-up-ad4b3",
  storageBucket: "catch-up-ad4b3.appspot.com",
  messagingSenderId: "105904868165",
  appId: "1:105904868165:web:342b8209c4bc9ee42e8c2c",
  measurementId: "G-SN2DJ9VEXK",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
