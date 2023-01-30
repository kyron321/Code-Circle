// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDocs, getCollection, getFirestore } from "firebase/firestore";

// Code Circle's config
// const firebaseConfig = {
//   apiKey: "AIzaSyDxBm0urtZBgYT5vP84OsqDzoMqHr0CNtI",
//   authDomain: "code-circle--x.firebaseapp.com",
//   projectId: "code-circle--x",
//   storageBucket: "code-circle--x.appspot.com",
//   messagingSenderId: "250555057230",
//   appId: "1:250555057230:web:b0b6fe6f763bc2f458ef1f",
//   measurementId: "G-LHZ1H9YKED"
// };

const firebaseConfig = {
  apiKey: "AIzaSyCrFLid33CG_lZdar3hcwlw8YC-tbrMrhE",
  authDomain: "code-base-6a637.firebaseapp.com",
  projectId: "code-base-6a637",
  storageBucket: "code-base-6a637.appspot.com",
  messagingSenderId: "1080039772540",
  appId: "1:1080039772540:web:05b742103060e4af0e14f9",
  measurementId: "G-DZCKNNBJ5N",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, app };
