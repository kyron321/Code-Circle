import { db } from '../firebase/config';
import { addDoc, collection } from "firebase/firestore";

// Todo - user needs to be reinstated, 

// post table and reply both need a username 
// either display name or username but not both 

export const postReply = (message, postId) => {
    try {
        const docRef = addDoc(collection(db, "replies"), {
            message,
            // user,
            postId
        });
      console.log("Document written with ID: ", docRef.id)
    } catch (e) {
           console.log("error")
}

} 