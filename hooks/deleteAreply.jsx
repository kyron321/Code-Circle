import { db } from "../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";

export default function deleteAreply(replyId) {
  deleteDoc(doc(db, "replies", replyId));
}
