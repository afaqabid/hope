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
  apiKey: "AIzaSyC3Bphr92rI554kCbXDh-5NzysOltMLbNc",
  authDomain: "hope-makeliveseasier.firebaseapp.com",
  // databaseURL: "https://hope-makeliveseasier-default-rtdb.firebaseio.com",
  projectId: "hope-makeliveseasier",
  storageBucket: "hope-makeliveseasier.appspot.com",
  messagingSenderId: "593452194882",
  appId: "1:593452194882:web:9299f61c48b034bb3ca1db",
  measurementId: "G-4236BSR8TL"
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



