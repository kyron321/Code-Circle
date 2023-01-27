import { useState } from "react";
import { postReply } from "../hooks/postReply";
import { useAuthContext } from "../hooks/useAuthContext";

export default function PostReplyForm({ pid }) {
  const [reply, setReply] = useState("");
  console.log(setReply, "<<<<<");

  const { user } = useAuthContext();

  function handleSubmit(e) {

    e.preventDefault();
    postReply(reply, pid);
    setReply("");
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="Reply__card">
        <input
          onChange={(e) => setReply(e.target.value)}
          type="text"
          value={reply}
        />
        <button>submit</button>
      </form>
    </div>
  );
} 