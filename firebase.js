// Import the functions you need from the SDKs you need
// import * as firebase from "firebase";
// import * as firebase from "firebase";

import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getDatabase} from "firebase/database"
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDWD_79n2SKotwXWpksMDpnmz7wZP2XYo",
  authDomain: "hope-7eb45.firebaseapp.com",
  databaseURL: "https://hope-7eb45-default-rtdb.firebaseio.com",
  projectId: "hope-7eb45",
  storageBucket: "hope-7eb45.appspot.com",
  messagingSenderId: "111878929482",
  appId: "1:111878929482:web:e33a312bcfe55f97ea3ab3",
  measurementId: "G-CFX07RD7BC"
};

// Initialize Firebase
// let app;
// if (firebase.apps.length === 0){
//     app = firebase.initializeApp(firebaseConfig);
// }
// else
// {
//     app = firebase.app();
// }

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
export { auth, db };
