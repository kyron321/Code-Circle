import React, { useState, useEffect } from "react";

export default function PostReplies({ pid, replies }) {
  
  const repliesToRender = replies?.filter((reply) => {
    return reply.postId === pid;
  });

  return repliesToRender?.length ? (
    <div>
      <h1>Replies to a Post </h1>
      {repliesToRender.map((reply) => {
        return (
          <div key={reply.replyId}>
            <p>{reply.user}</p>
            <p>{reply.message}</p>
            <p>{reply.createdAt.toLocaleString()}</p>
          </div>
        );
      })}
    </div>
  ) : (
    <div>No replies yet...</div>
  );
}
