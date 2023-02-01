import { db } from '../firebase/config';
import { doc, deleteDoc } from 'firebase/firestore';

export default function deleteAPost(postId) {
    deleteDoc(doc(db, "posts", postId))
}
