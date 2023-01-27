import { db } from '../firebase/config';
import { addDoc, collection } from 'firebase/firestore';
import { doc, updateDoc } from 'firebase/firestore';

export const createAPost = (
  user,
  postTitle,
  projectDescription,
  programmingLanguage,
  timeToCode,
  timeZone
) => {
  const newDate = new Date();
  try {
    const docRef = addDoc(collection(db, 'posts'), {
      user,
      postTitle,
      projectDescription,
      programmingLanguage,
      timeToCode,
      timeZone,
      postTime: newDate.getTime(),
    }).then((response) => {
      const post = doc(db, 'posts', response.id);
      updateDoc(post, {
        postId: response.id,
      });
    });
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};
