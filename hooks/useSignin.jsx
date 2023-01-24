import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase/config';

export const useSignin = () => {
    const signin = (email, password) => {
        firebase.auth().signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("User successfully signed in.")
                console.log(userCredential, "<------- userCredential");
            })
            .catch((error) => {
                console.log("User could not be logged in.");
                console.log(error);
            });
    }
    return { signin };
}







