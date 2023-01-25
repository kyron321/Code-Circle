// This file is not required any more. The below code has been incorporated into login.js
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase/config';

export const useSignin = () => {
    const signin = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("User successfully signed in.")
            })
            .catch((error) => {
                console.log("User could not be logged in.");
                console.log(error.code);
                return error.code;
            });
    }
    return { signin };
}







