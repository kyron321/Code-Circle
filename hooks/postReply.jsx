import { db } from '../firebase/config';
import { addDoc, collection } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";

// Todo - user needs to be reinstated, 

// post table and reply both need a username 
// either display name or username but not both 

export const postReply = (message, postId, user) => {
    try {
        const docRef = addDoc(collection(db, "replies"), {
            message,
            postId,
            user
        })
            .then((response) => {
                const reply = doc(db, "replies", response.id);
                updateDoc(reply, {
                    replyId: response.id,
 });  
        })
    } catch (e) {
           console.log("error")
}

} 
