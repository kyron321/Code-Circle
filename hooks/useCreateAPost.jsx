import { db } from '../firebase/config';
import { addDoc, collection } from "firebase/firestore";

export const createAPost = (postTitle, projectDescription, programmingLanguage, timeToCode, timeZone) => {
    try {
        const docRef = addDoc(collection(db, "posts"), {
            postTitle: postTitle,
            projectDescription: projectDescription,
            programmingLanguage: programmingLanguage,
            timeToCode: timeToCode,
            timeZone: timeZone
        });            
        console.log("Document written with ID: ", docRef.id);
    } catch(e) {
        console.error("Error adding document: ", e);
    }
}