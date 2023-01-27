import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import { app } from "../firebase/config";

import PostReplyForm from "./PostReplyForm";

export default function PostReplies({pid}) {
  const [replies, setReplies] = useState([]);
  // const [filteredReplies, setFilteredReplies] = useState([]);
 

  const db = getFirestore(app);

  async function getReplies(db) {
    const RepliesCol = collection(db, "replies");
    // const q = query(RepliesCol, where("postID", "==", pid))

    const RepliesSnapshot = await getDocs(RepliesCol);
    const RepliesList = RepliesSnapshot.docs.map((doc) => doc.data());

    return RepliesList;
  }

  useEffect(() => {
    getReplies(db).then((response) => {
     console.log(response, "here is the response");
      setReplies(response);
    });
  }, []);

  

  return (
    <div>
      <h1>Replies to a Post </h1>
      {replies.map((reply) => {
        return (
          <div>
            <p>{reply.message}</p>
            {/* <p>{reply.createdAt.toDate()}</p> */}
          </div>
        );
      })}
    </div>
  );
} 