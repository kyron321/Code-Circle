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
//   measurementId: "G-LHZ1H9YKED",
// };

// My config
const firebaseConfig = {
  apiKey: "AIzaSyC6j6Beed0WUJsu4gRL0fUDGzuc9vBISmY",
  authDomain: "code-circle-31b6d.firebaseapp.com",
  projectId: "code-circle-31b6d",
  storageBucket: "code-circle-31b6d.appspot.com",
  messagingSenderId: "336826783203",
  appId: "1:336826783203:web:87a1fd92cf26fd87a4fcd6",
  measurementId: "G-9EB67K78CF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, app };
