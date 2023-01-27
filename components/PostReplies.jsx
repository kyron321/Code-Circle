import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import { app } from "../firebase/config";
import postReplyForm from './postReplyForm';

export default function PostReplies({pid}) {
  const [replies, setReplies] = useState([]);
  

  const db = getFirestore(app);

  async function getReplies(db) {
    const RepliesCol = collection(db, "replies");
   const RepliesSnapshot = await getDocs(RepliesCol);
    const RepliesList = RepliesSnapshot.docs.map((doc) => doc.data());

    return RepliesList;
  }

  useEffect(() => {
    getReplies(db).then((response) => { 
      console.log(response,"R")
      setReplies(response);
    });
  }, []);


  const repliesToRender = replies.filter((reply) => {
    return reply.postId === pid;
  })

  return (
    <div>
      <h1>Replies to a Post </h1>
      {repliesToRender.map((reply) => {
        console.log(reply,">>>>>")
        return (
          <div key = {reply.replyId}>
            <p >{reply.user}</p>
            <p>{reply.message}</p>
            {/* <p>{reply.createdAt.toDate()}</p> */}
          </div>
        )
      })}
    </div>
  );
} 