import { useState } from "react";
import { postReply } from "../hooks/postReply";
import { useAuthContext } from "../hooks/useAuthContext";
import { useRouter } from 'next/router';

export default function PostReplyForm({ pid }) {
  const [ reply, setReply ] = useState("");
  const [ postReplyInput, setPostReplyInput] = useState( "" );

  const { user } = useAuthContext();

  let router = useRouter();
  function redirect() {
      router.push(`/posts/${pid}`)
  }

  function handleSubmit(e) {
    e.preventDefault();
    postReply(postReplyInput, pid, user.displayName);
    setPostReplyInput("");
    redirect();
  }

  function onChangePostReply(e) {
    setPostReplyInput(e.target.value);
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="Reply__card">
        <textarea
          onChange={onChangePostReply}
          value={postReplyInput}
        />
        <button>submit</button>
      </form>
    </div>
  );
} 
