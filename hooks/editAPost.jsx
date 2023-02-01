import { db } from '../firebase/config';
import { doc, updateDoc } from 'firebase/firestore';

export default async function editAPost(postId, newProjectDescription, newProgrammingLanguage, newTimeToCode, newTimeZone) {
    const newPostInfo = {
        projectDescription: newProjectDescription,
        programmingLanguage: newProgrammingLanguage,
        timeToCode: newTimeToCode,
        timeZone: newTimeZone
    };
    await updateDoc(doc(db, "posts", postId), newPostInfo)
}
