import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase/config';

export const useSignup = () => {
    const signup = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("New user successfully created and added to Authentication > Users table.")
                console.log(userCredential, "<------- userCredential")
            })
            .catch((error) => {
                console.log(error)
            });
    }
    return {signup};
}

