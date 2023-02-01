import { getDocs, collection, getFirestore } from "firebase/firestore";

import { db } from "../firebase/config";

export async function getReplies() {
  const repliesCol = collection(db, "replies");

  const repliesSnapshot = await getDocs(repliesCol);

  const repliesList = repliesSnapshot.docs
    .map((doc) => {
      return {
        ...doc.data(),
        createdAt: new Date(doc._document.createTime.timestamp.seconds * 1000),
      };
    })
    .sort((a, b) => b.createdAt - a.createdAt);
  return repliesList;
}
