import { getDocs, collection } from "firebase/firestore";

import { db } from "../firebase/config";

export async function getConversations() {
  const conversationsCol = collection(db, "messages");
  const conversationsSnapshot = await getDocs(conversationsCol);

  const conversationsList = conversationsSnapshot.docs
    .map((doc) => {
      return {
        ...doc.data(),
        createdAt: new Date(doc._document.createTime.timestamp.seconds * 1000),
      };
    })
    .sort((a, b) => b.createdAt - a.createdAt);
  return conversationsList;
}
