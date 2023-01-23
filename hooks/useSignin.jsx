import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase/config';

export const useSignin = () => {
    const signin = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("User successfully signed in.")
                console.log(userCredential, "<------- userCredential")

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("User could not be logged in.")
                console.log(error)
            });
    }
    return { signin };
}







