import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
// Optionally import the services that you want to use
//import "firebase/database";
//import "firebase/functions";
//import "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBoSeM4LFv_idiMAKewArxkP8Kuad1pEOg",
  authDomain: "react-native-chat-app-7fde3.firebaseapp.com",
  projectId: "react-native-chat-app-7fde3",
  storageBucket: "react-native-chat-app-7fde3.appspot.com",
  messagingSenderId: "1097637569203",
  appId: "1:1097637569203:web:9a5e00fe1de6cfcaa1c6c6",
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();
export { db, auth };
