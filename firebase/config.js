// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDocs, getCollection, getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1ootVgJ89u4TYCjXs4FwbvRL2U4H_eQs",

  authDomain: "rich-branch-41bc2.firebaseapp.com",

  projectId: "rich-branch-41bc2",

  storageBucket: "rich-branch-41bc2.appspot.com",

  messagingSenderId: "3217860387",

  appId: "1:3217860387:web:32d1e9f639ec1f7d54ce96",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, app };
