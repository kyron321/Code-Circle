// This file is not required any more. The below code has been incorporated into create-an-account.js
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../firebase/config';

export const useSignup = () => {
    const signup = (email, password, displayName) => {
        createUserWithEmailAndPassword(auth, email, password, displayName)
            .then((userCredential) => {
                console.log("New user successfully created and added to Authentication > Users table.");
            })
            .catch((error) => {
                console.log(error)
            });
    }
    return {signup};
}

