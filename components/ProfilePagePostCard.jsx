import React from 'react';
import styles from '../css/profilePagePostCard.module.css';

export default function ProfilePagePostCard({ props }) {
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
    </div>
  );
}
