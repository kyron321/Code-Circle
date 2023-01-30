import { useState } from "react";
import { postReply } from "../hooks/postReply";
import { useAuthContext } from "../hooks/useAuthContext";
import { useRouter } from "next/router";


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
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          onChange={onChangePostReply}
          value={postReplyInput}
          placeholder="type your reply here"
        />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}
