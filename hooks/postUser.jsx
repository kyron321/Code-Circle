import { db } from '../firebase/config';
import { addDoc, collection } from "firebase/firestore";

export const postUser = (displayName, techStack) => {
    try {
        const docRef = addDoc(collection(db, "users"), {
            displayname: displayName,
            techstack: techStack
        });            
        console.log("Document written with ID: ", docRef.id);
    } catch(e) {
        console.error("Error adding document: ", e);
    }
}