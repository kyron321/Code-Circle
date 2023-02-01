import React from "react";
import styles from "../css/profilePagePostCard.module.css";
import imagePlaceholder from "../images/image-placeholder.svg";
import Image from "next/image";

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
  const readableDate = date.toLocaleDateString("en-GB");
  const readableTime = date.toLocaleTimeString("en-GB").slice(0, 5);

  return (
    <div className={styles.profileCardContainer}>
      <div className={styles.title}>{postTitle}</div>
      <div className={styles.description}>{projectDescription}</div>
      <Image
        src={imagePlaceholder}
        alt="placeholder"
        width={300}
        height={300}
      />
      <div className={styles.authorAndPostTimeContainer}>
        <div>Posted by: {user}</div>
        <div>
          Created: {readableDate} at {readableTime}{" "}
        </div>
      </div>
    </div>
  );
}