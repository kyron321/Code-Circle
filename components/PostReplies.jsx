import React from "react";
import styles from "../css/postReplies.module.css";
import moment from "moment";
import { useAuthContext } from "../hooks/useAuthContext";

export default function PostReplies({ pid, replies, handleDeleteReply }) {
  const { user } = useAuthContext();

  const repliesToRender = replies?.filter((reply) => {
    return reply.postId === pid;
  });

  return repliesToRender?.length ? (
    <div>

      {repliesToRender.map((reply, i) => {
        return (
          <div key={reply.replyId} className={styles.container}>
          <div className={styles.profileContainer}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={user.photoURL} alt="profile "  className={styles.profileImage} onClick={()=>{
              router.push(`/users/${user?.displayName}`)
            }} />
            <div>
                <div className={styles.usernameContainer}>
                  <div className={styles.username}>{reply.user}</div>
                  <div>{moment(reply.createdAt).fromNow()}</div>
                </div>
                <div className={styles.replyContainer}>
                  <div className={styles.reply}>{reply.message}</div>
                  {reply?.user === user?.displayName ? (
                    <button onClick={() => handleDeleteReply(reply.replyId)}>
                      Delete
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <div>No replies yet...</div>
  );
}
