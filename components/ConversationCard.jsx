import React from "react";
import defaultAvatar from "../images/default-avatar.svg";
import Image from "next/image";

import styles from "../css/conversation-card.module.css";

export default function ConversationCard({ user, date, message }) {
  return (
    <div className={styles.conversations}>
      <div className={styles.photo}>
        <Image
          className={styles.avatarImage}
          src={defaultAvatar}
          alt="user avatar"
          width={50}
          height={50}
        />

        <div className={styles.online}></div>
      </div>

      <div className={styles["desc-contact"]}>
        <p className={styles.name}>
          <em>{user}</em>
        </p>
        <p className={styles.message}>{message}</p>
      </div>
      <div className={styles.createdAt}>{date}</div>
    </div>
  );
}
