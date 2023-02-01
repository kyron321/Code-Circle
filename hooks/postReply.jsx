import { db } from "../firebase/config";
import { addDoc, collection } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";

export const postReply = (message, postId, user) => {
  try {
    const docRef = addDoc(collection(db, "replies"), {
      message,
      postId,
      user,
    }).then((response) => {
      const reply = doc(db, "replies", response.id);
      updateDoc(reply, {
        replyId: response.id,
      });
    });
  } catch (e) {
    console.log(e);
  }
};
