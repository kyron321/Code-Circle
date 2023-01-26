import { db } from '../firebase/config';
import { addDoc, collection } from 'firebase/firestore';
import { doc, updateDoc } from 'firebase/firestore';

export const createAPost = (
  postTitle,
  projectDescription,
  programmingLanguage,
  timeToCode,
  timeZone
) => {
  const newDate = new Date();
  try {
    const docRef = addDoc(collection(db, 'posts'), {
      postTitle: postTitle,
      projectDescription: projectDescription,
      programmingLanguage: programmingLanguage,
      timeToCode: timeToCode,
      timeZone: timeZone,
      postTime: newDate.getTime(),
    }).then((response) => {
      console.log(response.id);
      const post = doc(db, 'posts', response.id);
      updateDoc(post, {
        postId: response.id,
      });
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};
