import { useState } from "react";
import { postReply } from "../hooks/postReply";
import { useAuthContext } from "../hooks/useAuthContext";
import { useRouter } from "next/router";
import styles from "../css/postReplies.module.css";
import { motion } from "framer-motion";

const buttonVariants = {
  hover: {
    scale: 1.06,
  },
  tap: {
    scale: 0.99,
  },
};


export default function PostReplyForm({ pid, setReplies }) {
  const [postReplyInput, setPostReplyInput] = useState("");

  const { user } = useAuthContext();
 
  function handleSubmit(e) {
    e.preventDefault();
    postReply(postReplyInput, pid, user.displayName);
    setPostReplyInput("");
    setReplies((prevReplies) => [...prevReplies, {message: postReplyInput, user: user.displayName, postId: pid, createdAt: new Date()}]);
  }

  function onChangePostReply(e) {
    setPostReplyInput(e.target.value);
  }

  return (
    <div className={styles.container}>
    <form onSubmit={handleSubmit} className={styles.form}>
      <textarea
        autoFocus
        className={styles.textarea}
        onChange={onChangePostReply}
        value={postReplyInput}
        placeholder="Reply to this post"
        spellCheck="true"
        maxLength={300}
        required
      />
      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        className={styles.button}
      >
        Reply
      </motion.button>
    </form>
  </div>
  );
}
