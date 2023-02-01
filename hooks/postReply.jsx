import { db } from "../firebase/config";
import { addDoc, collection } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";

export async function postReply(message, postId, user) {
  const docRef = collection(db, "replies");

  const result = await addDoc(docRef, {
    message,
    postId,
    user,
  })
    .then((response) => {
      const reply = doc(db, "replies", response.id);
      updateDoc(reply, {
        replyId: response.id,
      });
      return response;
    })
    .catch((e) => {
      console.log("error", e);
    });
}
