import { db } from '../firebase/config';
import { addDoc, collection } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";

export const createAPost = (user, postTitle, projectDescription, programmingLanguage, timeToCode, timeZone) => {
    try {
        const docRef = addDoc(collection(db, "posts"), {
            user: user,
            postTitle: postTitle,
            projectDescription: projectDescription,
            programmingLanguage: programmingLanguage,
            timeToCode: timeToCode,
            timeZone: timeZone
        })
        .then((response) => {
            console.log(response.id);
            const post = doc(db, "posts", response.id);
            updateDoc(post, {
                postId: response.id
            });
        })
        console.log("Document written with ID: ", docRef.id);
    } catch(e) {
        console.error("Error adding document: ", e);
    }
}