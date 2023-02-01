import React from 'react';
import styles from '../css/profilePagePostCard.module.css';
import deleteAPost from "../hooks/deleteAPost";
import { useRouter } from "next/router";

export default function ProfilePagePostCard({ props, userName }) {
  const {
    postId,
    postTime,
    postTitle,
    programmingLanguage,
    projectDescription,
    timeToCode,
    timeZone,
    user,
  } = props;
  const date = new Date(postTime);
  const readableDate = date.toLocaleDateString('en-GB');
  const readableTime = date.toLocaleTimeString('en-GB').slice(0, 5);

  const router = useRouter();

  function handleDeletePost() {
    deleteAPost(postId);
    setTimeout(() => {
      router.push(`/users/${userName}`);
    }, 1500);
  }

  return (
    <div className={styles.profileCardContainer}>
      <div>{postTitle}</div>
      <div>{projectDescription}</div>
      <div className={styles.authorAndPostTimeContainer}>
        <div>Posted by: {user}</div>
        <div>
          Created: {readableDate} at {readableTime}{' '}
        </div>
      </div>
      <button onClick={handleDeletePost}>Delete Post</button>
    </div>
  );
}
